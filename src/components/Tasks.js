import React, { useContext } from "react";
import { AlertContext } from "../context/alert/alertContext";

export const Tasks = ({ tasks, onRemove }) => {
  const alert = useContext(AlertContext);

  const removeHadler = (id) => {
    onRemove(id)
    alert.show(`Task "${id}" has been removed`, 'info')
  }

  return (
    <ul className="list-group">
      {tasks.map((task) => (
        <li className="list-group-item task" key={task.id}>
          <div>
            <strong>{task.title}</strong>
            <small>{new Date(task.date).toLocaleString()}</small>
          </div>
          <button
            onClick={() => removeHadler(task.id)}
            type="button"
            className="btn btn-outline-danger btn-sm"
          >
            &times;
          </button>
        </li>
      ))}
    </ul>
  );
};
