import { CrossIcon, IconButton } from 'evergreen-ui';
import React from 'react';
import SortableTree, { removeNodeAtPath } from 'react-sortable-tree';
import { Box, Heading } from 'rebass';
import styles from '../styles.module.css';
import ErrorBoundary from './ErrorBoundary';

class NodesPanelCmp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            treeData: [
                { title: "processSale" },
                { title: "onRequestSetAmount" },
                { title: "submitAmount" },
                { title: "onDeviceError" },
                { title: "onSaleResponse" },
                { title: "onError" },
            ]
        }
    }

    render() {
        const getNodeKey = ({ treeIndex }) => treeIndex;

        return (
            <Box height="100%" py={15}>
                <Heading p={15}>Nodes</Heading>
                <SortableTree
                    treeData={this.state.treeData}
                    dndType="FLOW_TREE_DND_TYPE"
                    innerStyle={{ padding: "10px"}}
                    onChange={treeData => this.setState({ treeData })}
                    shouldCopyOnOutsideDrop={true}
                    canNodeHaveChildren={node => false}
                    canDrop={node => false}
                    generateNodeProps={({ node, path }) => ({
                        buttons: [
                            <IconButton 
                                icon={CrossIcon} 
                                intent="danger" 
                                onClick={() =>
                                    this.setState(state => ({
                                        treeData: removeNodeAtPath({
                                        treeData: state.treeData,
                                        path,
                                        getNodeKey,
                                        }),
                                    }))
                                }
                            />
                        ],
                    })}
                />
            </Box>
        );
    }
}

export default NodesPanelCmp;