import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import EmployeeService from "../../services/EmployeeService";
import DependantService from "../../services/DependantService";

const DependentManagement = () => {
  const [dependents, setDependents] = useState([]);
  const [show, setShow] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentDependent, setCurrentDependent] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    relationship: "",
    dob: "",
  });

  useEffect(() => {
    const fetchDependents = async () => {
      try {
        const response = await EmployeeService.details();
        setDependents(response.data.dependents || []); // Fetch only dependents
      } catch (error) {
        console.error("Error fetching dependents:", error);
        toast.error("Failed to load dependents.");
      }
    };

    fetchDependents();
  }, []);

  const handleShow = (dependent = null) => {
    setShow(true);
    setIsEditing(!!dependent);
    setCurrentDependent(dependent);
    setFormData(
      dependent
        ? { name: dependent.name, relationship: dependent.relationship, dob: dependent.dob }
        : { name: "", relationship: "", dob: "" }
    );
  };

  const handleSave = async () => {
    try {
      if (isEditing) {
        const response = await DependantService.update(currentDependent.dependentId, formData);
        toast.success(response.data.message || "Dependent updated successfully.");
        setDependents((prev) =>
          prev.map((dep) =>
            dep.dependentId === currentDependent.dependentId ? { ...dep, ...formData } : dep
          )
        );
      } else {
        const response = await DependantService.add(formData);
        toast.success(response.data.message || "Dependent added successfully.");
        setDependents([...dependents, response.data]);
      }
      setShow(false);
    } catch (error) {
      console.error("Error saving dependent:", error);
      toast.error("Failed to save dependent.");
    }
  };

  const handleDelete = async (dependentId) => {
    if (window.confirm("Are you sure you want to delete this dependent?")) {
      try {
        await DependantService.remove(dependentId);
        setDependents(dependents.filter((dep) => dep.dependentId !== dependentId));
        toast.success("Dependent deleted successfully.");
      } catch (error) {
        toast.error("Failed to delete dependent.");
      }
    }
  };

  return (
    <div className="container">
      <h1>Dependents</h1>
      <Button onClick={() => handleShow()}>Add Dependent</Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Relationship</th>
            <th>Date of Birth</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {dependents.length > 0 ? (
            dependents.map((dependent) => (
              <tr key={dependent.dependentId}>
                <td>{dependent.name}</td>
                <td>{dependent.relationship}</td>
                <td>{new Date(dependent.dob).toLocaleDateString()}</td>
                <td>
                  <Button variant="warning" onClick={() => handleShow(dependent)}>
                    Edit
                  </Button>
                  <Button variant="danger" onClick={() => handleDelete(dependent.dependentId)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">
                No dependents found.
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{isEditing ? "Edit Dependent" : "Add Dependent"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Relationship</Form.Label>
              <Form.Control
                type="text"
                value={formData.relationship}
                onChange={(e) => setFormData({ ...formData, relationship: e.target.value })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control
                type="date"
                value={formData.dob}
                onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave}>
            {isEditing ? "Update" : "Save"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DependentManagement;
