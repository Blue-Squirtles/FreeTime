/* eslint-disable react/function-component-definition */
/* eslint-disable no-unused-vars */
import React, {useState, useEffect, createContext, useContext} from 'react';
import FriendEntry from './FriendEntry.jsx';
import axios from 'axios';

let allFriends = ['Brian', 'Eliza', 'Ryan', 'Emily', 'Evan'];

const Friends = () => {
  const [currentUser, setCurrentUser] = useState(allFriends[0]);
  const [friendsList, setFriendsList] = useState(allFriends);
  const [friendGetData, setFriendGetData] = useState('');

  allFriends = allFriends.filter((item, i) => item !== currentUser);

  const getAllFriends = () => {
    const currentUserEmail = 'justin.t.greer1@gmail.com';
    axios
      .get('/freetime/friends', { params: { email: currentUserEmail } })
      .then((res) => {
        const data = res.data;
        console.log(data);
        setFriendGetData(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const shapeFriendData = () => {
    if (friendGetData) {
      const friendsArray = [];
      // console.log('friend get data: ', Array.isArray(friendGetData), friendGetData);
      friendGetData.forEach((item) => {
        friendsArray.push(item.email);
      });
      setFriendsList(friendsArray);
    }
  };

  useEffect(() => {
    getAllFriends();
  }, []);

  useEffect(() => {
    shapeFriendData();
  }, [friendGetData]);

  return (
    <div className="friendsList">

      <div>
        Logged in as:
        <i>
          <b>{' ' + currentUser}</b>
        </i>
      </div>

      <h3><u>My Friends</u></h3>

      <ul>
        {friendsList.map((item, i) => <FriendEntry friendName={item} key={i} setActive={false} />)}
      </ul>

    </div>
  );
};

export default Friends;
