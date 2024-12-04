import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Button, Alert } from "react-bootstrap";
import { toast } from "react-toastify";
import EmployeeService from "../../services/EmployeeService"; // Assumes EmployeeService exists

const DeactivateEmployeeForm = () => {
  const { empNo } = useParams(); // Get employee ID from URL
  const navigate = useNavigate();
  const [reason, setReason] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!reason.trim()) {
      setError("Reason for deactivation is required.");
      return;
    }

    try {
      await EmployeeService.deactivate(empNo, reason);
      toast.success(`Employee ${empNo} deactivated successfully.`);
      navigate(`/employees/${empNo}`); // Navigate back to employee details
    } catch (err) {
      console.error(err);
      if (err.response && err.response.data) {
        setError(err.response.data.Error || "An error occurred.");
      } else {
        setError("An error occurred.");
      }
    }
  };

  return (
    <div className="deactivate-employee-form">
      <h2>Deactivate Employee</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="reason">
          <Form.Label>Reason for Deactivation</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Enter reason for deactivation"
          />
        </Form.Group>
        <Button variant="danger" type="submit">
          Deactivate
        </Button>
        <Button variant="secondary" onClick={() => navigate(`/employees/${empNo}`)} className="ms-2">
          Cancel
        </Button>
      </Form>
    </div>
  );
};

export default DeactivateEmployeeForm;
