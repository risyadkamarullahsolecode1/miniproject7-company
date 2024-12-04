import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProjectService from '../../services/ProjectService';
import { Alert, Card, Container } from 'react-bootstrap';

const ProjectDetails = () => {
    const { projNo } = useParams();
    const [project, setProject] = useState(null);
    const [department, setDepartment] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProjectDetails = async () => {
            try {
                const projResponse = await ProjectService.get(projNo);
                setProject(projResponse.data);
            } catch (err) {
                setError('Failed to fetch project details.');
            }
        };

        const fetchProjectDepartment = async () => {
            try {
                const deptResponse = await ProjectService.getDepartment(projNo);
                setDepartment(deptResponse.data);
            } catch (err) {
                setError('Failed to fetch department for this project.');
            }
        };

        fetchProjectDetails();
        fetchProjectDepartment();
    }, [projNo]);

    if (error) return <Alert variant="danger">{error}</Alert>;
    if (!project) return <p>Loading...</p>;

    return (
        <Container>
            <Card>
                <Card.Title className="text-center fw-bolder">Project Details</Card.Title>
                <Card.Body><strong>Project No:</strong> {project.projno}</Card.Body>
                <Card.Body><strong>Project Name:</strong> {project.projname}</Card.Body>
                <Card.Body><strong>Department:</strong> {department ? department.deptname : "Loading..."}</Card.Body>
            </Card>
        </Container>
    );
};

export default ProjectDetails;
