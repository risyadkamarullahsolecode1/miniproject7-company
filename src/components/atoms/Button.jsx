import React from 'react';
import { Button as CustomNewButton } from 'react-bootstrap';

const CustomButton = ({ variant = 'primary', children, ...props }) => {
    return (
        <CustomNewButton variant={variant} {...props}>
            {children}
        </CustomNewButton>
    );
};

export default CustomButton;