import React, {Fragment, useContext, useEffect} from "react";
import { Form } from "../components/Form";
import { Loader } from "../components/Loader";
import { Tasks } from "../components/Tasks";
import { FirebaseContext } from "../context/firebase/firebaseContext";

export const Home = () => {
  const {loading, tasks, fetchTasks, removeTask} = useContext(FirebaseContext)

  useEffect(() => {
    fetchTasks()
    // eslint-disable-next-line
  }, [])

  return (
    <Fragment>
      <Form />
      <hr/>
      {loading
        ? <Loader />
        : <Tasks tasks={tasks} onRemove={removeTask} />
      }
    </Fragment>
  )
}