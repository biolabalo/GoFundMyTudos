import styled from "styled-components";

const Dot = styled.div`
  background: ${props => props.backgroundColor || "yellow"};
  height: 35px;
  width: 35px;
  border-radius: 50%;
  display: inline-block;
  cursor: pointer;
`;

export default Dot;
