import { Text } from "evergreen-ui";
import { Flex } from "rebass";


const SubPanelHeaderCmp = ({ title, actionsCmp }) => {
    return (
        <Flex
            flexDirection="row"
            justifyContent="space-between"
            sx={{
                padding: "15px",
                paddingLeft: 0,
                paddingRight: 0
            }}
        >
            <Flex flexDirection="column" justifyContent="center" alignItems="center">
                <Text fontSize="1.1rem" fontWeight="bold">{title}</Text>
            </Flex>
            <Flex flexDirection="column" justifyContent="center" alignItems="center">
                { actionsCmp }
            </Flex>
        </Flex>
    );
}

export default SubPanelHeaderCmp;