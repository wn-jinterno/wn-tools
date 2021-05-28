import { connect } from "react-redux";
import * as GlobalActions from '../actions/globalActions';
import JsonEditorCmp from "../components/JsonEditorCmp";

const mapStateToProps = (state , ownProps) => {
    return {
      isLoading: state.global.isLoading,
      statusMessage: state.global.statusMessage,
      flowTree: state.global.flowTreeTool.flowTree,
      flowTreeExport: state.global.flowTreeTool.flowTreeExport,
      flowTreeExportName: state.global.flowTreeTool.flowTreeExport.name,
      flowTreeExportNodes: state.global.flowTreeTool.flowTreeExport.nodes,
      jsonEditorContent: state.global.flowTreeTool.jsonEditorContent,
      ...ownProps,
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {       
        setIsLoading: (isLoading) => dispatch(GlobalActions.setIsLoading(isLoading)),
        setStatusMessage: (statusMessage) => dispatch(GlobalActions.setStatusMessage(statusMessage)),
        setFlowTree: (flowTree) => dispatch(GlobalActions.setFlowTree(flowTree)),
        setFlowTreeParsingError: (flowTreeParsingError) => dispatch(GlobalActions.setFlowTreeParsingError(flowTreeParsingError)),
        setFlowTreeExportName: (flowTreeExportName) => dispatch(GlobalActions.setFlowTreeExportName(flowTreeExportName)),
        setFlowTreeExportNodes: (flowTreeExportNodes) => dispatch(GlobalActions.setFlowTreeExportNodes(flowTreeExportNodes)),
        setJsonEditorContent: (jsonEditorContent) => dispatch(GlobalActions.setJsonEditorContent(jsonEditorContent)),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(JsonEditorCmp);