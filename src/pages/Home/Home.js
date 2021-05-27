import React, { Component } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Flex, Heading, Link, Box } from 'rebass';
import BaseContentCmp from '../../components/BaseContentCmp';
import { Avatar } from 'evergreen-ui';

export default class Home extends Component {
    constructor(props) {
        super(props);
    }

    renderToolIcons = () => {
        const toolLists = [
            {
                "name": "Flow Tree Tool",
                "link": "/flowtreetool",
            },
            {
                "name": "Test Tool 1",
                "link": "/testtool1",
            },
            {
                "name": "Test Tool 2",
                "link": "/testtool2",
            },
            {
                "name": "Test Tool 3",
                "link": "/testtool3",
            }
        ];

        return (
            <Flex
                width="100%"
                flexDirection="row"
                flexWrap="wrap"
                justifyContent="space-between"
            >
                {toolLists.map((tool, idx) => (
                    <Flex
                        key={tool.name}
                        my={15}
                        mx={15}
                        borderRadius={32}
                        width={150}
                    >
                        <RouterLink 
                            style={{ fontSize: "0.9rem", width: "100%", textDecoration: "none", color:  "black"}}
                            to={tool.link}
                        >
                            <Box width="100%">
                                <Box 
                                    width="100%" 
                                    height={150}>
                                    <Avatar name={tool.name} size={150} />
                                </Box>
                                <Flex
                                    width="100%"
                                    justifyContent="center"
                                    p={15}
                                >
                                    { tool.name } 
                                </Flex>
                            </Box>
                        </RouterLink>
                    </Flex>
                ))}
            </Flex>
        );
    }
    
    render() {
        return (
            <BaseContentCmp title="Home">
                <Flex
                    width="100%"
                    px="25%"
                    py={30}
                    alignItems='center'
                >
                    { this.renderToolIcons() }
                </Flex>
            </BaseContentCmp>
        )
    }
}