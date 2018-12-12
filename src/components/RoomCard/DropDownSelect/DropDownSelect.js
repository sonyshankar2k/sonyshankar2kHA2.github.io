import React from 'react';

import { Label } from '../Label'
import { Select } from '../Select'
import { Option } from '../Option'
import { FlexGrow } from '../FlexGrow'


const DropDownSelect = ({label, options, isDisabled, value, callBack}) => (

    <FlexGrow>
        <Label>{label}</Label>
        <Select onChange={(e) => callBack(e)} disabled={isDisabled} value={value}>
            { options.map((option,i) => {
               return (
                   <Option key={i} value={option}>{option}</Option>
               )
            })}
        </Select>
    </FlexGrow>
)

export default DropDownSelect;
