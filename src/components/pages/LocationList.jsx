import React, {  useState, useEffect } from 'react';
import LocationTable from '../organisms/LocationTable';
import Button from '../atoms/Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {  Dropdown, Pagination } from 'react-bootstrap';
import LocationService from '../../services/LocationService';

const LocationList = () => {
    const [locations, setLocations] = useState([]);
    const [confirmingDelete, setConfirmingDelete] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLocations = async () => {
            try {
                setLoading(true);
                const response = await LocationService.getAll(); 
                setLocations(response.data);
                setLoading(false);
            } catch (err) {
                setLoading(false);
                toast.error('Failed to fetch Locations');
            }
        };

        fetchLocations();
    }, []);

    const totalPages = Math.ceil(locations.length / itemsPerPage);
    const currentLocations = locations.slice(
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

    const handleEdit = (id) => {
        window.location.href = `/location/edit/${id}`;
    };

    // Handle delete confirmation
    const handleDelete = async (id) => {
        setConfirmingDelete(id);
        toast.info(
            <div>
                <p>Are you sure you want to delete this Location?</p>
                <div>
                    <Button variant="danger" onClick={() => confirmDelete(id)}>Yes</Button>{' '}
                    <Button variant="secondary" onClick={() => setConfirmingDelete(null)}>No</Button>
                </div>
            </div>,
            {
                position: "top-center",
                autoClose: false,
                closeOnClick: false,
                hideProgressBar: true,
                draggable: false,
            }
        );
    };

    const confirmDelete = async (id) => {
        try {
            await LocationService.remove(id); 
            setLocations((prevLocations) => prevLocations.filter(location => location.id !== id));
            toast.dismiss();
            toast.success("Location deleted successfully!");
            setConfirmingDelete(null);
        } catch (error) {
            console.error("Error deleting location:", error);
            toast.error("Failed to delete location.");
        }
    };

    return (
        <div>
            <h2>Location</h2>
            <Button variant="primary" href="/location/new">Add New Location</Button>

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

            {loading ? <div>Loading...</div> : (
                <LocationTable locations={currentLocations} onEdit={handleEdit} onDelete={handleDelete} />
            )}

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

export default LocationList;
