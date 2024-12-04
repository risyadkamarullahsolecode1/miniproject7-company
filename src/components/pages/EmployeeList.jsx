import React, { useState, useEffect } from 'react';
import EmployeeService from '../../services/EmployeeService';
import EmployeeTable from '../organisms/EmployeeTable';
import Button from '../atoms/Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Col, Dropdown, Row, Container, InputGroup, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import ReactPaginate from 'react-paginate';
import '../styling/pagination.css';
import { useQuery, keepPreviousData } from '@tanstack/react-query';

export const fetchEmployees = async ({ page, pageSize, searchQuery, sortField, sortOrder, level, status }) => {
    const { data } = await EmployeeService.search({
      PageNumber: page,
      PageSize: pageSize,
      Keyword: searchQuery,
      SortBy: sortField,
      SortOrder: sortOrder,
      Level: level,
      Status: status, // Include the status parameter
    });
    return data;
};
  

const EmployeesList = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const pageSizes = [5, 10, 15, 20];
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState('Fname');
  const [sortOrder, setSortOrder] = useState('asc');
  const [level, setLevel] = useState(0);
  const [status, setStatus] = useState(''); // Empty string means "All"


  // React Query for fetching employees
  const { data, isLoading, isError } = useQuery({
    queryKey: ['employees', page, pageSize, searchQuery, sortField, sortOrder, level, status],
    queryFn: () => fetchEmployees({ page, pageSize, searchQuery, sortField, sortOrder, level, status }),
    keepPreviousData: true,
    placeholderData: keepPreviousData,
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) {
    toast.error('Error fetching employees.');
    return <p>Error fetching employees.</p>;
  }

  const pageCount = Math.ceil(data.total / pageSize);

  const handlePageClick = ({ selected }) => {
    setPage(selected + 1);
  };

  const handlePageSizeChange = (e) => {
    setPageSize(parseInt(e.target.value));
    setPage(1);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setPage(1); // Reset to the first page
  };

  const handleLevelChange = (e) => {
    setLevel(parseInt(e.target.value));
    setPage(1); // Reset to the first page
  };

  const handleSort = (field) => {
    if (field === sortField) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const getSortIcon = (field) => {
    if (sortField !== field) return '↕️';
    return sortOrder === 'asc' ? '↑' : '↓';
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
    setPage(1); // Reset to the first page
  };

  return (
    <Container>
      <ToastContainer />
      <h2>Employees</h2>

      {/* <Link to={`/employees/new`}>
          <Button variant="info" size="sm" className="mb-2">
            Add Employee
          </Button>
        </Link>{' '} */}
      {/* Search and Filters */}
      <Row className="mb-3">
        <Col md={6}>
          <InputGroup>
            <InputGroup.Text>Search</InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Enter keyword..."
              value={searchQuery}
              onChange={handleSearch}
            />
          </InputGroup>
        </Col>
        <Col md={3}>
          <Form.Group controlId="filterLevel">
            <Form.Label>Filter by Level</Form.Label>
            <Form.Select value={level} onChange={handleLevelChange}>
              <option value={0}>All Levels</option>
              <option value={1}>Level 1</option>
              <option value={2}>Level 2</option>
              <option value={3}>Level 3</option>
              <option value={4}>Level 4</option>
              <option value={5}>Level 5</option>
            </Form.Select>
          </Form.Group>
        </Col>
        <Col md={3}>
            <Form.Group controlId="filterStatus">
                <Form.Label>Filter by Status</Form.Label>
                <Form.Select value={status} onChange={handleStatusChange}>
                <option value="">All Statuses</option>
                <option value="active">Active</option>
                <option value="notActive">Not Active</option>
                </Form.Select>
            </Form.Group>
        </Col>
        <Col md={3}>
          <Form.Group controlId="pageSize">
            <Form.Label>Items per Page</Form.Label>
            <Form.Select value={pageSize} onChange={handlePageSizeChange}>
              {pageSizes.map((size) => (
                <option key={size} value={size}>
                  Show {size}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>

      {/* Employee Table */}
      <EmployeeTable
        employees={data?.data || []}
        handleSort={handleSort}
        getSortIcon={getSortIcon}
      />

      {/* Pagination */}
      <ReactPaginate
        previousLabel="Previous"
        nextLabel="Next"
        breakLabel="..."
        pageCount={pageCount}
        onPageChange={handlePageClick}
        containerClassName="pagination"
        activeClassName="active"
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
      />
    </Container>
    );
};

export default EmployeesList;
