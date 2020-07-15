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
import Alert from 'react-bootstrap/Alert';

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
    carriers: [],
    brokers: [],
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
    this.run_ajax("/brokers.json", "GET", {}, (res) => {
      this.setState({ brokers: res.data });
    });
    this.run_ajax("/carriers.json", "GET", {}, (res) => {
      this.setState({ carriers: res.data });
    });
  }

  showCarriers = () => {
    return this.state.carriers.map((carrier, index) => {
      return (
        <option key={index} value={carrier.attributes.id}>
          {" "}
          {carrier.attributes.name}{" "}
        </option>
      );
    });
  };

  showBrokers = () => {
    return this.state.brokers.map((broker, index) => {
      return (
        <option key={index} value={broker.attributes.id}>
          {" "}
          {broker.attributes.company.name} - {broker.attributes.name}{" "}
        </option>
      );
    });
  };

  createCoverageCarriers = (objects) => {
    for (let i = 0; i < objects.length; i++) {
      let data = {
        coverage_id: this.state.object.attributes.id,
        carrier_id: objects[i],
      };
      this.run_ajax("/coverage_carriers.json", "POST", data);
    }
  };

  createCoverageBrokers = (objects) => {
    for (let i = 0; i < objects.length; i++) {
      let data = {
        coverage_id: this.state.object.attributes.id,
        broker_id: objects[i],
      };
      this.run_ajax("/coverage_brokers.json", "POST", data);
    }
  };

  handleSubmitCarriersBrokers = (response, carriers, brokers) => {
    let id = response.id
    console.log(response)
    for (let i = 0; i < carriers.length; i++) {
      let data = {
        coverage_id: id,
        carrier_id: carriers[i],
      };
      this.run_ajax("/coverage_carriers.json", "POST", data, () => {});
    }
    for (let i = 0; i < brokers.length; i++) {
      let data = {
        coverage_id: id,
        broker_id: brokers[i],
      };
      this.run_ajax("/coverage_brokers.json", "POST", data, () => {});
    }
  }


  handleCreate = (values) => {
    let data = {
      club_group_id: this.props.group?.id,
      sub_category_id: this.state.subCategories[values.sub_category_id].attributes.id,
      notes: values.notes,
      start_date: values.start_date,
      end_date: values.end_date,
      has_coverage_line: values.has_coverage_line,
      verified: values.verified,
    };
    this.props.run_ajax("/coverages.json", "POST", data, (response) => { this.handleSubmitCarriersBrokers(response, values.carriers, values.brokers) });
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
              carriers: [],
              brokers: [],
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
              setFieldValue,
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

                <Row>
                  <Form.Group as={Col}>
                    <Form.Label>Carriers:</Form.Label>
                    <Form.Control
                      as="select"
                      multiple
                      name="carriers"
                      value={values.carriers}
                      onChange={(event) =>
                        setFieldValue(
                          "carriers",
                          Array.from(
                            event.target.selectedOptions,
                            (option) => option.value
                          )
                        )
                      }
                    >
                      {this.showCarriers()}
                    </Form.Control>
                  </Form.Group>

                  <Form.Group as={Col}>
                    <Form.Label>Brokers:</Form.Label>
                    <Form.Control
                      as="select"
                      multiple
                      name="brokers"
                      value={values.brokers}
                      onChange={(event) =>
                        setFieldValue(
                          "brokers",
                          Array.from(
                            event.target.selectedOptions,
                            (option) => option.value
                          )
                        )
                      }
                    >
                      {this.showBrokers()}
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
