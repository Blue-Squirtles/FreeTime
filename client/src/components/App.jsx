/* eslint-disable import/extensions */
/* eslint-disable react/function-component-definition */
/* eslint-disable no-unused-vars */

// Programs--
import React, {
  useState, useEffect, createContext, useContext, useMemo,
} from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';

// Components--
import styled from 'styled-components';
import Modal from './ModalComponent.jsx';
import CreateEventForm from './CreateEventForm.jsx';
import Suggestion from './Suggestion.jsx';
import NavComponent from './NavComponent.jsx';
import Friends from './Friends.jsx';
// import Day from './WeekView/Day.jsx';
import Week from './WeekView/Week.jsx';

export const AppContext = createContext();

const myJWT = document.cookie.split('=')[2];

const App = () => {
  const [userEmail, setUserEmail] = useState('');
  const [presentDate, setPresentDate] = useState(''); // present date
  const [eightDaysAway, setEightDaysAway] = useState(''); // the date 8 days in the future
  const [selectedFriends, setSelectedFriends] = useState('');
  const [userCalendar, setUserCalendar] = useState(null);
  const value = useMemo(() => {
    return {
      userCalendar,
      setUserCalendar,
    };
  }, [userCalendar]);

  const parseJwt = (token) => {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => {
      return `%${(`00${c.charCodeAt(0).toString(16)}`).slice(-2)}`;
    }).join(''));
    return JSON.parse(jsonPayload);
  };
  const myEmail = (parseJwt(myJWT).email);

  useEffect(() => {
    setUserEmail(myEmail);
  }, []);

  return (
    <AppContext.Provider value={{
      userEmail, selectedFriends, setSelectedFriends, presentDate, eightDaysAway, value
    }}
    >
      <div>

        <Container>
          <NavComponent />
          <Row>
            <Col xs={12} md={3}>
              <SideBar>
                {userEmail && <Friends />}
              </SideBar>
            </Col>
            <Col xs={6} md={9} />
          </Row>
        </Container>

      </div>
    </AppContext.Provider>

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
