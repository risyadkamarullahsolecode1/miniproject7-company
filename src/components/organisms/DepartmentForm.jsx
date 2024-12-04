import React, { useState, useEffect } from 'react';
import DepartmentService from '../../services/DepartmentService'; // Assuming DepartmentService exists
import EmployeeService from '../../services/EmployeeService';
import LocationService from '../../services/LocationService';
import { Form, Button, Alert } from 'react-bootstrap';
import FormField from '../molecules/FormField'
import { toast, ToastContainer } from 'react-toastify';

const DepartmentForm = ({ onSubmit, initialData = {} }) => {
    const [formData, setFormData] = useState({
        deptname: initialData.deptname || '',
        mgrempno: initialData.mgrempno || null,
        spvempno: initialData.spvempno || null,
        location: initialData.location || null,
    });
    const [showAlert, setShowAlert] = useState(false);
    const [employees, setEmployees] = useState([]);
    const [locations, setLocations] = useState([]);
    const [errors, setErrors] = useState({});
    const [errorMessage, setErrorMessage] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                setLoading(true);
                const response = await EmployeeService.getAll(); // Assuming this method exists
                setEmployees(response.data);
                setLoading(false);
            } catch (err) {
                setLoading(false);
                toast.error('Failed to fetch employees.');
                console.error(err);
            }
        };

        const fetchLocations = async () => {
            try {
                setLoading(true);
                const response = await LocationService.getAll(); // Assuming this method exists
                setLocations(response.data);
                setLoading(false);
            } catch (err) {
                setLoading(false);
                toast.error('Failed to fetch employees.');
                console.error(err);
            }
        };

        fetchEmployees();
        fetchLocations();
    }, []);

    const validate = () => {
        const errors = {};
        if (!formData.deptname) errors.deptname = 'Department name is required';
        return errors;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value === '' ? null : value, // Send null if the field is empty
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length === 0) {
            try {
                await onSubmit(formData); // Parent-provided `onSubmit` handles the actual request
                toast.success('Employee added successfully!');
            } catch (err) {
                if (err.response && err.response.status === 400) {
                    setErrorMessage(err.response.data.message); // Backend error message
                    toast.error(err.response.data.message);
                } else {
                    setErrorMessage('An unexpected error occurred.');
                    toast.error('An unexpected error occurred.');
                }
            }
        } else {
            setErrors(validationErrors);
        }
    };

    return (
        <div>
            <ToastContainer />
            {showAlert && <Alert variant="success">Department saved successfully!</Alert>}
            <Form onSubmit={handleSubmit}>
                <FormField
                    label="Department Name"
                    id="deptname"
                    value={formData.deptname}
                    name="deptname"
                    onChange={handleChange}
                    error={errors.deptname}
                />

                <Form.Group controlId="mgrempno">
                    <Form.Label>Manager (Employee)</Form.Label>
                    <Form.Select
                        name="mgrempno"
                        value={formData.mgrempno}
                        onChange={handleChange}
                    >
                        <option value="">Select Manager</option>
                        {employees.map(emp => (
                            <option key={emp.empno} value={emp.empno}>
                                {emp.fname} {emp.lname}
                            </option>
                        ))}
                    </Form.Select>
                </Form.Group>

                <Form.Group controlId="spvempno">
                    <Form.Label>Supervisor (Employee)</Form.Label>
                    <Form.Select
                        name="spvempno"
                        value={formData.spvempno}
                        onChange={handleChange}
                    >
                        <option value="">Select Supervisor</option>
                        {employees.map(emp => (
                            <option key={emp.empno} value={emp.empno}>
                                {emp.fname} {emp.lname}
                            </option>
                        ))}
                    </Form.Select>
                </Form.Group>

                <Form.Group controlId="location">
                    <Form.Label>Location</Form.Label>
                    <Form.Select
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                    >
                        <option value="">Select Location</option>
                        {locations.map(loc => (
                            <option key={loc.id} value={loc.id}>
                                {loc.locations}
                            </option>
                        ))}
                    </Form.Select>
                </Form.Group>

                <Button type="submit">Submit</Button>
            </Form>
        </div>
    );
};

export default DepartmentForm;
