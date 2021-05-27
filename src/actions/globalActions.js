import * as ACTIONS from '../constants/actions';


export const resetState = () => ({
    type: ACTIONS.RESET_STATE
});

export const setStatusMessage = statusMessage => ({
    type: ACTIONS.SET_STATUS_MESSAGE,
    payload: {
        statusMessage
    }
});

export const setIsLoading = isLoading => ({
    type: ACTIONS.SET_IS_LOADING,
    payload: {
        isLoading
    }
});

export const setFlowTree = flowTree => ({
    type: ACTIONS.SET_FLOW_TREE,
    payload: {
        flowTree
    }
});

export const setAvailableNodes = availableNodes => ({
    type: ACTIONS.SET_AVAILABLE_NODES,
    payload: {
        availableNodes
    }
});

export const setJsonEditorContent = jsonEditorContent => ({
    type: ACTIONS.SET_JSON_EDITOR_CONTENT,
    payload: {
        jsonEditorContent
    }
});