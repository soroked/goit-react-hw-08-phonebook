import { useEffect, useState } from 'react';
import { ContactListItem } from './ContactListItem';

export const ContactList = () => {
  const [contactListHeight, setContactListHeight] = useState(null);
  console.log('contactListHeight: ', contactListHeight);

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
      <ContactListItem />
    </ul>
  );
};
