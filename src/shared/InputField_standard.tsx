import React, { Component } from 'react'
import Error from './Error';
type Myprop = {
    label: string
    placeholder: string;
    className: string;
    type: string;
    Onchangevalue: (value: string, ctrlName: string) => void;
    name: string;
}

function InputField_standard(props: Myprop) {
    const ChangeValue = (e: React.FormEvent<HTMLInputElement>): void => {
        const value = e.currentTarget.value;
        props.Onchangevalue(value, props.name)
    }
    return (<div>
        <label>{props.label}</label>
        <input placeholder={props.placeholder} className={props.className} type=
            {props.type} onChange={ChangeValue}>
        </input>
    </div>);
}

export default InputField_standard;