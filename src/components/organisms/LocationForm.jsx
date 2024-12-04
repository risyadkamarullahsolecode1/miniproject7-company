import React, { useState, useEffect } from 'react';
import LocationService from '../../services/LocationService';
import { Form, Button, Alert, Container } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import CustomButton from '../atoms/Button';

const LocationForm = ({ onSubmit, initialData = {} }) => {
    const [formData, setFormData] = useState({
        locations: initialData.locations || '',
    });
    const [locations, setLocations] = useState([]);
    const [errors, setErrors] = useState({});
    const [errorMessage, setErrorMessage] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchLocations = async () => {
            try {
                setLoading(true);
                const response = await LocationService.getAll();
                setLocations(response.data);
                setLoading(false);
            } catch (err) {
                setLoading(false);
                toast.error('Failed to fetch locations.');
            }
        };
        fetchLocations();
    }, []);

    const validate = () => {
        const errors = {};
        if (!formData.locations) errors.locations = 'locations name is required';
        return errors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length === 0) {
            try {
                await onSubmit(formData); // Parent-provided `onSubmit` handles the actual request
                toast.success('locations added successfully!');
            } catch (err) {
                if (err.response && err.response.status === 400) {
                    setErrorMessage(err.response.data.message); // Backend error message
                    toast.error(err.response.data.message);
                } else {
                    setErrorMessage('An unexpected error occurred.');
                    toast.error('An unexpected error occurred.');
                }
            }
        } else {
            setErrors(validationErrors);
        }
    };

    return (
        <Container>
        <ToastContainer />
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="locations">
                <Form.Label>Location Name</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter locations name"
                    value={formData.locations}
                    onChange={(e) => setFormData({ ...formData, locations: e.target.value })}
                />
            </Form.Group>
            <CustomButton type="submit">Submit</CustomButton>
        </Form>
        </Container>
    );
};

export default LocationForm;
