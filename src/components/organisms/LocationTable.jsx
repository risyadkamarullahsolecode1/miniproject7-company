import React from 'react';
import LocationTableList from '../molecules/LocationTableList';
import { Table } from 'react-bootstrap';

const LocationTable = ({ locations, onEdit, onDelete }) => {
    return (
        <Table responsive striped bordered hover>
            <thead>
                <tr>
                    <th>Location No</th>
                    <th>Location Name</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {locations.map((location) => (
                    <LocationTableList key={location.id} location={location} onEdit={onEdit} onDelete={onDelete} />
                ))}
            </tbody>
        </Table>
    );
};

export default LocationTable;