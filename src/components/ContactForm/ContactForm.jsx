import { useState } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from 'redux/contactsSlice';

export const ContactForm = () => {
  const contacts = useSelector(state => state.contacts.items);
  const [data, setData] = useState({ name: '', phone: '' });
  const dispatch = useDispatch();

  const handleSubmit = e => {
    e.preventDefault();

    const isInContacts = contacts.some(
      ({ name }) => name.toLowerCase() === data.name.toLowerCase()
    );
    if (isInContacts) {
      alert('The contact with the name ' + data.name + ' already exists');
      return;
    }

    dispatch(addContact(data));
    resetForm();
  };

  const resetForm = () => {
    setData({ name: '', phone: '' });
  };

  const handleInputChange = e => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group id="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              required
              type="text"
              name="name"
              value={data.name}
              onChange={handleInputChange}
              pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            />
          </Form.Group>
          <Form.Group className="mt-4" id="tel">
            <Form.Label>Number</Form.Label>
            <Form.Control
              required
              type="tel"
              name="phone"
              value={data.phone}
              onChange={handleInputChange}
              pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"
            />
          </Form.Group>
          <Button type="submit" className="mt-4">
            Add contact
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};
