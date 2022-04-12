import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'

const LoginButton = ({ login, setLogin, textLogin}) => {

    const [catchLogin, setCatchLogin] = useState(login)
    const navigate = useNavigate();

    useEffect(() => {
        if (!login){
            navigate("/login")
        }
    }, [catchLogin])

    const onLoginUser = () => {

        setLogin(false);
        setCatchLogin(!catchLogin)

        // if (!login) {
        //     navigate("/")
        // }
        // else{
        //     navigate("/login")
        // }
    }

    // Aquí es donde defino la función onClick. Creo que tengo que pasarlo a App
    // para no tener que pasarle la variable al botón
    return <button 
    onClick={() => onLoginUser()}
    style={{ border: "solid"} }
    className='btn'>{textLogin}</button>
  }
  
  LoginButton.propTypes = {
      textLogin: PropTypes.string
  }
  
  export default LoginButton