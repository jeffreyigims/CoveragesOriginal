import React from "react";
import PropTypes from "prop-types";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Formik } from "formik";
import * as yup from "yup";

import {
  handleInputChange,
  handleClose,
  run_ajax,
  handleCreate,
} from "../Utils.js";

const schema = yup.object({
  club: yup.string().required(),
  group: yup.string().required(),
  category: yup.string().required(),
  sub_category: yup.string().required(),
  notes: yup.string().required(),
  start_date: yup.string().required(),
  end_date: yup.string().required(),
  has_coverage_line: yup.string().required(),
  verified: yup.string().required(),
});

class NewCoverage extends React.Component {
  state = {};

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
    return this.state[name] === null
      ? this.props.selected[name]
      : this.state[name];
  };

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
    this.props.switchModal(this.props.name);
  };

  handleStartDateChange = (date) => {
    this.setState({ start_date: date });
  };

  handleEndDateChange = (date) => {
    this.setState({ end_date: date });
  };

  render() {
    return (
      <Modal show={this.props.show} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Coverage Details</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Formik
            validationSchema={schema}
            onSubmit={(values) => this.handleUpdate(values)}
            initialValues={{
              club: this.props.selected.club.name,
              group: this.props.selected.group.name,
              category: this.props.selected.category.name,
              sub_category: this.props.selected.sub_category.name,
              notes: this.props.selected.notes,
              start_date: this.props.selected.start_date,
              end_date: this.props.selected.end_date,
              has_coverage_line: this.props.selected.has_coverage_line,
              verified: this.props.selected.verified,
            }}
          >
            {({ handleSubmit, handleChange, values, isValid, errors }) => (
              <Form noValidate onSubmit={handleSubmit}>
                <Row>
                  <Form.Group as={Col}>
                    <Form.Label>Club:</Form.Label>
                    <Form.Control
                      type="text"
                      name="club"
                      value={values.club}
                      disabled
                    />
                  </Form.Group>

                  <Form.Group as={Col}>
                    <Form.Label>Group:</Form.Label>
                    <Form.Control
                      type="text"
                      name="group"
                      value={values.group}
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
                      value={values.category}
                      disabled
                    />
                  </Form.Group>

                  <Form.Group as={Col}>
                    <Form.Label>Sub Category:</Form.Label>
                    <Form.Control
                      type="text"
                      name="sub_category"
                      value={values.sub_category}
                      disabled
                    />
                  </Form.Group>
                </Row>

                <Form.Group>
                  <Form.Label>Notes:</Form.Label>
                  <Form.Control
                    type="text"
                    name="notes"
                    value={values.notes}
                    onChange={handleChange}
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
                      value={values.has_coverage_line}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Form.Group as={Col}>
                    <Form.Check
                      type="checkbox"
                      name="verified"
                      label={"Verified"}
                      value={values.verified}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Row>
                <Button variant="danger" onClick={this.handleDelete}>
                  Delete Coverage
                </Button>
                <Button type="submit" variant="primary">
                  Update Coverage
                </Button>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    );
  }
}

export default NewCoverage;
