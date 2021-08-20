import React, { useContext, Fragment } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { ContactContext } from '../../context/contact/contactContext';

import ContactItem from './ContactItem';

const Contacts = () => {
  const { contacts, filtered } = useContext(ContactContext);

  const list = filtered ? filtered : contacts;

  return contacts.length === 0 ? (
    <h4>Please add a contact</h4>
  ) : (
    <Fragment>
      <TransitionGroup>
          {list.map((contact) => (
          <CSSTransition key={contact.id} timeout={700} classNames='item'>
            <ContactItem contact={contact} />              
          </CSSTransition>
        ))}
      </TransitionGroup>
    </Fragment>
  );
};

export default Contacts;
