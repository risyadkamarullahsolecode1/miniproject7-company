import React, { useState, useEffect } from 'react';
import ProjectService from '../../services/ProjectService';
import DepartmentService from '../../services/DepartmentService';
import LocationService from '../../services/LocationService';
import { Form, Button, Alert, Container } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import CustomButton from '../atoms/Button';

const ProjectForm = ({ onSubmit, initialData = {} }) => {
    const [formData, setFormData] = useState({
        projname: initialData.projname || '',
        deptno: initialData.deptno || '',
        projectlocation: initialData.projectlocation || '',
    });
    const [departments, setDepartments] = useState([]);
    const [locations, setLocations] = useState([]);
    const [errors, setErrors] = useState({});
    const [errorMessage, setErrorMessage] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchDepartments = async () => {
            try {
                setLoading(true);
                const response = await DepartmentService.getAll();
                setDepartments(response.data);
                setLoading(false);
            } catch (err) {
                setLoading(false);
                toast.error('Failed to fetch departments.');
            }
        };

        const fetchLocations = async () => {
            try {
                setLoading(true);
                const response = await LocationService.getAll();
                setLocations(response.data);
                setLoading(false);
            } catch (err) {
                setLoading(false);
                toast.error('Failed to fetch locations.');
            }
        };

        fetchDepartments();
        fetchLocations();
    }, []);

    const validate = () => {
        const errors = {};
        if (!formData.projname) errors.projname = 'Project name is required';
        if (!formData.deptno) errors.deptno = 'Department is required';
        if (!formData.projectlocation) errors.projectlocation = 'Project Location is required';
        return errors;
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
        <Container>
        <ToastContainer />
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="projname">
                <Form.Label>Project Name</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter project name"
                    value={formData.projname}
                    onChange={(e) => setFormData({ ...formData, projname: e.target.value })}
                />
            </Form.Group>

            <Form.Group controlId="deptno">
                <Form.Label>Department</Form.Label>
                <Form.Control
                    as="select"
                    value={formData.deptno}
                    onChange={(e) => setFormData({ ...formData, deptno: e.target.value })}
                >
                    <option value="">Select Project</option>
                    {departments.map((dept) => (
                        <option key={dept.deptno} value={dept.deptno}> 
                            {dept.deptname}
                        </option>
                    ))}
                </Form.Control>
            </Form.Group>

            <Form.Group controlId="projectlocation">
                <Form.Label>Location</Form.Label>
                <Form.Control
                    as="select"
                    value={formData.projectlocation}
                    onChange={(e) => setFormData({ ...formData, projectlocation: e.target.value })}
                >
                    <option value="">Select Location</option>
                    {locations.map((loc) => (
                        <option key={loc.id} value={loc.id}>
                            {loc.locations}
                        </option>
                    ))}
                </Form.Control>
            </Form.Group>

            <CustomButton type="submit">Submit</CustomButton>
        </Form>
        </Container>
    );
};

export default ProjectForm;
