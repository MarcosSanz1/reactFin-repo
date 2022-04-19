import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { Link, useLocation } from 'react-router-dom'

const Footer = () => {

  const location = useLocation()
  const [visibleLink, setVisibleLink] = useState(false)
  const ruta = location.pathname

  console.log("Ruta en la que estamos ", ruta)

  const visibleForLocation = () => {
    
  }

  useEffect(() =>{
    switch (ruta) {
      case ruta === "/login":
        console.log("Esta en /login ")
        setVisibleLink(true)
      break;
      case ruta !== "/profile":
        console.log("Esta en /profile ")
        setVisibleLink(true)
      break;
      case ruta !== "/about":
        console.log("Esta en /about ")
        setVisibleLink(true)
      break;
      default: 
      setVisibleLink(false)
    }
  }, [visibleLink])

  console.log("El link esta visible ",visibleLink);

  return (
    <footer>
    <p>Copyright &copy; 2022</p>
      <Row>
        {visibleLink ? (
          <>
          <Col md="auto">
            <Link to='/about'>About</Link>
          </Col>
          <Col md="auto">
            <Link to='/profile'>Profile</Link>
          </Col>
          </>
        ) : null}
        {location.pathname !== "/" ? (
          <>
          <Col md="auto">
            <Link to='../'>Go Back</Link>
          </Col>
          </>
        ) : null}
      </Row>
    </footer>
  )
}

// Puedo poner que sea diferente de / y /task

// About y Profile se verán en todos los sitios menos en el login y el perfil
// El Go Back se verá en todos los sitios menos en el inicio

export default Footer
