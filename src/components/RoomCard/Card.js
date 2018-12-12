import styled from 'styled-components'



export const Card = styled.div`
display: inline-block;
background-color: ${props => props.isDisabled ? '#dbdbe3' : 'white'};
opacity: ${props => props.isDisabled ? '.9' : '1'};
border-color: ${props => props.isDisabled ? '#cccfde' : '#e8e7e8'};
border-width: 3px;
border-style: solid;
margin: 10px 0 0 10px;
flex-grow: 1;
height: 200px;
width: calc(100% * (1/4) - 10px - 6px);
border-radius: 5px;
box-shadow: ${props => props.isDisabled ? 'none' : '0 2.5em 0.9em -2em rgba(85, 85, 85, 0.18)'};
transition: box-shadow 0.2s ease;
@media (max-width: 800px) {
    width: 100%;
}
`;
