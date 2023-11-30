import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { Col, Container, Row } from 'react-bootstrap';

// ==================== QUESTIONS ====================

//  1. У випадку коли на бекенді немає даних, ми не хочемо рендерити пусту розмітку.
//     Задля перевірки чи масив контактів не пустий я витягую ці данні через useSelector.
//     Мабуть функція асинхронна і тому в цей момент в змінну contacts записуєтся пустий
//     масив.
//     traceback: розкоментувати позначений стрілками код і перегрузити сторінку в
//     браезері

export const App = () => {
  // const contacts = useSelector(state => state.contacts.items);

  return (
    <Container className="pt-5 pb-5">
      <Row>
        <Col>
          <h1>Phonebook</h1>
          <ContactForm />
        </Col>
        {/* {contacts.length > 0 && ( */}
        <Col>
          <h2>Contacts</h2>
          <Filter />
          <ContactList />
        </Col>
        {/* )} */}
      </Row>
    </Container>
  );
};
