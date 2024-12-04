import React from 'react';

const ErrorMessage = ({ message }) => {
    return message ? <div className="text-danger">{message}</div> : null;
};

export default ErrorMessage;