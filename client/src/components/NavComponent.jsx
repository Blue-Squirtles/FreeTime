import React from 'react';
import {
  Navbar, Container, NavDropdown, Nav,
} from 'react-bootstrap';
import Modal from './ModalComponent.jsx';
import CreateEventForm from './CreateEventForm.jsx';
import Suggestion from './Suggestion.jsx';

function NavComponent() {
  return (
    <Navbar bg="light" expand="xl">
      <Container>
        <Navbar.Brand href="#home">Free Time</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav>
            <Modal header="Create Event" buttonLabel="Create Event" submitButton="Send Event" body={<CreateEventForm />} />
            <Modal header="Stats" buttonLabel="Stats" />
            <Modal header="Suggestion" buttonLabel="Suggestion" submitButton="Accept" declineButton="Decline" body={<Suggestion />} />
            <Nav.Link href="#link">Setting</Nav.Link>
            {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
            </NavDropdown> */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavComponent;
