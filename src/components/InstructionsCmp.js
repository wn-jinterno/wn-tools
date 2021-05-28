import { Icon, Text } from 'evergreen-ui';
import React from 'react';
import { Flex } from 'rebass';

const InstructionsCmp = ({ icon, children }) => {
    return (
        <Flex 
            flexDirection="column"
            width="100%" 
            height="100%" 
            padding={30}
            justifyContent="center"
            alignItems="center"
        >
            {
                icon && (
                    <Flex marginBottom={20}>
                        <Icon 
                            color="#c5c5c5" 
                            icon={icon} 
                            size={50}
                        />
                    </Flex>
                )
            }
            <Text 
                fontSize={24} 
                fontWeight="bold" 
                textAlign="center" 
                lineHeight={1.5}
                color="#c5c5c5"
            >
                { children }
            </Text>
        </Flex>
    )
}

export default InstructionsCmp;