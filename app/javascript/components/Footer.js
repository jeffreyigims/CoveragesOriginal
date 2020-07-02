import React from "react"
import PropTypes from "prop-types"
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from 'react-bootstrap/Navbar';
import NavbarBrand from 'react-bootstrap/NavbarBrand';

class Footer extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div className="fixed-bottom">
          <Navbar bg="dark" variant="dark" style={{margin:"0px", height:"40px"}}>
            <Container>
              <NavbarBrand></NavbarBrand>
            </Container>
          </Navbar>
        </div>
      </React.Fragment>
    );
  }
}

export default Footer
