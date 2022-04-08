import React from 'react'
import { useState, useEffect } from 'react'
import DateTimePicker from 'react-datetime-picker'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useParams } from 'react-router-dom'

const AddTask = ({ onAdd, onEdit, nueva }) => {
    // Hemos importado el useState para guardar en el state de la lista de tasks, las nuevas tasks.

    // seteaba pero no mostraba el valor seteado
    const [idTask, setIdTask] = useState('');
    const [name, setName] = useState('');
    const [reminder, setReminder] = useState(false);
    const [day, setDay] = useState(new Date());
    const [description, setDescription] = useState('');

    const [loadTask, setLoadTask] = useState(
        // Esto tiene que iniciarse con la task que saco del fetchTask
        // Puedo hacer set dos veces la primera para cargar y la segunda para cambiar
        {
          name: '',
          day: '',
          reminder: false,
          description: ''
        },
      )

    const params = useParams();

    useEffect(() => {
        const getTask = async () => {
          const tasksFromServer = await fetchTask()
          setLoadTask(tasksFromServer)
        }
    
        getTask();
      },[])

      console.log("id por ruta ", params.id)

    const fetchTask = async () => {
        const res = await fetch(`http://localhost:3001/tasks/${params.id}`)
        const data = await res.json()
    
        // El sacar la task funciona falla el cambiar de ruta
        // Luego tengo que pasar el resultado a TaskView
        setIdTask(data.id);
        setName(data.name);
        setDay(new Date(data.day));
        setReminder(data.reminder);
        setDescription(data.description);
    
        return data
      }

    // Antes de añadir una nueva task vamos a querer revisarlas para asegurarmos de que se crea correctamente.
    // Tengo que hacer que dependiendo de la ruta me haga un onAdd o un onEdit. Puedo recoger una bool
    const onSubmit = (e) => {
        e.preventDefault()
        // Si el texto del nombre de la task esta vacio sacará un alert por pantalla
        // if (!text){
        //     alert('Please add a task')
        //     return
        // }

        // Tengo que pasar una variable boolean a false en TaskView y a true en Tasks
        // Aquí puedo usar un if, para que si está en la ruta x lance un onAdd o un onEdit
        if (nueva) {
            onAdd({ name, day, reminder, description })
            // Por último volverá a poner los valores iniciales (vacios).
            setName('')
            setDay('')
            setReminder(false)
            setDescription('')
        }
        else{
            onEdit({ idTask, name, day, reminder, description })
        }
    }

    console.log("Tipo datos dia ", day);

    // Vamos a crear el formulario con los inputs y funciones necesarias
    // Necesito poder cambiar el valor.
  return (
    <Form onSubmit={onSubmit}>
        <Row>
            <Form.Group className="mb-3" controlId="formName">
                <Form.Label>Task</Form.Label>
                <Form.Control type="text" required placeholder="Add Task" 
                value={name} onChange={(e) => setName(e.currentTarget.value)}/>
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
                onChange={(e) => setDescription(e.currentTarget.value)} value={description} />
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