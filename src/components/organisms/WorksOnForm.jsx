import React, { useState, useEffect } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import ProjectService from "../../services/ProjectService";
import EmployeeService from "../../services/EmployeeService";
import { ToastContainer, toast } from "react-toastify";

const WorksOnForm = ({ onSubmit, initialData = {} }) => {
  const [projects, setProjects] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState({
    projno: initialData.projno || "",
    empno: initialData.empno || "",
    dateworked: initialData.dateworked || "",
    hoursworked: initialData.hoursworked || "",
  });
  const [error, setError] = useState(null);
  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProjectsAndEmployees = async () => {
      try {
        const projectResponse = await ProjectService.getAll();
        const employeeResponse = await EmployeeService.getAll();
        setProjects(projectResponse.data);
        setEmployees(employeeResponse.data);
      } catch (err) {
        setError("Failed to fetch projects or employees.");
      }
    };
    fetchProjectsAndEmployees();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    const errors = {};
    if (!formData.projno) errors.projno = 'Project is required';
    if (!formData.empno) errors.empno = 'Employee is required';
    if (!formData.dateworked) errors.dateworked = 'Date Worked is required';
    if (!formData.hoursworked) errors.hoursworked = 'Hours Worked is required';
    return errors;
};

const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
        try {
            await onSubmit(formData); // Parent-provided `onSubmit` handles the actual request
            toast.success('Works On added successfully!');
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
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="projno">
            <Form.Label>Project</Form.Label>
            <Form.Select
                name="projno"
                value={formData.projno}
                onChange={handleChange}
                disabled={loading || projects.length === 0}
            >
                <option value="">Select a Department</option>
                {loading ? (
                    <option disabled>Loading projects...</option>
                ) : projects.length === 0 ? (
                    <option disabled>No projects available</option>
                ) : (
                    projects.map((proj) => (
                        <option key={proj.projno} value={proj.projno}>
                            {proj.projname}
                        </option>
                    ))
                )}
            </Form.Select>
            {errors.projno && <div className="text-danger">{errors.proj}</div>}
        </Form.Group>

        <Form.Group controlId="empno">
            <Form.Label>Employee</Form.Label>
            <Form.Select
                name="empno"
                value={formData.empno}
                onChange={handleChange}
                disabled={loading || employees.length === 0}
            >
                <option value="">Select a Department</option>
                {loading ? (
                    <option disabled>Loading employees...</option>
                ) : employees.length === 0 ? (
                    <option disabled>No employees available</option>
                ) : (
                    employees.map((emp) => (
                        <option key={emp.empno} value={emp.empno}>
                            {emp.fname} {emp.lname}
                        </option>
                    ))
                )}
            </Form.Select>
            {errors.empno && <div className="text-danger">{errors.proj}</div>}
        </Form.Group>

        <Form.Group controlId="dateworked">
          <Form.Label>Date Worked</Form.Label>
          <Form.Control type="date" name="dateworked" value={formData.dateworked} onChange={handleChange} required />
        </Form.Group>

        <Form.Group controlId="hoursworked">
          <Form.Label>Hours Worked</Form.Label>
          <Form.Control
            type="number"
            name="hoursworked"
            value={formData.hoursworked}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Button type="submit">Submit</Button>
      </Form>
    </div>
  );
};

export default WorksOnForm;
