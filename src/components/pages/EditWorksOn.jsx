import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import WorksOnService from '../../services/WorksOnService';
import WorksOnForm from '../organisms/WorksOnForm';

const EditWorksOn = () => {
    const { empno, projno } = useParams();
    const navigate = useNavigate();
    const [initialData, setInitialData] = useState(null);

    useEffect(() => {
        const fetchWorkRecord = async () => {
            try {
                const response = await WorksOnService.get(empno, projno);
                setInitialData(response.data);
            } catch (error) {
                console.error('Failed to fetch work record.');
            }
        };

        fetchWorkRecord();
    }, [empno, projno]);

    const handleSubmit = async (updatedRecord) => {
        try {
            await WorksOnService.update(empno, projno, updatedRecord);
            navigate('/workson');
        } catch (error) {
            console.error('Failed to update work record.');
        }
    };

    return (
        <div>
            <h2>Edit Work Record</h2>
            {initialData ? (
                <WorksOnForm onSubmit={handleSubmit} initialData={initialData} />
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default EditWorksOn;
