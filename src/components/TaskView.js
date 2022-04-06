import React from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { useFetch } from '../hooks/useFetch';

// El task esta vacio no me setea el task con el data de la función fetchTask
const TaskView = () => {
  // const [task, setTask] = useState(null);

  const params = useParams();

  const { task, error, loading } = useFetch(
    "http://localhost:3001/tasks/" + params.id

    
  );

    // useEffect(() => {
    //   const getTask = async () => {
    //     const tasksFromServer = await fetchTask()
    //     setTask(tasksFromServer)
    //   }
  
    //   getTask();
    // },[])

    console.log(task.reminder)
    console.log(error)
    // Esta linea la usaba para recoger los parametros de la url
    // const query = new URLSearchParams(useLocation().search)
  return (
      <>
      <h2>Id is = {params.id}</h2>
      <h2>{task.name}</h2>
      {/* <h2>{query.get("first")}</h2>
      <h2>{query.get("last")}</h2> */}
      </>
  )
}

export default TaskView