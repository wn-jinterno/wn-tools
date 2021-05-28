import { AddIcon, Button, CaretDownIcon, CrossIcon, DownloadIcon, IconButton, ImportIcon, Menu, Popover, Position, Text, toaster } from 'evergreen-ui';
import React from 'react';
import SortableTree, { removeNodeAtPath } from 'react-sortable-tree';
import { Box, Flex, Heading } from 'rebass';
import { has, isArray, isEmpty } from 'underscore';
import styles from '../styles.module.css';
import AddNodeCmp from './AddNodeCmp';
import SubPanelHeaderCmp from './SubPanelHeaderCmp';
import jsonlint from 'jsonlint-mod';
import { exportDataToJsonFile } from '../utils';
import InstructionsCmp from './InstructionsCmp';

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
        const { setAvailableNodes } = this.props;

        const fileReader = new FileReader();
        fileReader.readAsText(e.target.files[0], "UTF-8");
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
                            >
                                <AddNodeCmp onAddNode={this.onAddNode} />
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
                        }
                    />
                    {
                        isEmpty(availableNodes) ? (
                            <InstructionsCmp
                                icon={AddIcon}
                            >
                                Add Nodes or Import JSON File
                            </InstructionsCmp>
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
                                        />
                                    ],
                                })}
                            />
                        )
                    }
                </Flex>
            </Box>
        );
    }
}

export default NodesPanelCmp;