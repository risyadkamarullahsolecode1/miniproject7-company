import React, { useEffect, useState } from 'react';
import DashboardTemplate from '../templates/DashboardTemplate';
import EmployeeService from '../../services/EmployeeService';
import DepartmentService from '../../services/DepartmentService';
import ProjectService from '../../services/ProjectService';
import WorksOnService from '../../services/WorksOnService';
import { Card, Row, Col, Spinner } from 'react-bootstrap';

const Dashboard = () => {
    const [employees, setEmployees] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [projects, setProjects] = useState([]);
    const [worksOn, setWorksOn] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user || !user.token) {
            window.location.href = '/login';
            return;
        }

        const fetchData = async () => {
            try {
                const [empData, deptData, projData, worksOnData] = await Promise.all([
                    EmployeeService.getAll(),
                    DepartmentService.getAll(),
                    ProjectService.getAll(),
                    WorksOnService.getAll(),
                ]);
                setEmployees(empData);
                setDepartments(deptData);
                setProjects(projData);
                setWorksOn(worksOnData);
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <Spinner animation="border" role="status" className="m-auto d-block" />;
    }

    return (
        <DashboardTemplate>
            <p>Welcome to the Company Management System. Use the navigation links to manage employees and departments.</p>
            <Row className="mt-4">
                <Col md={3}>
                    <Card bg="primary" text="white" className="mb-4">
                        <Card.Body>
                            <Card.Title>Total Employees</Card.Title>
                            <Card.Text>{employees.length}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={3}>
                    <Card bg="success" text="white" className="mb-4">
                        <Card.Body>
                            <Card.Title>Total Departments</Card.Title>
                            <Card.Text>{departments.length}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={3}>
                    <Card bg="info" text="white" className="mb-4">
                        <Card.Body>
                            <Card.Title>Total Projects</Card.Title>
                            <Card.Text>{projects.length}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={3}>
                    <Card bg="warning" text="white" className="mb-4">
                        <Card.Body>
                            <Card.Title>Total Works On</Card.Title>
                            <Card.Text>{worksOn.length}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </DashboardTemplate>
    );
};

export default Dashboard;
