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
  const { userEmail, selectedFriends, setSelectedFriends } = useContext(AppContext);
  const [friendsList, setFriendsList] = useState([]); // array of friends emails
  const [friendGetData, setFriendGetData] = useState(''); // freetime/friends

  const getAllFriends = () => {
    axios
      .get('/freetime/friends', { params: { email: userEmail } })
      .then((response) => {
        const { data } = response;
        setFriendGetData(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const shapeFriendData = () => {
    if (friendGetData) {
      const friendsArray = [];
      friendGetData.forEach((item) => {
        friendsArray.push(item.email);
      });
      setFriendsList(friendsArray);
    }
  };

  const applyFilterClick = () => {
    const allSelectedFriends = [];
    const activeFriend = document.getElementsByClassName('active');
    if (activeFriend.length) {
      for (let i = 0; i < activeFriend.length; i++) {
        const eachFriend = activeFriend[i];
        allSelectedFriends.push(eachFriend.value);
      }
      setSelectedFriends(allSelectedFriends);
    }
  };

  useEffect(() => {
    getAllFriends();
  }, []); // EDIT: invoke this effect only once on page load

  useEffect(() => {
    shapeFriendData();
  }, [friendGetData]); // shape incoming friend data to generate list of friends emails

  if (selectedFriends) {
    console.log('selected friends state: ', selectedFriends);
  }

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
        applyFilterClick();
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
