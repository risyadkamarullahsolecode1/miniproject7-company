import React from 'react';
import CustomButton from '../atoms/Button';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

const LocationTableList = ({ location, onEdit, onDelete }) => {
    const navigate = useNavigate();

    return (
        <tr>
            <td>{location.id}</td>
            <td>{location.locations}</td>
            <td>
                <CustomButton CustomButton variant="primary" onClick={() => navigate(`/location/${location.id}`)}>
                    <FontAwesomeIcon icon={faInfoCircle}/> Details
                </CustomButton>{' '}
                <CustomButton variant="warning" onClick={() => onEdit(location.id)}>
                    <FontAwesomeIcon icon={faPenToSquare}/> Edit
                </CustomButton>{' '}
                <CustomButton variant="danger" onClick={() => onDelete(location.id)}>
                    <FontAwesomeIcon icon={faTrashCan}/> Delete
                </CustomButton>
            </td>
        </tr>
    );
};

export default LocationTableList;
