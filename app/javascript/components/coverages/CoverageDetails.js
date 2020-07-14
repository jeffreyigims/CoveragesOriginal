import React from "react";
import PropTypes, { object } from "prop-types";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Tabs";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import EditCoverage from "./EditCoverage";
import { Formik } from "formik";
import * as yup from "yup";

import { run_ajax, getObjects, switchModal, showSelected } from "Utils.js";

const schema = yup.object({});

class CoverageDetails extends React.Component {
  constructor() {
    super();
    this.run_ajax = run_ajax.bind(this);
    this.switchModal = switchModal.bind(this);
    this.showSelected = showSelected.bind(this);
  }

  state = {
    object: null,
    coverageCarriers: [],
    coverageBrokers: [],
    carriers: [],
    brokers: [],
  };

  componentDidMount() {
    this.getObjects();
  }

  getObjects = () => {
    this.run_ajax("/coverages/" + this.props.id + ".json", "GET", {}, (res) => {
      this.setState({
        object: res.data,
        coverageCarriers: res.data.attributes.coverageCarriers,
        coverageBrokers: res.data.attributes.coverageBrokers,
      });
    });
    this.run_ajax("/brokers.json", "GET", {}, (res) => {
      this.setState({ brokers: res.data });
    });
    this.run_ajax("/carriers.json", "GET", {}, (res) => {
      this.setState({ carriers: res.data });
    });
  };

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

  handleCarriers = (carriers) => {
    let needAdded = carriers.filter(
      (carrier) => !this.state.currentCarriers.includes(carrier)
    );
    let needDestroyed = this.state.currentCarriers.filter(
      (carrier) => !carriers.includes(carrier)
    );
    for (let i = 0; i < needAdded.length; i++) {
      let data = {
        coverage_id: this.state.object.attributes.id,
        carrier_id: needAdded[i],
      };
      this.props.run_ajax("/coverage_carriers.json", "POST", data);
    }
  };

  handleUpdate = (values) => {
    let data = {
      notes: values.notes,
      has_coverage_line: values.has_coverage_line,
      verified: values.verified,
    };
    this.props.run_ajax(
      "/coverages/".concat(this.state.object.attributes.id, ".json"),
      "PATCH",
      data
    );
    this.handleCarriers(values.carriers);
    this.handleBrokers(values.brokers);
  };

  render() {
    return (
      <>
        <Card>
          <Card.Header></Card.Header>
          <Card.Title style={{ marginTop: "10px" }}>
            Coverage Details
          </Card.Title>
          <Card.Body>
            <Formik
              validationSchema={schema}
              onSubmit={(values) => this.handleUpdate(values)}
              initialValues={{
                club: this.state.object?.attributes.club.name,
                group: this.state.object?.attributes.group.name,
                category: this.state.object?.attributes.category.name,
                sub_category: this.state.object?.attributes.sub_category.name,
                carriers: this.state.object?.attributes.carriers.map(
                  (broker) => broker.data.attributes.id
                ),
                brokers: this.state.object?.attributes.brokers.map(
                  (broker) => broker.data.attributes.id
                ),
                notes: this.state.object?.attributes.notes,
                has_coverage_line: this.state.object?.attributes
                  .has_coverage_line,
                verified: this.state.object?.attributes.verified,
              }}
              enableReinitialize={true}
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
                dirty,
              }) => (
                <Form noValidate onSubmit={handleSubmit}>
                  {" "}
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
                      defaultValue={this.state.object?.attributes.notes}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Row>
                    <Form.Group as={Col}>
                      <Form.Label>{"Start Date: "}</Form.Label>
                      <DatePicker name="start_date" selected={new Date()} />
                    </Form.Group>

                    <Form.Group as={Col}>
                      <Form.Label>{"End Date: "}</Form.Label>
                      <DatePicker name="end_date" selected={new Date()} />
                    </Form.Group>
                  </Row>
                  <Row>
                    <Form.Group as={Col}>
                      <Form.Check
                        type="checkbox"
                        name="has_coverage_line"
                        label={"Has Coverage Line"}
                        checked={values.has_coverage_line}
                        value={values.has_coverage_line}
                        onChange={handleChange}
                      />
                    </Form.Group>

                    <Form.Group as={Col}>
                      <Form.Check
                        type="checkbox"
                        name="verified"
                        label={"Verified"}
                        checked={values.verified}
                        value={values.verified}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Row>
                  {dirty == true ? (
                    <Button
                      type="submit"
                      className="btn btn-theme float-right"
                      variant="primary"
                      style={{ marginRight: "10px" }}
                    >
                      Update Coverage
                    </Button>
                  ) : (
                    ""
                  )}
                </Form>
              )}
            </Formik>
          </Card.Body>
          <Card.Footer></Card.Footer>
        </Card>
      </>
    );
  }
}

export default CoverageDetails;
