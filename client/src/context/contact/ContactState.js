import React, { useReducer } from 'react';
import { v4 as uuid } from 'uuid';
import { ContactContext } from './contactContext';
import contactReducer from './contactReducer';
import {
  ADD_CONTACT,
  UPDATE_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  FILTER_CONTACTS,
  CLEAR_FILTER,
} from '../types';

const ContactState = (props) => {
  const initialState = {
    contacts: [
      {
        id: 1,
        name: 'Leeloo Dallas',
        email: 'leeloo@somemail.com',
        phone: '111-111-1111',
        type: 'personal',
      },
      {
        id: 2,
        name: 'Korben Dallas',
        email: 'korben@somemail.com',
        phone: '222-222-2222',
        type: 'personal',
      },
      {
        id: 3,
        name: 'Buddy Fingers',
        email: 'fingers@somemail.com',
        phone: '333-333-3333',
        type: 'professional',
      },
    ],
    current: null,
    filter: null,
    filtered: null
  };

  const [state, dispatch] = useReducer(contactReducer, initialState);

  const addContact = (contact) => {
    contact.id = uuid();
    dispatch({ type: ADD_CONTACT, payload: contact });
  };

  const updateContact = (contact) =>
    dispatch({ type: UPDATE_CONTACT, payload: contact });

  const deleteContact = (id) => dispatch({ type: DELETE_CONTACT, payload: id });

  const setCurrent = (contact) =>
    dispatch({ type: SET_CURRENT, payload: contact });

  const clearCurrent = () => dispatch({ type: CLEAR_CURRENT });

  const filterContacts = value => dispatch({ type: FILTER_CONTACTS, payload: value });
  
  const clearFilter = () => dispatch({ type: CLEAR_FILTER });

  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        current: state.current,
        filter: state.filter,
        filtered: state.filtered,
        addContact,
        updateContact,
        deleteContact,
        setCurrent,
        clearCurrent,
        filterContacts,
        clearFilter
      }}>
      {props.children}
    </ContactContext.Provider>
  );
};

export { ContactState };
