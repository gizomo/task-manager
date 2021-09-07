import React, { useReducer } from "react";
import { FirebaseContext } from './firebaseContext';
import { firebaseReducer } from './firebaseReduser';
import { SHOW_LOADER, REMOVE_TASK, ADD_TASK, FETCH_TASKS } from '../types';
import axios from 'axios';

const url = process.env.REACT_APP_DB_URL

export const FirebaseState = ({children}) => {
  const initialState = {
    tasks: [],
    loading: false
  }
  
  const [state, dispatch] = useReducer(firebaseReducer, initialState)

  const showLoader = () => dispatch({type: SHOW_LOADER})

  const fetchTasks = async () => {
    showLoader()
    const res = await axios.get(`${url}/tasks.json`)
    const payload = Object.keys(res.data).map(key => {
      return {
        ...res.data[key],
        id: key
      }
    })
    dispatch({type: FETCH_TASKS, payload})
  }

  const addTask = async title => {
    const task = {
      title, date: new Date().toJSON()
    }
    try {
      const res = await axios.post(`${url}/tasks.json`, task)
      const payload = {
        ...task,
        id: res.data.name
      }
      dispatch({type: ADD_TASK, payload})
    }
    catch (e) {
      throw new Error(e.message)
    }
    
  }

  const removeTask = async id => {
    await axios.delete(`${url}/tasks/${id}.json`)
    dispatch({
      type: REMOVE_TASK,
      payload: id
    })
  }

  return (
    <FirebaseContext.Provider value={{
      showLoader, addTask, fetchTasks, removeTask,
      loading: state.loading,
      tasks: state.tasks
    }}>
      {children}
    </FirebaseContext.Provider>
  )
}