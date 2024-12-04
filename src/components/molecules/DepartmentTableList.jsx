import React from 'react';
import CustomButton from '../atoms/Button';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

const DepartmentTableList = ({ department, onEdit, onDelete }) => {
    const navigate = useNavigate();

    return (
        <tr>
            <td>{department.deptno}</td>
            <td>{department.deptname}</td>
            <td>{department.mgrempno}</td>
            <td>{department.spvempno}</td>
            <td>{department.location}</td>
            <td>
                <CustomButton CustomButton variant="primary" onClick={() => navigate(`/departments/${department.deptno}`)}>
                    <FontAwesomeIcon icon={faInfoCircle}/> Details
                </CustomButton>{' '}
                <CustomButton variant="warning" onClick={() => onEdit(department.deptno)}>
                <FontAwesomeIcon icon={faPenToSquare}/> Edit
                </CustomButton>{' '}
                <CustomButton variant="danger" onClick={() => onDelete(department.deptno)}>
                <FontAwesomeIcon icon={faTrashCan}/> Delete
                </CustomButton>
            </td>
        </tr>
    );
};

export default DepartmentTableList;
