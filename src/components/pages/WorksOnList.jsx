import React, { useEffect, useState } from 'react';
import WorksOnTable from '../organisms/WorksOnTable';
import WorksOnService from '../../services/WorksOnService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Dropdown, Pagination } from 'react-bootstrap';
import Button from '../atoms/Button';

const WorksOnList = () => {
    const [workRecords, setWorkRecords] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchWorkRecords();
    }, []);

    const fetchWorkRecords = async () => {
        try {
            setLoading(true);
            const response = await WorksOnService.getAll();
            setWorkRecords(response.data);
        } catch (error) {
            toast.error('Failed to fetch work records.');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (record) => {
        try {
            await WorksOnService.remove(record.empno, record.projno);
            toast.success('Work record deleted successfully!');
            fetchWorkRecords(); // Refresh records
        } catch (error) {
            toast.error('Failed to delete work record.');
        }
    };

    const totalPages = Math.ceil(workRecords.length / itemsPerPage);
    const currentRecords = workRecords.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);
    const handleItemsPerPageChange = (count) => {
        setItemsPerPage(count);
        setCurrentPage(1);
    };

    return (
        <div>
            <h2>Works On Records</h2>
            <Button variant="primary" href="/workson/new">
                Add New Work Record
            </Button>

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

            {loading ? (
                <p>Loading...</p>
            ) : (
                <WorksOnTable
                    workRecords={currentRecords}
                    onEdit={(record) => (window.location.href = `/workson/edit/${record.empno}/${record.projno}`)}
                    onDelete={handleDelete}
                />
            )}

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

export default WorksOnList;
