import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import LocationService from '../../services/LocationService';
import { Alert, Card, Container } from 'react-bootstrap';

const LocationDetails = () => {
    const { id } = useParams();
    const [location, setLocation] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchLocationDetails = async () => {
            try {
                const LocationResponse = await LocationService.get(id);
                setLocation(LocationResponse.data);
            } catch (err) {
                setError('Failed to fetch Location details.');
            }
        };
        fetchLocationDetails();
    }, [id]);

    if (error) return <Alert variant="danger">{error}</Alert>;
    if (!location) return <p>Loading...</p>;

    return (
        <Container>
            <Card>
                <Card.Title className="text-center fw-bolder">Location Details</Card.Title>
                <Card.Body><strong>Location No:</strong> {location.id}</Card.Body>
                <Card.Body><strong>Location Name:</strong> {location.locations}</Card.Body>
            </Card>
        </Container>
    );
};

export default LocationDetails;
