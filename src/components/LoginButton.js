import React from 'react'
import PropTypes from 'prop-types'

const LoginButton = ({color, text, onClick}) => {

    return <button 
    onClick={onClick}
    style={{background: color, border: "solid"} }
    className='btn'>{text}</button>
  }
  
  LoginButton.defaulProps = {
      color: 'steelblue'
  }
  
  LoginButton.propTypes = {
      text: PropTypes.string,
      color: PropTypes.string,
      onClick: PropTypes.func
  }
  
  export default LoginButton