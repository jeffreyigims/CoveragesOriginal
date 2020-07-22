import React from "react";
import PropTypes from "prop-types";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Alert from "react-bootstrap/Alert";
import { run_ajax } from "./Utils.js";
import { Formik } from "formik";
import * as yup from "yup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import GeneralTable from "./GeneralTable.js";
import { TrashFill } from "react-bootstrap-icons";

const schema = yup.object({
  // name: yup.string().required(),
});

class CoverageWizardCoverages extends React.Component {
  constructor() {
    super();
    this.run_ajax = run_ajax.bind(this);
  }

  state = {
    club: null,
    clubGroups: [],
    categories: [],
    subCategories: [],
    brokers: [],
    carriers: [],
    coverages: [],
    tableHeaders: ["Group", "Category", "Sub", "Carrier", "Broker", "Remove"],
    added: 0,
    alert: false,
  };

  componentDidMount() {
    this.getObjects();
  }

  getObjects = () => {
    this.run_ajax("/clubs/" + this.props.club + ".json", "GET", {}, (res) => {
      this.setState({
        club: res.data,
        clubGroups: res.data.attributes.club_groups,
      });
    });
    this.run_ajax("/categories.json", "GET", {}, (res) => {
      this.setState({
        categories: res.data,
        subCategories: res.data[0]?.attributes.sub_categories,
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

  clubGroupOptions = () => {
    return this.state.clubGroups.map((object, index) => {
      return (
        <option key={index} value={index}>
          {" "}
          {object.data.attributes.group.name}{" "}
        </option>
      );
    });
  };

  categoryOptions = () => {
    return this.state.categories.map((object, index) => {
      return (
        <option key={index} value={index}>
          {" "}
          {object.attributes.name}{" "}
        </option>
      );
    });
  };

  subCategoryOptions = (index) => {
    return this.state.categories[index]?.attributes.sub_categories.map(
      (object, index) => {
        return (
          <option key={index} value={index}>
            {" "}
            {object.data.attributes.name}{" "}
          </option>
        );
      }
    );
  };

  filterSubs = (index) => {
    this.setState({
      subCategories: this.state.categories[index].attributes.sub_categories,
    });
  };

  handleCreate = (values) => {
    let coverage = {
      club_group: this.state.clubGroups[values.group].data,
      category: this.state.categories[values.category],
      sub_category: this.state.categories[values.category].attributes
        .sub_categories[values.sub_category].data,
      carriers: values.carriers,
      brokers: values.brokers,
      notes: values.notes,
      start_date: values.start_date,
      end_date: values.end_date,
      has_coverage_line: values.has_coverage_line,
      verified: values.verified,
    };
    this.setState({ coverages: this.state.coverages.concat(coverage) });
  };

  handleSubmit = () => {
    this.state.coverages.map((coverage) => {
      let data = {
        club_group_id: coverage.club_group.attributes.id,
        sub_category_id: coverage.sub_category.attributes.id,
        notes: coverage.notes,
        start_date: coverage.start_date,
        end_date: coverage.end_date,
        has_coverage_line: coverage.has_coverage_line,
        verified: coverage.verified,
      };
      this.run_ajax("/coverages.json", "POST", data, (response) => {
        this.handleSubmitCarriersBrokers(
          response,
          coverage.carriers,
          coverage.brokers
        );
      });
    });
    this.setState({
      coverages: [],
      added: this.state.coverages.length,
      alert: true,
    });
  };

  handleSubmitCarriersBrokers = (response, carriers, brokers) => {
    let id = response.id;
    for (let i = 0; i < carriers.length; i++) {
      let data = {
        coverage_id: id,
        carrier_id: this.state.carriers[carriers[i]].attributes.id,
      };
      this.run_ajax("/coverage_carriers.json", "POST", data, () => {});
    }
    for (let i = 0; i < brokers.length; i++) {
      let data = {
        coverage_id: id,
        broker_id: this.state.brokers[brokers[i]].attributes.id,
      };
      this.run_ajax("/coverage_brokers.json", "POST", data, () => {});
    }
  };

  showObjects = (objects) => {
    return objects.map((object, index) => {
      return (
        <tr key={index}>
          <td width="200" align="left">
            {object.club_group.attributes.group.name}
          </td>
          <td width="200" align="left">
            {object.category.attributes.name}
          </td>
          <td width="200" align="left">
            {object.sub_category.attributes.name}
          </td>
          <td width="200" align="left">
            {object.carriers.length > 1
              ? "Multiple"
              : this.state.carriers[object.carriers[0]]?.attributes.name ||
                "Unknown"}
          </td>
          <td width="200" align="left">
            {object.brokers.length > 1
              ? "Multiple"
              : this.state.brokers[object.brokers[0]]?.attributes.company
                  .name || "Unknown"}{" "}
          </td>
          <td width="100" align="center">
            <Button
              variant="link"
              onClick={() => {
                this.setState({
                  coverages: this.state.coverages.filter(
                    (coverage, i) => i != index
                  ),
                });
              }}
              style={{ color: "black" }}
            >
              <TrashFill />
            </Button>
          </td>
        </tr>
      );
    });
  };

  render() {
    return (
      <>
        <Alert
          variant="success"
          show={this.state.alert}
          dismissible
          onClose={() => this.setState({ alert: false })}
          style={{ margin: "10px" }}
        >
          Successfully added {this.state.added} coverages to the system.
        </Alert>
        <Row>
          <Col style={{ marginRight: "0px" }}>
            <Card>
              <Card.Header></Card.Header>
              <Card.Title style={{ marginTop: "10px" }}>
                New Coverage
              </Card.Title>
              <Card.Body>
                <Formik
                  validationSchema={schema}
                  onSubmit={(values) => this.handleCreate(values)}
                  enableReinitialize
                  initialValues={{
                    club: this.state.club?.attributes.name || "",
                    group: 0,
                    category: 0,
                    sub_category: 0,
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
                            as="select"
                            name="group"
                            value={values.group}
                            onChange={handleChange}
                          >
                            {this.clubGroupOptions()}
                          </Form.Control>{" "}
                        </Form.Group>
                      </Row>

                      <Row>
                        <Form.Group as={Col}>
                          <Form.Label>Category:</Form.Label>
                          <Form.Control
                            as="select"
                            name="category"
                            value={values.category}
                            onChange={(e) => {
                              handleChange(e);
                              setFieldValue("sub_category", 0);
                            }}
                          >
                            {this.categoryOptions()}
                          </Form.Control>
                        </Form.Group>

                        <Form.Group as={Col}>
                          <Form.Label>Sub Category:</Form.Label>
                          <Form.Control
                            as="select"
                            name="sub_category"
                            value={values.sub_category}
                            onChange={handleChange}
                          >
                            {this.subCategoryOptions(values.category)}
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
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card>
              <Card.Header></Card.Header>
              <Card.Title style={{ marginTop: "10px" }}>Coverages</Card.Title>
              <Card.Body>
                <GeneralTable
                  tableHeaders={this.state.tableHeaders}
                  showObjects={this.showObjects}
                  objects={this.state.coverages}
                  message={"There are no coverages to present."}
                />
              </Card.Body>
              <Card.Footer>
                {this.state.coverages.length > 0 && (
                  <Button
                    variant="primary"
                    onClick={this.handleSubmit}
                    className="btn btn-theme float-right"
                  >
                    Submit Coverages
                  </Button>
                )}
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </>
    );
  }
}

export default CoverageWizardCoverages;
