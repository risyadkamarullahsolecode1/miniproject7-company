import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import EmployeeService from '../../services/EmployeeService';
import DepartmentService from '../../services/DepartmentService';
import DependantService from '../../services/DependantService';
import { Alert, Button, Card, Container, Row, Col } from 'react-bootstrap';
import DependentTable from '../organisms/DependentTable';
import DependentForm from '../organisms/DependentForm';

const EmployeeDetails = () => {
    const { empNo } = useParams();
    const [employee, setEmployee] = useState(null);
    const [departments, setDepartments] = useState(null);
    const [dependants, setDependants] = useState(null);
    const [error, setError] = useState(null);
    const [editingDependentId, setEditingDependentId] = useState(null); // Track editing state
    const navigate = useNavigate();

    const fetchEmployeeDetails = async () => {
        try {
            const response = await EmployeeService.get(empNo);
            setEmployee(response.data);
        } catch (err) {
            setError('Failed to fetch employee details.');
        }
    };

    const fetchDependents = async () => {
        try {
            const response = await DependantService.getDependentsByEmployee(empNo);
            console.log('Dependents response:', response.data); // Log the data here
            setDependants(response.data);
        } catch (error) {
            console.error('Failed to fetch dependents:', error);
            setError('Failed to fetch dependents.');
        }
    };

    useEffect(() => {
        fetchEmployeeDetails();
        fetchDependents();
    }, [empNo]);

    const handleEditDependent = (dependentId) => {
        setEditingDependentId(dependentId); // Set dependent ID for editing
    };

    const handleDependentAdded = () => {
        fetchDependants(); // Refresh dependents list after adding or updating
        setEditingDependentId(null); // Close the form after updating
    };

    const handleDeleteDependent = (dependentId) => {
        setDependants(dependents.filter((dep) => dep.dependentNo !== dependentId)); // Update state after delete
    };

    if (error) return <Alert variant="danger">{error}</Alert>;
    if (!employee) return <p>Loading...</p>;

    return (
        <Container fluid className="mb-5">
            <Row className="mb-3">
                <Col>
                    <Button variant="danger" onClick={() => navigate(`/employees/deactivate/${employee.empno}`)}>
                        Deactivate Employee
                    </Button>
                </Col>
                <Col>
                    <Button variant="primary" onClick={() => setEditingDependentId(null)}>
                        Add Dependant
                    </Button>
                </Col>
            </Row>

            <Card className="fw-semibold">
                <Card.Title className="text-center mt-2 fw-bolder">Employee Details</Card.Title>
                <Card.Body>Employee No:{employee.empno}</Card.Body>
                <Card.Body>Name: {employee.fname} {employee.lname}</Card.Body>
                <Card.Body>Sex: {employee.sex}</Card.Body>
                <Card.Body>Position: {employee.position}</Card.Body>
                <Card.Body>Date of Birth: {employee.dob}</Card.Body>
                <Card.Body>Address: {employee.address}</Card.Body>
                <Card.Body>Employment Type: {employee.employeetype}</Card.Body>
                <Card.Body>Department No: {employee.deptno}</Card.Body>
                <Card.Body>Salary : {employee.salary}</Card.Body>
                <Card.Body>Status : {employee.status}</Card.Body>
                <Card.Body>Status Reason: {employee.statusreason}</Card.Body>
                <Card.Body>Department Name: {employee.deptName}</Card.Body>
                <Card.Body>Supervisor Name: {employee.spvEmpName}</Card.Body>
            </Card>

            {editingDependentId ? (
                <DependentForm dependentId={editingDependentId} onDependentAdded={handleDependentAdded} />
            ) : (
                <div>
                    <h3>Dependents</h3>
                    <DependentTable dependents={dependants} onEdit={handleEditDependent} />
                </div>
            )}
        </Container>
    );
};

export default EmployeeDetails;
