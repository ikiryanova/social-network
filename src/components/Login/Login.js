import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { loginUser } from '../../redux/auth-reduser';
import { createField, Input } from '../common/FormsControls/FormsControls';
import { reqired, maxLengthCreator } from '../../utils/validators/validators';
import './login.css';
import { Redirect } from 'react-router-dom';

let maxLength = maxLengthCreator(30);

const LoginForm = ({ handleSubmit, error, captchaUrl }) => {
  return (
    <form onSubmit={handleSubmit}>
      {createField('Email', 'email', [reqired, maxLength], Input)}
      {createField('Pssword', 'password', [reqired, maxLength], Input, { type: 'password' })}
      {error && <span className="form_error">{error}</span>}
      {captchaUrl && <img src={captchaUrl} alt="captcha" />}
      {captchaUrl && createField('Symbols from image', 'captcha', [reqired], Input, {})}

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

const LoginReduxForm = reduxForm({form: 'login'})(LoginForm); 

const Login = ({ loginUser, isAuth, captchaUrl }) => {
  const onSubmit = (dataForm) => {
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

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
  captchaUrl: state.auth.captchaUrl
})


export default connect(mapStateToProps, { loginUser })(Login);