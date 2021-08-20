import React, { useState, useContext, useEffect } from 'react';
import { ContactContext } from '../../context/contact/contactContext';

const ContactForm = () => {
  const { addContact, updateContact, clearCurrent, current } = useContext(ContactContext);

  const initialState = {
    name: '',
    email: '',
    phone: '',
    type: 'personal',
  };

  useEffect(
    () => (current ? setContact(current) : setContact(initialState)),
    [current]
  );

  const [contact, setContact] = useState(initialState);

  const { name, email, phone, type } = contact;

  const onChange = (e) =>
    setContact({ ...contact, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    current ? updateContact(contact) : addContact(contact);
    setContact(initialState);
  };

  const onClear = () => clearCurrent();

  const label = `${current ? 'Update' : 'Add'} Contact`;

  return (
    <form onSubmit={onSubmit}>
      <h2 className='text-primary'>{label}</h2>
      <input
        type='text'
        placeholder='Name'
        name='name'
        value={name}
        onChange={onChange}
      />
      <input
        type='email'
        placeholder='Email'
        name='email'
        value={email}
        onChange={onChange}
      />
      <input
        type='text'
        placeholder='phone'
        name='phone'
        value={phone}
        onChange={onChange}
      />
      <h5>Contact Type</h5>
      <input
        type='radio'
        name='type'
        value='personal'
        checked={type === 'personal'}
        onChange={onChange}
      />
      {`Personal `}
      <input
        type='radio'
        name='type'
        value='professional'
        checked={type === 'professional'}
        onChange={onChange}
      />
      {`Professional `}
      <div>
        <input
          className='btn btn-primary btn-block'
          type='submit'
          value={label}
        />
      </div>
      {current && (
        <div>
          <button className='btn btn-light btn-block' onClick={onClear}>
            Clear
          </button>
        </div>
      )}
    </form>
  );
};

export default ContactForm;
