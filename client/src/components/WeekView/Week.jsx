import React, { useState } from 'react';
import moment from 'moment';
import styled from 'styled-components';

import Ruler from './Ruler.jsx';
import Day from './Day.jsx';

// This will dynamically map to create 7 'Day' components along with day of the week title

const exampleActivities = [
  {
    activity_id: 1,
    create_user_id: 1,
    name: 'grab boba',
    description: 'act description',
    start: '2022-03-23T02:10:25.000Z',
    end: '2022-03-23T02:15:25.000Z',
    Attendees: ['attendee one email', 'attendee two email'],
  },
  {
    activity_id: 2,
    create_user_id: 1,
    name: 'second activity',
    description: 'act description',
    start: '2022-06-23T02:10:25.000Z',
    end: '2022-06-23T02:15:25.000Z',
    Attendees: ['attendee one email', 'attendee two email'],
  },
];

const exampleGoogle = [
  {
    start: '2022-03-23T20:30:00Z',
    end: '2022-03-23T21:00:00Z',
  },
  {
    start: '2022-03-23T16:30:00Z',
    end: '2022-03-23T17:15:00Z',
  },
  {
    start: '2022-03-23T18:45:00Z',
    end: '2022-03-23T19:30:00Z',
  },
  {
    start: '2022-03-23T18:00:00Z',
    end: '2022-03-23T18:50:00Z',
  },
  {
    start: '2022-03-23T02:00:00Z',
    end: '2022-03-23T02:50:00Z',
  },
];

const WeekWrapepr = styled.div`
  border-color: red;
  display: flex;
  flex-direction: row;
  justify-content: center;
  height: 80vh;
  width:80vw;
`;
const filterEvents = (date, events) => {
  // if the date formate is like -> 2022-03-22T16:48:14-07:00
  const parsedDate = date.substring(0, 10);
  const filteredEvents = events.filter((event) => {
    const eventDate = event.start.substring(0, 10);
    if (parsedDate === eventDate) {
      return event;
    }
  });
  return filteredEvents;
};

function Week() {
  const [selectedDay, setSelectedDay] = useState(moment().format()); // 2022-03-22T16:48:14-07:00
  const getDays = (day) => {
    const items = [];
    new Array(7).fill().forEach((acc, index) => {
      items.push(moment(day).add(index, 'days').format('YYYY-MM-DD'));
    });
    return items;
  };
  const date = moment(selectedDay).format('YYYY-MM-DD');
  const fetchedDays = getDays(date);
  // pretend we have done the processing to only pass the Day component events that are meant for it
  // iterate over and preprocess the google events
  // iterate over and preprocess the FreeTime events
  console.log('date: ', date, 'fetchedDays', fetchedDays);
  const filteredGoogleEvents = exampleGoogle.filter((event) => {
    const eventDate = event.start.substring(0, 10);
    if (date === eventDate) {
      return event;
    }
  });
  const filteredActivities = exampleActivities.filter((activity) => {
    const activityDate = activity.start.substring(0, 10);
    if (date === activityDate) {
      return activity;
    }
  });

  return (
    <div>
      <WeekWrapepr>
        <Ruler />
        <div>
          <Day
            date={selectedDay}
            google={filteredGoogleEvents}
            activities={filteredActivities}
          />
        </div>
      </WeekWrapepr>
    </div>
  );
}

export default Week;
