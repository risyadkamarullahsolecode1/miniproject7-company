import React from 'react';
import EmployeeTableList from '../molecules/EmployeeTableList';
import { Table } from 'react-bootstrap';

const EmployeeTable = ({ employees = [], handleSort, getSortIcon }) => {
    return (
        <Table responsive striped bordered hover>
            <thead>
                <tr>
                    <th onClick={() => handleSort('EmpNo')} style={{ cursor: 'pointer' }}>
                        No {getSortIcon('EmpNo')}
                    </th>
                    <th onClick={() => handleSort('Fname')} style={{ cursor: 'pointer' }}>
                        Employee Name {getSortIcon('Fname')}
                    </th>
                    <th onClick={() => handleSort('Position')} style={{ cursor: 'pointer' }}>
                        Position {getSortIcon('Position')}
                    </th>
                    <th onClick={() => handleSort('DeptName')} style={{ cursor: 'pointer' }}>
                        Department Name {getSortIcon('DeptName')}
                    </th>
                    <th onClick={() => handleSort('status')} style={{ cursor: 'pointer' }}>
                        Status {getSortIcon('status')}
                    </th>
                    <th onClick={() => handleSort('EmployeeType')} style={{ cursor: 'pointer' }}>
                        Employee Type {getSortIcon('EmployeeType')}
                    </th>
                    <th onClick={() => handleSort('LastUpdatedDate')} style={{ cursor: 'pointer' }}>
                        Last Updated Date {getSortIcon('LastUpdatedDate')}
                    </th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {employees.map((employee) => (
                    <EmployeeTableList
                        key={employee.empNo} // Use unique identifier like empNo
                        employee={employee}
                    />
                ))}
            </tbody>
        </Table>
    );
};

export default EmployeeTable;
