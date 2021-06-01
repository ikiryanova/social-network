import React from 'react';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { AppStateType } from '../../redux/redux-store';
import { createField, GetStringKeys, Input } from '../common/FormsControls/FormsControls';
import { loginUser } from '../../redux/auth-reducer';
import { reqired, maxLengthCreator } from '../../utils/validators/validators';

import './login.css';

let maxLength = maxLengthCreator(30);

type LoginFormOwnProps = {
  captchaUrl: string | null
}

const LoginForm: React.FC<InjectedFormProps<LoginFormValuesType, LoginFormOwnProps> & LoginFormOwnProps> = ({
  handleSubmit,
  error,
  captchaUrl,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      {createField<LoginFormValuesTypeKeys>('Email', 'email', [reqired, maxLength], Input)}
      {createField<LoginFormValuesTypeKeys>('Pssword', 'password', [reqired, maxLength], Input, { type: 'password' })}
      {error && <span className="form_error">{error}</span>}
      {captchaUrl && <img src={captchaUrl} alt="captcha" />}
      {captchaUrl && createField<LoginFormValuesTypeKeys>('Symbols from image', 'captcha', [reqired], Input)}

      <label className="form-login__checkbox">
        <Field type={'checkbox'} name={'rememberMe'} component={Input} />
        <span>remember me</span>
      </label>
      <div>
        <button className="btn btn-login">Login</button>
      </div>
    </form>
  );
};

const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnProps>({form: 'login'})(LoginForm); 

type LoginFormValuesType = {
  email: string
  password: string
  rememberMe: boolean
  captcha: string
}

type LoginFormValuesTypeKeys = GetStringKeys<LoginFormValuesType>;

export const LoginPage: React.FC = () => {
  const captchaUrl = useSelector((state: AppStateType) => state.auth.captchaUrl);
  const isAuth = useSelector((state: AppStateType) => state.auth.isAuth);

  const dispatch = useDispatch();

  const onSubmit = (dataForm: LoginFormValuesType) => {
    dispatch(loginUser(dataForm.email, dataForm.password, dataForm.rememberMe, dataForm.captcha));
  };

  if (isAuth) {
    return <Redirect to={'/profile'} />;
  }

  return (
    <div>
      <h2 className="login-title">Login</h2>
      <LoginReduxForm onSubmit={onSubmit} captchaUrl={captchaUrl} />
    </div>
  );
};