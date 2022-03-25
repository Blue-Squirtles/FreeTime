import React, { useState } from 'react';
import { Form, Button, FloatingLabel } from 'react-bootstrap';

function CreateEventForm() {
  const [saveEvent, setSaveEvent] = useState({
    name: '',
    startTime: '',
    endTime: '',
    description: '',
  })
  const handleSubmit = () => {
    console.log(saveEvent)
  }

  const handleChange = (event) => {
    console.log(event.target.value, '//control id-->', event.target.id)
    const name = event.target.id;
    // setSaveEvent({
    //   ...saveEvent, name: event.target.value
    // });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="eventName">
        <FloatingLabel
          controlId="name"
          label="Event Name"
          className="mb-3"
          onChange={handleChange}
        >
          <Form.Control type="event" placeholder="event name" />
        </FloatingLabel>

        {/* <FloatingLabel controlId="floatingInput"
            label="Date"
            className="mb-3"
          >
            <Form.Control type="date" placeholder="date" />
          </FloatingLabel> */}
        <Form.Text className="text-muted">
          Select Start Time
              </Form.Text>
        <FloatingLabel controlId="startTime"
          label="Time"
          className="mb-3"
          onChange={handleChange}
        >
          <Form.Control type="time" placeholder="time" />
        </FloatingLabel>

        <Form.Text className="text-muted">
          Select End Time
              </Form.Text>
        <FloatingLabel controlId="endTime"
          label="Time"
          className="mb-3"
          onChange={handleChange}
        >
          <Form.Control type="time" placeholder="time" />
        </FloatingLabel>

        {/*
          <FloatingLabel
            controlId="floatingInput"
            label="Invite Friends"
            className="mb-3"
          >
            <Form.Control type="name" placeholder="friendsName" />
          </FloatingLabel> */}

        <FloatingLabel controlId="description" label="Event Description">
          <Form.Control
            as="textarea"
            placeholder="Leave a comment here"
            style={{ height: '100px' }}
            onChange={handleChange}
            name="description"
          />
        </FloatingLabel>
      </Form.Group>
      {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group> */}
      <Button variant="primary" type="submit" onClick={handleSubmit}>
        Submit
        </Button>
    </Form>
  )
}

export default CreateEventForm;
