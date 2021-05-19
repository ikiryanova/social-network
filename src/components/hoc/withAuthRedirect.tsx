import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { AppStateType } from '../../redux/redux-store';

const mapStateToProps = (state: AppStateType) => ({
  isAuth: state.auth.isAuth,
});

type MapPropsType = { 
  isAuth: boolean
}

type DispatchPropsType = {};

export function withAuthRedirect <WCP>(WrapppedComponent: React.ComponentType<WCP>) {
  const RedirectComponent: React.FC<MapPropsType & DispatchPropsType> = (props) => {
    const { isAuth, ...restProps } = props;
    if (!isAuth) return <Redirect to="/login" />;
    return <WrapppedComponent {...restProps as WCP} />;
  };

  return connect<MapPropsType, DispatchPropsType, WCP, AppStateType>(mapStateToProps)(RedirectComponent);
}