import React from 'react';
import Label from '../atoms/Label';
import Input from '../atoms/Input';
import ErrorMessage from '../atoms/ErrorMessage';

const FormField = ({ label, id, error, ...inputProps }) => {
    return (
        <div className="mb-3">
            <Label htmlFor={id}>{label}</Label>
            <Input id={id} {...inputProps} />
            <ErrorMessage message={error} />
        </div>
    );
};

export default FormField;