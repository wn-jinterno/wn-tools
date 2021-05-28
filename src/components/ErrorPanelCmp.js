import { Text } from 'evergreen-ui';
import React from 'react';
import { Flex } from 'rebass';

const ErrorPanelCmp = ({ errorMessage }) => {
    return (
        <Flex 
            flexDirection="column"
            width="100%" 
            height="100%" 
            padding={30}
            backgroundColor="#FFCCCC"
        >
            <Flex marginBottom={50}>
                <Text 
                    color="#cc0000"
                    fontSize="2em"
                >
                    ERROR
                </Text>
            </Flex>
            <Flex>
                <Text
                    color="#cc0000"
                    lineHeight="1em"
                    fontSize="1em"
                >
                    {errorMessage}
                </Text>
            </Flex>
        </Flex>
    )
}

export default ErrorPanelCmp;