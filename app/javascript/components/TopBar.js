import React from "react"
import PropTypes from "prop-types"
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class TopBar extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div className="bg-primary">
          <Container fluid style={{ height: "40px" }}>
            <Row>
              <Col>
              </Col>
            </Row>
          </Container>
        </div>
      </React.Fragment>
    );
  }
}

export default TopBar
