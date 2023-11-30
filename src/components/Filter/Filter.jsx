import { Card, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from 'redux/filterSlice';

export const Filter = () => {
  const filter = useSelector(state => state.filter.filter);
  const dispatch = useDispatch();

  const handleInputChange = e => {
    dispatch(setFilter(e.currentTarget.value));
  };

  return (
    <Card>
      <Card.Body>
        <Form>
          <Form.Group id="findByName">
            <Form.Label>Find contacts by name</Form.Label>
            <Form.Control
              type="text"
              name="filter"
              id="findByName"
              value={filter}
              onChange={handleInputChange}
              pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я
              ])?[a-zA-Zа-яА-Я]*)*$"
            ></Form.Control>
          </Form.Group>
        </Form>
      </Card.Body>
    </Card>
  );
};
