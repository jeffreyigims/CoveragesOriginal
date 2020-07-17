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
import { Formik } from "formik";
import * as yup from "yup";

import { run_ajax, getObjects, switchModal, showSelected } from "../Utils.js";

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
        coverageCarriers: res.data.attributes.coverage_carriers,
        coverageBrokers: res.data.attributes.coverage_brokers,
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

  includesCarrier = (item, arr) => {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].data.attributes.carrier_id == item) {
        return true;
      }
    }
    return false;
  };

  handleCarriers = (objects) => {
    let curr = this.state.coverageCarriers;
    let needAdded = objects.filter((object) => !this.includesCarrier(object, curr));
    let needDestroyed = curr.filter(
      (object) => !objects.includes(object.data.attributes.carrier_id.toString())
    );
    for (let i = 0; i < needAdded.length; i++) {
      let data = {
        coverage_id: this.state.object.attributes.id,
        carrier_id: needAdded[i],
      };
      this.run_ajax("/coverage_carriers.json", "POST", data, () => {});
    }
    for (let i = 0; i < needDestroyed.length; i++) {
      let id = needDestroyed[i].data.attributes.id;
      this.run_ajax("/coverage_carriers/" + id + ".json", "DELETE", {}, () => {});
    }
  };

  includesBroker = (item, arr) => {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].data.attributes.broker_id == item) {
        return true;
      }
    }
    return false;
  };

  handleBrokers = (objects) => {
    let curr = this.state.coverageBrokers;
    let needAdded = objects.filter(
      (object) => !this.includesBroker(object, curr)
    );
    let needDestroyed = curr.filter(
      (object) => !objects.includes(object.data.attributes.broker_id.toString())
    );
    for (let i = 0; i < needAdded.length; i++) {
      let data = {
        coverage_id: this.state.object.attributes.id,
        broker_id: needAdded[i],
      };
      this.run_ajax("/coverage_brokers.json", "POST", data, () => {});
    }
    for (let i = 0; i < needDestroyed.length; i++) {
      let id = needDestroyed[i].data.attributes.id;
      this.run_ajax("/coverage_brokers/" + id + ".json", "DELETE", {}, () => {});
    }
  };

  handleUpdate = (values) => {
    let data = {
      notes: values.notes,
      has_coverage_line: values.has_coverage_line,
      verified: values.verified,
    };
    this.run_ajax(
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
                carriers: this.state.coverageCarriers.map(
                  (carrier) => carrier.data.attributes.carrier_id
                ),
                brokers: this.state.coverageBrokers.map(
                  (broker) => broker.data.attributes.broker_id
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
