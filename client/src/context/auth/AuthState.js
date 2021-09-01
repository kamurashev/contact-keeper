import React, { useReducer } from 'react';
import axios from 'axios';
import setAuthToken from '../../utils/setAuthToken';
import { AuthContext } from './authContext';
import { authReducer } from './authReducer';

import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
} from '../types';

const apiPrefix = process.env.REACT_APP_API_PREFIX;

const AuthState = (props) => {
  const initialState = {
    token: localStorage.getItem('token'),
    user: null,
    isAuthenticated: null,
    loading: true,
    errors: null,
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  const register = async (regForm) => {
    const config = { headers: { 'Content-Type': 'application/json' } };
    try {
      const res = await axios.post(`${process.env.PUBLIC_URL}${apiPrefix}/users`, regForm, config);
      dispatch({ type: REGISTER_SUCCESS, payload: res.data });
      loadUser();
    } catch (err) {
      dispatch({ type: REGISTER_FAIL, payload: err.response.data.errors });
    }
  };

  const loadUser = async () => {
    const { token } = localStorage;
    if (token) {
      setAuthToken(token);
      try {
        const res = await axios.get(`${process.env.PUBLIC_URL}${apiPrefix}/auth`);
        dispatch({ type: USER_LOADED, payload: res.data });
      } catch (err) {
        dispatch({ type: AUTH_ERROR, payload: err.response.data.errors });
      }
    }
  };

  const login = async (loginForm) => {
    const config = { headers: { 'Content-Type': 'application/json' } };
    try {
      const res = await axios.post(`${process.env.PUBLIC_URL}${apiPrefix}/auth`, loginForm, config);
      dispatch({ type: LOGIN_SUCCESS, payload: res.data });
      loadUser();
    } catch (err) {
      dispatch({ type: LOGIN_FAIL, payload: err.response.data.errors });
    }
  };

  const logout = () => dispatch({ type: LOGOUT });

  const clearErrors = () => dispatch({ type: CLEAR_ERRORS });

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        errors: state.errors,
        register,
        loadUser,
        login,
        logout,
        clearErrors,
      }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export { AuthState };
