import React, { useState, useEffect } from "react";
import LeaveRequestTable from "../organisms/LeaveRequestTable";
import { Container, Spinner, Alert } from "react-bootstrap";
import { toast } from "react-toastify";
import apiClient from "../../axiosconfig";

const LeaveRequestList = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLeaveRequests = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await apiClient.get("/LeaveRequest/All");
        setLeaveRequests(response.data);
        toast.success("Leave requests loaded successfully!");
      } catch (err) {
        setError("Failed to load leave requests.");
        toast.error(err.response?.data?.message || "An error occurred while fetching leave requests.");
      } finally {
        setLoading(false);
      }
    };

    fetchLeaveRequests();
  }, []);

  return (
    <Container>
      <h2 className="my-4">Leave Requests</h2>
      {loading && (
        <div className="text-center my-4">
          <Spinner animation="border" variant="primary" />
        </div>
      )}
      {error && (
        <Alert variant="danger" className="my-4">
          {error}
        </Alert>
      )}
      {!loading && !error && leaveRequests.length > 0 && (
        <LeaveRequestTable leaveRequests={leaveRequests} />
      )}
      {!loading && !error && leaveRequests.length === 0 && (
        <Alert variant="info" className="my-4">
          No leave requests found.
        </Alert>
      )}
    </Container>
  );
};

export default LeaveRequestList;
