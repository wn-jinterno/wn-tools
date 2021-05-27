import * as ACTIONS from '../constants/actions';

const initialState = {
    isLoading: false,
    statusMessage: "",
    flowTreeTool: {
        availableNodes: [],
        jsonEditorContent: "",
        flowTree: []
    }
};

export default function(state = initialState, action) {
    switch (action.type) {
        case ACTIONS.RESET_STATE: {
            return {
                ...initialState,
            };
        }
        case ACTIONS.SET_STATUS_MESSAGE: {
            const { statusMessage } = action.payload;
    
            return {
                ...state,
                statusMessage,
            }
        }
        case ACTIONS.SET_IS_LOADING: {
            const { isLoading } = action.payload;
    
            return {
                ...state,
                isLoading,
            }
        }
        case ACTIONS.SET_FLOW_TREE: {
            const { flowTree } = action.payload;
            return {
                ...state,
                flowTreeTool: {
                    ...state.flowTreeTool,
                    flowTree,
                },
            }
        }
        case ACTIONS.SET_AVAILABLE_NODES: {
            const { availableNodes } = action.payload;

            return {
                ...state,
                flowTreeTool: {
                    ...state.flowTreeTool,
                    availableNodes,
                },
            }
        }
        case ACTIONS.SET_JSON_EDITOR_CONTENT: {
            const { jsonEditorContent } = action.payload;

            return {
                ...state,
                flowTreeTool: {
                    ...state.flowTreeTool,
                    jsonEditorContent,
                },
            }
        }
        default:
            return state;
    }
}


