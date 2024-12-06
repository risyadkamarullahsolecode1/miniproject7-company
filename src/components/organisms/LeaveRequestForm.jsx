import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { toast } from 'react-toastify';
import apiClient from '../../axiosconfig';

const LeaveRequestForm = () => {
  const [formData, setFormData] = useState({
    requestName: '',
    description: '',
    startDate: '',
    endDate: '',
    leaveType: '',
    reason: '',
    totalDays: 0,
  });
  const [file, setFile] = useState(null); // State to hold the selected file
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Update total days whenever startDate or endDate changes
  useEffect(() => {
    if (formData.startDate && formData.endDate) {
      const start = new Date(formData.startDate);
      const end = new Date(formData.endDate);
      if (end >= start) {
        const timeDiff = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1; // Inclusive of start and end date
        setFormData((prevData) => ({ ...prevData, totalDays: timeDiff }));
      } else {
        setFormData((prevData) => ({ ...prevData, totalDays: 0 }));
      }
    } else {
      setFormData((prevData) => ({ ...prevData, totalDays: 0 }));
    }
  }, [formData.startDate, formData.endDate]);

  const validate = () => {
    const newErrors = {};

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Start Date validation
    if (!formData.startDate) {
      newErrors.startDate = 'Start Date is required';
    } else if (new Date(formData.startDate) < today) {
      newErrors.startDate = 'Start Date must be today or a future date';
    }

    // End Date validation
    if (!formData.endDate) {
      newErrors.endDate = 'End Date is required';
    } else if (new Date(formData.endDate) < new Date(formData.startDate)) {
      newErrors.endDate = 'End Date must be equal to or after Start Date';
    }

     // Leave Type validation
     if (!formData.leaveType) {
      newErrors.leaveType = 'Leave Type is required';
    }

    // Reason validation
    if (!formData.reason) {
      newErrors.reason = 'Reason is required';
    }

    // File validation
    if (formData.leaveType === 'Sick Leave' && formData.totalDays > 1) {
      if (!file) {
        newErrors.file = 'Medical Certificate is required for Sick Leave exceeding 1 day';
      } else if (!['application/pdf', 'image/jpeg', 'image/jpg'].includes(file.type)) {
        newErrors.file = 'File must be a PDF or JPG/JPEG';
      } else if (file.size > 5 * 1024 * 1024) {
        newErrors.file = 'File size must not exceed 5MB';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
        toast.error('Please fix the errors before submitting.');
        return;
      }

    setLoading(true);
    try {
      // Create FormData to submit form data and file
      const leaveRequestData = new FormData();
      leaveRequestData.append('requestName', formData.requestName);
      leaveRequestData.append('description', formData.description);
      leaveRequestData.append('startDate', formData.startDate);
      leaveRequestData.append('endDate', formData.endDate);
      leaveRequestData.append('leaveType', formData.leaveType);
      leaveRequestData.append('reason', formData.reason);
      leaveRequestData.append('totalDays', formData.totalDays);

      // Append file if it's provided
      if (file) {
        leaveRequestData.append('file', file);
      }

      const response = await apiClient.post('/LeaveRequest/submit', leaveRequestData, {
        headers: { 'Content-Type': 'multipart/form-data' }, // Set multipart form-data header
      });

      toast.success(response.data.message || 'Leave request submitted successfully!');
      setFormData({
        requestName: '',
        description: '',
        startDate: '',
        endDate: '',
        leaveType: '',
        reason: '',
        totalDays: 0,
      });
      setFile(null); // Clear file after successful submission
    } catch (error) {
      toast.error(error.response?.data?.message || 'An error occurred while submitting the request.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="mb-5 pb-5">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h2 className="text-center">Submit Leave Request</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Request Name</Form.Label>
              <Form.Control
                type="text"
                name="requestName"
                value={formData.requestName}
                onChange={handleChange}
                placeholder="Enter request name"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe your leave request"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Start Date</Form.Label>
              <Form.Control
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                required
                isInvalid={!!errors.startDate}
              />
              <Form.Control.Feedback type="invalid">{errors.startDate}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>End Date</Form.Label>
              <Form.Control
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                required
                isInvalid={!!errors.endDate}
              />
              <Form.Control.Feedback type="invalid">{errors.endDate}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Total Days</Form.Label>
              <Form.Control
                type="number"
                name="totalDays"
                value={formData.totalDays}
                readOnly
              />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Leave Type</Form.Label>
                <Form.Select
                    name="leaveType"
                    value={formData.leaveType}
                    onChange={handleChange}
                    required
                    isInvalid={!!errors.leaveType}
                >
                    <option value="">Select Leave Type</option>
                    <option value="Sick Leave">Sick Leave</option>
                    <option value="Personal Leave">Personal Leave</option>
                    <option value="Annual Leave">Annual Leave</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">{errors.leaveType}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Reason</Form.Label>
              <Form.Control
                type="text"
                name="reason"
                value={formData.reason}
                onChange={handleChange}
                placeholder="Provide a reason for the leave"
                required
                isInvalid={!!errors.reason}
              />
              <Form.Control.Feedback type="invalid">{errors.reason}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Medical Certificate (Optional)</Form.Label>
              <Form.Control
                type="file"
                name="file"
                onChange={handleFileChange}
                accept=".pdf,.jpg,.jpeg"
                isInvalid={!!errors.file}
              />
              <Form.Control.Feedback type="invalid">{errors.file}</Form.Control.Feedback>
            </Form.Group>
            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? 'Submitting...' : 'Submit Request'}
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default LeaveRequestForm;
