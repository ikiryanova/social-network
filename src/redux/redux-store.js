import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { reducer as formReducer } from 'redux-form';
import authReduser from './auth-reduser';
import dialogsReduser from './dialogs-reduser';
import profileReduser from './profile-reduser';
import usersReduser from './users-reduser';
import appReduser from './app-reduser';

let redusers = combineReducers({
  profilePage: profileReduser,
  dialogsPage: dialogsReduser,
  usersPage: usersReduser,
  auth: authReduser,
  app: appReduser,
  form: formReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(redusers, composeEnhancers(applyMiddleware(thunkMiddleware)));

export default store;