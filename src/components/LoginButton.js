import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useNavigate, useLocation } from 'react-router-dom'

const LoginButton = ({ login, setLogin, textLogin}) => {

    const [catchLogin, setCatchLogin] = useState(login)
    const navigate = useNavigate();

    // Si de un inicio el login esta a false entrará en la página de login
    // Esto lo hará hasta que catchLogin cambie de valor
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

    return <button 
    // hidden={} -> Necesito poner una variable que este a true o false cuando
    // este en una ruta u otra
    onClick={() => onLoginUser()}
    style={{ border: "solid"} }
    className='btn'>{textLogin}</button>
  }
  
  LoginButton.propTypes = {
      textLogin: PropTypes.string
  }
  
  export default LoginButton