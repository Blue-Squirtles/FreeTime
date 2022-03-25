import React, { useState, useContext } from 'react';
import moment from 'moment';
import styled from 'styled-components';
import { Col } from 'react-bootstrap';
import Ruler from './Ruler.jsx';
import Day from './Day.jsx';
import { AppContext } from '../App.jsx';

const exampleActivities = [
  {
    activity_id: 1,
    create_user_id: 1,
    name: 'grab boba',
    description: 'act description',
    start: '2022-03-25T02:10:25.000Z',
    end: '2022-03-25T04:15:25.000Z',
    Attendees: ['attendee one email', 'attendee two email'],
  },
  {
    activity_id: 2,
    create_user_id: 1,
    name: 'second activity',
    description: 'act description',
    start: '2022-03-26T15:10:25.000Z',
    end: '2022-03-26T17:15:25.000Z',
    Attendees: ['attendee one email', 'attendee two email'],
  },
];
const exampleGoogle = [
  {
    start: '2022-03-24T20:30:00Z',
    end: '2022-03-24T21:00:00Z',
  },
  {
    start: '2022-03-24T16:30:00Z',
    end: '2022-03-24T17:15:00Z',
  },
  {
    start: '2022-03-25T18:45:00Z',
    end: '2022-03-25T19:30:00Z',
  },
  {
    start: '2022-03-26T18:00:00Z',
    end: '2022-03-26T18:50:00Z',
  },
  {
    start: '2022-03-27T02:00:00Z',
    end: '2022-03-27T02:50:00Z',
  },
  {
    start: '2022-03-28T10:00:00Z',
    end: '2022-03-28T18:00:00Z',
  },
];
const exampleGoogle3Selected = [
  [
    {
      start: '2022-03-24T20:30:00Z',
      end: '2022-03-24T21:00:00Z',
    },
    {
      start: '2022-03-25T16:30:00Z',
      end: '2022-03-25T17:15:00Z',
    },
    {
      start: '2022-03-25T18:45:00Z',
      end: '2022-03-25T19:30:00Z',
    },
    {
      start: '2022-03-26T18:00:00Z',
      end: '2022-03-26T18:50:00Z',
    },
    {
      start: '2022-03-27T02:00:00Z',
      end: '2022-03-27T02:50:00Z',
    },
  ],
  [
    {
      start: '2022-03-24T16:30:00Z',
      end: '2022-03-24T20:00:00Z',
    },
    {
      start: '2022-03-24T21:30:00Z',
      end: '2022-03-24T22:00:00Z',
    },
    {
      start: '2022-03-25T10:45:00Z',
      end: '2022-03-25T12:30:00Z',
    },
    {
      start: '2022-03-26T8:00:00Z',
      end: '2022-03-26T10:15:00Z',
    },
    {
      start: '2022-03-27T02:00:00Z',
      end: '2022-03-27T04:00:00Z',
    },
  ],
  [
    {
      start: '2022-03-26T08:30:00Z',
      end: '2022-03-26T09:00:00Z',
    },
    {
      start: '2022-03-26T09:30:00Z',
      end: '2022-03-26T10:00:00Z',
    },
    {
      start: '2022-03-26T10:30:00Z',
      end: '2022-03-26T11:00:00Z',
    },
    {
      start: '2022-03-26T11:30:00Z',
      end: '2022-03-26T12:00:00Z',
    },
    {
      start: '2022-03-26T12:30:00Z',
      end: '2022-03-26T01:00:00Z',
    },
  ]];
const exampleActivities3Selected = [
  [
    {
      activity_id: 1,
      create_user_id: 1,
      name: 'first activity',
      description: 'act description',
      start: '2022-03-25T10:00:00.000Z',
      end: '2022-03-25T10:30:00.000Z',
      Attendees: ['attendee one email', 'attendee two email'],
    },
    {
      activity_id: 2,
      create_user_id: 1,
      name: 'second activity',
      description: 'act description',
      start: '2022-03-26T13:00:00.000Z',
      end: '2022-03-26T14:15:00.000Z',
      Attendees: ['attendee one email', 'attendee two email'],
    },
  ],
  [
    {
      activity_id: 3,
      create_user_id: 2,
      name: 'third activity',
      description: 'act description',
      start: '2022-03-24T15:30:00.000Z',
      end: '2022-03-24T16:30:00.000Z',
      Attendees: ['attendee one email', 'attendee two email'],
    },
  ],
  [
    {
      activity_id: 4,
      create_user_id: 3,
      name: 'fourth activity',
      description: 'act description',
      start: '2022-03-27T17:30:00.000Z',
      end: '2022-03-27T18:00:00.000Z',
      Attendees: ['attendee one email', 'attendee two email'],
    },
    {
      activity_id: 5,
      create_user_id: 3,
      name: 'fifth activity',
      description: 'act description',
      start: '2022-03-27T12:00:00.000Z',
      end: '2022-03-27T13:00:00.000Z',
      Attendees: ['attendee one email', 'attendee two email'],
    },
    {
      activity_id: 6,
      create_user_id: 3,
      name: 'sixth activity',
      description: 'act description',
      start: '2022-03-29T14:00:00.000Z',
      end: '2022-03-29T18:00:00.000Z',
      Attendees: ['attendee one email', 'attendee two email'],
    },
  ]];

const WeekView = styled.div`
  /* border-color: green; */
  /* border-style: solid; */
  display: flex;
  flex-direction: row;
  justify-content: center;
  height: 80vh;
  color: white;
  // background-color: black;
  // margin: 0px, 20px, 20px, 20px;
`;

const WeekWrapper = styled.div`
  /* border-color: red; */
  /* border-style: solid; */
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 80vh;
  width: 100%;
  padding: 10px;
  border: white solid 3px;
`;
const TitleAndColor = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 7.5vw;
`;
const Title = styled.div`
  text-align: center;
  width: 4vw;
  height: 5.5%;
  font-size: 80%;
`;

const ContainerStyle = styled.div`
  // width: auto;
  // height: auto;
  background-color: rgba(255,255,255, 0.2);
  padding: 50px;
  border-radius: 5px;
  backdrop-filter: blur(30px);
  margin: 10px;
  margin-top: 30px;
  border: 4px solid transparent;
  background-clip: padding-box;
  box-shadow: 0px 0px 40px #000;
  @media (max-width: 1000px) {
    margin-top: 10px;
    line-height: 1.0;
  }
`

const filterEvents = (date, calendars) => {
  const parsedDate = moment(date).format('YYYY-MM-DD');
  const allEvents = [];
  for (let i = 0; i < calendars.length; i += 1) {
    for (let k = 0; k < calendars[i].length; k += 1) {
      allEvents.push(calendars[i][k]);
    }
  }

  const filteredEvents = allEvents.filter((event) => {
    const eventDate = event.start.substring(0, 10);
    if (parsedDate === eventDate) {
      return event;
    }
  });
  return filteredEvents;
};

function Week() {
  const [selectedDay, setSelectedDay] = useState(moment().format()); // 2022-03-22T16:48:14-07:00
  const { allGoogleActivities, allFreeTimeActivities } = useContext(AppContext);
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

  return (
  <ContainerStyle >
    <WeekView>
      <Ruler />
      <WeekWrapper>
        {fetchedDays.map((day, i) => {
          // const filteredGoogleEvents = filterEvents(day, exampleGoogle3Selected);
          // const filteredActivities = filterEvents(day, exampleActivities3Selected);
          const filteredGoogleEvents = filterEvents(day, allGoogleActivities);
          const filteredActivities = filterEvents(day, allFreeTimeActivities);
          return (
            <TitleAndColor key={i}>
              <Title >{moment(day).format('dddd, MMM Do')}</Title>
              <Day
                date={day}
                google={filteredGoogleEvents}
                activities={filteredActivities}
              />
            </TitleAndColor>
          );
        })}
      </WeekWrapper>
    </WeekView>
  </ContainerStyle>
  );
}

export default Week;
