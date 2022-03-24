/* eslint-disable import/extensions */
/* eslint-disable react/function-component-definition */
/* eslint-disable no-unused-vars */

// Programs--
import React, {
  useState, useEffect, createContext, useContext, useMemo,
} from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import moment from 'moment';

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
  const [presentDate, setPresentDate] = useState(moment().format());
  const [userCalendar, setUserCalendar] = useState(null);
  const [allCalendarsArray, setAllCalendarsArray] = useState([]);
  const [selectedFriends, setSelectedFriends] = useState([]);

  const parseJwt = (token) => {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => {
      return `%${(`00${c.charCodeAt(0).toString(16)}`).slice(-2)}`;
    }).join(''));
    return JSON.parse(jsonPayload);
  };
  const userEmail = (parseJwt(myJWT).email);
  const sevenDaysAway = moment(presentDate).add(7, 'days').format();

  const getUserCalendar = (currentEmail) => {
    axios.get('/freetime/import', { params: { userEmail: currentEmail, presentDate, sevenDaysAway } })
      .then((response) => {
        const oneCalendar = [response.data];
        // set the user calendar state to the response given the email arg
        setUserCalendar(oneCalendar);
        // instead push calendar data into an array
        // Log the current calendar array
        console.log('allcalendar state: ', allCalendarsArray);
        // Log the incoming calendar data
        console.log('incoming calendar data: ', oneCalendar);
        // Combine and log the concatenated calendar data
        const calendarsJoined = allCalendarsArray.concat(oneCalendar);
        // Update the allCalendars state as needed
        setAllCalendarsArray(calendarsJoined);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getFriendsCalendars = () => {
    console.log('across the storming bridge');
    if (selectedFriends) {
      console.log('and into the dark cavern', selectedFriends); // []
      // iterate over selected friends
      selectedFriends.forEach((friend) => {
        console.log('to fight the divine dragon', friend);
        // invoke getUserCalendar() with each email/element as arg
        getUserCalendar(friend);
      });
    }
  };

  useEffect(() => {
    getUserCalendar(userEmail);
  }, []);

  const value = useMemo(() => {
    return {
      userCalendar,
      setUserCalendar,
      presentDate,
      setPresentDate,
      userEmail,
      selectedFriends,
      setSelectedFriends,
      getFriendsCalendars,
    };
  }, [userCalendar, presentDate, selectedFriends]);

  return (
    <AppContext.Provider value={value}>
      <div>

        <Container>
          <NavComponent />
          <Row>
            <Col xs={12} md={3}>
              <SideBar>
                {userEmail && <Friends />}
              </SideBar>
            </Col>
            <Col xs={6} md={9}>
              <Week />
            </Col>
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
