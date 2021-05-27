import { CrossIcon, IconButton } from 'evergreen-ui';
import React from 'react';
import SortableTree, { getVisibleNodeCount, removeNodeAtPath } from 'react-sortable-tree';
import { Box, Flex, Heading } from 'rebass';
import styles from '../styles.module.css';
import ErrorBoundary from './ErrorBoundary';

class FlowTreeEditor extends React.Component {
    constructor(props) {
        super(props);

        // this.state = {
        //     treeData: [
        //       { title: 'processSale', children: [{ title: 'onRequestSetAmount', children: [{title: "submitAmount"}] }, { title: "onDeviceError"}] },
        //     ],
        // };
    }

    onTreeChange = (treeData) => {
        const { flowTree, setFlowTree, setJsonEditorContent } = this.props;
        setFlowTree(treeData);

        if (treeData === undefined || treeData === null || treeData.length === 0) {
            setJsonEditorContent("");
        } else {
            setJsonEditorContent(JSON.stringify(treeData, null, '\t'));
        }
    }

    onDeleteClick = (path) => {
        const { flowTree, setFlowTree, setJsonEditorContent } = this.props;
        const getNodeKey = ({ treeIndex }) => treeIndex;
        const treeData = removeNodeAtPath({
            treeData: flowTree,
            path,
            getNodeKey,
        });

        setFlowTree(treeData);
        
        if (treeData === undefined || treeData === null || treeData.length === 0) {
            setJsonEditorContent("");
        } else {
            setJsonEditorContent(JSON.stringify(treeData, null, '\t'));
        }
    }

    canDrop = ({ node, nextParent, prevPath, nextPath }) => {
        // prevents having multiple root nodes
        const { flowTree } = this.props;
        return flowTree.length === 0 || nextParent !== null;
    };

    render() {
        const { flowTree } = this.props;
        const itemCount = getVisibleNodeCount({ treeData: flowTree }) + 1;
        
        return (
            <Box height="100%" width="100%">
                <Flex height="100%" p={15} flexDirection="column">
                    <Heading p={15}>Flow Tree</Heading>
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
                </Flex>
            </Box>
        );
    }
}

export default FlowTreeEditor;