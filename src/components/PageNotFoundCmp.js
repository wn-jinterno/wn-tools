import { HomeIcon, Button } from 'evergreen-ui';
import React from 'react';
import { Link } from 'react-router-dom';
import { Flex, Text } from 'rebass';

const PageNotFoundCmp = () => {
    return (
        <Flex 
            width="100%"
            height="100%"
            sx={{
                position: "fixed",
                top: 0,
                left: 0
            }}
        >
            <Flex
                width="100%"
                height="100%"
                justifyContent="center"
                alignItems="center"
            >
                <Flex 
                    flexDirection="column" 
                    justifyContent="center" 
                    alignItems="center"
                >
                    <Text fontSize="3em">¯\_(ツ)_/¯</Text>
                    <Text fontSize="12em">404</Text>
                    <Text fontSize="1.5em">The page does not exist.</Text>
                    <Link to="/" style={{ textDecoration: "none", color: "black", padding: "15px"}}>
                        <Button iconBefore={HomeIcon} size="large" marginRight={10}>
                            Go Home
                        </Button>
                    </Link>
                </Flex>
            </Flex>
        </Flex>
    );
}

export default PageNotFoundCmp;