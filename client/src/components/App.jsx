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

const App = () => {
  const parseJwt = (token) => {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => {
      return `%${(`00${c.charCodeAt(0).toString(16)}`).slice(-2)}`;
    }).join(''));
    return JSON.parse(jsonPayload);
  };

  const myJWT = document.cookie.split('=')[2];
  const userEmail = (parseJwt(myJWT).email);

<<<<<<< HEAD
=======
  const [signedIn, setSignedIn] = useState(false);
  const [presentDate, setPresentDate] = useState(moment().format());
  const [selectedFriends, setSelectedFriends] = useState([]);
  const [allGoogleActivities, setAllGoogleActivities] = useState([]);
  const [allFreeTimeActivities, setAllFreeTimeActivities] = useState([]);

>>>>>>> 095611b (friends can be selected and unselected)
  const sevenDaysAway = moment(presentDate).add(7, 'days').format();

  const getGoogleCalendar = (currentEmail) => {
    axios.get('/freetime/import', { params: { userEmail: currentEmail, presentDate, sevenDaysAway } })
      .then((response) => {
        const incomingCalendar = response.data;
        setAllGoogleActivities((p) => { return ([...p, incomingCalendar]); });
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
        const incomingCalendar = response.data;
        setAllFreeTimeActivities((p) => { return ([...p, incomingCalendar]); });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getFriendsCalendars = () => {
    // set state to empty
    selectedFriends.forEach((friend) => {
      getGoogleCalendar(friend); // let this return a calendar
      // getFreeTimeCalendar(friend);
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
      setAllGoogleActivities,
      allFreeTimeActivities,
      setAllFreeTimeActivities,
    };
  }, [presentDate, selectedFriends, allGoogleActivities, allFreeTimeActivities]);

  return (
    <AppContext.Provider value={value}>
      <Container>
        <NavComponent />
        <Row>
          <Col xs={12} md={3}>
            <SideBar>
              {userEmail && <Friends />}
              <div id="buttonDiv" />
            </SideBar>
          </Col>
          <Col xs={6} md={9}>
            <Week />
          </Col>
        </Row>
      </Container>
    </AppContext.Provider>

  );
};

export default App;

const SideBar = styled.div`
  max-width: 350px;
  height: 80vh;
  background-color: gray;
`;

const View = styled.div`
  width: 100px;
`;
