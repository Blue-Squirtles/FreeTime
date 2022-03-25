import React from 'react';
import {
  Navbar, Container, NavDropdown, Nav,
} from 'react-bootstrap';
import Modal from './ModalComponent.jsx';
import CreateEventForm from './CreateEventForm.jsx';
import Suggestion from './Suggestion.jsx';
import styled from 'styled-components';

function NavComponent() {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#home"><BrandName>Free Time</BrandName></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav>
            <Nav.Link href=""><Modal header="Create Event" buttonLabel="Create Event" submitButton="Send Event" body={<CreateEventForm />} /></Nav.Link>
            <Nav.Link href=""><Modal header="Stats" buttonLabel="Stats" /></Nav.Link>
            <Nav.Link href=""><Modal header="Suggestion" buttonLabel="Suggestion" submitButton="Accept" declineButton="Decline" body={<Suggestion />} /></Nav.Link>
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
const BrandName = styled.h1`
  background-color: rgb(41, 50, 65);
  color: #fff;
  border: none;
  border-radius:10px;
  padding:10px;
`

const StyledNav = styled(Navbar)`
  background-color: rgb(41, 50, 65);
  border: 2px;
`;
