import React from 'react';
import { Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import EmployeeService from '../../services/EmployeeService';
import { toast, ToastContainer } from 'react-toastify';

const EmployeeTableList = ({ employee, onEmployeeDeleted }) => {
  const handleDelete = async () => {
    try {
      await EmployeeService.remove(employee.empNo);
      toast.success('Employee deleted successfully.');
      onEmployeeDeleted(employee.empNo); // Notify parent component to update the list
    } catch (error) {
      toast.error('Failed to delete employee.');
      console.error(error);
    }
  };

  return (
    <tr>
      <td>{employee.empNo}</td>
      <td>{`${employee.fname} ${employee.lname}`}</td>
      <td>{employee.position}</td>
      <td>{employee.deptname}</td>
      <td>{employee.status}</td>
      <td>{employee.employeetype}</td>
      <td>{new Date(employee.lastupdateddate).toLocaleDateString()}</td>
      <td>
        <Link to={`/employees/${employee.empNo}`}>
          <Button variant="info" size="sm">
            Details
          </Button>
        </Link>{' '}
        <Link to={`/employees/edit/${employee.empNo}`}>
          <Button variant="warning" size="sm">
            Update
          </Button>
        </Link>{' '}
        <Button variant="danger" size="sm" onClick={handleDelete}>
          Delete
        </Button>
      </td>
    </tr>
  );
};

export default EmployeeTableList;
