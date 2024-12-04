import React, { useEffect, useState } from 'react';
import ProjectForm from '../organisms/ProjectForm';
import { useParams, useNavigate } from 'react-router-dom';
import ProjectService from '../../services/ProjectService';
import { toast } from 'react-toastify';

const EditProject = () => {
    const [project, setProject] = useState(null);
    const { projNo } = useParams();
    const navigate = useNavigate();
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const response = await ProjectService.get(projNo);
                setProject(response.data);
            } catch (err) {
                setError('Failed to fetch project details.');
            }
        };

        fetchProject();
    }, [projNo]);

    const handleSubmit = async (updatedData) => {
        try {
            await ProjectService.update(projNo, updatedData);
            toast.success('Project updated successfully!');
            navigate('/projects');
        } catch (err) {
            toast.error('Failed to update project. Please try again.');
            setError('Failed to update project.');
        }
    };

    return (
        <div>
            <h2>Edit Project</h2>
            {error && <div style={{ color: 'red' }}>{error}</div>}
            {project ? (
                <ProjectForm onSubmit={handleSubmit} initialData={project} />
            ) : (
                <p>Loading project details...</p>
            )}
        </div>
    );
};

export default EditProject;
