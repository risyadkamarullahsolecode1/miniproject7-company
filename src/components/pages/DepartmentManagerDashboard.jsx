import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

const DepartmentManagerDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="container">
      <h1>Department Manager Dashboard</h1>
      <div className="d-grid gap-3">
        <Button variant="primary" onClick={() => navigate("/departments")}>
          View and Update Department Information
        </Button>
        <Button variant="primary" onClick={() => navigate("/projects")}>
          Manage Projects (Create, Read, Update, Delete)
        </Button>
        <Button variant="primary" onClick={() => navigate("/employees/same-department")}>
          View Employees in Department
        </Button>
      </div>
    </div>
  );
};

export default DepartmentManagerDashboard;
