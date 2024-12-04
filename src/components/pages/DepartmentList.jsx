import React, { useEffect, useState } from 'react';
import DepartmentService from '../../services/DepartmentService';
import DepartmentTable from '../organisms/DepartmentTable';
import CustomButton from '../atoms/Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button, Dropdown, Pagination } from 'react-bootstrap';

const DepartmentList = () => {
    const [ departments, setDepartments ] = useState([]);
    const [confirmingDelete, setConfirmingDelete] = useState(null); 
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const fetchDepartments = async () => {
            try {
                setLoading(true);
                const response = await DepartmentService.getAll(); // Assuming this method exists
                setDepartments(response.data);
                setLoading(false);
            } catch (err) {
                setLoading(false);
                toast.error('Failed to fetch departments.');
                console.error(err);
            }
        };

        fetchDepartments();
    }, []);

    const totalPages = Math.ceil(departments.length / itemsPerPage);
    const currentDepartments = departments.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleItemsPerPageChange = (newItemsPerPage) => {
        setItemsPerPage(newItemsPerPage);
        setCurrentPage(1); // Reset to first page
    };

    const handleEdit = (deptNo) => {
        window.location.href = `/departments/edit/${deptNo}`;
    };

    // Handle delete confirmation
    const handleDelete = async (deptNo) => {
        setConfirmingDelete(deptNo);
        try {
            await DepartmentService.remove(deptNo);
            setDepartments((prev) => prev.filter((dept) => dept.deptno !== deptNo));
            toast.success('department deleted successfully!');
        } catch (err) {
            toast.error('Failed to delete department.');
        } finally {
            setConfirmingDelete(null);
        }
    };

    return (
        <div>
            <h2>Departments</h2>
            <CustomButton variant="primary" href="/departments/new">Add New Department</CustomButton>
            
            {/* Dropdown for items per page */}
            <Dropdown className="mb-3 mt-2">
                <Dropdown.Toggle variant="secondary">
                    Items per page: {itemsPerPage}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    {[5, 10, 15, 20].map((count) => (
                        <Dropdown.Item key={count} onClick={() => handleItemsPerPageChange(count)}>
                            {count}
                        </Dropdown.Item>
                    ))}
                </Dropdown.Menu>
            </Dropdown>
            
            <DepartmentTable departments={currentDepartments} onEdit={handleEdit} onDelete={handleDelete}/>
            
            {/* Pagination controls */}
            <Pagination className="justify-content-center mt-3">
                <Pagination.First onClick={() => handlePageChange(1)} disabled={currentPage === 1} />
                <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />
                {Array.from({ length: totalPages }, (_, index) => (
                    <Pagination.Item
                        key={index + 1}
                        active={index + 1 === currentPage}
                        onClick={() => handlePageChange(index + 1)}
                    >
                        {index + 1}
                    </Pagination.Item>
                ))}
                <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} />
                <Pagination.Last onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages} />
            </Pagination>

            <ToastContainer />
        </div>
    );
};

export default DepartmentList;