import React from 'react';
import moment from 'moment';
import styled from 'styled-components';

const Tick = styled.div`
  height: ${100 / 24}%;
`;

const RulerBar = styled.div`
  width: 10%;
  text-align: right;
  font-size: 80%;
`;
const Weekday = styled.div`
  height: 30px;
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
    <RulerBar>
      <Weekday>Date</Weekday>
      {hours.map((hour) => {
        return (
          <Tick id={hour} key={i}>{parseInt(hour.slice(0, 2), 10) % 4 === 0 ? hour + '-' : '-'}</Tick>
        );
      })}
    </RulerBar>
  );
}

export default Ruler;
