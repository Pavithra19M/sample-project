import React from 'react';
import {Row, Col, Container} from 'react-bootstrap';

const Footer = () => {
    let currentYear = new Date().getFullYear()
  return (
   <footer>
     <Container>
     <Row>
        <Col  className='text-center'><p >WorldBank Online Interface &copy; {currentYear}</p></Col>
    </Row>
     </Container>
   </footer>
  )
}

export default Footer