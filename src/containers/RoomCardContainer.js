import React, { Component } from 'react';

import { Button } from '../components/RoomCard/Button'
import { Input } from '../components/RoomCard/Input'
import { Row } from '../components/RoomCard/Row'
import { Container } from '../components/RoomCard/Container'
import { Flex } from '../components/RoomCard/Flex'
import { Card } from '../components/RoomCard/Card'
import { Header } from '../components/RoomCard/Header'

import { setStorage, getStorage } from '../utils/localStorage'

import DropDownSelect from '../components/RoomCard/DropDownSelect/DropDownSelect'


// Default state constant for easier readability
const defaultState = [
    {
        label: 'Room 1',
        adults: 1,
        children: 0,
        isChecked: false,
        isDisabled: false
    },
    {
        label: 'Room 2',
        adults: 1,
        children: 0,
        isChecked: false,
        isDisabled: true
    },
    {
        label: 'Room 3',
        adults: 1,
        children: 0,
        isChecked: false,
        isDisabled: true
    },
    {
        label: 'Room 4',
        adults: 1,
        children: 0,
        isChecked: false,
        isDisabled: true
    }
];

// Dropdown constant to keep code DRY
const dropDownOptions = {
    adult: {
        label: 'Adults (18+)',
        values: [1,2]
    },
    children: {
        label: 'Children (0-17)',
        values: [0,1,2]
    }
}

class RoomCardContainer extends Component {

    constructor(props){
        super(props);

        // Use local storage if state was saved if not use default state
        this.state = {
            rooms: getStorage('rooms') || defaultState
        }

        this.saveRooms = this.saveRooms.bind(this);

    }

    toggleCheckedState(begin, end, isChecked, rooms) {
        let roomsObj = [...rooms];
        let roomsArr = roomsObj.slice(begin, end);

        // Iterate through the rooms and toggle checked state. Set adults and children to default values if checkbox is unclicked
        roomsArr.forEach((room) => {
            room["isChecked"]  = isChecked;
            room["isDisabled"] = !isChecked;
            room["adults"]     = 1;
            room["children"]   = 0;
        });

        // Set State with newly update Obj
        this.setState({rooms: roomsObj});
    }

    toggleCheckbox(e, room) {
        const newObj   = {...room};
        const rooms    = this.state.rooms;

        // Get Index of room that was selected
        let roomIndex = rooms.findIndex((element) => element.label === newObj.label);

        // Toggle isChecked key of the room obj
        newObj.isChecked = e.target.checked;

        // Toggle checked state
        if(newObj.isChecked){
            this.toggleCheckedState(1, roomIndex + 1, newObj.isChecked, rooms);
        } else {
            this.toggleCheckedState(roomIndex, rooms.length, newObj.isChecked, rooms);
        }

    }

    toggleDropDown(e, roomLabel, person) {
        const rooms = this.state.rooms;
        const val   = e.target.value;

        rooms.filter(filteredRoom => {

            // Find the targeted room
            if(filteredRoom.label === roomLabel){

                // Find which dropdown was toggled and set the state obj
                if ( person === 'adult') {
                    filteredRoom.adults = parseInt(val, 10);
                }
                if ( person === 'children') {
                    filteredRoom.children = parseInt(val, 10);
                }

                // Set state for specific room
                this.setState({rooms:[...this.state.rooms,...filteredRoom]});

            }

            // Arrow functions require a return value
            return null;
        })
    }

    saveRooms() {
        // Sets local copy of state so users data will be saved
        setStorage('rooms', this.state.rooms);
    }

    render() {
        const rooms    = this.state.rooms;
        const adult    = dropDownOptions.adult;
        const children = dropDownOptions.children;

        return (
            <Container>
                <Row>
                    {rooms.map((room,key) => {

                        return (
                            <Card key={key} isDisabled={room.isDisabled}>

                                {key !== 0 &&
                                    <Input
                                    type="checkbox"
                                    checked={room.isChecked}
                                    onChange={(e) => this.toggleCheckbox(e, room)} />
                                 }

                                <Header isDisabled={room.isDisabled}>
                                    {room.label}
                                </Header>

                                <Flex>
                                    <DropDownSelect
                                        label={adult.label}
                                        options={adult.values}
                                        isDisabled={room.isDisabled}
                                        value={room.adults}
                                        callBack={(e) => this.toggleDropDown(e, room.label, 'adult') } />
                                    <DropDownSelect
                                        label={children.label}
                                        options={children.values}
                                        isDisabled={room.isDisabled}
                                        value={room.children}
                                        callBack={(e) => this.toggleDropDown(e, room.label, 'children') } />
                                </Flex>
                            </Card>
                        )
                    })}
                    <Button onClick={this.saveRooms}>Submit</Button>
                </Row>
            </Container>
        );
    }
}

export default RoomCardContainer;
