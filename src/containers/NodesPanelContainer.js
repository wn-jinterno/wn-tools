import { connect } from "react-redux";
import * as GlobalActions from '../actions/globalActions';
import NodesPanelCmp from "../components/NodesPanelCmp";

const mapStateToProps = (state , ownProps) => {
    return {
      isLoading: state.global.isLoading,
      statusMessage: state.global.statusMessage,
      availableNodes: state.global.flowTreeTool.availableNodes,
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {       
        setIsLoading: (isLoading) => dispatch(GlobalActions.setIsLoading(isLoading)),
        setStatusMessage: (statusMessage) => dispatch(GlobalActions.setStatusMessage(statusMessage)),
        setAvailableNodes: (availableNodes) => dispatch(GlobalActions.setAvailableNodes(availableNodes)),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(NodesPanelCmp);