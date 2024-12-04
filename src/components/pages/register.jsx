import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { register, reset } from "../../slices/authSlice";
import { Button, Card, Container, Form, Row, Alert } from "react-bootstrap";
import FormField from "../molecules/FormField";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    address: "",
    dob: "",
    sex: "",
    phonenumber: "",
    email: "",
    password: "",
    position: "",
    deptno: "", // Optional field
    employeetype: "",
    level: "",
    lastupdateddate: "",
    nik: "",
    status: "",
    statusreason: "",
    salary: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess) {
      toast.success("Registration successful!");
      navigate("/login");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
  
    // Replace empty or invalid deptno with null
    const submitData = {
      ...formData,
      deptno: formData.deptno.trim() === "" ? null : formData.deptno,
    };

    delete submitData.lastupdateddate;
  
    dispatch(register(submitData));
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Container className="mb-5 pb-5">
      <ToastContainer />
      <Card.Title className="text-center text-white">Register</Card.Title>
      <Form onSubmit={onSubmit}>
        <FormField
          label="First Name"
          id="fname"
          value={formData.fname}
          name="fname"
          onChange={onChange}
          required
          placeholder="Enter first name"
        />
        <FormField
          label="Last Name"
          id="lname"
          value={formData.lname}
          name="lname"
          onChange={onChange}
          required
          placeholder="Enter last name"
        />
        <FormField
          label="Address"
          id="address"
          value={formData.address}
          name="address"
          onChange={onChange}
          required
          placeholder="Enter address"
        />
        <FormField
          label="Date of Birth"
          id="dob"
          value={formData.dob}
          name="dob"
          type="date"
          onChange={onChange}
          required
          placeholder="Enter Date of Birth"
        />
        <div>
          <Form.Label>Sex</Form.Label>
          <div>
            <Form.Check
              inline
              type="radio"
              id="male"
              name="sex"
              value="Male"
              label="Male"
              checked={formData.sex === "Male"}
              onChange={onChange}
            />
            <Form.Check
              inline
              type="radio"
              id="female"
              name="sex"
              value="Female"
              label="Female"
              checked={formData.sex === "Female"}
              onChange={onChange}
            />
          </div>
        </div>
        <FormField
          label="Phone Number"
          id="phonenumber"
          value={formData.phonenumber}
          name="phonenumber"
          onChange={onChange}
          required
          placeholder="Enter phone number"
        />
        <FormField
          label="Email"
          id="email"
          value={formData.email}
          name="email"
          type="email"
          onChange={onChange}
          required
          placeholder="Enter email@example.com"
        />
        <FormField
          label="Password"
          id="password"
          value={formData.password}
          name="password"
          type="password"
          onChange={onChange}
          required
          placeholder="Enter password"
        />
        <FormField
          label="Position"
          id="position"
          value={formData.position}
          name="position"
          onChange={onChange}
          required
          placeholder="Enter position"
        />
        <FormField
          label="NIK"
          id="nik"
          value={formData.nik}
          name="nik"
          onChange={onChange}
          required
          placeholder="Enter NIK"
        />
        <FormField
            label="Last Updated Date"
            id="lastupdateddate"
            type="datetime-local"
            value={formData.lastupdateddate}
            name="lastupdateddate"
            onChange={onChange}
            disabled
        />
        <FormField
          label="Department Number (Optional)"
          id="deptno"
          value={formData.deptno}
          name="deptno"
          onChange={onChange}
          placeholder="Enter department number or leave empty"
        />
        <FormField
          label="Employee Type"
          id="employeetype"
          value={formData.employeetype}
          name="employeetype"
          onChange={onChange}
          placeholder="Enter employee type"
        />
        <FormField
          label="Level"
          id="level"
          type="number"
          value={formData.level}
          name="level"
          onChange={onChange}
          placeholder="Enter level"
        />
        <FormField
          label="Salary"
          id="salary"
          type="number"
          value={formData.salary}
          name="salary"
          onChange={onChange}
          placeholder="Enter salary"
        />
        <FormField
          label="Status"
          id="status"
          value={formData.status}
          name="status"
          onChange={onChange}
          placeholder="Enter status"
        />
        <FormField
          label="Status Reason"
          id="statusreason"
          value={formData.statusreason}
          name="statusreason"
          onChange={onChange}
          placeholder="Enter status reason"
        />
        <Row className="d-grid">
          <Button type="submit" className="btn btn-primary" disabled={isLoading}>
            {isLoading ? "Registering..." : "Register"}
          </Button>
        </Row>
      </Form>
      {message && (
        <Form.Group>
          <Alert className="alert alert-danger" role="alert">
            {message}
          </Alert>
        </Form.Group>
      )}
    </Container>
  );
};

export default Register;
