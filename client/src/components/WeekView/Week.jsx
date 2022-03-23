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
    end: '2022-03-23T03:15:25.000Z',
    Attendees: ['attendee one email', 'attendee two email'],
  },
  {
    activity_id: 2,
    create_user_id: 1,
    name: 'second activity',
    description: 'act description',
    start: '2022-06-24T02:10:25.000Z',
    end: '2022-06-24T02:15:25.000Z',
    Attendees: ['attendee one email', 'attendee two email'],
  },
];

const exampleGoogle = [
  {
    start: '2022-03-18T20:30:00Z',
    end: '2022-03-18T21:00:00Z',
  },
  {
    start: '2022-03-21T16:30:00Z',
    end: '2022-03-21T17:15:00Z',
  },
  {
    start: '2022-03-23T18:45:00Z',
    end: '2022-03-23T19:30:00Z',
  },
  {
    start: '2022-03-23T18:00:00Z',
    end: '2022-03-23T18:15:00Z',
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
  // pretend we have done the processing to only pass the Day component events that are meant for it
  // iterate over and preprocess the google events
  // iterate over and preprocess the FreeTime events
  const date = selectedDay.substring(0, 10);
  const filteredGoogleEvents = filterEvents(date, exampleGoogle);
  const filteredActivities = filterEvents(date, exampleActivities);

  console.log(filteredActivities);
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
