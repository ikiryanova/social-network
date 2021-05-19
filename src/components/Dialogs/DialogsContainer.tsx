import { connect } from 'react-redux';
import { compose } from 'redux';

import { AppStateType } from '../../redux/redux-store';
import Dialogs from './Dialogs';
import { sendMessage } from '../../redux/dialogs-reducer';
import { withAuthRedirect } from '../hoc/withAuthRedirect';

const mapStateToProps = (state: AppStateType) => {
  return {
    dialogsPage: state.dialogsPage,
  }
};

export default compose<React.ComponentType>(
  connect(mapStateToProps, { sendMessage }),
  withAuthRedirect,
)(Dialogs);

