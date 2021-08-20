import {
  ADD_CONTACT,
  UPDATE_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  FILTER_CONTACTS,
  CLEAR_FILTER,
} from '../types';

const anyPropMatch = (obj, regex) => {
  for (let prop in obj) {
    const propValue = obj[prop];
    if (typeof propValue === 'object') {
      anyPropMatch(propValue, regex);
    }
    if (typeof propValue === 'string' && propValue.match(regex)) {
      return true;
    }
  }
  return false;
};

export default (state, action) => {
  switch (action.type) {
    case ADD_CONTACT:
      return { ...state, contacts: [...state.contacts, action.payload] };
    case UPDATE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.map((contact) =>
          contact.id === action.payload.id ? action.payload : contact
        ),
        current: null,
      };
    case DELETE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.filter(
          (contact) => contact.id !== action.payload
        ),
        current:
          state.current && state.current.id === action.payload
            ? null
            : state.current,
      };
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload,
      };
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null,
      };
    case FILTER_CONTACTS:
      return {
        ...state,
        filter: action.payload,
        filtered: state.contacts.filter((contact) => {
          const regex = new RegExp(action.payload, 'gi');
          console.log(FILTER_CONTACTS);
          return anyPropMatch(contact, regex);
        }),
      };
    case CLEAR_FILTER:
      return {
        ...state,
        filter: null,
        filtered: null,
      };
    default:
      return state;
  }
};
