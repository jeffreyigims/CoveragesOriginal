import React from "react";
import PropTypes from "prop-types";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";

import { handleInputChange, handleClose, run_ajax, handleCreate} from "Utils.js";

class NewClubGroup extends React.Component {
  constructor() {
    super();
    this.handleInputChange = handleInputChange.bind(this);
    this.handleClose = handleClose.bind(this);
    this.handleCreate = handleCreate.bind(this);
    this.run_ajax = run_ajax.bind(this);
  }

  state = {
    groups: [],
    group_id: null,
  };

  componentDidMount() {
    this.getObjects();
  }

  getObjects() {
    this.run_ajax("/groups.json", "GET", {}, (res) => {
      this.setState({ groups: res});
    });
  }

  groupOptions = () => {
    return this.state.groups.map((object, index) => {
      return (
        <option key={index} value={object.id}>
          {" "}
          {object.name}{" "}
        </option>
      );
    });
  };

  render() {
    return (
      <Modal show={this.props.show} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>New Group</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Row>
              <Form.Group as={Col}>
                <Form.Label>Club:</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  defaultValue={this.props.club?.attributes.name}
                  disabled
                />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Group:</Form.Label>
                <Form.Control
                  as="select"
                  name="selectedGroup"
                  onChange={this.handleInputChange}
                >
                  {this.groupOptions()}
                </Form.Control>
              </Form.Group>
            </Row>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="primary" onClick={this.handleCreate}>
            Create Group
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default NewClubGroup;
