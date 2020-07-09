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
import { handleInputChange, run_ajax, handleClose, handleCreate } from "Utils.js";

class NewLeague extends React.Component {
  constructor() {
    super();
    this.handleInputChange = handleInputChange.bind(this);
    this.handleClose = handleClose.bind(this);
    this.handleCreate = handleCreate.bind(this);
    this.run_ajax = run_ajax.bind(this);
  }

  state = {
    sports: [],
    name: null,
    level: null,
    sport_id: null,
  };

  componentDidMount() {
    this.getObjects();
  }

  getObjects() {
    this.run_ajax("/sports.json", "GET", {}, (res) => {
      this.setState({ sports: res, sport_id: res[0]?.id});
    });
  }

  sportOptions = () => {
    return this.state.sports.map((object, index) => {
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
          <Modal.Title>New League</Modal.Title>
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
              <Form.Group as={Col}>
                <Form.Label>Level:</Form.Label>
                <Form.Control
                  type="text"
                  name="level"
                  onChange={this.handleInputChange}
                />
              </Form.Group>
            </Row>
            <Row>
              <Form.Group as={Col}>
                <Form.Label>Sport:</Form.Label>
                <Form.Control
                  as="select"
                  name="sport_id"
                  onChange={this.handleInputChange}
                >
                  {this.sportOptions()}
                </Form.Control>
              </Form.Group>
            </Row>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={this.handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={this.handleCreate}>
            Create League
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default NewLeague;
