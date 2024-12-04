import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import WorksOnService from '../../services/WorksOnService';
import { Table, Alert } from 'react-bootstrap';

const WorksOnDetails = () => {
    const { projNo } = useParams();
    const [workDetails, setWorkDetails] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const response = await WorksOnService.assignment(projNo);
                setWorkDetails(response.data);
            } catch (err) {
                setError('Failed to fetch work details.');
            }
        };

        fetchDetails();
    }, [projNo]);

    if (error) return <Alert variant="danger">{error}</Alert>;

    return (
        <div>
            <h2>Work Details</h2>
            {workDetails ? (
                <Table striped bordered hover>
                    <tbody>
                        <tr>
                            <td>Employee No</td>
                            <td>{workDetails.employeeNo}</td>
                        </tr>
                        <tr>
                            <td>Employee Name</td>
                            <td>{workDetails.employeeName}</td>
                        </tr>
                        <tr>
                            <td>Project No</td>
                            <td>{workDetails.projectNo}</td>
                        </tr>
                        <tr>
                            <td>Project Name</td>
                            <td>{workDetails.projectName}</td>
                        </tr>
                        <tr>
                            <td>Date Worked</td>
                            <td>{new Date(workDetails.dateWorked).toLocaleDateString()}</td>
                        </tr>
                        <tr>
                            <td>Hours Worked</td>
                            <td>{workDetails.totalHours}</td>
                        </tr>
                    </tbody>
                </Table>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default WorksOnDetails;
