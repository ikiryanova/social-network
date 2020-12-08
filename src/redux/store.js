import dialogsReduser from "./dialogs-reduser";
import profileReduser from "./profile-reduser";

let store = {
  _state: {
    profilePage: {
      posts: [
        { id: '1', post: 'Hello world!!!' },
        { id: '2', post: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit.' },
        {
          id: '3',
          post:
            'Lorem ipsum, dolor sit amet consectetur adipisicing elit. A odit neque expedita quos saepe magni? Quas voluptatum nisi autem voluptatem totam ad aspernatur quibusdam? Asperiores accusamus ea aut dolore, nostrum doloremque tempore quaerat deleniti eius sed nulla deserunt veniam corrupti ullam odit facilis delectus aperiam error. Perspiciatis necessitatibus cum incidunt.',
        },
        {
          id: '4',
          post:
            'Lorem ipsum, dolor sit amet consectetur adipisicing elit. A odit neque expedita quos saepe magni? Quas voluptatum nisi autem voluptatem totam ad aspernatur quibusdam? Asperiores accusamus ea aut dolore, nostrum doloremque.',
        },
      ],
      newPostText: '',
    },

    dialogsPage: {
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
      newMessageText: '',
    }
  },

  _renderEntireTree() {},

  getState() {
    return this._state;
  },

  subscribe(observer) {
    this._renderEntireTree = observer;
  },

  dispatch(action) {
    this._state.profilePage = profileReduser(this._state.profilePage, action);
    this._state.dialogsPage = dialogsReduser(this._state.dialogsPage, action);
    this._renderEntireTree(this._state);
  },

}

export default store;





 