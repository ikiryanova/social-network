import { reset } from "redux-form";

const SEND_MESSAGE = 'SEND-MESSAGE';

let inicialState = {
  dialogs: [
    { id: '1', name: 'Alexander' },
    { id: '2', name: 'Vladimir' },
    { id: '3', name: 'Alena' },
    { id: '4', name: 'Margorita' },
    { id: '5', name: 'Roman' },
  ],
  messages: [
    {
      id: '1',
      message: 'Lorem ipsum dolor sit amet.',
    },
    {
      id: '2',
      message:
        'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fugiat totam delectus maxime et!Laudantiu laborum totam labore quo quas deleniti.',
    },
    {
      id: '3',
      message: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. ',
    },
    {
      id: '4',
      message: 'Lorem ipsum dolor sit amet ',
    },
  ],
};

const dialogsReduser = (state = inicialState, action) => {
  switch(action.type) {
    case SEND_MESSAGE: {
      return {
        ...state,
        messages: [...state.messages, { id: 5, message: action.newMessageText }],
      };
    }
    default: 
      return state;
  }
}

export default dialogsReduser;

export const sendNewMessage = (newMessageText) => ({ type: SEND_MESSAGE, newMessageText });

export const sendMessage = (newMessageText) => (dispatch) => {
  dispatch(sendNewMessage(newMessageText));
  dispatch(reset('dialogsAddMessageForm'));
};