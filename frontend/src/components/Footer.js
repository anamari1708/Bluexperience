import React from 'react'
import { Row, Col } from 'react-bootstrap'

const Footer = () => {
    return (
        <footer>
             <nav className='navbar'>
                <Row>
                    <Col className='text-center text-danger py-3' style={{fontSize : '15px'}}>
                        Copyright &copy; <span className='text-danger' style={{fontWeight : '700'}}>Bluexperience</span>
                    </Col>
                </Row>
            </nav>
        </footer>
    )
}

export default Footer