import { useEffect, useState } from 'react';
import { ContactListItem } from './ContactListItem';

export const ContactList = ({ filteredContacts }) => {
  const [contactListHeight, setContactListHeight] = useState(null);

  useEffect(() => {
    setContactListHeight(window.innerHeight - 214);
  }, []);

  return (
    <ul
      style={{
        padding: 0,
        marginTop: 20,
        height: contactListHeight,
        overflow: 'hidden',
        overflowY: 'scroll',
      }}
    >
      <ContactListItem filteredContacts={filteredContacts} />
    </ul>
  );
};
