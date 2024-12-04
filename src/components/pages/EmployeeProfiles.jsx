import React, { useEffect, useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import axios from "axios";
import EmployeeService from "../../services/EmployeeService";

const EmployeeProfile = () => {
  const [profile, setProfile] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchEmployeeDetails = async () => {
      try {
        const response = await EmployeeService.details();
        setProfile(response.data);
      } catch (error) {
        console.error("Error fetching employee details:", error);
      }
    };

    fetchEmployeeDetails();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleUpdate = () => {
    axios
      .put("/api/Employee/update-profile", profile)
      .then(() => {
        setSuccessMessage("Profile updated successfully!");
        setIsEditing(false);
      })
      .catch((error) => console.error("Error updating profile:", error));
  };

  return (
    <div className="container">
      <h1>Employee Profile</h1>
      {successMessage && <Alert variant="success">{successMessage}</Alert>}
      {!isEditing ? (
        <div>
          <h2>Personal Information</h2>
          <p>
            <strong>Name:</strong> {profile.firstName} {profile.lastName}
          </p>
          <p>
            <strong>Email:</strong> {profile.email}
          </p>
          <p>
            <strong>Phone:</strong> {profile.phoneNumber}
          </p>
          <p>
            <strong>Address:</strong> {profile.address}
          </p>
          <p>
            <strong>Date of Birth:</strong> {profile.dob}
          </p>
          <p>
            <strong>Gender:</strong> {profile.sex}
          </p>
          <p>
            <strong>Position:</strong> {profile.position}
          </p>
          <p>
            <strong>Status:</strong> {profile.status}
          </p>
          <Button variant="primary" onClick={() => setIsEditing(true)}>
            Edit Profile
          </Button>
        </div>
      ) : (
        <div className="mb-5">
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                value={profile.firstName || ""}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                value={profile.lastName || ""}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={profile.email || ""}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                name="phoneNumber"
                value={profile.phoneNumber || ""}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                name="address"
                value={profile.address || ""}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control
                type="date"
                name="dob"
                value={profile.dob || ""}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Gender</Form.Label>
              <Form.Control
                type="text"
                name="sex"
                value={profile.sex || ""}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Position</Form.Label>
              <Form.Control
                type="text"
                name="position"
                value={profile.position || ""}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Control
                type="text"
                name="status"
                value={profile.status || ""}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Button variant="primary" onClick={handleUpdate}>
              Save Changes
            </Button>
            <Button variant="secondary" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
          </Form>
        </div>
      )}
    </div>
  );
};

export default EmployeeProfile;
