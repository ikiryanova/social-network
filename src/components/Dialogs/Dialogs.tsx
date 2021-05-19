import React from 'react';
import { InjectedFormProps, reduxForm } from 'redux-form';

import {createField, Textarea} from '../common/FormsControls/FormsControls';
import Dialog from './Dialog/Dialog';
import Message from './Message/Message';
import { InitialStateType } from '../../redux/dialogs-reducer';
import { reqired, maxLengthCreator } from '../../utils/validators/validators';

import './dialogs.css';

type PropsType = {
  dialogsPage: InitialStateType
  sendMessage: (messageText: string) => void
}

type NewMessageFormValuesType = {
  newMessageText: string
};

const Dialogs: React.FC<PropsType> = ({ dialogsPage, sendMessage }) => {
  const addNewMessage = (value: {newMessageText: string}) => {
    sendMessage(value.newMessageText);
  };

  return (
    <div className="dialogs-wrapper">
      <div className="dialogs-block">
        <ul className="dialogs">
          <h2 className="dialogs__title">Dialogs</h2>
          {dialogsPage.dialogs.map((dialog) => (
            <Dialog name={dialog.name} id={dialog.id} key={dialog.id} />
          ))}
        </ul>
      </div>
      <div className="messages">
        {dialogsPage.messages.map((message) => (
          <Message messageItem={message.message} key={message.id} />
        ))}
        <AddMessageFormRedux onSubmit={addNewMessage} />
      </div>
    </div>
  );
};

export default Dialogs;

type NewMessageFormValuesTypeKeys = Extract<keyof NewMessageFormValuesType, string>;
type AddMessageFormOwnProps = {};
const maxLength = maxLengthCreator(100);

const AddMessageForm: React.FC<
  InjectedFormProps<NewMessageFormValuesType, AddMessageFormOwnProps> & AddMessageFormOwnProps
> = (props) => {
  return (
    <form className="messages-form" onSubmit={props.handleSubmit}>
      {createField<NewMessageFormValuesTypeKeys>(
        'Input message',
        'newMessageText',
        [reqired, maxLength],
        Textarea,
        {},
        'messages__textarea'
      )}
      <button className="btn message-btn">Send </button>
    </form>
  );
};

const AddMessageFormRedux = reduxForm<NewMessageFormValuesType>({ form: 'dialogsAddMessageForm' })(AddMessageForm);
