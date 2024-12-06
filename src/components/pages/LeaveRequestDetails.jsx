import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Container, Form, Badge } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import apiClient from "../../axiosconfig";

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

const LeaveRequestDetails = () => {
  const { processId } = useParams(); 
  const [leaveRequest, setLeaveRequest] = useState(null); // Initialize as null
  const [loading, setLoading] = useState(true); // Track loading state
  const [showModal, setShowModal] = useState(false);
  const [reviewData, setReviewData] = useState({
    action: "",
    comment: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLeaveRequest = async () => {
      try {
        const response = await apiClient.get(`/LeaveRequest/${processId}`);
        setLeaveRequest(response.data); // Set fetched data
      } catch (error) {
        console.error("Error fetching leave request details:", error);
        toast.error("Failed to fetch leave request details.");
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchLeaveRequest();
  }, [processId]);

  const handleReviewClick = () => {
    setShowModal(true); // Open the modal for review
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setReviewData({ action: "", comment: "" }); // Reset form
  };

  const handleReviewSubmit = async () => {
    try {
      if (!reviewData.action || !reviewData.comment) {
        toast.warning("Please select an action and provide a comment.");
        return;
      }

      const response = await apiClient.post("/LeaveRequest/review", {
        processId: parseInt(processId), // Pass the processId
        action: reviewData.action,
        comment: reviewData.comment,
      });

      if (response.data.status === "Success") {
        toast.success(response.data.message);
        setShowModal(false); // Close modal on success
        setReviewData({ action: "", comment: "" }); // Reset form
        navigate(0); // Reload the page to fetch updated data
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error reviewing leave request:", error);
      toast.error("An error occurred while submitting your review.");
    }
  };

  const handleChange = (e) => {
    setReviewData({ ...reviewData, [e.target.name]: e.target.value });
  };
  // Show a loading state or fallback content until data is available
  if (loading) {
    return <p>Loading...</p>;
  }

  // Handle the case where the leave request is not found
  if (!leaveRequest) {
    return <p>Leave request not found.</p>;
  }

  return (
    <Container>
      <h3>Leave Request Details</h3>
      <Table bordered>
        <tbody>
          <tr>
            <th>Request Name</th>
            <td>{leaveRequest.requestName || "N/A"}</td>
          </tr>
          <tr>
            <th>Description</th>
            <td>{leaveRequest.description || "N/A"}</td>
          </tr>
          <tr>
            <th>Start Date</th>
            <td>{leaveRequest.startDate || "N/A"}</td>
          </tr>
          <tr>
            <th>End Date</th>
            <td>{leaveRequest.endDate || "N/A"}</td>
          </tr>
          <tr>
            <th>Leave Type</th>
            <td>{leaveRequest.leaveType || "N/A"}</td>
          </tr>
          <tr>
            <th>Reason</th>
            <td>{leaveRequest.reason || "N/A"}</td>
          </tr>
          <tr>
            <th>Status</th>
            <td>{renderStatus(leaveRequest.status)}</td>
          </tr>
        </tbody>
      </Table>

      <h4>History</h4>
      <Table bordered>
        <thead>
          <tr>
            <th>Action Date</th>
            <th>Action By</th>
            <th>Action</th>
            <th>Comments</th>
          </tr>
        </thead>
        <tbody>
          {leaveRequest.workflowActions && leaveRequest.workflowActions.length > 0 ? (
            leaveRequest.workflowActions.map((action, index) => (
              <tr key={index}>
                <td>{new Date(action.actionDate).toLocaleDateString()}</td>
                <td>{action.actionBy || "N/A"}</td>
                <td>{action.action || "N/A"}</td>
                <td>{action.comments || "N/A"}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No workflow actions found.</td>
            </tr>
          )}
        </tbody>
      </Table>

      <div className="d-flex justify-content-between">
        <Button variant="secondary" onClick={() => navigate(-1)}>
          Back
        </Button>
        <Button variant="primary" onClick={handleReviewClick}>
          Review Leave Request
        </Button>
      </div>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Review Leave Request</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="actionSelect">
              <Form.Label>Action</Form.Label>
              <Form.Select
                name="action"
                value={reviewData.action}
                onChange={handleChange}
                required
              >
                <option value="">Select Action</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
              </Form.Select>
            </Form.Group>
            <Form.Group controlId="commentTextarea" className="mt-3">
              <Form.Label>Comment</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="comment"
                value={reviewData.comment}
                onChange={handleChange}
                placeholder="Enter your comment"
                required
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleReviewSubmit}>
            Submit Review
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default LeaveRequestDetails;
