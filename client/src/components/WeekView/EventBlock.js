/* eslint-disable import/prefer-default-export */

import styled from 'styled-components';

const EventBlock = styled.div`
  top: ${(props) => props.start};
  height: ${(props) => { return props.start - props.end; }}%;
  width: 20px;
  color: ${(props) => props.event ? 'organe' : 'grey'}%;
`;

export default EventBlock;
