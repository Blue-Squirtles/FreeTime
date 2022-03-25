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
import Footer from './Footer.jsx';

export const AppContext = createContext();

const App = () => {
  const [signedIn, setSignedIn] = useState(false);
  const [presentDate, setPresentDate] = useState(moment().format());
  const [selectedFriends, setSelectedFriends] = useState([]);
  const [allGoogleActivities, setAllGoogleActivities] = useState([]);
  const [allFreeTimeActivities, setAllFreeTimeActivities] = useState([]);

<<<<<<< HEAD
  const myJWT = document.cookie.split('=')[3];
  console.log(myJWT);
  
=======
  const myJWT = document.cookie.split('=')[2];

>>>>>>> f7d6205 (css changes on sidebar and app background)
  const parseJwt = (token) => {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => {
      return `%${(`00${c.charCodeAt(0).toString(16)}`).slice(-2)}`;
    }).join(''));
    return JSON.parse(jsonPayload);
  };
  const userEmail = (parseJwt(myJWT).email);
<<<<<<< HEAD

=======
  // let userEmail;
>>>>>>> f7d6205 (css changes on sidebar and app background)
  const sevenDaysAway = moment(presentDate).add(7, 'days').format();

  const getGoogleCalendar = (currentEmail) => {
    axios.get('/freetime/import', { params: { userEmail: currentEmail, presentDate, sevenDaysAway } })
      .then((response) => {
        // console.log('google calendar init: ', allGoogleActivities);
        const incomingCalendar = [response.data];
        // console.log('incoming google data: ', incomingCalendar);
        const calendarsJoined = allGoogleActivities.concat(incomingCalendar);
        // console.log('google arrays joined:', calendarsJoined);
        setAllGoogleActivities(calendarsJoined);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getFreeTimeCalendar = (currentEmail) => {
    console.log('inside freetime cal func');
    // axios the free time calendar activities given an input email
    axios.get('/freetime/activities', { params: { email: currentEmail } })
      .then((response) => {
        // console.log('freetime array init: ', allFreeTimeActivities );
        const newCalendar = response.data;
        // console.log('incoming freetime data: ', newCalendar);
        const joinedCalendar = allFreeTimeActivities.concat(newCalendar);
        // console.log('freetime data joined:', joinedCalendar);
        setAllFreeTimeActivities(joinedCalendar);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getFriendsCalendars = () => {
    selectedFriends.forEach((friend) => {
      getGoogleCalendar(friend);
      getFreeTimeCalendar(friend);
    });
  };

  useEffect(() => {
    getGoogleCalendar(userEmail);
  }, []);

  const value = useMemo(() => {
    return {
      presentDate,
      setPresentDate,
      userEmail,
      selectedFriends,
      setSelectedFriends,
      getFriendsCalendars,
      allGoogleActivities,
      allFreeTimeActivities,
    };
  }, [presentDate, selectedFriends, allGoogleActivities, allFreeTimeActivities]);

  return (
    <AppContext.Provider value={value}>
      <AppContainer>
        <NavComponent />
        <Row>
          <Col xs={12} md={3}>
            <SideBar>
              {userEmail && <Friends />}
            </SideBar>
          </Col>
          <Col xs={12} md={9}>
            <Week />
          </Col>
        </Row>
        <Footer />
      </AppContainer>
    </AppContext.Provider>

  );
};

export default App;

const SideBar = styled.div`
  background-color: rgb(41, 50, 65);

  height: auto;
  font-size: 20px;
  align-content: flex-end;
  font-family: 'Raleway', sans-serif;
`;

const AppContainer = styled.div`
  background-color: rgb(41, 50, 65);
  box-sizing: border-box;
`;
