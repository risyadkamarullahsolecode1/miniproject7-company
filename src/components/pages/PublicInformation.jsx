import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import EmployeeService from "../../services/EmployeeService";

const PublicInformation = () => {
  const [employeeDetails, setEmployeeDetails] = useState(null);

  useEffect(() => {
    const fetchEmployeeDetails = async () => {
      try {
        const response = await EmployeeService.details();
        setEmployeeDetails(response.data);
      } catch (error) {
        console.error("Error fetching employee details:", error);
      }
    };

    fetchEmployeeDetails();
  }, []);

  if (!employeeDetails) {
    return <div>Loading...</div>;
  }

  const {
    firstName,
    lastName,
    email,
    phoneNumber,
    address,
    dob,
    sex,
    position,
    status,
    department,
    assignments,
    dependents,
  } = employeeDetails;

  return (
    <div className="container">
      <h1>Employee Details</h1>
      <div>
        <h2>Personal Information</h2>
        <p>
          <strong>Name:</strong> {firstName} {lastName}
        </p>
        <p>
          <strong>Email:</strong> {email}
        </p>
        <p>
          <strong>Phone:</strong> {phoneNumber}
        </p>
        <p>
          <strong>Address:</strong> {address}
        </p>
        <p>
          <strong>Date of Birth:</strong> {dob}
        </p>
        <p>
          <strong>Gender:</strong> {sex}
        </p>
        <p>
          <strong>Position:</strong> {position}
        </p>
        <p>
          <strong>Status:</strong> {status}
        </p>
      </div>

      <div>
        <h2>Department Information</h2>
        {department ? (
          <div>
            <p>
              <strong>Department Name:</strong> {department.departmentName}
            </p>
            <p>
              <strong>Manager ID:</strong> {department.managerId || "N/A"}
            </p>
            <p>
              <strong>Supervisor ID:</strong> {department.supervisorId}
            </p>
          </div>
        ) : (
          <p>No department assigned.</p>
        )}
      </div>

      <div>
        <h2>Assignments</h2>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Project No</th>
              <th>Employee No</th>
              <th>Total Hours</th>
              <th>Date Worked</th>
            </tr>
          </thead>
          <tbody>
            {assignments.map((assignment, index) => (
              <tr key={index}>
                <td>{assignment.projectNo}</td>
                <td>{assignment.empNo}</td>
                <td>{assignment.totalHours}</td>
                <td>{assignment.dateWorked}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      <div>
        <h2>Dependents</h2>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Dependent ID</th>
              <th>Name</th>
              <th>Relationship</th>
              <th>Date of Birth</th>
            </tr>
          </thead>
          <tbody>
            {dependents.map((dependent, index) => (
              <tr key={index}>
                <td>{dependent.dependentId}</td>
                <td>{dependent.name}</td>
                <td>{dependent.relationship}</td>
                <td>{dependent.dob}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default PublicInformation;
