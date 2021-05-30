import * as ACTIONS from '../constants/actions';

const initialState = {
    isLoading: false,
    statusMessage: "",
    flowTreeTool: {
        availableNodes: [],
        jsonEditorContent: "",
        flowTree: [],
        flowTreeExport: {
            name: "",
            nodes: [],
        },
        parsingError: "",
        allNodesExpanded: true,
    }
};

const globalReducer = (state = initialState, action) => {
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
        case ACTIONS.SET_FLOW_TREE_EXPORT_NAME: {
            const { flowTreeExportName } = action.payload;
            return {
                ...state,
                flowTreeTool: {
                    ...state.flowTreeTool,
                    flowTreeExport: {
                        ...state.flowTreeTool.flowTreeExport,
                        name: flowTreeExportName,
                    },
                },
            }
        }
        case ACTIONS.SET_FLOW_TREE_EXPORT_NODES: {
            const { flowTreeExportNodes } = action.payload;
            return {
                ...state,
                flowTreeTool: {
                    ...state.flowTreeTool,
                    flowTreeExport: {
                        ...state.flowTreeTool.flowTreeExport,
                        nodes: flowTreeExportNodes,
                    },
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
        case ACTIONS.SET_FLOW_TREE_PARSING_ERROR: {
            const { parsingError } = action.payload;

            return {
                ...state,
                flowTreeTool: {
                    ...state.flowTreeTool,
                    parsingError,
                },
            }
        }
        case ACTIONS.TOGGLE_ALL_NODES_EXPANDED_FLAG: {
            const { allNodesExpanded } = action.payload;

            return {
                ...state,
                flowTreeTool: {
                    ...state.flowTreeTool,
                    allNodesExpanded,
                },
            }
        }
        default:
            return state;
    }
}

export default globalReducer;
