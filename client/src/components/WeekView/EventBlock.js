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
  /* margin: auto; */
  top: ${(props) => props.start}%;
  height: ${(props) => props.end - props.start}%;
  width: 100%;
  background-color: ${(props) => {
    const colors = ['#3d5a80', '#98c1d9', '#e0fbfc', '#ee6c4d', '#293241'];
    return colors[props.color];
  }};
  /* border-color: blue; */
  z-index: 5;
`;

export default EventBlock;
