import React from 'react';
import ProjectService from '../../services/ProjectService';
import ProjectForm from '../organisms/ProjectForm';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AddProject = () => {
    const navigate = useNavigate();

    const handleSubmit = async (projectData) => {
        try {
            // Call the service to add the project
            await ProjectService.create(projectData);
            toast.success("Project added successfully!");
            navigate('/projects'); // Navigate to projects list
        } catch (error) {
            console.error("Error adding project:", error);
            toast.error(error.response?.data?.message || "Failed to add project");
        }
    };

    return (
        <div>
            <h2>Create New Project</h2>
            <ProjectForm onSubmit={handleSubmit} />
        </div>
    );
};

export default AddProject;
