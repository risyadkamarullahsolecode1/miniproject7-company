import React from "react";
import WorksOnForm from "../organisms/WorksOnForm";
import WorksOnService from "../../services/WorksOnService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddWorksOn = () => {
  const navigate = useNavigate();

  const handleSubmit = async (workData) => {
    try {
      await WorksOnService.create(workData);
      toast.success("Work record added successfully!");
      navigate("/workson");
    } catch (error) {
      toast.error("Failed to create work record.");
    }
  };

  return (
    <div>
      <h2>Create New Work Record</h2>
      <WorksOnForm onSubmit={handleSubmit} />
    </div>
  );
};

export default AddWorksOn;
