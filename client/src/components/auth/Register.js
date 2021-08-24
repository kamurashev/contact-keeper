import React, { useContext, useState, useEffect } from 'react';
import { useValidator } from '../../validation/useValidator';
import { REGISTER } from '../../validation/types';
import { AuthContext } from '../../context/auth/authContext';
import { AlertContext } from '../../context/alert/alertContext';

const Register = (props) => {
  const { register, isAuthenticated, errors, clearErrors } =
    useContext(AuthContext);
  const { setAlert } = useContext(AlertContext);
  const validate = useValidator(REGISTER);

  useEffect(() => {
    isAuthenticated && props.history.push('/');
    errors && errors.map((err) => setAlert(err.msg, 'danger'));
    clearErrors();
    // eslint-disable-next-line
  }, [errors, isAuthenticated, props.history]);

  const [user, setUser] = useState({
    name: '',
    email: '',
    pwd: '',
    pwd2: '',
  });

  const { name, email, pwd, pwd2 } = user;

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    validate(user) && register({ name, email, password: pwd });
  };

  return (
    <div className='form-container'>
      <h1>
        Account
        <span className='text-primary'> Register</span>
      </h1>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='name'>Name</label>
          <input type='text' name='name' value={name} onChange={onChange} />
        </div>
        <div className='form-group'>
          <label htmlFor='email'>Email</label>
          <input type='email' name='email' value={email} onChange={onChange} />
        </div>
        <div className='form-group'>
          <label htmlFor='pwd'>Password</label>
          <input type='password' name='pwd' value={pwd} onChange={onChange} />
        </div>
        <div className='form-group'>
          <label htmlFor='pwd2'>Password Confirm</label>
          <input type='password' name='pwd2' value={pwd2} onChange={onChange} />
        </div>
        <input
          type='submit'
          value='Register'
          className='btn btn-primary btn-block'
        />
      </form>
    </div>
  );
};

export default Register;
