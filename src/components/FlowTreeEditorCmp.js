import { AddIcon, CrossIcon, IconButton, Switch, Text, TextInput } from 'evergreen-ui';
import React from 'react';
import SortableTree, { getFlatDataFromTree, removeNodeAtPath, toggleExpandedForAll } from 'react-sortable-tree';
import { Box, Flex } from 'rebass';
import { isEmpty } from 'underscore';
import ErrorPanelCmp from './ErrorPanelCmp';
import InstructionsCmp from './InstructionsCmp';
import SubPanelHeaderCmp from './SubPanelHeaderCmp';

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

    onFlowTreeNameChange = (e) => {
        const { setFlowTreeExportName, flowTreeExport, setJsonEditorContent } = this.props;

        const newName = e.target.value;
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
                            >
                                <Flex
                                    flexDirection="column"
                                    justifyContent="center"
                                    marginRight="5px"
                                >
                                    <Text>Tree Name</Text>
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
                                        onChange={this.onFlowTreeNameChange}
                                    />
                                </Flex>
                                <Flex
                                    flexDirection="column"
                                    justifyContent="center"
                                    marginRight="5px"
                                >
                                    <Text>Expand All</Text>
                                </Flex>
                                <Flex
                                    flexDirection="column"
                                    justifyContent="center"
                                >
                                    <Switch 
                                        disabled={isEmpty(flowTree)}
                                        checked={this.state.allNodesExpanded} 
                                        onChange={this.onExpandAllNodesSwitchChange} 
                                    />
                                </Flex>
                            </Flex>
                        }
                    />
                    {
                        isEmpty(flowTreeParsingError) ? ( 
                            <React.Fragment>
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
                                            />
                                        ],
                                    })}
                                />
                                { 
                                    isEmpty(flowTree) && (
                                        <InstructionsCmp
                                            icon={AddIcon}
                                        >
                                            Drag Nodes or Import JSON File
                                        </InstructionsCmp>
                                    )
                                }
                            </React.Fragment>
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