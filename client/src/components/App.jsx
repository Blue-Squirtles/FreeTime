/* eslint-disable react/function-component-definition */
/* eslint-disable no-unused-vars */

//Programs--
import React, { useState, useEffect, createContext, useContext } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';

//Components--
import Modal from './ModalComponent';
import CreateEventForm from './CreateEventForm';
import Suggestion from './Suggestion';
import NavComponent from './NavComponent';
import styled from 'styled-components';
import Friends from './Friends.jsx';

const App = () => {
  return (
    <div>

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
              <Friends />
            </SideBar>
          </Col>
          <Col xs={6} md={9}>
          </Col>
        </Row>
      </Container>
      </div>

    </div>
  );
};

export default App;

const SideBar = styled.div`
  max-width: 350px;
  height: 1000px;
  background-color: gray;
`;

const View = styled.div`
  width: 100px;
`;
