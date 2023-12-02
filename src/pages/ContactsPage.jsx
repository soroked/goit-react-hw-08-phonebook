import { ContactForm } from 'components/ContactForm/ContactForm';
import { ContactList } from 'components/ContactList/ContactList';
import { Filter } from 'components/Filter/Filter';
import React, { useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContacts } from 'redux/contactsSlice';

const ContactsPage = () => {
  const contacts = useSelector(state => state.contacts.items);
  const filter = useSelector(state => state.filter.filter);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const filteredContacts = contacts.filter(({ name }) =>
    name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <Row>
      <Col>
        <h1>Phonebook</h1>
        <ContactForm />
      </Col>
      {contacts.length > 0 && (
        <Col>
          <h2>Contacts</h2>
          <Filter />
          <ContactList filteredContacts={filteredContacts} />
        </Col>
      )}
    </Row>
  );
};

export default ContactsPage;
