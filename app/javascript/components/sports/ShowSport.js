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
import {
  handleInputChange,
  handleClose,
  handleUpdate,
  updateHelper,
  handleDelete,
} from "Utils.js";

class ShowSport extends React.Component {
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
                  {this.props.selected.leagues.length > 0 ? (
                    this.props.selected.leagues.map((league, index) => (
                      <ListGroup.Item key={index}>{league.name}</ListGroup.Item>
                    ))
                  ) : (
                    <ListGroup.Item key={0}>
                      There are no associated leagues.
                    </ListGroup.Item>
                  )}
                </ListGroup>
              </Form.Group>
            </Row>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          {this.props.selected.leagues.length === 0 ? (
            <Button variant="danger" onClick={this.handleDelete}>
              Delete Sport
            </Button>
          ) : (
            ""
          )}
          <Button variant="primary" onClick={this.handleUpdate}>
            Update Sport
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default ShowSport;
