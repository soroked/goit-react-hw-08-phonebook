import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { ReactComponent as DeleteIcon } from 'assets/icons/delete.svg';
import { deleteContact, fetchContacts } from 'redux/contactsSlice';
import { useEffect } from 'react';
import { Button, Card, Stack } from 'react-bootstrap';

export const ContactListItem = () => {
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
    <Stack gap={3}>
      {filteredContacts?.map(({ id, name, phone }) => (
        <li key={id}>
          <Card>
            <Card.Body>
              <Stack direction="horizontal">
                <div>
                  <p style={{ margin: 0, marginRight: 10 }}>{name}</p>
                  <p style={{ margin: 0, marginRight: 10 }}>{phone}</p>
                </div>
                <div className="ms-auto">
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => dispatch(deleteContact(id))}
                  >
                    <DeleteIcon />
                  </Button>
                </div>
              </Stack>
            </Card.Body>
          </Card>
        </li>
      ))}
    </Stack>
  );
};
