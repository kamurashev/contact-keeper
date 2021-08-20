import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { ContactContext } from '../../context/contact/contactContext';

const ContactItem = ({ contact }) => {
  const { id, name, email, phone, type } = contact;

  const { deleteContact, setCurrent } = useContext(ContactContext);

  const onDelete = () => deleteContact(id);

  const onUpdate = () => setCurrent(contact);

  const badgeClass =
    type === 'professional' ? 'badge-success' : 'badge-primary';

  return (
    <div className='card bg-light'>
      <h3 className='text-primary text-left'>
        {`${name} `}
        <span style={{ float: 'right' }} className={`badge ${badgeClass}`}>
          {type.charAt(0).toUpperCase() + type.slice(1).toLowerCase()}
        </span>
      </h3>
      <ul className='list'>
        {email && (
          <li>
            <i className='fas fa-envelope-open'></i> {email}
          </li>
        )}
        {phone && (
          <li>
            <i className='fas fa-phone'></i> {phone}
          </li>
        )}
      </ul>
      <p>
        <button className='btn btn-dark btn-sm' onClick={onUpdate}>
          Edit
        </button>
        <button className='btn btn-danger btn-sm' onClick={onDelete}>
          Delete
        </button>
      </p>
    </div>
  );
};

ContactItem.propTypes = {
  contact: PropTypes.object.isRequired,
};

export default ContactItem;
