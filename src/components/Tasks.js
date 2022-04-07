import { useNavigate } from 'react-router-dom'
import Task from './TaskItem'
//import { useState } from 'react'

const navigate = useNavigate

// TASKS IN STATE
// Queremos que la lista de tareas sea parte de nuestro state, para ello llamamos al hook useState
// La variable tasks, es donde tendremos la lista de tareas actual y setTasks sera una función para
// actualizar la lista. Ahora la lista de tareas es parte del estado de nuestro componente.

// -> Es importante saber que no puedes hacer un push al array, porque el estado es inmutable 
// no es algo que pueda cambiar directamente.

// Si queremos añadir a la lista una nueva tasks usariamos: 
// setTasks([...tasks, {"nueva task"}]) -> esto significa que entrariamos a la función para actualizar,
// con los 3 puntos y el array le pasamos lo que teníamos y al lado le añadimos la nueva task.

// Recogemos las tasks y las funciones de App.js y lanzamos la lista con un formato. Necesitaremos .map para montar la lista
// Este formato vendrá por parte de otro componente donde tendremos formato que usa cada item del array.
// Por ello uno a uno le vamos pasando a TaskItem.js la propia task y la función onDelete

// // FETCH TASK
//   // Guardará el contenido de una task que buscará por su id.
//   const fetchTask = async (id) => {
//     const res = await fetch(`http://localhost:3001/tasks/${id}`)
//     const data = await res.json()

//     // El sacar la task funciona falla el cambiar de ruta
//     // Luego tengo que pasar el resultado a TaskView
//     console.log(data.id);
//     navigate(`/task/${data.id}`, {replace: true})
//     return data.id
//   }

const Tasks = ({ tasks, onDelete, onViewTask, sendIdTask }) => {
  return (
    <div>
        {tasks.map((task) => (
        <Task 
         key={task.id}
         task={task} 
         onDelete={onDelete} onViewTask={onViewTask} sendIdTask={ (value) => sendIdTask(value)}/>
        ))}
    </div>
  )
}

export default Tasks