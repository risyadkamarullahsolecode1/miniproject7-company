import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useParams, useNavigate } from 'react-router-dom';
import Button from '../atoms/Button';
import { Form } from 'react-bootstrap';
import DependantService from '../../services/DependantService';

const DependentForm = ({ onDependentAdded, dependentId }) => {
    const navigate = useNavigate();
    const { empNo } = useParams(); // Get employee ID from URL
    const [formData, setFormData] = useState({
        name: '',
        sex: '',
        dob: '',
        relationship: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false); // Prevent duplicate submissions

    // If dependentId exists, load data to edit
    useEffect(() => {
        if (dependentId) {
            const fetchDependentData = async () => {
                try {
                    const response = await DependantService.get(dependentId);
                    setFormData({
                        name: response.data.dependentName,
                        sex: response.data.sex,
                        dob: response.data.dateOfBirth,
                        relationship: response.data.relationship
                    });
                } catch (error) {
                    console.error('Error fetching dependent data for edit:', error);
                    toast.error('Failed to load dependent data.');
                }
            };
            fetchDependentData();
        }
    }, [dependentId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!empNo) {
            console.error("Missing empNo from URL.");
            toast.error("Employee ID is missing. Please check the URL.");
            return;
        }
    
        try {
            setIsSubmitting(true);
            if (dependentId) {
                // Update existing dependent
                await DependantService.update(dependentId, formData);
                toast.success('Dependent updated successfully!');
            } else {
                // Add new dependent
                await DependantService.create(empNo, formData);
                toast.success('Dependent added successfully!');
            }
            onDependentAdded(); // Refresh parent data
            setFormData({ name: "", sex: "", dob: "", relationship: "" }); // Reset form
            navigate(`/employees/${empNo}`); // Navigate back to employee details
        } catch (error) {
            console.error('Error submitting form:', error);
            toast.error('Failed to save dependent. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Sex</Form.Label>
                <Form.Control
                    as="select"
                    name="sex"
                    value={formData.sex}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </Form.Control>
            </Form.Group>
            <Form.Group>
                <Form.Label>Date of Birth</Form.Label>
                <Form.Control
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    required
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Relationship</Form.Label>
                <Form.Control
                    type="text"
                    name="relationship"
                    value={formData.relationship}
                    onChange={handleChange}
                    required
                />
            </Form.Group>
            <Button
                type="submit"
                variant="primary"
                disabled={isSubmitting}
            >
                {isSubmitting ? 'Submitting...' : dependentId ? 'Update Dependent' : 'Add Dependent'}
            </Button>
        </Form>
    );
};

export default DependentForm;
