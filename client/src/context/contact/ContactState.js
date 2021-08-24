import React, { useReducer } from 'react';
import axios from 'axios';
import { ContactContext } from './contactContext';
import contactReducer from './contactReducer';
import {
  GET_CONTACTS,
  CLEAR_CONTACTS,
  ADD_CONTACT,
  UPDATE_CONTACT,
  DELETE_CONTACT,
  CONTACT_ERROR,
  SET_CURRENT,
  CLEAR_CURRENT,
  FILTER_CONTACTS,
  CLEAR_FILTER,
} from '../types';

const ContactState = (props) => {
  const initialState = {
    contacts: null,
    loading: true,
    current: null,
    filter: null,
    filtered: null,
    
    errors: null,
  };

  const [state, dispatch] = useReducer(contactReducer, initialState);

  const getContacts = async () => {
    try {
      const res = await axios.get('/contacts');
      dispatch({ type: GET_CONTACTS, payload: res.data });
    } catch (err) {
      dispatch({ type: CONTACT_ERROR, payload: err.response.messages });
    }
  };

  const clearContacts = () => {
    dispatch({ type: CLEAR_CONTACTS });
  };

  const addContact = async (contact) => {
    const config = { headers: { 'Content-Type': 'application/json' } };
    try {
      const res = await axios.post('/contacts', contact, config);
      dispatch({ type: ADD_CONTACT, payload: res.data });
    } catch (err) {
      dispatch({ type: CONTACT_ERROR, payload: err.response.messages });
    }
  };

  const updateContact = async (contact) => {
    const config = { headers: { 'Content-Type': 'application/json' } };
    try {
      const res = await axios.put(`/contacts/${contact._id}`, contact, config);
      dispatch({ type: UPDATE_CONTACT, payload: res.data });
    } catch (err) {
      dispatch({ type: CONTACT_ERROR, payload: err.response.messages });
    }
  }

  const deleteContact = async (_id) => {
    try {
      await axios.delete(`/contacts/${_id}`);
      dispatch({ type: DELETE_CONTACT, payload: _id });
    } catch (err) {
      dispatch({ type: CONTACT_ERROR, payload: err.response.messages });
    }
  }

  const setCurrent = (contact) =>
    dispatch({ type: SET_CURRENT, payload: contact });

  const clearCurrent = () => dispatch({ type: CLEAR_CURRENT });

  const filterContacts = (value) =>
    dispatch({ type: FILTER_CONTACTS, payload: value });

  const clearFilter = () => dispatch({ type: CLEAR_FILTER });

  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        loading: state.loading,
        current: state.current,
        filter: state.filter,
        filtered: state.filtered,
        errors: state.errors,
        getContacts,
        clearContacts,
        addContact,
        updateContact,
        deleteContact,
        setCurrent,
        clearCurrent,
        filterContacts,
        clearFilter,
      }}>
      {props.children}
    </ContactContext.Provider>
  );
};

export { ContactState };
