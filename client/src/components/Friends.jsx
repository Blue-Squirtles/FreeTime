/* eslint-disable react/function-component-definition */
/* eslint-disable no-unused-vars */
import React, {
  useState, useEffect, createContext, useContext,
} from 'react';
import axios from 'axios';
import FriendEntry from './FriendEntry.jsx';
import { AppContext } from './App.jsx';
const allFriends = ['Brian', 'Eliza', 'Ryan', 'Emily', 'Evan'];

const Friends = () => {
  // Context
  const { userEmail } = useContext(AppContext);
  // State
  const [friendsList, setFriendsList] = useState(allFriends); // array of friends emails
  const [friendGetData, setFriendGetData] = useState(''); // freetime/friends
  // allFriends = allFriends.filter((item, i) => { return item !== currentUser; });

  // Functions
  const getAllFriends = () => {
    // if (userEmail) {
    axios
      .get('/freetime/friends', { params: { email: userEmail } })
      .then((response) => {
        const { data } = response;
        // console.log(data);
        setFriendGetData(data);
      })
      .catch((err) => {
        console.log(err);
      });
    // }
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

  useEffect(() => {
    getAllFriends();
  }, []); // invoke this effect only on page load

  useEffect(() => {
    shapeFriendData();
  }, [friendGetData]);

  return (
    <div className="friendsList">

      <div>
        Logged in as:
        <i>
          <b>{` ${userEmail}`}</b>
        </i>
      </div>

      <h3><u>My Friends</u></h3>

      <ul>
        {friendsList.map((item, i) => {
          return <FriendEntry friendName={item} key={i} setActive={false} />;
        })}
      </ul>

    </div>
  );
};

export default Friends;
