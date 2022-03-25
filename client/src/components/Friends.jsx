/* eslint-disable react/function-component-definition */
/* eslint-disable no-unused-vars */
/* eslint-disable max-len */

import React, {
  useState, useEffect, createContext, useContext,
} from 'react';
import axios from 'axios';
import FriendEntry from './FriendEntry.jsx';
import { AppContext } from './App.jsx';
import styled from 'styled-components';

const Friends = () => {
  const { userEmail, selectedFriends, setSelectedFriends, getFriendsCalendars, setAllGoogleActivities } = useContext(AppContext);
  const [friendsList, setFriendsList] = useState([]); // array of friends emails
  const friendGetData = '';

  const shapeFriendData = (friendResponse) => {
    const friendsArray = [];
    friendResponse.forEach((item) => {
      friendsArray.push(item.email);
    });
    return friendsArray;
  };

  const getAllFriends = () => {
    axios
      .get('/freetime/friends', { params: { email: userEmail } })
      .then((response) => {
        const { data } = response;

        const friends = shapeFriendData(data);
        console.log('all my friends', friends);
        setFriendsList(friends);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const applyFilterClick = (e) => {
    const allSelectedFriends = [userEmail];
    const activeFriend = document.getElementsByClassName('active');
    if (activeFriend.length) {
      for (let i = 0; i < activeFriend.length; i += 1) {
        const eachFriend = activeFriend[i];
        allSelectedFriends.push(eachFriend.value);
      }
    }
    setSelectedFriends([...allSelectedFriends]);
  };

  useEffect(() => {
    getAllFriends();
  }, []);

  useEffect(() => {
    setAllGoogleActivities([]);
    getFriendsCalendars();
  }, [selectedFriends]);

  return (
    <FriendsContainer className="friendsList">

      <LoggedIn>
        Logged in as:
        <i>
          <b>{` ${userEmail}`}</b>
        </i>
      </LoggedIn>

      <div id="buttonDiv" />

      <FriendsDiv>
      <h3 style={{marginBottom: '25px', color: 'white', fontSize: '45px'}}>My Friends</h3>

      <ul>
        {friendsList.map((item, i) => {
          return <FriendEntry friendName={item} key={i} setActive={false} />;
        })}
      </ul>


      <form onSubmit={(e) => {
        e.preventDefault();
        console.log('click');
        applyFilterClick(e);
      }}
      >
        <FormInput
          type="submit"
          value="Apply Filter"
        />
      </form>
      </FriendsDiv>
    </FriendsContainer>
  );
};

export default Friends;

const FormInput = styled.input`
  background-color:#0a0a23;
  color: #F1F8E9;
  border: none;
  border-radius:10px;
  padding:10px;
  min-height:30px;
  min-width: 120px;
`
const LoggedIn = styled.div`
  font-size: 12px;
  align-content: flex-start;
  align-items: start;
  margin-bottom: 10px;
  color: white;
`
const FriendsDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 100px;
`
const FriendsContainer = styled.div`
  background-color: rgb(41, 50, 65);
  display: flex;
  flex-direction: column;
  // justify-content: space-evenly;
  align-items: center;
  height: 60vh;
  padding: 10px;
`
