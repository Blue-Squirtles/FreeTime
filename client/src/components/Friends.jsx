/* eslint-disable react/function-component-definition */
/* eslint-disable no-unused-vars */
import React, {useState, useEffect, createContext, useContext} from 'react';
import FriendEntry from './FriendEntry.jsx';

let allFriends = ['Brian', 'Eliza', 'Ryan', 'Emily', 'Evan'];

const Friends = () => {
  const [currentUser, setCurrentUser] = useState(allFriends[0]);
  const [friendsList, setFriendsList] = useState(allFriends);
  allFriends = allFriends.filter((item, i) => item !== currentUser);

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
        {allFriends.map((item, i) => <FriendEntry friendName={item} key={i} setActive={false} />)}
      </ul>

    </div>
  );
};

export default Friends;
