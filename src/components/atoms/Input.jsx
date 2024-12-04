import React from 'react';
import { Form } from 'react-bootstrap';

const Input = ({ type = 'text', placeholder = '', value, onChange, ...props }) => {
    return (
        <Form.Control
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            {...props}
        />
    );
};

export default Input;