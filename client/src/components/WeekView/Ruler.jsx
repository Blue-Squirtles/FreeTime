import React from 'react';
import moment from 'moment';

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
          <div id={hour}>{hour} -</div>
        );
      })}
    </div>
  );
}

export default Ruler;
