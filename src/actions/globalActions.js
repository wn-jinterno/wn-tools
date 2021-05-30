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

export const setFlowTreeExportName = flowTreeExportName => ({
    type: ACTIONS.SET_FLOW_TREE_EXPORT_NAME,
    payload: {
        flowTreeExportName
    }
});

export const setFlowTreeExportNodes = flowTreeExportNodes => ({
    type: ACTIONS.SET_FLOW_TREE_EXPORT_NODES,
    payload: {
        flowTreeExportNodes
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

export const setFlowTreeParsingError = parsingError => ({
    type: ACTIONS.SET_FLOW_TREE_PARSING_ERROR,
    payload: {
        parsingError
    }
});

export const toggleAllNodesExpandedFlag = allNodesExpanded => ({
    type: ACTIONS.TOGGLE_ALL_NODES_EXPANDED_FLAG,
    payload: {
        allNodesExpanded,
    }
})