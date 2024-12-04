import React, { useState, useEffect } from "react";
import { Table, Container, Button, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import axios from "axios";
import { Link } from "react-router-dom";
import DepartmentService from "../../services/DepartmentService";

const EmployeeSameDepartment = () => {
  const [employees, setEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch employees in the same department
  const fetchEmployees = async () => {
    try {
      setIsLoading(true);
      const response = await DepartmentService.getSameDepartment(); // Update endpoint as per your API
      setEmployees(response.data);
      setIsLoading(false);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch employees.");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  if (isLoading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" />
        <p>Loading employees...</p>
      </Container>
    );
  }

  return (
    <Container>
      <h2 className="my-4">Employees in the Same Department</h2>
      {employees.length === 0 ? (
        <p>No employees found in the same department.</p>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Employee Number</th>
              <th>Name</th>
              <th>Email</th>
              <th>Position</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.empNo}>
                <td>{employee.empNo}</td>
                <td>
                  {employee.firstName} {employee.lastName}
                </td>
                <td>{employee.email}</td>
                <td>{employee.position}</td>
                <td>
                  <Link to={`/employees/${employee.empNo}`}>
                    <Button variant="info" size="sm">
                      View Details
                    </Button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default EmployeeSameDepartment;
