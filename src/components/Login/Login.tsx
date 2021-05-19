import React from 'react';
import { connect } from 'react-redux';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { Redirect } from 'react-router-dom';

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

type MapStatePropsType = {
  captchaUrl: string | null
  isAuth: boolean
};

type MapDispatchPropsType = {
  loginUser: (email: string, password: string, rememberMe: boolean, captcha: string) => void
};

type LoginFormValuesType = {
  email: string
  password: string
  rememberMe: boolean
  captcha: string
}

type LoginFormValuesTypeKeys = GetStringKeys<LoginFormValuesType>;

const Login: React.FC<MapStatePropsType & MapDispatchPropsType> = ({ loginUser, isAuth, captchaUrl }) => {
  const onSubmit = (dataForm: any) => {
    loginUser(dataForm.email, dataForm.password, dataForm.remeberMe, dataForm.captcha);
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

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
  isAuth: state.auth.isAuth,
  captchaUrl: state.auth.captchaUrl
})

export default connect(mapStateToProps, { loginUser })(Login);