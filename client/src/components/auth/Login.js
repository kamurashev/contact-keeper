import React, { useState, useContext, useEffect } from 'react';
import { useValidator } from '../../validation/useValidator';
import { LOGIN } from '../../validation/types';
import { AuthContext } from '../../context/auth/authContext';
import { AlertContext } from '../../context/alert/alertContext';

const Login = (props) => {
  const { login, isAuthenticated, errors, clearErrors } =
    useContext(AuthContext);
  const { setAlert } = useContext(AlertContext);
  const validate = useValidator(LOGIN);

  useEffect(() => {
    isAuthenticated && props.history.push('/');
    errors && errors.map((err) => setAlert(err.msg, 'danger'));
    clearErrors();
    // eslint-disable-next-line
  }, [errors, isAuthenticated, props.history]);

  const [creds, setCreds] = useState({
    email: '',
    pwd: '',
  });

  const { email, pwd } = creds;

  const onChange = (e) => setCreds({ ...creds, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    validate(creds) && login({ email, password: pwd });
  };

  return (
    <div className='form-container'>
      <h1>
        Account
        <span className='text-primary'> Login</span>
      </h1>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='email'>Email</label>
          <input type='email' name='email' value={email} onChange={onChange} />
        </div>
        <div className='form-group'>
          <label htmlFor='pwd'>Password</label>
          <input type='password' name='pwd' value={pwd} onChange={onChange} />
        </div>
        <input
          type='submit'
          value='Log In'
          className='btn btn-primary btn-block'
        />
      </form>
    </div>
  );
};

export default Login;
