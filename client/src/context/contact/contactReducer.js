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

const contactReducer = (state, action) => {
  switch (action.type) {
    case GET_CONTACTS:
      return {
        ...state,
        contacts: action.payload,
        loading: false,
      };
    case CLEAR_CONTACTS:
      return {
        ...state,
        contacts: null,
        loading: true,
        current: null,
        filter: null,
        filtered: null,
        errors: null,
      };
    case ADD_CONTACT:
      return {
        ...state,
        contacts: [action.payload, ...state.contacts],
        loading: false,
      };
    case UPDATE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.map((contact) =>
          contact._id === action.payload._id ? action.payload : contact
        ),
        current: null,
        loading: false,
      };
    case DELETE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.filter(
          (contact) => contact._id !== action.payload
        ),
        current:
          state.current && state.current.id === action.payload
            ? null
            : state.current,
        loading: false,
      };
    case CONTACT_ERROR:
      return { ...state, error: action.payload };
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

export default contactReducer;
