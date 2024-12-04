import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DepartmentService from '../../services/DepartmentService';
import { Table, Button, Alert, Card, Container } from 'react-bootstrap';

const DepartmentDetails = () => {
    const { deptNo } = useParams(); // Extract the department number from the URL
    const navigate = useNavigate();
    const [department, setDepartment] = useState(null);
    const [employees, setEmployees] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        console.log("deptNo:", deptNo); // Debugging to check if deptNo is defined

        if (!deptNo) {
            setError("Invalid department number.");
            return;
        }

        const fetchDepartmentDetails = async () => {
            try {
                const deptResponse = await DepartmentService.get(deptNo);
                setDepartment(deptResponse.data);
            } catch (err) {
                setError("Failed to fetch department details.");
                console.error(err);
            }
        };

        const fetchEmployeesInDepartment = async () => {
            try {
                const empResponse = await DepartmentService.getEmployee(deptNo);
                setEmployees(empResponse.data);
            } catch (err) {
                setError("Failed to fetch employees in this department.");
                console.error(err);
            }
        };

        fetchDepartmentDetails();
        fetchEmployeesInDepartment();
    }, [deptNo]);

    if (error) {
        return <Alert variant="danger">{error}</Alert>;
    }

    if (!department) {
        return <p>Loading...</p>;
    }

    return (
        <Container>
            {/* Department Details */}
            <Card className="text-center mb-4">
                <Card.Title className="fw-bolder">Department Details</Card.Title>
                <Card.Body>
                    <strong>Department No:</strong> {department.deptno}<br />
                    <strong>Department Name:</strong> {department.deptname}<br />
                    <strong>Manager Employee No:</strong> {department.mgrempno}<br />
                    <strong>Supervisor Employee No:</strong> {department.spvempno}
                </Card.Body>
            </Card>

            {/* Employee List */}
            <h2 className="text-center mt-3">Employees in this Department</h2>
            {employees.length > 0 ? (
                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>Employee No</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Position</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map((employee) => (
                            <tr key={employee.empno}>
                                <td>{employee.empno}</td>
                                <td>{employee.fname}</td>
                                <td>{employee.lname}</td>
                                <td>{employee.position}</td>
                                <td>
                                    <Button variant="success" onClick={() => navigate(`/employees/${employee.empNo}`)}>
                                        View Details
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            ) : (
                <p>No employees found for this department.</p>
            )}
        </Container>
    );
};

export default DepartmentDetails;
