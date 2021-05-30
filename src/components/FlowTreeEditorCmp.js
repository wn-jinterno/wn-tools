import { CrossIcon, IconButton, Switch, Text, TextInput, toaster, Tooltip } from 'evergreen-ui';
import React from 'react';
import SortableTree, { getFlatDataFromTree, removeNodeAtPath, toggleExpandedForAll, getTreeFromFlatData } from 'react-sortable-tree';
import { Box, Flex } from 'rebass';
import { has, isArray, isEmpty, isString } from 'underscore';
import ErrorPanelCmp from './ErrorPanelCmp';
import SubPanelHeaderCmp from './SubPanelHeaderCmp';
import FlowTreePlaceholderRenderer from './FlowTreePlaceholderRenderer';
import jsonlint from 'jsonlint-mod';
import TreeNodeContentRenderer from './TreeNodeContentRenderer';

class FlowTreeEditor extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            allNodesExpanded: true,
        }
        this.fileInputRef = React.createRef();
    }

    onTreeChange = (treeData) => {
        const { setFlowTree, } = this.props;
        setFlowTree(treeData);
        this.updateFlowTreeExportNodes(treeData);
    }

    updateFlowTreeExportNodes = (treeData) => {
        const { flowTreeExport, setFlowTreeExportNodes, setJsonEditorContent } = this.props;
        const flatTreeData = getFlatDataFromTree({
            treeData,
            ignoreCollapsed: false,
            getNodeKey: ({ treeIndex }) => treeIndex
        }).map(({ node, path, treeIndex }) => ({
            id: treeIndex,
            name: node.title,
            // The last entry in the path is this node's key
            // The second to last entry (accessed here) is the parent node's key
            parent: path.length > 1 ? path[path.length - 2] : null,
        }));

        setFlowTreeExportNodes(flatTreeData);

        const newTreeExportData = {
            ...flowTreeExport,
            nodes: flatTreeData,
        }
        setJsonEditorContent(JSON.stringify(newTreeExportData, null, '\t'));
    }

    onDeleteClick = (path) => {
        const { flowTree, setFlowTree } = this.props;
        const getNodeKey = ({ treeIndex }) => treeIndex;
        const treeData = removeNodeAtPath({
            treeData: flowTree,
            path,
            getNodeKey,
        });

        setFlowTree(treeData);
        this.updateFlowTreeExportNodes(treeData);
    }

    canDrop = ({ node, nextParent, prevPath, nextPath }) => {
        // prevents having multiple root nodes
        const { flowTree } = this.props;
        return flowTree.length === 0 || nextParent !== null;
    };

    onFlowTreeNameChange = (newName) => {
        const { setFlowTreeExportName, flowTreeExport, setJsonEditorContent } = this.props;
        setFlowTreeExportName(newName);

        const newTreeExportData = {
            ...flowTreeExport,
            name: newName,
        }
        setJsonEditorContent(JSON.stringify(newTreeExportData, null, '\t'));
    }

    onExpandAllNodesSwitchChange = e => {
        const { flowTree, setFlowTree } = this.props;

        this.setState({
            allNodesExpanded: e.target.checked,
        }, () => {
            const newTreeData = toggleExpandedForAll({
                treeData: flowTree,
                expanded: e.target.checked,
            })

            setFlowTree(newTreeData);
        });
    }

    onDrop = (files) => {
        if (!isEmpty(files)) {
            const fileReader = new FileReader();
            fileReader.readAsText(files[0], "UTF-8");
            fileReader.onload = e => {
                try {
                    const jsonStr = e.target.result;
                    const jsonData = jsonlint.parse(jsonStr);

                    if (has(jsonData, "name") && has(jsonData, "nodes") && isString(jsonData.name) && isArray(jsonData.nodes)) {
                        let nullParentCount = 0;
                        const newTreeFromFlatData = getTreeFromFlatData({
                            flatData: jsonData.nodes.map(node => {
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
                        
                        this.onFlowTreeNameChange(jsonData.name);
                        this.onTreeChange(newTreeFromFlatData);

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
    }

    clearAllNodes = () => {
        const { flowTree } = this.props;

        if (!isEmpty(flowTree)) {
            this.onTreeChange([]);
            toaster.notify("Flow tree nodes cleared!");
        }
    }

    render() {
        const { 
            flowTree, 
            flowTreeParsingError,
            flowTreeExportName,
         } = this.props;
        
        return (
            <Box height="100%" width="100%">
                <Flex height="100%" p={15} paddingTop={0} flexDirection="column">
                    <SubPanelHeaderCmp 
                        title="Flow Tree"
                        actionsCmp={
                            <Flex
                                flexDirection="row"
                                flexWrap="wrap"
                            >
                                <Flex
                                    flexDirection="column"
                                    justifyContent="center"
                                    marginRight="5px"
                                >
                                    <Text fontSize={12}>Tree Name</Text>
                                </Flex>
                                <Flex 
                                    marginRight="15px"
                                    paddingRight="15px"
                                    sx={{
                                        borderRight: "1px solid #c8c8c8"
                                    }}
                                >
                                    <TextInput
                                        required
                                        value={flowTreeExportName}
                                        placeholder="Enter flow tree name"
                                        onChange={e => this.onFlowTreeNameChange(e.target.value)}
                                    />
                                </Flex>
                                <Flex
                                    flexDirection="column"
                                    justifyContent="center"
                                    marginRight="5px"
                                >
                                    <Text fontSize={12}>Expand All</Text>
                                </Flex>
                                <Flex
                                    flexDirection="column"
                                    justifyContent="center"
                                    marginRight="15px"
                                    paddingRight="15px"
                                    sx={{
                                        borderRight: "1px solid #c8c8c8"
                                    }}
                                >
                                    <Switch 
                                        disabled={isEmpty(flowTree)}
                                        checked={this.state.allNodesExpanded} 
                                        onChange={this.onExpandAllNodesSwitchChange} 
                                    />
                                </Flex>
                                <Flex>
                                    <Tooltip content="Clear All">   
                                        <IconButton intent="danger" icon={CrossIcon} onClick={this.clearAllNodes} />
                                    </Tooltip>
                                </Flex>
                            </Flex>
                        }
                    />
                    {
                        isEmpty(flowTreeParsingError) ? ( 
                            <SortableTree
                                innerStyle={{ padding: "10px"}}
                                treeData={flowTree}
                                dndType="FLOW_TREE_DND_TYPE"
                                onChange={this.onTreeChange}
                                canDrop={this.canDrop}
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
                                placeholderRenderer={({ isOver, canDrop }) => (
                                    <FlowTreePlaceholderRenderer
                                        onDrop={this.onDrop}
                                        isOver={isOver}
                                        canDrop={canDrop}
                                    />
                                )}

                            />
                        )
                        :
                        (
                            <ErrorPanelCmp errorMessage={flowTreeParsingError} />
                        )
                    }
                </Flex>
            </Box>
        );
    }
}

export default FlowTreeEditor;