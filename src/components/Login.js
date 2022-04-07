import { useState } from 'react'
import { Form, Button, Row} from 'react-bootstrap'

const Login = ({ onUserLogin }) => {

    // Puedo intentar hacer que name = 'Usuario1' y si el setName recoge algo diferente
    // no puedo iniciar sesión y al darle a entrar mandará un sweetAlert diciendo que es incorrecto
    // Luego hacer que si esta logueado puede entrar en vista detallada, borrar, editar y añadir.
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')

    // Creo que necesito que la función onSubmit me compare lo que recoge con lo que tiene
    const onSubmit = (e) => {
        e.preventDefault()
        // Si el texto del nombre de la task esta vacio sacará un alert por pantalla
        // if (!text){
        //     alert('Please add a task')
        //     return
        // }

        // Si no, si está todo correctamente añadirá la task con los datos recogidos
        onUserLogin({ name, password })
        // Por último volverá a poner los valores iniciales (vacios).
        // Esto no se si dejarlo y que aunque falle deje el nombre puesto
        setName('')
        setPassword('')
    }

    // En los onChange tendré que recoger el valor y luego comprobarlo con el que esta en la BD
  return (
    <Form onSubmit={onSubmit}>
        <Row>
            <Form.Group className="mb-3" controlId="formName">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" required placeholder="Name" 
                onChange={(e) => setName(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" required placeholder="Password" 
                onChange={(e) => setPassword(e.target.value)}/>
            </Form.Group>
        </Row>
        <Button variant="dark" type="submit">Login</Button>
    </Form>
  )
}

export default Login