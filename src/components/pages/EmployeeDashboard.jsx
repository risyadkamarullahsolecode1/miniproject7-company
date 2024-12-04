import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

const EmployeeDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="container">
      <h1>Employee Dashboard</h1>
      <div className="d-grid gap-3">
        <Button variant="primary" onClick={() => navigate("/employees/profile")}>
          View and Update Profile
        </Button>
        <Button variant="primary" onClick={() => navigate("/employees/assignments")}>
          View Project Assignments
        </Button>
        <Button variant="primary" onClick={() => navigate("/employees/public-info")}>
          View Department and Project Public Information
        </Button>
        <Button variant="primary" onClick={() => navigate("/employees/dependents")}>
          Manage Dependents
        </Button>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
