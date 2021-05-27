import React from 'react';
import { Flex, Text, Box } from 'rebass';
import styles from '../styles.module.css';

const BaseContentCmp = ({ title, description, children, ...props}) => {
    return (
        <Box
            width="100%"
            height={85}
        >
            <Flex
                p={15}
                bg='white'
                alignItems='center'
                sx={{
                    borderBottom: "1px solid #d8d8d8",
                }}
            >
                <Text p={2} fontSize={32} fontWeight='bold'>{title}</Text>
                <Box mx='auto' />
            </Flex>
            { children }
        </Box>
    );
}

export default BaseContentCmp;