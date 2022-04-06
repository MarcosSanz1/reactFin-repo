import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer>
    <p>Copyright &copy; 2021</p>
      <Row>
        <Col md="auto">
          <Link to='/about'>About</Link>
        </Col>
        <Col md="auto">
          <Link to='/profile'>Profile</Link>
        </Col>
      </Row>
    </footer>
  )
}

export default Footer
