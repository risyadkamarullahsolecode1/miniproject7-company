import React, { useEffect, useState } from 'react';
import LocationForm from '../organisms/LocationForm';
import { useParams, useNavigate } from 'react-router-dom';
import LocationService from '../../services/LocationService';
import { toast } from 'react-toastify';

const EditLocation = () => {
    const [location, setLocation] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchLocation = async () => {
            try {
                const response = await LocationService.get(id);
                setLocation(response.data);
            } catch (err) {
                setError('Failed to fetch Location details.');
            }
        };

        fetchLocation();
    }, [id]);

    const handleSubmit = async (updatedData) => {
        try {
            await LocationService.update(id, updatedData);
            toast.success('Location updated successfully!');
            navigate('/location');
        } catch (err) {
            toast.error('Failed to update Location. Please try again.');
            setError('Failed to update Location.');
        }
    };

    return (
        <div>
            <h2>Edit Location</h2>
            {error && <div style={{ color: 'red' }}>{error}</div>}
            {location ? (
                <LocationForm onSubmit={handleSubmit} initialData={location} />
            ) : (
                <p>Loading Location details...</p>
            )}
        </div>
    );
};

export default EditLocation;
