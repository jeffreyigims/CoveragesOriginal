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

class ShowSport extends React.Component {
  state = {
    name: null,
  };

  handleInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleUpdate = (event) => {
    event.preventDefault();
    const updatedObject = {
      name: this.updateHelper("name"),
    };
    this.props.run_ajax(
      "/sports/".concat(this.props.selected.id, ".json"),
      "PATCH",
      { coverage: updatedCoverage }
    );
    this.handleClose();
  };

  updateHelper = (name) => {
    return (this.state[name] === null
    ? this.props.selected[name]
    : this.state[name])
  }

  handleDelete = (event) => {
    event.preventDefault();
    this.props.run_ajax(
      "/sports/".concat(this.props.selected.id, ".json"),
      "DELETE",
      { sport: this.props.selected }
    );
    this.handleClose();
  };

  handleClose = () => {
    this.setState({
      name: null,
    });
    this.props.switchModal(this.props.name);
  };

  render() {
    if (this.props.selected == null) {
      return null;
    }
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
                  defaultValue={this.props.selected.name}
                  disabled
                />
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Leagues:</Form.Label>
                <ListGroup>
                    { this.props.selected.leagues.map((league, index) => <ListGroup.Item key={index}>{league.name}</ListGroup.Item>) }
                </ListGroup>
              </Form.Group>
            </Row>

          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="danger" onClick={this.handleDelete}>
            Delete Sport
          </Button>
          <Button variant="secondary" onClick={this.handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={this.handleUpdate}>
            Update Sport
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default ShowSport;
