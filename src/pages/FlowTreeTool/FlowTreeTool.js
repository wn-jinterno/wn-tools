import React from 'react';
import { Flex, Box } from 'rebass';
import BaseContentCmp from '../../components/BaseContentCmp';
import FlowTreeEditorContainer from '../../containers/FlowTreeEditorContainer';
import JsonEditorContainer from '../../containers/JsonEditorContainer';
import NodesPanelContainer from '../../containers/NodesPanelContainer';

const FlowTreeTool = () => {
    return (
        <BaseContentCmp 
            title="Flow Tree Generator" 
            withLinkToHome
        >
            <Flex
                width="100%"
                height="100%"
                paddingTop={60}
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
                    sx={{
                        borderRight: "1px solid #d8d8d8"
                    }}
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

export default FlowTreeTool;