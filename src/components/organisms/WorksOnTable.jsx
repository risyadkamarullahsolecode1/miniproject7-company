import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import WorksOnTableList from "../molecules/WorksOnTableList";
import WorksOnService from "../../services/WorksOnService";
import { toast } from "react-toastify";

const WorksOnTable = () => {
  const [workRecords, setWorkRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchWorksOnRecords = async () => {
    try {
      const response = await WorksOnService.getAll();
      setWorkRecords(response.data);
    } catch (error) {
      toast.error("Failed to fetch work records.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (record) => {
    try {
      await WorksOnService.remove(record.empno, record.projno);
      toast.success("Work record deleted successfully!");
      fetchWorksOnRecords();
    } catch (error) {
      toast.error("Failed to delete work record.");
    }
  };

  useEffect(() => {
    fetchWorksOnRecords();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <Table responsive striped bordered hover>
      <thead>
        <tr>
          <th>Employee No</th>
          <th>Project No</th>
          <th>Date Worked</th>
          <th>Hours Worked</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {workRecords.length > 0 ? (
          workRecords.map((workRecord) => (
            <WorksOnTableList
              key={`${workRecord.empno}-${workRecord.projno}`}
              worksOn={workRecord}
              onDelete={handleDelete}
              onEdit={(record) => console.log("Edit:", record)} // Handle edit in parent or navigation
            />
          ))
        ) : (
          <tr>
            <td colSpan="5">No work records available.</td>
          </tr>
        )}
      </tbody>
    </Table>
  );
};

export default WorksOnTable;
