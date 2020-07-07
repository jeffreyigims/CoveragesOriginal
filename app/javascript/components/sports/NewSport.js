import React from "react";
import PropTypes from "prop-types";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {handleInputChange, handleClose, handleCreate} from 'Utils.js';

class NewSport extends React.Component {
  constructor(){
    super();
    this.handleInputChange = handleInputChange.bind(this);
    this.handleClose = handleClose.bind(this);
    this.handleCreate = handleCreate.bind(this);
  }
  
  state = {
    name: null,
  };

  render() {
    return (
      <Modal show={this.props.show} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Sport Details</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Row>
              <Form.Group as={Col}>
                <Form.Label>Name:</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  onChange={this.handleInputChange}
                />
              </Form.Group>
            </Row>

          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={this.handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={this.handleCreate}>
            Create Sport
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default NewSport;
