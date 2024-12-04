import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../atoms/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan, faInfoCircle } from "@fortawesome/free-solid-svg-icons";

const WorksOnTableList = ({ worksOn, onEdit, onDelete }) => {
  const navigate = useNavigate();

  return (
    <tr>
      <td>{worksOn.empno}</td>
      <td>{worksOn.projno}</td>
      <td>{worksOn.dateworked}</td>
      <td>{worksOn.hoursworked}</td>
      <td>
        <Button variant="primary" onClick={() => navigate(`/workson/${worksOn.empno}/${worksOn.projno}`)}>
          <FontAwesomeIcon icon={faInfoCircle} /> Project Details
        </Button>{" "}
        <Button variant="warning" onClick={() => onEdit(worksOn)}>
          <FontAwesomeIcon icon={faPenToSquare} /> Edit
        </Button>{" "}
        <Button variant="danger" onClick={() => onDelete(worksOn)}>
          <FontAwesomeIcon icon={faTrashCan} /> Delete
        </Button>
      </td>
    </tr>
  );
};

export default WorksOnTableList;
