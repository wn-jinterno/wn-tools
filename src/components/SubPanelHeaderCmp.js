import { Icon, MoreIcon, Popover, Position, Text } from "evergreen-ui";
import { Flex, Heading } from "rebass";


const SubPanelHeaderCmp = ({ title, actionsCmp }) => {
    return (
        <Flex
            flexDirection="row"
            justifyContent="space-between"
            sx={{
                padding: "15px"
            }}
        >
            <Flex flexDirection="column" justifyContent="center" alignItems="center">
                <Text fontSize="1.5rem" fontWeight="bold">{title}</Text>
            </Flex>
            <Flex flexDirection="column" justifyContent="center" alignItems="center">
                { actionsCmp }
            </Flex>
        </Flex>
    );
}

export default SubPanelHeaderCmp;