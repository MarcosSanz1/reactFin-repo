import React from 'react'
import { useState } from 'react'
import DateTimePicker from 'react-datetime-picker'
import { Form, Button, Row, Col } from 'react-bootstrap'

const AddTask = ({ onAdd, onEdit, idTask }) => {
    // Hemos importado el useState para guardar en el state de la lista de tasks, las nuevas tasks.
    const [name, setName] = useState('')
    const [reminder, setReminder] = useState(false);
    const [day, setDay] = useState(new Date());
    const [description, setDescription] = useState('');

    // Antes de añadir una nueva task vamos a querer revisarlas para asegurarmos de que se crea correctamente.
    const onSubmit = (e) => {
        e.preventDefault()
        // Si el texto del nombre de la task esta vacio sacará un alert por pantalla
        // if (!text){
        //     alert('Please add a task')
        //     return
        // }
        
        console.log(description);

        // Si no, si está todo correctamente añadirá la task con los datos recogidos
        //onEdit({ name, day, reminder, description})
        onAdd({ name, day, reminder, description})
        // Por último volverá a poner los valores iniciales (vacios).
        setName('')
        setDay(null)
        setReminder(false)
        setDescription('')
    }
      
    // Vamos a crear el formulario con los inputs y funciones necesarias
  return (
    <Form onSubmit={onSubmit}>
        <Row>
            <Form.Group className="mb-3" controlId="formName">
                <Form.Label>Task</Form.Label>
                <Form.Control type="text" required placeholder="Add Task" 
                value={name} onChange={(e) => setName(e.target.value)}/>
            </Form.Group>
            <Col>
                <Form.Group as={Col} className="mb-3" controlId="formDate">
                    <Form.Label>Add Date</Form.Label>
                    <DateTimePicker required class="form-control" id="dateTime" onChange={setDay} value={day} />
                </Form.Group>
            </Col>
            <Col>
                <Form.Group as={Col} className="mb-3" controlId="formCheckbox">
                    <Form.Check type="checkbox" label="Reminder" id="cbReminder" checked={reminder} value={reminder}
                    onChange={(e) => setReminder(e.currentTarget.checked)} />
                </Form.Group>
            </Col>
            <Form.Group className="mb-3" >
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" rows={3} id="txtaDescription" 
                onChange={(e) => setDescription(e.target.value)} value={description} />
            </Form.Group>
        </Row>
        <Button variant="dark" type="submit">Save Task</Button>
    </Form>
    // SIN BOOTSTRAP
    // <form className='add-form' onSubmit={onSubmit}>
    //     <div className='form-group'>
    //         <label >Task</label>
    //         <input required type='text' classNeme="form-control" id="txtName" placeholder='Add Task' 
    //         value={text} onChange={(e) => setText(e.target.value)}/>
    //     </div>
    //     <div className='form-group'>
    //         <label >Add Date</label>
    //         <DateTimePicker required className="form-control" id="dateTime" onChange={setDay} value={day} />
    //     </div>
    //     {/* Los input tipo checkbox uso currentTarget.checked "esto ya te dice si esta seleccionado o no"*/}
    //     <div className='form-check form-check-inline'>
    //         <label className="form-check-label" >Reminder</label>
    //         <input className="form-check-input" type='checkbox' id="cbReminder" checked={reminder} value={reminder}
    //         onChange={(e) => setReminder(e.currentTarget.checked)} />
    //     </div>
    //     <button type='submit' value='Save Task' 
    //     className='btn btn-dark btn-lg btn-bock'>Save Task</button>
    // </form>
  )
}

export default AddTask