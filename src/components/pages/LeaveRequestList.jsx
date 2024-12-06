import React, { useState, useEffect } from "react";
import LeaveRequestTable from "../organisms/LeaveRequestTable";
import { Container, Spinner, Alert,Form, Pagination, Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";
import apiClient from "../../axiosconfig";

const LeaveRequestList = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState(""); // Search input
  const [currentPage, setCurrentPage] = useState(1); // Current page
  const [rowsPerPage] = useState(5); // Number of rows per page
  const [filteredRequests, setFilteredRequests] = useState([]); // For search results

  useEffect(() => {
    const fetchLeaveRequests = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await apiClient.get("/LeaveRequest/All");
        setLeaveRequests(response.data);
        setFilteredRequests(response.data); // Initialize filteredRequests
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

   // Handle search input
   const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = leaveRequests.filter((request) =>
      Object.values(request).some((value) =>
        String(value).toLowerCase().includes(term)
      )
    );
    setFilteredRequests(filtered);
    setCurrentPage(1); // Reset to first page
  };

  // Pagination logic
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredRequests.slice(indexOfFirstRow, indexOfLastRow);

  const totalPages = Math.ceil(filteredRequests.length / rowsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Container>
      <h2 className="my-4">Leave Requests</h2>

      {/* Search Input */}
      <Row className="mb-3">
        <Col md={6}>
          <Form.Control
            type="text"
            placeholder="Search leave requests..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </Col>
      </Row>

      {/* Loading Spinner */}
      {loading && (
        <div className="text-center my-4">
          <Spinner animation="border" variant="primary" />
        </div>
      )}

      {/* Error Alert */}
      {error && (
        <Alert variant="danger" className="my-4">
          {error}
        </Alert>
      )}

      {/* Leave Requests Table */}
      {!loading && !error && currentRows.length > 0 && (
        <>
          <LeaveRequestTable leaveRequests={currentRows} />

          {/* Pagination */}
          <Pagination className="justify-content-center mt-4">
            <Pagination.Prev
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            />
            {Array.from({ length: totalPages }, (_, index) => (
              <Pagination.Item
                key={index + 1}
                active={index + 1 === currentPage}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </Pagination.Item>
            ))}
            <Pagination.Next
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            />
          </Pagination>
        </>
      )}

      {/* No Results Found */}
      {!loading && !error && filteredRequests.length === 0 && (
        <Alert variant="info" className="my-4">
          No leave requests found.
        </Alert>
      )}
    </Container>
  );
};

export default LeaveRequestList;
