import { useContext } from 'react';
import { AlertContext } from '../context/alert/alertContext';
import { REGISTER, LOGIN } from './types';

export const useValidator = (type) => {
  const { setAlert } = useContext(AlertContext);
  switch (type) {
    case REGISTER:
      return (regForm) => {
        const { name, email, pwd, pwd2 } = regForm;
        const allSet = name !== '' && email !== '' && pwd !== '' && pwd2 !== '';
        if (!allSet) {
          setAlert('Please enter all fields', 'danger');
          return false;
        }
        const pwdToShort = pwd.length < 6;
        if (pwdToShort) {
          setAlert('Password length must be at least 6 characters', 'danger');
          return false;
        }
        const pwdsMatch = pwd === pwd2;
        if (!pwdsMatch) {
          setAlert('Passwords do not match', 'danger');
          return false;
        }
        return true;
      }    
    case LOGIN:
      return (loginForm) => {
        const { email, pwd } = loginForm;
        const allSet = email !== '' && pwd !== '';
        if (!allSet) {
          setAlert('Please enter email and password', 'danger');
          return false;
        }
        const pwdToShort = pwd.length < 6;
        if (pwdToShort) {
          setAlert('Password length must be at least 6 characters', 'danger');
          return false;
        }
        return true;
      }
    default:
      return () => false;
  }
};
