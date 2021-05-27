import { connect } from "react-redux";
import * as GlobalActions from '../actions/globalActions';
import JsonEditorCmp from "../components/JsonEditorCmp";

const mapStateToProps = (state , ownProps) => {
    return {
      isLoading: state.global.isLoading,
      statusMessage: state.global.statusMessage,
      jsonEditorContent: state.global.flowTreeTool.jsonEditorContent,
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {       
        setIsLoading: (isLoading) => dispatch(GlobalActions.setIsLoading(isLoading)),
        setStatusMessage: (statusMessage) => dispatch(GlobalActions.setStatusMessage(statusMessage)),
        setJsonEditorContent: (jsonEditorContent) => dispatch(GlobalActions.setJsonEditorContent(jsonEditorContent)),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(JsonEditorCmp);