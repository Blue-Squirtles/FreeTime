import React from 'react';
import moment from 'moment';
import EventBlock from './EventBlock';

// function parseTime(num) {
//   return ('0' + (Math.floor(num) % 24)).slice(-2) + ':' + (((num % 1) * 60) + '0').slice(0, 2);
// }

const percentageCalculator = (time) => {
  const hours = Number(time.substring(11, 13));
  const mins = Number(time.substring(14, 16)) / 60;
  const secs = Number(time.substring(17, 19) / 60 / 60);
  const percentage = ((hours + mins + secs) / 24) * 100;
  return percentage;
};

function Day({ date, google, activities }) {
  // const test = percentageCalculator('2022-03-22T02:15:25.000Z');
  // console.log('test', test);

  // console.log('here', date, google, activities);
  return (
    <div>
      {google.map((busyTime) => {
        return (
          <EventBlock
            start={percentageCalculator(busyTime.start)}
            end={percentageCalculator(busyTime.end)}
            event={false}
          />
        );
      })}
      {activities.map((activity) => {
        return (
          <EventBlock
            start={percentageCalculator(activity.start)}
            end={percentageCalculator(activity.end)}
            event
          />
        );
      })}
    </div>
  );
}

export default Day;
