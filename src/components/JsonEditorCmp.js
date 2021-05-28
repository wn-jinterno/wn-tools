import React from 'react';
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-github";
import styles from '../styles.module.css';
import { has, isArray, isEmpty, isString } from 'underscore';
import { getTreeFromFlatData } from 'react-sortable-tree';
import jsonlint from 'jsonlint-mod';
import { Box, Flex } from 'rebass';
import SubPanelHeaderCmp from './SubPanelHeaderCmp';
import { Button, CaretDownIcon, Menu, Popover, Position, toaster } from 'evergreen-ui';
import { exportDataToJsonFile } from '../utils';

class JsonEditorCmp extends React.Component {
    constructor(props) {
        super(props);

        this.fileInputRef = React.createRef();
    }

    onChange = (newValue) => {
        const { setJsonEditorContent } = this.props;
        setJsonEditorContent && setJsonEditorContent(newValue);

        this.updateTreeDataFromJson(newValue);
    }

    updateTreeDataFromJson = (jsonStr) => {
        const { 
            setFlowTree, 
            setFlowTreeExportName, 
            setFlowTreeExportNodes, 
            setFlowTreeParsingError,
        } = this.props;

        if (isEmpty(jsonStr)) {
            setFlowTreeExportName("");
            setFlowTreeExportNodes([]);
            setFlowTree([]);
        } else {
            try {
                const flowTreeExportFromJSON = jsonlint.parse(jsonStr);
                let nullParentCount = 0;
                const flatDataFromJsonEditor = getTreeFromFlatData({
                    flatData: flowTreeExportFromJSON.nodes.map(node => {
                        if (node.parent === null) {
                            nullParentCount += 1;
                        }
                        return ({ 
                            ...node, 
                            title: node.name,
                            expanded: true,
                        });
                    }),
                    getKey: node => node.id, // resolve a node's key
                    getParentKey: node => node.parent, // resolve a node's parent's key
                    rootKey: null, // The value of the parent key when there is no parent (i.e., at root level)
                });

                if (nullParentCount > 1) {
                    throw new Error(`Flow tree can only contain a single root node. Found ${nullParentCount} with null parent.`);
                }

                setFlowTreeExportName(flowTreeExportFromJSON.name);
                setFlowTreeExportNodes(flatDataFromJsonEditor);
                setFlowTree(flatDataFromJsonEditor);
                setFlowTreeParsingError("");
            } catch(err) {
                console.log(`ERROR - ${err.message}`);
                setFlowTreeParsingError(err.message || "");
                setFlowTreeExportName("");
                setFlowTreeExportNodes([]);
                setFlowTree([]);
            }
        }
    }

    handleFileUpload = (e) => {
        const fileReader = new FileReader();
        fileReader.readAsText(e.target.files[0], "UTF-8");
        fileReader.onload = e => {
            try {
                const jsonStr = e.target.result;
                const jsonData = jsonlint.parse(jsonStr);

                if (has(jsonData, "name") && has(jsonData, "nodes") && isString(jsonData.name) && isArray(jsonData.nodes)) {
                    this.onChange(e.target.result);
                    toaster.success("File has been read successfully!");
                } else {
                    throw new Error(`JSON format must be { "name": "tree-name", "nodes": [] }`)
                }
            } catch(err) {
                toaster.danger(`Error - ${err.message}`);
            }
        }
        fileReader.onerror = e => {
            toaster.danger("Failed to read file!");
            fileReader.abort();
        }
    }

    onExportBtnClick = () => {
        const { flowTreeExportName, jsonEditorContent } = this.props;
        const jsonData = JSON.parse(jsonEditorContent);
        exportDataToJsonFile({ fileName: flowTreeExportName, jsonData });
    }

    render() {
        const { jsonEditorContent, flowTreeExportName, flowTreeExportNodes, onExportJSON } = this.props;
        
        return (
            <Box width="100%" height="100%">
                <Flex height="100%" paddingTop={0} flexDirection="column">
                    <SubPanelHeaderCmp 
                        title="Flow Tree JSON"
                        actionsCmp={
                            <Flex
                                flexDirection="row"
                            >
                                <Popover
                                    position={Position.BOTTOM_RIGHT}
                                    content={
                                        <Menu>
                                            <Menu.Group>
                                                <Menu.Item onSelect={ () => this.fileInputRef.current.click() }>
                                                    <Flex>
                                                        <input
                                                            ref={this.fileInputRef}
                                                            onChange={this.handleFileUpload}
                                                            type="file"
                                                            style={{ display: "none" }}
                                                            accept="application/JSON"
                                                        />
                                                        Import JSON
                                                    </Flex>
                                                </Menu.Item>
                                                <Menu.Divider />
                                                <Menu.Item 
                                                    disabled={isEmpty(flowTreeExportName) && isEmpty(flowTreeExportNodes)} 
                                                    onSelect={ () => this.onExportBtnClick() }
                                                >
                                                    Export JSON
                                                </Menu.Item>
                                            </Menu.Group>
                                        </Menu>
                                    }
                                >
                                    <Button iconAfter={CaretDownIcon}>File</Button>
                                </Popover>
                            </Flex>
                        }
                    />
                    <AceEditor
                        width="100%"
                        height="100%"
                        mode="json"
                        theme="github"
                        onChange={this.onChange}
                        value={jsonEditorContent}
                        name="flow-tree-json-editor"
                        editorProps={{ $blockScrolling: true }}
                        setOptions={{
                            enableBasicAutocompletion: true,
                            enableLiveAutocompletion: true,
                            enableSnippets: true
                        }}
                    />
                </Flex>
            </Box>
        );
    }
}

export default JsonEditorCmp;