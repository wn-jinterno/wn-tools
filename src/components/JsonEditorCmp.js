import React from 'react';
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-json";
// themes
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/theme-tomorrow";
import "ace-builds/src-noconflict/theme-kuroir";
import "ace-builds/src-noconflict/theme-twilight";
import "ace-builds/src-noconflict/theme-xcode";
import "ace-builds/src-noconflict/theme-textmate";
import "ace-builds/src-noconflict/theme-terminal";

import { has, isArray, isEmpty, isString } from 'underscore';
import { getTreeFromFlatData } from 'react-sortable-tree';
import jsonlint from 'jsonlint-mod';
import { Box, Flex } from 'rebass';
import SubPanelHeaderCmp from './SubPanelHeaderCmp';
import { Button, CaretDownIcon, ClipboardIcon, DownloadIcon, ImportIcon, Menu, Popover, Position, SelectMenu, Text, toaster } from 'evergreen-ui';
import { exportDataToJsonFile } from '../utils';
import CopyToClipboard from 'react-copy-to-clipboard';

class JsonEditorCmp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            editorTheme: {
                label: "Github",
                theme: "github",
            },
        }

        this.fileInputRef = React.createRef();
    }

    editorThemeList = [
        {
            label: "Monokai",
            theme: "monokai",
        },
        {
            label: "Github",
            theme: "github",
        },
        {
            label: "Tomorrow",
            theme: "tomorrow",
        },
        {
            label: "Kuroir",
            theme: "kuroir",
        },
        {
            label: "Twilight",
            theme: "twilight",
        },
        {
            label: "Xcode",
            theme: "xcode",
        },
        {
            label: "Textmate",
            theme: "textmate",
        },
        {
            label: "Terminal",
            theme: "terminal",
        }
    ]

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
            setFlowTreeParsingError("");
        } else {
            try {
                const flowTreeExportFromJSON = jsonlint.parse(jsonStr);

                if (has(flowTreeExportFromJSON, "name") 
                    && has(flowTreeExportFromJSON, "nodes") 
                    && isString(flowTreeExportFromJSON.name) 
                    && isArray(flowTreeExportFromJSON.nodes)) {
                        let nullParentCount = 0;
                        const newTreeFromFlatData = getTreeFromFlatData({
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
                        setFlowTreeExportNodes(flowTreeExportFromJSON.nodes);
                        setFlowTree(newTreeFromFlatData);
                        setFlowTreeParsingError("");
                } else {
                    throw new Error(`JSON format must be { "name": "tree-name", "nodes": [] }`)
                }
            } catch(err) {
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

    renderThemeList = () => {
        const { editorTheme } = this.state;
        // return (
        //     <Menu>
        //         <Menu.Group>
        //             { this.editorThemeList.map(({ label, theme }) => (
        //                 <Menu.Item key={theme} iconBefore={isEqual(editorTheme.theme, theme) ? TickIcon : null} onSelect={() => this.setState({ editorTheme: { label, theme} })}>{ label }</Menu.Item>
        //             ))}
        //         </Menu.Group>
        //     </Menu>
        // )
        return (
            <SelectMenu
                title="Editor Theme"
                options={this.editorThemeList.map(({label, theme}) => ({ label, value: theme }))}
                selected={editorTheme.theme}
                onSelect={(item) => this.setState({
                    editorTheme: {
                        label: item.label,
                        theme: item.value,
                    }
                })}
                >
                <Button>{editorTheme.label || 'Select theme...'}</Button>
            </SelectMenu>
        )
    }

    render() {
        const { jsonEditorContent, flowTreeExportName, flowTreeExportNodes } = this.props;
        
        return (
            <Box width="100%" height="100%">
                <Flex height="100%" p={15} paddingTop={0} flexDirection="column">
                    <SubPanelHeaderCmp 
                        title="Flow Tree JSON"
                        actionsCmp={
                            <Flex
                                flexDirection="row"
                                flexWrap="wrap"
                            >
                                <Flex
                                    marginRight="15px"
                                    paddingRight="15px"
                                    sx={{
                                        borderRight: "1px solid #c8c8c8"
                                    }}
                                >
                                    <Popover
                                        position={Position.BOTTOM_RIGHT}
                                        content={
                                            <Menu>
                                                <Menu.Group>
                                                    <Menu.Item icon={ImportIcon} onSelect={ () => this.fileInputRef.current.click() }>
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
                                                        icon={DownloadIcon}
                                                        disabled={isEmpty(flowTreeExportName) || isEmpty(flowTreeExportNodes)} 
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
                                <Flex>
                                    <CopyToClipboard disabled={isEmpty(jsonEditorContent)} text={jsonEditorContent} onCopy={() => toaster.notify("Flow tree JSON copied to clipboard!")}>
                                        <Button iconBefore={ClipboardIcon}>Copy</Button>
                                    </CopyToClipboard>
                                </Flex>
                            </Flex>
                        }
                    />
                    <AceEditor
                        width="100%"
                        height="100%"
                        mode="json"
                        theme={this.state.editorTheme.theme}
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
                    <Flex
                        flexDirection="row"
                        width="100%"
                        justifyContent="flex-end"
                        paddingTop={15}
                    >
                        <Flex
                            flexDirection="column"
                            justifyContent="center"
                            marginRight="15px"
                        >
                            <Text fontSize={12} fontWeight="bold">Editor Theme</Text>
                        </Flex>
                        { this.renderThemeList() }
                        {/* <Popover
                            position={Position.TOP_RIGHT}
                            content={this.renderThemeList()}
                            >
                                <Button iconAfter={CaretUpIcon}>{`Theme - ${this.state.editorTheme.label}`}</Button>
                            </Popover> */}
                    </Flex>
                </Flex>
            </Box>
        );
    }
}

export default JsonEditorCmp;