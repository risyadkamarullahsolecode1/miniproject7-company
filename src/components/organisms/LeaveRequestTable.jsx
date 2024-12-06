import React from "react";
import { Table, Badge, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

// Helper function to render status indicators
const renderStatus = (status) => {
  switch (status) {
    case "Under Review":
      return <Badge bg="warning" text="dark">Under Review</Badge>;
    case "Approved by Employee Supervisor":
      return <Badge bg="primary">Accepted</Badge>;
    case "Approved by HR Manager":
      return <Badge bg="success">Accepted</Badge>;
    case "Rejected by Employee Supervisor":
      return <Badge bg="danger">Rejected</Badge>;
    case "Rejected by HR Manager":
      return <Badge bg="danger">Rejected</Badge>;
    case "Pending Approval":
      return <Badge bg="secondary">Pending</Badge>;
    default:
      return <Badge bg="secondary">Unknown</Badge>;
  }
};

const LeaveRequestTable = ({ leaveRequests }) => {
    const navigate = useNavigate();

    const handleViewDetails = (processId) => {
        navigate(`/request/${processId}`);
    };
  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>No.</th>
          <th>Employee Name</th>
          <th>Start Date</th>
          <th>End Date</th>
          <th>Total Days</th>
          <th>Leave Type</th>
          <th>Reason</th>
          <th>Submission Date</th>
          <th>Status</th>
          <th>File</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {leaveRequests.map((request, index) => (
          <tr key={request.requestId}>
            <td>{index + 1}</td>
            <td>{request.applicantName}</td>
            <td>{request.startDate}</td>
            <td>{request.endDate}</td>
            <td>{request.totalDays}</td>
            <td>{request.leaveType}</td>
            <td>{request.reason}</td>
            <td>{new Date(request.submissionDate).toLocaleDateString()}</td>
            <td>{renderStatus(request.status)}</td>
            <td>{request.filePath}</td>
            <td>
            <Button
                className="btn btn-primary btn-sm"
                onClick={() => handleViewDetails(request.processId)}
              >
                View Details
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default LeaveRequestTable;
