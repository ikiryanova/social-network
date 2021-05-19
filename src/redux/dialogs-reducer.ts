import { FormAction, reset } from "redux-form";
import { BaseThunkType, InferActionsType } from "./redux-store";

type DialogType = {
  id: number
  name: string
};

type MessageType = {
  id: number
  message: string
};

let initialState = {
  dialogs: [
    { id: 1, name: 'Alexander' },
    { id: 2, name: 'Vladimir' },
    { id: 3, name: 'Alena' },
    { id: 4, name: 'Margorita' },
    { id: 5, name: 'Roman' },
  ] as Array<DialogType>,
  messages: [
    {
      id: 1,
      message: 'Lorem ipsum dolor sit amet.',
    },
    {
      id: 2,
      message:
        'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fugiat totam delectus maxime et!Laudantiu laborum totam labore quo quas deleniti.',
    },
    {
      id: 3,
      message: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. ',
    },
    {
      id: 4,
      message: 'Lorem ipsum dolor sit amet ',
    },
  ] as Array<MessageType>,
};

export type InitialStateType = typeof initialState;

const dialogsReducer = (state = initialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case 'SEND_MESSAGE': {
      return {
        ...state,
        messages: [...state.messages, { id: 5, message: action.newMessageText }]
      };
    }
    default:
      return state;
  }
};

export default dialogsReducer;

export const actions = {
  sendNewMessage: (newMessageText: string) => ({ type: 'SEND_MESSAGE', newMessageText } as const),
};

type ActionsType = InferActionsType<typeof actions>;
type ThunkType = BaseThunkType<ActionsType | FormAction>;

export const sendMessage = (newMessageText: string): ThunkType => async(dispatch) => {
  dispatch(actions.sendNewMessage(newMessageText));
  dispatch(reset('dialogsAddMessageForm'));
};