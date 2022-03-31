import React from 'react'
import { useState } from 'react'

const AddTask = ({ onAdd }) => {
    // Hemos importado el useState para guardar en el state de la lista de tasks, las nuevas tasks.
    const [text, setText] = useState('')
    const [day, setDay] = useState('')
    const [reminder, setReminder] = useState(false)

    // Antes de añadir una nueva task vamos a querer revisarlas para asegurarmos de que se crea correctamente.
    const onSubmit = (e) => {
        e.preventDefault()
        // Si el texto del nombre de la task esta vacio sacará un alert por pantalla
        if (!text){
            alert('Please add a task')
            return
        }
        // Si no, si está todo correctamente añadirá la task con los datos recogidos
        onAdd({ text, day, reminder})
        // Por último volverá a poner los valores iniciales (vacios).
        setText('')
        setDay('')
        setReminder(false)
    }

    // Vamos a crear el formulario con los inputs y funciones necesarias
  return (
    <form className='add-form' onSubmit={onSubmit}>
        <div className='form-control'>
            <label>Task</label>
            <input type='text' placeholder='Add Task' 
            value={text} onChange={(e) => setText(e.target.value)}/>
        </div>
        <div className='form-control'>
            <label>Task</label>
            <input type='text' placeholder='Add Day & Time' 
            value={day} onChange={(e) => setDay(e.target.value)}/>
        </div>
        {/* Los input tipo checkbox uso currentTarget.checked "esto ya te dice si esta seleccionado o no"*/}
        <div className='form-control form-control-check'>
            <label>Task</label>
            <input type='checkbox' checked={reminder} value={reminder}
            onChange={(e) => setReminder(e.currentTarget.checked)} />
        </div>

        <input type='submit' value='Save Task' 
        className='btn btn-block'/>
    </form>
  )
}

export default AddTask
