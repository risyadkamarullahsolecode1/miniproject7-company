import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import EmployeeService from "../../services/EmployeeService";

const EmployeeAssignments = () => {
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    const fetchEmployeeDetails = async () => {
      try {
        const response = await EmployeeService.details();
        setAssignments(response.data.assignments || []); // Fetch only assignments
      } catch (error) {
        console.error("Error fetching assignments:", error);
      }
    };

    fetchEmployeeDetails();
  }, []);

  if (!assignments || assignments.length === 0) {
    return <div>No assignments available.</div>;
  }

  return (
    <div className="container">
      <h2>Employee Assignments</h2>
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
              <td>{new Date(assignment.dateWorked).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default EmployeeAssignments;
