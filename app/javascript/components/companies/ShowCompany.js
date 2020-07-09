import React from "react";
import PropTypes from "prop-types";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
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

class ShowCompany extends React.Component {
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
          <Modal.Title>Company Details</Modal.Title>
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

              <Form.Group as={Col}>
                <Form.Label>Brokers:</Form.Label>
                <ListGroup>
                  {this.props.selected.brokers.map((object, index) => (
                    <ListGroup.Item key={index}>{object.name}</ListGroup.Item>
                  ))}
                </ListGroup>
              </Form.Group>
            </Row>
          </Form>
        </Modal.Body>

        <Modal.Footer>
        {this.props.selected.brokers.count === 0 ? (
            <Button variant="danger" onClick={this.handleDelete}>
              Delete Company
            </Button>
          ) : (
            ""
          )}
          <Button variant="secondary" onClick={this.handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={this.handleUpdate}>
            Update Company
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default ShowCompany;
