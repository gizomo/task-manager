import React, { useContext, useState } from "react";
import { AlertContext } from '../context/alert/alertContext';
import { FirebaseContext } from "../context/firebase/firebaseContext";

export const Form = () => {
  const [value, setValue] = useState('')
  const alert = useContext(AlertContext)
  const firebase = useContext(FirebaseContext)

  const submitHandler = event => {
    event.preventDefault()
    if(value.trim()) {
      firebase.addTask(value.trim()).then(() => {
        alert.show('Task has been created', 'success')
      }).catch(() => {
        alert.show('Some error has occurred', 'danger')
      })
      setValue('')
    } else {
      alert.show('Enter text for task')
    }
  }

  return (
    <form onSubmit={submitHandler}>
      <div className="form-group">
        <input
          className="form-control"
          type="text"
          placeholder="Enter task name"
          value={value}
          onChange={e => setValue(e.target.value)}
        />
      </div>
    </form>
  );
};
