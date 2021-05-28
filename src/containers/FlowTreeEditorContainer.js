import { connect } from "react-redux";
import * as GlobalActions from '../actions/globalActions';
import FlowTreeEditor from "../components/FlowTreeEditorCmp";

const mapStateToProps = (state , ownProps) => {
    return {
      isLoading: state.global.isLoading,
      statusMessage: state.global.statusMessage,
      flowTree: state.global.flowTreeTool.flowTree,
      flowTreeParsingError: state.global.flowTreeTool.parsingError,
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
        setFlowTreeExportName: (flowTreeExportName) => dispatch(GlobalActions.setFlowTreeExportName(flowTreeExportName)),
        setFlowTreeExportNodes: (flowTreeExportNodes) => dispatch(GlobalActions.setFlowTreeExportNodes(flowTreeExportNodes)),
        setJsonEditorContent: (jsonEditorContent) => dispatch(GlobalActions.setJsonEditorContent(jsonEditorContent)),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(FlowTreeEditor);