import React from 'react'
import { FaTimes } from 'react-icons/fa'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'

// Recogerá una task y la función onDelete. Le dará formato a esta y le diremos que cuando
// clique en el icono llame a la función onDelete de App.js que le hemos pasado.
// -> Con el paquete de react-icons podemos poner iconos propios de React. Además podemos
// añadirle un estilo en el propio parámetro.
// APUNTE: Cuando necesitamos sacar la id ponemos un () => 
const TaskItem = ({ task, onDelete, onView }) => {

  const navigate = useNavigate();

  return (
    // Si el reminder de la task esta en true, devolverá la clase reminder. Si no, no tendrá nada.
    // El valor del reminder esta llegando del state de las tareas que tenemos. Entonces lo revisa todo el tiempo.
    // El onView si que lo hace porque me saca por consola la task seleccionada
    <div draggable="true" className={`task ${task.reminder ? 'reminder' : ''}`} onDoubleClick={() => onView(task.id)}>
        <h3>
            {task.name}{' '}
            <FaTimes style={{ color: 'red', cursor: 'pointer' }}
             onClick={() => onDelete(task.id)}/>
        </h3>
        <p>
          {moment(task.day).format('YYYY-MM-DD HH:mm')}
        </p>
    </div>
  )
}

// Ya no tengo que pasar el onToggle para editar. Si no que le tengo que pasar el que busca una task por id,
// para que cuando le de a doble click me abra TaskView con la task de ese id.

export default TaskItem