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

class NewClub extends React.Component {
  constructor() {
    super();
    this.handleInputChange = handleInputChange.bind(this);
    this.handleClose = handleClose.bind(this);
    this.handleCreate = handleCreate.bind(this);
    this.run_ajax = run_ajax.bind(this);
  }

  state = {
    leagues: [],
    name: null,
    abbreviation: null,
    league_id: null,
  };

  componentDidMount() {
    this.getObjects();
  }

  getObjects() {
    this.run_ajax("/leagues.json", "GET", {}, (res) => {
      this.setState({ leagues: res, league_id: res[0]?.id});
    });
  }

  leagueOptions = () => {
    return this.state.leagues.map((object, index) => {
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
          <Modal.Title>New Club</Modal.Title>
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
                <Form.Label>Code:</Form.Label>
                <Form.Control
                  type="text"
                  name="abbreviation"
                  onChange={this.handleInputChange}
                />
              </Form.Group>
            </Row>
            <Row>
              <Form.Group as={Col}>
                <Form.Label>League:</Form.Label>
                <Form.Control
                  as="select"
                  name="league_id"
                  onChange={this.handleInputChange}
                >
                  {this.leagueOptions()}
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
            Create Club
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default NewClub;
