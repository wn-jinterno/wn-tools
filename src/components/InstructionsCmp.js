import { Icon, Text } from 'evergreen-ui';
import React from 'react';
import { Flex } from 'rebass';

const InstructionsCmp = ({ icon, iconColor = "#d9d9d9", textColor = "#d9d9d9", children, style = {} }) => {
    return (
        <Flex 
            flexDirection="column"
            width="100%" 
            height="100%" 
            padding={30}
            justifyContent="center"
            alignItems="center"
            sx={{
                ...style,         
            }}
        >
            {
                icon && (
                    <Flex marginBottom={20}>
                        <Icon 
                            color={iconColor} 
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
                color={textColor}
            >
                { children }
            </Text>
        </Flex>
    )
}

export default InstructionsCmp;