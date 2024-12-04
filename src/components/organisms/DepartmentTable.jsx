import React from 'react';
import { Table } from 'react-bootstrap';
import DepartmentTableList from '../molecules/DepartmentTableList';

const DepartmentTable = ({ departments, onEdit, onDelete }) => {
    return (
        <Table responsive striped bordered hover>
            <thead>
                <tr>
                    <th>Department No</th>
                    <th>Department Name</th>
                    <th>Manager Employee No</th>
                    <th>Supervisor Employee No</th>
                    <th>Location No</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {departments.map((department) => (
                    <DepartmentTableList key={department.deptno} department={department} onEdit={onEdit} onDelete={onDelete} />
                ))}
            </tbody>
        </Table>
    );
};

export default DepartmentTable;
