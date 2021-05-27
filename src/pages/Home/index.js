import { connect } from "react-redux";
import * as GlobalActions from '../../actions/globalActions';
import Home from './Home';

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
)(Home);