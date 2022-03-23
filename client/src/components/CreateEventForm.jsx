import React from 'react';
import { Form, Button, FloatingLabel } from 'react-bootstrap';

function CreateEventForm() {
  return (
    <div>
      <Form>
        <Form.Group className="mb-3" controlId="eventName">
          <FloatingLabel
            controlId="floatingInput"
            label="Event Name"
            className="mb-3"
          >
            <Form.Control type="event" placeholder="event name" />
            {/* <Form.Text className="text-muted">
            Select friends to invite
              </Form.Text> */}
          </FloatingLabel>

          <FloatingLabel controlId="floatingInput"
            label="Date"
            className="mb-3"
          >
            <Form.Control type="date" placeholder="date" />
          </FloatingLabel>

          <FloatingLabel controlId="floatingInput"
            label="Time"
            className="mb-3"
          >
            <Form.Control type="time" placeholder="time" />
          </FloatingLabel>

          <FloatingLabel
            controlId="floatingInput"
            label="Invite Friends"
            className="mb-3"
          >
            <Form.Control type="name" placeholder="friendsName" />
          </FloatingLabel>

          <FloatingLabel controlId="floatingTextarea2" label="Event Description">
            <Form.Control
              as="textarea"
              placeholder="Leave a comment here"
              style={{ height: '100px' }}
            />
          </FloatingLabel>
        </Form.Group>
        {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group> */}
        {/* <Button variant="primary" type="submit">
          Submit
  </Button> */}
      </Form>
    </div>
  )
}

export default CreateEventForm;