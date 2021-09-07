import React, { useContext } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { AlertContext } from "../context/alert/alertContext";

export const Tasks = ({ tasks, onRemove }) => {
  const alert = useContext(AlertContext);

  const removeHadler = (id) => {
    onRemove(id)
    alert.show(`Task "${id}" has been removed`, 'info')
  }

  return (
    <TransitionGroup component="ul" className="list-group">
      {tasks.map((task) => (
        <CSSTransition
          key={task.id}
          classNames={'task'}
          timeout={800}
        >
          <li className="list-group-item task">
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
        </CSSTransition>
      ))}
    </TransitionGroup>
  );
};
