/* eslint-disable react/function-component-definition */
/* eslint-disable no-unused-vars */
/* eslint-disable max-len */

import React, {
  useState, useEffect, createContext, useContext,
} from 'react';
import axios from 'axios';
import FriendEntry from './FriendEntry.jsx';
import { AppContext } from './App.jsx';

const Friends = () => {
  const { userEmail, selectedFriends, setSelectedFriends, getFriendsCalendars } = useContext(AppContext);
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
    const allSelectedFriends = [];
    const activeFriend = document.getElementsByClassName('active');
    if (activeFriend.length) {
      for (let i = 0; i < activeFriend.length; i += 1) {
        const eachFriend = activeFriend[i];
        allSelectedFriends.push(eachFriend.value);
      }
    }
    setSelectedFriends([...allSelectedFriends]);
    getFriendsCalendars();
  };

  useEffect(() => {
    getAllFriends();
  }, []);

  useEffect(() => {
    getFriendsCalendars();
  }, [selectedFriends]);

  return (
    <div className="friendsList">

      <div>
        Logged in as:
        <i>
          <b>{` ${userEmail}`}</b>
        </i>
      </div>

      <h3><u>My Friends</u></h3>

      <form onSubmit={(e) => {
        e.preventDefault();
        console.log('click');
        applyFilterClick(e);
      }}
      >
        <input
          type="submit"
          value="Apply Filter"
        />
      </form>

      <ul>
        {friendsList.map((item, i) => {
          return <FriendEntry friendName={item} key={i} setActive={false} />;
        })}
      </ul>

    </div>
  );
};

export default Friends;
