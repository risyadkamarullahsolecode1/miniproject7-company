import React, { useState, useEffect } from 'react';
import FormField from '../molecules/FormField';
import CustomButton from '../atoms/Button';
import { Alert, Container, Form } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import DepartmentService from '../../services/DepartmentService'; // Assuming DepartmentService exists
import EmployeeService from '../../services/EmployeeService';
import 'react-toastify/dist/ReactToastify.css';

const EmployeeForm = ({ onSubmit, initialData = {} }) => {
    const [formData, setFormData] = useState({
        fname: initialData.fname || '',
        lname: initialData.lname || '',
        address: initialData.address || '',
        dob: initialData.dob || '',
        sex: initialData.sex || '',
        position: initialData.position || '',
        deptno: initialData.deptno || '',
        employeetype: initialData.employeetype || '',
        level: initialData.level || '',
        lastupdateddate: initialData.lastupdateddate || '',
        nik: initialData.nik || '',
        status: initialData.status || '',
        statusreason: initialData.statusreason || '',
        salary: initialData.salary || '',
    });
    const [departments, setDepartments] = useState([]);
    const [errors, setErrors] = useState({});
    const [errorMessage, setErrorMessage] = useState(null);
    const [loading, setLoading] = useState(false);

    // Fetch departments from API on component mount
    useEffect(() => {
        const fetchDepartments = async () => {
            try {
                setLoading(true);
                const response = await DepartmentService.getAll(); // Assuming this method exists
                setDepartments(response.data);
                setLoading(false);
            } catch (err) {
                setLoading(false);
                toast.error('Failed to fetch departments.');
                console.error(err);
            }
        };

        fetchDepartments();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validate = () => {
        const errors = {};
        if (!formData.fname) errors.fname = 'First name is required';
        if (!formData.lname) errors.lname = 'Last name is required';
        if (!formData.address.trim()) errors.address = 'Address is required';
        if (!formData.dob) errors.dob = 'Date of Birth is required';
        if (!formData.sex) errors.sex = 'Sex is required';
        if (!formData.position.trim()) errors.position = 'Position is required';
        if (!formData.deptno) errors.deptno = 'Department is required';
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
        <Container className="mb-5 pb-5">
            <ToastContainer />
            {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
            <Form onSubmit={handleSubmit}>
                <FormField
                    label="First Name"
                    id="fname"
                    value={formData.fname}
                    name="fname"
                    onChange={handleChange}
                    error={errors.fname}
                />
                <FormField
                    label="Last Name"
                    id="lname"
                    value={formData.lname}
                    name="lname"
                    onChange={handleChange}
                    error={errors.lname}
                />
                <FormField
                    label="Address"
                    id="address"
                    value={formData.address}
                    name="address"
                    onChange={handleChange}
                    error={errors.address}
                />
                <FormField
                    label="Date of Birth"
                    id="dob"
                    type="date"
                    value={formData.dob}
                    name="dob"
                    onChange={handleChange}
                    error={errors.dob}
                />
                <div>
                    <Form.Label>Sex</Form.Label>
                    <div>
                        <Form.Check
                            inline
                            type="radio"
                            id="male"
                            name="sex"
                            value="Male"
                            label="Male"
                            checked={formData.sex === 'Male'}
                            onChange={handleChange}
                        />
                        <Form.Check
                            inline
                            type="radio"
                            id="female"
                            name="sex"
                            value="Female"
                            label="Female"
                            checked={formData.sex === 'Female'}
                            onChange={handleChange}
                        />
                    </div>
                    {errors.sex && <div className="text-danger">{errors.sex}</div>}
                </div>
                <FormField
                    label="Position"
                    id="position"
                    value={formData.position}
                    name="position"
                    onChange={handleChange}
                    error={errors.position}
                />
                <Form.Group controlId="deptno">
                    <Form.Label>Department</Form.Label>
                    <Form.Select
                        name="deptno"
                        value={formData.deptno}
                        onChange={handleChange}
                        disabled={loading || departments.length === 0}
                    >
                        <option value="">Select a Department</option>
                        {loading ? (
                            <option disabled>Loading departments...</option>
                        ) : departments.length === 0 ? (
                            <option disabled>No departments available</option>
                        ) : (
                            departments.map((dept) => (
                                <option key={dept.deptno} value={dept.deptno}>
                                    {dept.deptname}
                                </option>
                            ))
                        )}
                    </Form.Select>
                    {errors.deptno && <div className="text-danger">{errors.deptno}</div>}
                </Form.Group>
                <FormField
                    label="Employee Type"
                    id="employeetype"
                    value={formData.employeetype}
                    name="employeetype"
                    onChange={handleChange}
                    error={errors.employeetype}
                />
                <FormField
                    label="Level"
                    id="level"
                    type="number"
                    value={formData.level}
                    name="level"
                    onChange={handleChange}
                    error={errors.level}
                />
                <FormField
                    label="Last Updated Date"
                    id="lastupdateddate"
                    type="datetime-local"
                    value={formData.lastupdateddate}
                    name="lastupdateddate"
                    onChange={handleChange}
                    error={errors.lastupdateddate}
                    disabled={!!initialData.lastupdateddate} // Disable only if `initialData` is provided
                />
                <FormField
                    label="Nik"
                    id="nik"
                    type="number"
                    value={formData.nik}
                    name="nik"
                    onChange={handleChange}
                    error={errors.nik}
                />
                <FormField
                    label="Status"
                    id="status"
                    value={formData.status}
                    name="status"
                    onChange={handleChange}
                    error={errors.status}
                />
                <FormField
                    label="Status Reason"
                    id="statusreason"
                    value={formData.statusreason}
                    name="statusreason"
                    onChange={handleChange}
                    error={errors.statusreason}
                />
                <FormField
                    label="Salary"
                    id="salary"
                    type="number"
                    value={formData.salary}
                    name="salary"
                    onChange={handleChange}
                    error={errors.salary}
                />
                <CustomButton type="submit">Submit</CustomButton>
            </Form>
        </Container>
    );
};

export default EmployeeForm;
