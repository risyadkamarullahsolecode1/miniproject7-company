import React from 'react';
import LocationService from '../../services/LocationService';
import LocationForm from '../organisms/LocationForm';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AddLocation = () => {
    const navigate = useNavigate();

    const handleSubmit = async (locationData) => {
        try {
            await LocationService.create(locationData);
            toast.success("Location added successfully!");
            navigate('/location'); 
        } catch (error) {
            console.error("Error adding Location:", error);
            toast.error(error.response?.data?.message || "Failed to add Location");
        }
    };

    return (
        <div>
            <h2>Create New Location</h2>
            <LocationForm onSubmit={handleSubmit} />
        </div>
    );
};

export default AddLocation;
