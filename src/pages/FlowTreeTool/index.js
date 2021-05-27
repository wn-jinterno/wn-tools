import { connect } from "react-redux";
import * as GlobalActions from '../../actions/globalActions';
import FlowTreeTool from './FlowTreeTool';

const mapStateToProps = (state , ownProps) => {
    return {
      isLoading: state.global.isLoading,
      statusMessage: state.global.statusMessage,
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {       
        setIsLoading: (isLoading) => dispatch(GlobalActions.setIsLoading(isLoading)),
        setStatusMessage: (statusMessage) => dispatch(GlobalActions.setStatusMessage(statusMessage)),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(FlowTreeTool);