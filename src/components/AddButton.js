import React from 'react'
import PropTypes from 'prop-types'

// Podemos recoger valores y funciones y ponerselos al button
const AddButton = ({color, text, onClick}) => {

  return <button 
  onClick={onClick} 
  style={{background: color}}
  className='btn'>{text}</button>
}

AddButton.defaulProps = {
    color: 'steelblue'
}

AddButton.propTypes = {
    text: PropTypes.string,
    color: PropTypes.string,
    onClick: PropTypes.func
}

export default AddButton
