import React from "react";
import PropTypes from "prop-types";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Formik } from "formik";
import * as yup from "yup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { run_ajax } from "Utils.js";

const schema = yup.object({});

class NewCoverage extends React.Component {
  constructor() {
    super();
    this.run_ajax = run_ajax.bind(this);
  }

  state = {
    categories: [],
    subCategories: [],
  };

  componentDidMount() {
    this.getObjects();
  }

  getObjects() {
    this.run_ajax("/categories.json", "GET", {}, (res) => {
      this.setState({ categories: res.data });
    });
    this.run_ajax("/sub_categories.json", "GET", {}, (res) => {
      this.setState({ subCategories: res.data });
    });
  }

  handleCreate = (values) => {
    let data = {
      club_group_id: this.props.group?.id,
      sub_category_id: values.sub_category_id,
      notes: values.notes,
      start_date: values.start_date,
      end_date: values.end_date,
      has_coverage_line: values.has_coverage_line,
      verified: values.verified,
    };
    this.props.run_ajax("/coverages.json", "POST", data);
    this.handleClose();
  };

  categoryOptions = () => {
    return this.state.categories.map((object, index) => {
      return (
        <option key={index} value={object.attributes.id}>
          {" "}
          {object.attributes.name}{" "}
        </option>
      );
    });
  };

  subCategoryOptions = () => {
    return this.state.subCategories.map((object, index) => {
      return (
        <option key={index} value={object.attributes.id}>
          {" "}
          {object.attributes.name}{" "}
        </option>
      );
    });
  };

  handleClose = () => {
    this.props.switchModal(this.props.name);
  };

  render() {
    return (
      <Modal show={this.props.show} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>New Coverage</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Formik
            validationSchema={schema}
            onSubmit={(values) => this.handleCreate(values)}
            initialValues={{
              club: this.props.club?.name,
              group: this.props.group?.group.name,
              category_id: 1,
              sub_category_id: 1,
              notes: "",
              start_date: new Date(),
              end_date: new Date(),
              has_coverage_line: false,
              verified: false,
            }}
          >
            {({
              handleSubmit,
              handleChange,
              handleBlur,
              values,
              touched,
              isValid,
              errors,
            }) => (
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
                      as="select"
                      name="category_id"
                      value={values.category_id}
                      onChange={handleChange}
                    >
                      {this.categoryOptions()}
                    </Form.Control>
                  </Form.Group>

                  <Form.Group as={Col}>
                    <Form.Label>Sub Category:</Form.Label>
                    <Form.Control
                      as="select"
                      name="sub_category_id"
                      value={values.sub_category_id}
                      onChange={handleChange}
                    >
                      {this.subCategoryOptions()}
                    </Form.Control>
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
                    <DatePicker
                      name="start_date"
                      selected={values.start_date}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Form.Group as={Col}>
                    <Form.Label>End Date:</Form.Label>
                    <DatePicker
                      name="end_date"
                      selected={values.end_date}
                      onChange={handleChange}
                    />
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
                <Button
                  type="submit"
                  variant="primary"
                  className="btn btn-theme float-right"
                >
                  Create Coverage
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
