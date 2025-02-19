import React from "react";
import {Navbar, Nav, Image} from 'react-bootstrap';
import {Link} from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <Navbar  expand="lg">
        <Navbar.Brand href="#home">
           <Image src="images/logo.jpg" className="img-style"/> 
           <span className="span1-style"> WorldBank Online Interface</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link href="#home">
                <span className="span3-style">&gt; </span>
                    <span className="span2-style">
                     Back to home
                </span> 
            </Nav.Link>
            <Link to='/' className='btn btn-light'>Sign out</Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
};

export default Header;
