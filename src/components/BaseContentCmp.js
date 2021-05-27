import { ArrowLeftIcon } from 'evergreen-ui';
import React from 'react';
import { Link } from 'react-router-dom';
import { Flex, Text, Box } from 'rebass';
import styles from '../styles.module.css';

const BaseContentCmp = ({ title, description, withLinkToHome, children, ...props}) => {
    return (
        <Box
            width="100%"
            height="100%"
        >
            <Flex
                width="100%"
                height={85}
                p={15}
                bg='white'
                alignItems='center'
                sx={{
                    borderBottom: "1px solid #d8d8d8",
                    position: "absolute",
                    top: 0,
                    left: 0,
                    zIndex: 1,
                }}
            >
                {
                    withLinkToHome && (
                        <Flex marginRight={15}>
                            <Link to="/" style={{ textDecoration: "none", color: "#6D6D6D"}}>
                                <ArrowLeftIcon size={32} />
                            </Link>
                        </Flex>
                    )
                }
                <Text p={2} fontSize={32} fontWeight='bold'>{title}</Text>
                <Box mx='auto' />
            </Flex>
            <Flex
                width="100%"
                height="100%"
                sx={{
                    paddingTop: "85px"
                }}
            >

                { children }
            </Flex>
        </Box>
    );
}

export default BaseContentCmp;