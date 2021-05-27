import { CrossIcon, IconButton } from 'evergreen-ui';
import React from 'react';
import SortableTree, { removeNodeAtPath } from 'react-sortable-tree';
import { Box, Heading } from 'rebass';
import styles from '../styles.module.css';
import ErrorBoundary from './ErrorBoundary';

class NodesPanelCmp extends React.Component {
    constructor(props) {
        super(props);
    }

    onTreeChange = (treeData) => {
        const { setAvailableNodes } = this.props;
        setAvailableNodes(treeData);
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

    render() {
        const { availableNodes } = this.props;

        return (
            <Box height="100%" py={15}>
                <Heading p={15}>Nodes</Heading>
                <SortableTree
                    treeData={availableNodes}
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
            </Box>
        );
    }
}

export default NodesPanelCmp;