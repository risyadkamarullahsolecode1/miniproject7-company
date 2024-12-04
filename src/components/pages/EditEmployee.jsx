import React, { useState, useEffect } from 'react';
import EmployeeService from '../../services/EmployeeService';
import EmployeeForm from '../organisms/EmployeeForm';
import { useParams, useNavigate } from 'react-router-dom';
import { Alert } from 'react-bootstrap';
import { toast } from 'react-toastify';

const EditEmployee = () => {
  const { empNo } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await EmployeeService.get(empNo);
        setEmployee(response.data);
      } catch (err) {
        setError('Failed to fetch employee details.');
        console.error(err);
      }
    };
    fetchEmployee();
  }, [empNo]);

  const handleSubmit = async (updatedData) => {
    try {
      // Remove the lastupdateddate field before submitting, as it's managed by the backend
      const { lastupdateddate, ...dataToUpdate } = updatedData;

      await EmployeeService.update(empNo, dataToUpdate); // Use empNo instead of id
      toast.success('Employee updated successfully.');
      navigate('/employees'); // Redirect back to the employee list
    } catch (err) {
      setError('Failed to update employee. Please try again.');
      console.error(err);
    }
  };

  if (error) return <Alert variant="danger">{error}</Alert>;
  if (!employee) return <p>Loading...</p>;

  return (
    <div>
      <h2>Edit Employee</h2>
      <EmployeeForm onSubmit={handleSubmit} initialData={employee} />
    </div>
  );
};

export default EditEmployee;
