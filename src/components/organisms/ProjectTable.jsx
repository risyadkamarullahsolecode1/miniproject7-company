import React from 'react';
import ProjectTableList from '../molecules/ProjectTableList';
import { Table } from 'react-bootstrap';

const EmployeeTable = ({ projects, onEdit, onDelete }) => {
    return (
        <Table responsive striped bordered hover>
            <thead>
                <tr>
                    <th>Project No</th>
                    <th>Project Name</th>
                    <th>Department No</th>
                    <th>Location No</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {projects.map((project) => (
                    <ProjectTableList key={project.projNo} project={project} onEdit={onEdit} onDelete={onDelete} />
                ))}
            </tbody>
        </Table>
    );
};

export default EmployeeTable;