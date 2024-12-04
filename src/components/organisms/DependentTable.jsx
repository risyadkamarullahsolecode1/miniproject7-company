import React, { useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import DependantService from '../../services/DependantService';

const DependentTable = ({ dependents = [], onEdit, onDelete }) => {
    const handleEdit = (dependentId) => {
        onEdit(dependentId); // Call the onEdit function to handle the edit action
    };

    const handleDelete = (dependentId) => {
        if (window.confirm("Are you sure you want to delete this dependent?")) {
            DependantService.remove(dependentId) // Call the delete service
                .then(() => {
                    onDelete(dependentId); // Update parent state to reflect the deleted item
                })
                .catch((error) => {
                    console.error("Error deleting dependent:", error);
                });
        }
    };

    if (dependents.length === 0) {
        return <p>No dependents available.</p>; // Show message when no dependents
    }

    return (
        <Table striped bordered hover responsive>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Sex</th>
                    <th>Date of Birth</th>
                    <th>Relationship</th>
                    <th>Actions</th> {/* Column for actions */}
                </tr>
            </thead>
            <tbody>
                {dependents.map((dependent) => (
                    <tr key={dependent.dependentNo}>
                        <td>{dependent.dependentName}</td>
                        <td>{dependent.sex}</td>
                        <td>{new Date(dependent.dateOfBirth).toLocaleDateString()}</td>
                        <td>{dependent.relationship}</td>
                        <td>
                            <Button
                                variant="warning"
                                size="sm"
                                onClick={() => handleEdit(dependent.dependentNo)}
                                className="me-2"
                            >
                                Edit
                            </Button>
                            <Button
                                variant="danger"
                                size="sm"
                                onClick={() => handleDelete(dependent.dependentNo)}
                            >
                                Delete
                            </Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};

export default DependentTable;
