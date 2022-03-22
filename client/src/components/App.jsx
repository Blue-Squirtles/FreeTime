import React from 'react';
import Modal from './ModalComponent';
import CreateEventForm from './CreateEventForm';
import Suggestion from './Suggestion';
import NavComponent from './NavComponent';
import styled from 'styled-components';
import { Container, Row, Col } from 'react-bootstrap';

function App() {
  return (
    <div>
      <Container>
      <NavComponent />
      <Row>
        <Col xs={12} md={3}>
          <SideBar>
            <br />
            <Modal header="Create Event" buttonLabel="Create Event" submitButton="Send Event" body={<CreateEventForm />} />
            <br />
            <Modal header="Stats" buttonLabel="Stats" />
            <br />
            <Modal header="Suggestion" buttonLabel="Suggestion" submitButton="Accept" declineButton="Decline" body={<Suggestion />} />
          </SideBar>
        </Col>
        <Col xs={6} md={9}>
          <View>Hello World
          </View>
        </Col>
      </Row>
    </Container>
    </div>
  );
}

export default App;

const SideBar = styled.div`
  max-width: 350px;
  height: 1000px;
  background-color: gray;
`
const View = styled.div`
  width: 100px;
`