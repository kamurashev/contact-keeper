import React, { useContext, useEffect, Fragment } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { ContactContext } from '../../context/contact/contactContext';

import ContactItem from './ContactItem';
import Spinner from '../layout/Spinner';

const Contacts = () => {
  const { getContacts, loading, contacts, filtered } =
    useContext(ContactContext);

  useEffect(
    () => getContacts(),
    // eslint-disable-next-line
    []
  );

  const list = filtered ? filtered : contacts;

  return contacts && contacts.length === 0 && !loading ? (
    <h4>Please add a contact</h4>
  ) : (
    <Fragment>
      {!contacts && loading ? (
        <Spinner />
      ) : (
        <TransitionGroup>
          {list.map((contact) => (
            <CSSTransition key={contact._id} timeout={700} classNames='item'>
              <ContactItem contact={contact} />
            </CSSTransition>
          ))}
        </TransitionGroup>
      )}
    </Fragment>
  );
};

export default Contacts;
