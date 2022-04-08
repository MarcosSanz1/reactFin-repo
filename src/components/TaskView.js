import React from 'react'
import { useLocation, useParams, Link } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { useFetch } from '../hooks/useFetch';
import { FaTimes } from 'react-icons/fa'
import moment from 'moment'
import AddTask from './AddTask';

// El task esta vacio no me setea el task con el data de la función fetchTask

// Una vez lo recoja uso un useEffect pasandole la id
// Con esto ya puedo recoger los parametros que quiera
// Estando ya en la TaskView, desde ahí ya seteamos la task.

const TaskView = ({ taskId, onDelete, onEdit, showAdd }) => {
  // const [task, setTask] = useState(null);

  console.log("id TaskView "+taskId);
  const [task, setTask] = useState(
    {
      id: null,
      name: '',
      day: '',
      reminder: false,
      description: ''
    },
  )

  const params = useParams();

  // const { task, error, loading } = useFetch(
  //   "http://localhost:3001/tasks/" + idTask
  // );

    // useEffect(() => {
    //   const getTask = async () => {
    //     //const tasksFromServer = await fetchTask()
    //     //setTask(tasksFromServer)
    //   }
  
    //   getTask();
    // },[])

    useEffect(() => {
      const getTask = async () => {
        const tasksFromServer = await fetchTask()
        setTask(tasksFromServer)
      }
  
      getTask();
    },[])

    // FETCH TASK
    // Guardará el contenido de una task que buscará por su id.
  const fetchTask = async () => {
    const res = await fetch(`http://localhost:3001/tasks/${params.id}`)
    const data = await res.json()

    // El sacar la task funciona falla el cambiar de ruta
    // Luego tengo que pasar el resultado a TaskView
    console.log(data);
    setTask(data)

    return data
  }

    console.log(task.reminder)
    //console.log(error)
    // Esta linea la usaba para recoger los parametros de la url
    // const query = new URLSearchParams(useLocation().search)
  return (
    <div draggable="true" className={`task ${task.reminder ? 'reminder' : ''}`}>
        <h3>
            {task.name}{' '}
            <FaTimes style={{ color: 'red', cursor: 'pointer' }}
             onClick={() => onDelete(task.id)}/>
        </h3>
        <p>
          {moment(task.day).format('YYYY-MM-DD HH:mm')}
        </p>
        <p>
          {task.description}
        </p>
        {/* El botón me abrirá el AddTask "que es donde tengo el formulario" y le pasaré a esta la task */}
        {/* Necesito otro ternario dentro del onClick "no puedo hacer todo en el mismo boton"
        Con el primer boton abrimos el form y luego necesitamos dos botones más.
        - Necesito que se mantenga el botón del header para abrir y cerrar formmulario.
        - Necesito que el botón del formulario dependiendo de en la ruta en la que este, haga
        onAdd o onEdit
        - También necesito que dependiendo de la ruta los input se carguen con un valor u otro.
        (Si estás / has abierto el formulario desde la ruta de donde solo hay una task, cargará los datos de esa y 
        los pondrá en los inputs. Luego usará un onChange para ver si ha cambiado algo, set de los valores y con el
        botón lanzaremos el onEdit)
        */}
        <button onClick={() => onEdit(task.id)}>{showAdd ? "Close" : "Edit Task"}</button>
    </div>
  )
}

// APUNTES PARA HACER EL EDITAR MAÑANA:
// Crear boton Nuevo de Editar cuando accedes a la vista de la tarea. Con ese ya puedo cerrar y abrir ARREGLAR EN HEADER EL PATHNAME

// El objeto task lo tengo en Tasks y en TaskView.
// La id de la task la tengo guardada en App con taskId
// Tengo que pasar la task a el componente del formulario

// Un único botón que al cerrar el formulario, guarde los datos modificados.
// Con el nuevo botón no necesito un ternario. Simplemente le pongo al nuevo la función de editar.
// Cuando vaya a la vista de la tarea, por defecto este cerrado el formulario.
// Pasar los datos de la tarea al componente del formulario.
// Consejo -> Buscar referencias de aplicaciones similares

export default TaskView