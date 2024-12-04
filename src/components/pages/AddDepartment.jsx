import React, { useContext } from 'react';
import DepartmentService from '../../services/DepartmentService';
import DepartmentForm from '../organisms/DepartmentForm';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AddDepartment = () => {
    const navigate = useNavigate();

    const handleSubmit = async (departmentData) => {
        try {
            await DepartmentService.create(departmentData);
            toast.success("Department added successfully!");
            navigate('/departments'); 
        } catch (error) {
            console.error("Error adding employee:", error);
            toast.error(error.response?.data?.message || "Failed to add employee");
        }
    };

    return (
        <div>
            <h2>Create New Department</h2>
            <DepartmentForm onSubmit={handleSubmit} />
        </div>
    );
}

export default AddDepartment;