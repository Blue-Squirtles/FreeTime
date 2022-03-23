import React from 'react';
import moment from 'moment';
import styled from 'styled-components';

const Tick = styled.div`
  height: ${100 / 24}%;
`;

const getHours = () => {
  const items = [];
  new Array(24).fill().forEach((acc, index) => {
    items.push(moment({ hour: index }).format('h:mm A'));
  });
  return items;
};

const hours = getHours();

function Ruler() {
  return (
    <div>
      {hours.map((hour) => {
        return (
<<<<<<< HEAD
          <Tick id={hour}>{parseInt(hour.slice(0, 2), 10) % 4 === 0 ? hour + '-' : '-'}</Tick>
=======
          <div id={hour}>{parseInt(hour.slice(0, 2), 10) % 4 === 0 ? hour + '-' : '-'}</div>
>>>>>>> creating week view with 7 mapped day components
        );
      })}
    </div>
  );
}

export default Ruler;
