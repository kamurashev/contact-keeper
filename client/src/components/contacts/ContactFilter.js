import React, { useContext } from 'react';
import { ContactContext } from '../../context/contact/contactContext';

const ContactFilter = () => {
  const { filter, filterContacts, clearFilter } = useContext(ContactContext);

  const onChange = (e) =>
    e.target.value === '' ? clearFilter() : filterContacts(e.target.value);

  return (
    <form>
      <input
        type='text'
        placeholder='Filter Contacts...'
        value={filter ? filter : ''}
        onChange={onChange}
      />
    </form>
  );
};

export default ContactFilter;
