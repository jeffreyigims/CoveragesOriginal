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
import {handleClose, handleUpdate, updateHelper, handleDelete} from '../Utils.js';

class EditClub extends React.Component {
  constructor(){
    super();
    this.handleClose = handleClose.bind(this);
    this.handleUpdate = handleUpdate.bind(this);
    this.updateHelper = updateHelper.bind(this);
    this.handleDelete = handleDelete.bind(this);
  }
  
  state = {
    name: null,
    abbreviation: null,
  };

  render() {
    if (this.props.selected == null) {
      return null;
    }
    return (
      <Modal show={this.props.show} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Club Details</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Row>
              <Form.Group as={Col}>
                <Form.Label>Name:</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  defaultValue={this.props.selected.name}
                  disabled             
                />
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>League:</Form.Label>
                <Form.Control
                  type="text"
                  name="league"
                  defaultValue={this.props.selected.league.name}
                  disabled
                />
              </Form.Group>
            </Row>

            <Row>
              <Form.Group as={Col}>
                <Form.Label>Code:</Form.Label>
                <Form.Control
                  type="text"
                  name="abbreviation"
                  defaultValue={this.props.selected.abbreviation}
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
          <Button variant="primary" onClick={this.handleUpdate}>
            Update Club
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default EditClub;
