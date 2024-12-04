import React from 'react';
import EmployeeForm from '../organisms/EmployeeForm';
import EmployeeService from '../../services/EmployeeService';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Container } from 'react-bootstrap';

const AddEmployee = () => {
    const navigate = useNavigate();

    const handleSubmit = async (employeeData) => {
        try {
            // Call the service to add the employee
            await EmployeeService.create(employeeData);
            toast.success("Employee added successfully!");
            navigate('/employees'); // Navigate to employees list
        } catch (error) {
            console.error("Error adding employee:", error);
            toast.error(error.response?.data?.message || "Failed to add employee");
        }
    };

    return (
        <Container>
            <h2>Create New Employee</h2>
            <EmployeeForm onSubmit={handleSubmit} />
        </Container>
    );
};

export default AddEmployee;
