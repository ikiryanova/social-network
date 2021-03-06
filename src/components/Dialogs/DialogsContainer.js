import { connect } from 'react-redux';
import { compose } from 'redux';
import { sendMessage } from '../../redux/dialogs-reduser';
import { withAuthRedirect } from '../hoc/withAuthRedirect';
import Dialogs from './Dialogs';

const mapStateToProps = (state) => {
  return {
    dialogsPage: state.dialogsPage,
  }
}

export default compose(
  connect(mapStateToProps, { sendMessage }),
  withAuthRedirect,
)(Dialogs);
;
