/* eslint-disable import/prefer-default-export */

import styled from 'styled-components';

// const EventBlock = styled.div`
//   position: absolute;
//   top: 50%;
//   height: 10%;
//   width: 100%;
//   background-color: 'orange';
// `;

const EventBlock = styled.div`
  position: absolute;
  top: ${(props) => props.start}%;
  height: ${(props) => props.end - props.start}%;
  width: 100%;
  background-color: ${(props) => props.event ? 'orange' : 'grey'};
  /* border-color: blue; */
`;

export default EventBlock;
