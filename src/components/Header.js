import React from 'react'
import PropTypes from 'prop-types'
import Button from './Button'
import { useLocation } from 'react-router-dom'

// props ahora es el título 
// Podemos pasarle parametros desde aquí al button y hasta funciones "onClick"
const Header = ({ title, onAdd, showAdd }) => {
  // Esto nos permite ver la ruta en la que estamos actualmente
  const location = useLocation()
  return (
    <header className='header'>
      <h1>{title}</h1>
      {/* Vamos a añadir un condicional "? :" para dependiendo de la ruta en la que estamos,
      mostrar o no el botón de add task */}
      {location.pathname === "/" && (
        <Button 
          color={showAdd ? 'red' : 'green'} 
          text={showAdd ? 'Close' : 'Add'} 
          onClick={onAdd} 
        />
      )}
    </header>
  )
}

Header.defaultProps = {
    title: 'Task Tracker'
}

Header.propTypes = {
    title: PropTypes.string.isRequired
}

// CSS in JS
// const headingStyle = {
//     color: 'red',
//     backgroundColor: 'black'
// }

export default Header