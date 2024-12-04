import React from 'react';
import Button from '../atoms/Button';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

const ProjectTableList = ({ project, onEdit, onDelete }) => {
    const navigate = useNavigate();

    return (
        <tr>
            <td>{project.projno}</td>
            <td>{project.projname}</td>
            <td>{project.deptno}</td>
            <td>{project.projectlocation}</td>
            <td>
                <Button variant="primary" onClick={() => navigate(`/projects/${project.projno}`)}>
                    <FontAwesomeIcon icon={faInfoCircle}/> Details
                </Button>{' '}
                <Button variant="warning" onClick={() => onEdit(project.projno)}>
                    <FontAwesomeIcon icon={faPenToSquare}/> Edit
                </Button>{' '}
                <Button variant="danger" onClick={() => onDelete(project.projno)}>
                    <FontAwesomeIcon icon={faTrashCan}/> Delete
                </Button>
            </td>
        </tr>
    );
};

export default ProjectTableList;
