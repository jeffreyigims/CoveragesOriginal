import React from "react";
import PropTypes from "prop-types";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class ShowCoverage extends React.Component {
  state = {
    has_coverage_line: null,
    verified: null,
    notes: null,
    start_date: null,
    end_date: null,
  };

  handleInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleUpdate = (event) => {
    event.preventDefault();
    const updatedCoverage = {
      has_coverage_line: this.updateHelper("has_coverage_line"),
      verified: this.updateHelper("verified"),
      notes: this.updateHelper("notes"),
      start_date: this.updateHelper("start_date"),
      end_date: this.updateHelper("end_date"),
    };
    this.props.run_ajax(
      "/coverages/".concat(this.props.selected.id, ".json"),
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
      "/coverages/".concat(this.props.selected.id, ".json"),
      "DELETE",
      { coverage: this.props.selected }
    );
    this.handleClose();
  };

  handleClose = () => {
    this.setState({
      has_coverage_line: null,
      verified: null,
      notes: null,
      start_date: null,
      end_date: null,
    });
    this.props.switchModal(this.props.name);
  };

  handleStartDateChange = (date) => {
    this.setState({ start_date: date });
  };

  handleEndDateChange = (date) => {
    this.setState({ end_date: date });
  };

  handleCheckInputChange = (event) => {
    let name = event.target.name;
    if (this.state[name] === null) {
      this.setState({ [name]: !this.props.selected[name] });
    } else {
      let value = this.state[name] === false ? true : false;
      this.setState({ [name]: value });
    }
  };

  render() {
    if (this.props.selected == null) {
      return null;
    }
    return (
      <Modal show={this.props.show} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Coverage Details</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Row>
              <Form.Group as={Col}>
                <Form.Label>Club:</Form.Label>
                <Form.Control
                  type="text"
                  name="club"
                  defaultValue={this.props.selected.club.name}
                  disabled
                />
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Group:</Form.Label>
                <Form.Control
                  type="text"
                  name="group"
                  defaultValue={this.props.selected.group.name}
                  disabled
                />
              </Form.Group>
            </Row>

            <Row>
              <Form.Group as={Col}>
                <Form.Label>Category:</Form.Label>
                <Form.Control
                  type="text"
                  name="category"
                  defaultValue={this.props.selected.category.name}
                  disabled
                />
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Sub Category:</Form.Label>
                <Form.Control
                  type="text"
                  name="sub_category"
                  defaultValue={this.props.selected.sub_category.name}
                  disabled
                />
              </Form.Group>
            </Row>

            <Form.Group>
              <Form.Label>Notes:</Form.Label>
              <Form.Control
                type="text"
                name="notes"
                defaultValue={this.props.selected.notes}
                onChange={this.handleInputChange}
              />
            </Form.Group>

            <Row>
              <Form.Group as={Col}>
                <Form.Label>Start Date:</Form.Label>
                <DatePicker name="start_date" selected={new Date()} />
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>End Date:</Form.Label>
                <DatePicker name="end_date" selected={new Date()} />
              </Form.Group>
            </Row>

            <Row>
              <Form.Group as={Col}>
                <Form.Check
                  type="checkbox"
                  name="has_coverage_line"
                  label={"Has Coverage Line"}
                  defaultChecked={this.props.selected.has_coverage_line}
                  onChange={this.handleCheckInputChange}
                />
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Check
                  type="checkbox"
                  name="verified"
                  label={"Verified"}
                  defaultChecked={this.props.selected.verified}
                  onChange={this.handleCheckInputChange}
                />
              </Form.Group>
            </Row>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="danger" onClick={this.handleDelete}>
            Delete Coverage
          </Button>
          <Button variant="secondary" onClick={this.handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={this.handleUpdate}>
            Update Coverage
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default ShowCoverage;
