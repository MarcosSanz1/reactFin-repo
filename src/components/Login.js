import { useEffect, useState } from 'react'
import { Form, Button, Row} from 'react-bootstrap'
import "../css/Login.css";
import "bootstrap/dist/css/bootstrap.min.css";

// ESTE COMPONENTE CREARÁ UN USUARIO CON LOS DATOS DE LOS INPUTS Y LOS COMPARARÁ CON LOS DEL USUARIO DEFINIDO (Tengo que buscar usuarios)
// SI SON IGUALES CAMBIARÁ DE PÁGINA (Le pasará una bool para decir que se ha logueado) Y SI NO MANDARÁ UN MENSAJE DE QUE NO EXISTE DICHO USUARIO

// -> MIRAR HACER EL LOGIN CON AUTH0

const Login = ({ onUserLogin }) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [users, setUsers] = useState([])

    // useEffect(() => {
    //     fetchUsers();
    // },[])


    // Esto me lo haría si no fuera un array, solo un objeto
    // app.post('/login', (req, res) => {
    //     let { email, password } = req.body;
    //     UserRepository.login(email, password)
    //       .then(logged => {
    //         if(logged) { // login correcto
    //           res.session.user = { email };
    //           res.jsonp({ success: true });
    //         } else {
    //           res.jsonp({
    //             success: false,
    //             message: 'Email o contraseña incorrecta'
    //           });
    //         }
    //   });

    // Con -> window.location.href="./" volvemos a la ruta indicada
    
    // hacer una llamada por nombre 

    // Necesito buscar la lista de usuarios:
    // const fetchUsers = async () => {
    //     // res -> Es igual a esperar porque buscar devuelve una promise, así que queremos
    //     // esperar esa promise de la url de la API. Luego esperaremos estos datos y guardaremos en data.
    //     // y más tarde lo sacaremos por consola. Esto nos guardará los datos de la API en data.
    //     const res = await fetch(`http://localhost:3001/users/${name}`)
    //     const data = await res.json()
    
    //     console.log(data);
    //     setUsers(data)

    //     return data
    //   }

    // ahora tengo que comparar 

    // Puedo intentar hacer que name = 'Usuario1' y si el setName recoge algo diferente
    // no puedo iniciar sesión y al darle a entrar mandará un sweetAlert diciendo que es incorrecto
    // Luego hacer que si esta logueado puede entrar en vista detallada, borrar, editar y añadir.

    // Creo que necesito que la función onSubmit me compare lo que recoge con lo que tiene
    const onSubmit = (e) => {
        e.preventDefault()
        // Si el texto del nombre y contraseña no es igual al que recogemos de la llamada sacará un alert por pantalla y no dejará pasar de ventana
        // Tengo que usar algo que me diga que Usuario1 esta en algún objeto.name (creo que servía findOne)
        if (email !== "Usuario1" || password !== "123456"){
            alert('This user does not exist')
        }

        // Si no, si está todo correctamente añadirá la task con los datos recogidos
        onUserLogin({ email, password })
        // Por último volverá a poner los valores iniciales (vacios).
        // Esto no se si dejarlo y que aunque falle deje el nombre puesto
        setEmail('')
        setPassword('')
    }

    // En los onChange tendré que recoger el valor y luego comprobarlo con el que esta en la BD
  return (
    <div className='containerPrincipal'>
        <div className='containerSecundario'>
            <div className='form-group'>
                <label>Email: </label>
                <br />
                <input 
                    type="text" required placeholder="Email" 
                    onChange={(e) => setEmail(e.target.value)} 
                />
                <br />
                <label>Password: </label>
                <br />
                <input 
                    type="password" required placeholder="Password" 
                    onChange={(e) => setPassword(e.target.value)}
                />
                <br />
                <button className='btn btn-primary' type="submit">Login</button>
            </div>
        </div>
    </div>
  )
}

export default Login