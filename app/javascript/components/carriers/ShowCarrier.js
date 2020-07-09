import React from "react";
import PropTypes from "prop-types";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import {
  handleInputChange,
  handleClose,
  handleUpdate,
  updateHelper,
  handleDelete,
} from "Utils.js";

class ShowCarrier extends React.Component {
  constructor() {
    super();
    this.handleInputChange = handleInputChange.bind(this);
    this.handleClose = handleClose.bind(this);
    this.handleUpdate = handleUpdate.bind(this);
    this.updateHelper = updateHelper.bind(this);
    this.handleDelete = handleDelete.bind(this);
  }

  state = {
    name: null,
  };

  render() {
    if (this.props.selected == null) {
      return null;
    }
    return (
      <Modal show={this.props.show} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Carrier Details</Modal.Title>
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
                  onChange={this.handleInputChange}
                />
              </Form.Group>
            </Row>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="danger" onClick={this.handleDelete}>
            Delete Carrier
          </Button>
          <Button variant="secondary" onClick={this.handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={this.handleUpdate}>
            Update Carrier
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default ShowCarrier;
