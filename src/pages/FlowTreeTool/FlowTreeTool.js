import React, { Component } from 'react';
import { Flex, Heading, Link, Box } from 'rebass';
import BaseContentCmp from '../../components/BaseContentCmp';
import FlowTreeEditorContainer from '../../containers/FlowTreeEditorContainer';
import JsonEditorContainer from '../../containers/JsonEditorContainer';
import NodesPanelContainer from '../../containers/NodesPanelContainer';

export default class FlowTreeTool extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <BaseContentCmp title="Flow Tree Generator" withLinkToHome>
                <Flex
                    width="100%"
                    height="100%"
                    paddingTop={85}
                    sx={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                    }}
                >
                    <Box
                        width={2/8}
                        sx={{
                            borderRight: "1px solid #d8d8d8"
                        }}
                    >
                        <NodesPanelContainer />
                    </Box>
                    <Box
                        width={4/8}
                    >
                        <FlowTreeEditorContainer />
                    </Box>
                    <Box
                        width={2/8}
                    >
                        <JsonEditorContainer />
                    </Box>
                </Flex>
            </BaseContentCmp>
        )
    }
}