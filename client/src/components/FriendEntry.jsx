/* eslint-disable react/function-component-definition */
/* eslint-disable no-unused-vars */
import React, {
  useState, useEffect, createContext, useContext,
} from 'react';
import { AppContext } from './App.jsx';

const FriendEntry = ({ friendName }) => {
  const [active, setActive] = useState(false);
  const { userEmail, selectedFriends, setSelectedFriends } = useContext(AppContext);

  const userStatusChange = () => {
    const allSelectedFriends = [];
    const activeFriend = document.getElementsByClassName('active');
    if (activeFriend.length) {
      for (let i = 0; i < activeFriend.length; i++) {
        const eachFriend = activeFriend[i];
        allSelectedFriends.push(eachFriend.value);
      }
      setSelectedFriends(allSelectedFriends);
      console.log('selected friends state: ', selectedFriends);
    }
  };

  useEffect(() => {
    userStatusChange();
  }, [active]); // invoke the userStatus change func when a user is selected - render delay 1 turn?

  return (
    <div className="eachFriend">

      <input
        type="checkbox"
        onChange={(e) => {
          console.log(`${friendName} 's box was selected`);
          if (active) {
            setActive(false);
          } else {
            setActive(true);
          }
        }}
        className={active ? 'active' : 'hide'}
        value={friendName}
      />
      {friendName}

    </div>
  );
};

export default FriendEntry;
