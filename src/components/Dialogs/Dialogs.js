import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { reqired, maxLengthCreator } from '../../utils/validators/validators';
import {Textarea} from '../common/FormsControls/FormsControls';
import Dialog from './Dialog/Dialog';
import Message from './Message/Message';
import './dialogs.css';


const Dialogs = ({ dialogsPage, sendMessage }) => {

  const addNewMessage = (value) => {
    sendMessage(value.newMessageText);
  }

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
        <AddMessageFormRedux onSubmit={addNewMessage}/>
      </div>
    </div>
  );
};

export default Dialogs;

const maxLength = maxLengthCreator(100);

const  AddMessageForm = (props) => {
  return (
    <form className="messages-form" onSubmit={props.handleSubmit}>
      <Field
        component={Textarea}
        validate={[reqired, maxLength]}
        name={'newMessageText'}
        placeholder={'Input message'}
        className="messages__textarea"
      />
      <button className="btn message-btn">Send </button>
    </form>
  );
}

const AddMessageFormRedux = reduxForm({ form: 'dialogsAddMessageForm' })(AddMessageForm);
