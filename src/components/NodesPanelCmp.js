import { AddIcon, Button, CaretDownIcon, CrossIcon, DownloadIcon, IconButton, ImportIcon, Menu, Popover, Position, toaster, Tooltip } from 'evergreen-ui';
import React from 'react';
import SortableTree, { removeNodeAtPath } from 'react-sortable-tree';
import { Box, Flex } from 'rebass';
import { has, isArray, isEmpty } from 'underscore';
import AddNodeCmp from './AddNodeCmp';
import SubPanelHeaderCmp from './SubPanelHeaderCmp';
import jsonlint from 'jsonlint-mod';
import { exportDataToJsonFile } from '../utils';
import FileDropZone from './FileDropZone';
import InstructionsCmp from './InstructionsCmp';
import TreeNodeContentRenderer from './TreeNodeContentRenderer';

class NodesPanelCmp extends React.Component {
    constructor(props) {
        super(props);

        this.fileInputRef = React.createRef();
    }

    onTreeChange = (treeData) => {
        const { setAvailableNodes } = this.props;

        const newTreeData = treeData.map(({ title }) => ({
            name: title,
        }));
        setAvailableNodes(newTreeData);
    }

    onDeleteClick = (path) => {
        const { availableNodes, setAvailableNodes } = this.props;
        const getNodeKey = ({ treeIndex }) => treeIndex;
        const treeData = removeNodeAtPath({
            treeData: availableNodes,
            path,
            getNodeKey,
        });

        setAvailableNodes(treeData);
    }


    onAddNode = (nodeName) => {
        const { availableNodes, setAvailableNodes } = this.props;

        const treeData = availableNodes.concat({
            name: nodeName
        });

        setAvailableNodes(treeData);
    }

    getAvailableNodes = () => {
        const { availableNodes } = this.props;
        
        if (isEmpty(availableNodes)) {
            return [];
        } else {
            return availableNodes.map(({ name }) => ({
                title: name,
            }));
        }
    }

    handleFileUpload = (e) => {
        this.readJSONFileContent(e.target.files[0]);
    }

    readJSONFileContent = file => {
        const { setAvailableNodes } = this.props;
        const fileReader = new FileReader();
        fileReader.readAsText(file, "UTF-8");
        fileReader.onload = e => {
            try {
                const jsonData = jsonlint.parse(e.target.result);
                if (has(jsonData, "availableNodes") && isArray(jsonData.availableNodes)) {
                    setAvailableNodes(jsonData.availableNodes);
                    toaster.success("File has been read successfully!");
                } else {
                    throw new Error(`JSON format must be: { "availableNodes": [] }`);
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
        const { availableNodes } = this.props;
        const jsonData = {
            availableNodes,
        };

        exportDataToJsonFile({ fileName: "flow-tree-available-nodes", jsonData });
    }

    onDrop = (files) => {
        if (!isEmpty(files)) {
            this.readJSONFileContent(files[0]);
        }
    }

    clearAllNodes = () => {
        const { availableNodes, setAvailableNodes } = this.props;
    
        if (!isEmpty(availableNodes)) {
            setAvailableNodes([]);
            toaster.notify("Available nodes cleared!");
        }
    }

    render() {
        const { availableNodes } = this.props;

        return (
            <Box width="100%" height="100%">
                <Flex height="100%" p={15} paddingTop={0} flexDirection="column">
                    <SubPanelHeaderCmp 
                        title="Nodes"
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
                                                        disabled={isEmpty(availableNodes)} 
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
                                <AddNodeCmp onAddNode={this.onAddNode} />
                                <Flex>
                                    <Tooltip content="Clear All">   
                                        <IconButton intent="danger" icon={CrossIcon} onClick={this.clearAllNodes} />
                                    </Tooltip>
                                </Flex>
                            </Flex>
                        }
                    />
                     {
                        isEmpty(availableNodes) ? (
                            <FileDropZone  onDrop={this.onDrop}>
                                <InstructionsCmp
                                    icon={AddIcon}
                                >
                                    Add Nodes or Import JSON File
                                </InstructionsCmp>
                            </FileDropZone>
                        )
                        :
                        (
                            <SortableTree
                                treeData={this.getAvailableNodes()}
                                dndType="FLOW_TREE_DND_TYPE"
                                innerStyle={{ padding: "10px"}}
                                onChange={this.onTreeChange}
                                shouldCopyOnOutsideDrop={true}
                                canNodeHaveChildren={node => false}
                                canDrop={node => false}
                                generateNodeProps={({ node, path }) => ({
                                    buttons: [
                                        <IconButton 
                                            icon={CrossIcon} 
                                            intent="danger" 
                                            onClick={() => this.onDeleteClick(path)}
                                            style={{
                                                border: "none"
                                            }}
                                        />
                                    ],
                                })}
                                nodeContentRenderer={TreeNodeContentRenderer}
                            />
                        )
                    }
                </Flex>
            </Box>
        );
    }
}

export default NodesPanelCmp;