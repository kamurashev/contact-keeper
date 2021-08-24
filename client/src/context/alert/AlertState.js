import { useReducer } from 'react';
import { v4 as uuid } from 'uuid';
import { AlertContext } from './alertContext';
import { alertReducer } from './alertReducer';
import { SET_ALERRT, REMOVE_ALERT } from '../types';

export const AlertState = (props) => {
  const initialState = [];

  const [state, dispatch] = useReducer(alertReducer, initialState);

  const setAlert = (msg, type, timeout = 4500) => {
    const id = uuid();
    dispatch({ type: SET_ALERRT, payload: { id, msg, type } });
    setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
  };

  return (
    <AlertContext.Provider
      value={{
        alerts: state,
        setAlert,
      }}>
      {props.children}
    </AlertContext.Provider>
  );
};
