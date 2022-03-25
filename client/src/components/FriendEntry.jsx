/* eslint-disable react/function-component-definition */
/* eslint-disable no-unused-vars */
import React, {
  useState, useEffect, createContext, useContext,
} from 'react';
import styled from 'styled-components';

const FriendEntry = ({ friendName, className, checked, props }) => {
  const [active, setActive] = useState(false);

  return (
    <InputGroup className="eachFriend">
      <InputStyle
        type="checkbox"
        onChange={(e) => {
          // console.log(`${friendName} 's box was selected`);
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
    </InputGroup>
  );
};

export default FriendEntry;

const InputGroup = styled.div`
  padding: 15px;
  margin: 10px;
  background: #F1F8E9;
  border-radius: 20px;
`
const InputStyle = styled.input`
  margin: 8px;
  transform: scale(1.5);
`
