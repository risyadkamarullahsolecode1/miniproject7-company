import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

const EmployeeSupervisorDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="container">
      <h1>Employee Supervisor Dashboard</h1>
      <div className="d-grid gap-3">
        <Button variant="primary" onClick={() => navigate("/employees")}>
          View Supervised Employees
        </Button>
        <Button variant="primary" onClick={() => navigate("/workson")}>
          Manage Project Assignments for Employees
        </Button>
        <Button variant="primary" onClick={() => navigate("/departments")}>
          View Relevant Department Information
        </Button>
        <Button variant="primary" onClick={() => navigate("/projects")}>
          View Relevant Project Information
        </Button>
      </div>
    </div>
  );
};

export default EmployeeSupervisorDashboard;

