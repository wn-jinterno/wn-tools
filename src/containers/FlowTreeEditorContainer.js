import { connect } from "react-redux";
import * as GlobalActions from '../actions/globalActions';
import FlowTreeEditor from "../components/FlowTreeEditorCmp";

const mapStateToProps = (state , ownProps) => {
    return {
      isLoading: state.global.isLoading,
      statusMessage: state.global.statusMessage,
      flowTree: state.global.flowTreeTool.flowTree,
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {       
        setIsLoading: (isLoading) => dispatch(GlobalActions.setIsLoading(isLoading)),
        setStatusMessage: (statusMessage) => dispatch(GlobalActions.setStatusMessage(statusMessage)),
        setFlowTree: (flowTree) => dispatch(GlobalActions.setFlowTree(flowTree)),
        setJsonEditorContent: (jsonEditorContent) => dispatch(GlobalActions.setJsonEditorContent(jsonEditorContent)),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(FlowTreeEditor);