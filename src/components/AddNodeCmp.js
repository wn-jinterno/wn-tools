import { Button, Dialog, IconButton, PlusIcon, TextInputField, Tooltip } from 'evergreen-ui';
import React from 'react';
import { Box, Flex } from 'rebass';

const AddNodeCmp = ({ onAddNode }) => {
    const [isShown, setIsShown] = React.useState(false);
    const [nodeNameVal, setNodeNameVal] = React.useState('');


    const onDialogClose = () => {
        setNodeNameVal("");
        setIsShown(false)
    }

    const onAddBtnClick = () => {
        onAddNode(nodeNameVal);
        onDialogClose();
    };

    return (
        <Box 
            marginRight="5px"
        >
            <Dialog
                isShown={isShown}
                title="Add Node"
                onCloseComplete={onDialogClose}
                hasFooter={false}
            >
                <Flex width="100%" flexDirection="column" paddingBottom={15}>
                    <TextInputField
                        required
                        label="Node name"
                        value={nodeNameVal}
                        onChange={e => setNodeNameVal(e.target.value)}
                    />
                    <Flex flexDirection="row" marginTop={15} justifyContent="flex-end">
                        <Button 
                            marginRight={15} 
                            intent="danger"
                            onClick={onDialogClose}
                        >
                            Cancel
                        </Button>
                        <Button onClick={onAddBtnClick}>Add</Button>
                    </Flex>
                </Flex>
            </Dialog>
            <Tooltip content="Add Node">
                <IconButton icon={PlusIcon} onClick={() => setIsShown(true)} />
            </Tooltip>
        </Box>
    )
}

export default AddNodeCmp;