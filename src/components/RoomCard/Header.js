import styled from 'styled-components'


export const Header = styled.p`
  background-color: ${props => props.isDisabled ? 'transparent' : '#e8e7e8'};
  font-size: 20px;
  margin: 0px;
  padding: 5px;
`;
