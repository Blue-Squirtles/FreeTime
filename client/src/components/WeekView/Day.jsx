import React from 'react';
import moment from 'moment';
import styled from 'styled-components';
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

const DayWrapper = styled.div`
  border-style: solid;
  height: 80vh;
  position: relative;
`;

function Day({ date, google, activities }) {
  // const test = percentageCalculator('2022-03-22T02:15:25.000Z');
  // console.log('test', test);
  const occupiedAndScheduledTimes = []; // tuples representing start and end percents
  const continuousNotFree = [];
  const freeTime = [];
  google.forEach((event) => {
    occupiedAndScheduledTimes
      .push([percentageCalculator(event.start), percentageCalculator(event.end)]);
  });
  activities.forEach((event) => {
    occupiedAndScheduledTimes
      .push([percentageCalculator(event.start), percentageCalculator(event.end)]);
  });
  // order occupiedAndScheduledTimes by start percent
  occupiedAndScheduledTimes.sort((a, b) => {
    return (a[0] - b[0]);
  });
  // collapse tuples by having them 'eat' their neighbor to create blocks of non free time
  let i = 0;
  while (i < occupiedAndScheduledTimes.length) {
    const currentEvent = occupiedAndScheduledTimes[i];
    let j = i + 1;
    const block = currentEvent;
    if (j < occupiedAndScheduledTimes.length) {
      while (occupiedAndScheduledTimes[j][0] < block[1]) {
        block[1] = occupiedAndScheduledTimes[j][1];
        j += 1;
        i += 1;
      }
    }
    continuousNotFree.push(block);
    i += 1;
  }
  // free time is then the spaces between blocks in continuousNotFree
  for (let k = 0; k < continuousNotFree.length - 1; k += 1) {
    // 2.08% is 30 minutes out of 24hrs
    // edge cases to handle first and last entries
    if (k === 0) {
      const firstStart = continuousNotFree[0][0];
      const lastEnd = continuousNotFree[continuousNotFree.length - 1][1];
      if (firstStart >= 2.08) freeTime.push([0, firstStart]);
      if (100 - lastEnd >= 2.08) freeTime.push([lastEnd, 100]);
    }
    // free time exists if the difference between one tuples end and the next is greater than 2.08
    if (continuousNotFree[k + 1][0] - continuousNotFree[k][1] > 2.08) {
      freeTime.push([continuousNotFree[k][1], continuousNotFree[k + 1][0]]);
    }
  }
  // edge case for no google events or scheduled activites in a day
  if (occupiedAndScheduledTimes.length === 0) freeTime.push([0, 100]);
  // edge case for one entry in continuousNotFree
  if (continuousNotFree.length === 1) {
    const start = continuousNotFree[0][0];
    const end = continuousNotFree[0][1];
    if (start >= 2.08) freeTime.push([0, start]);
    if (100 - end >= 2.08) freeTime.push([end, 100]);
  }

  return (
    <DayWrapper>
      {google.map((busyTime, i) => {
        return (
          <EventBlock
            key={i}
            start={percentageCalculator(busyTime.start)}
            end={percentageCalculator(busyTime.end)}
            type="google"
            color={4}

          />
        );
      })}
      {activities.map((activity, i) => {
        return (
          <EventBlock
            key={i}
            start={percentageCalculator(activity.start)}
            end={percentageCalculator(activity.end)}
            type="activity"
            color={0}

          />
        );
      })}
      {freeTime.map((available, i) => {
        return (
          <EventBlock
            key={i}
            start={available[0]}
            end={available[1]}
            type="free"
            color={2}
          />
        );
      })}
    </DayWrapper>
  );
}

export default Day;
