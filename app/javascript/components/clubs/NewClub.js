import React from "react";
import PropTypes from "prop-types";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Formik } from "formik";
import * as yup from "yup";
import {
  handleInputChange,
  handleClose,
  run_ajax,
  updateHelper,
  handleDelete,
} from "Utils.js";

const schema = yup.object({
  name: yup.string().required(),
  abbreviation: yup.string(),
});

class NewClub extends React.Component {
  constructor() {
    super();
    this.handleInputChange = handleInputChange.bind(this);
    this.run_ajax = run_ajax.bind(this);
  }

  state = {
    leagues: [],
  };

  componentDidMount() {
    this.getObjects();
  }

  getObjects() {
    this.run_ajax("/leagues.json", "GET", {}, (res) => {
      this.setState({ leagues: res.data, league_id: res.data[0]?.id });
    });
  }

  leagueOptions = () => {
    return this.state.leagues.map((object, index) => {
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

  handleCreate = (values) => {
    var id;
    if (values.league_id == null) { id = this.state.leagues[0].attributes.id }
    else { id = values.league_id }
    let data = {
      name: values.name,
      abbreviation: values.abbreviation,
      league_id: id
    }
    this.props.run_ajax("/clubs.json", "POST", data);
    this.handleClose();
  };

  render() {
    return (
      <Modal show={this.props.show} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>New Club</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Formik
            validationSchema={schema}
            onSubmit={(values) => this.handleCreate(values)}
            initialValues={{
              name: "",
              abbreviation: "",
              league_id: this.props.league?.attributes.id,
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
                {" "}
                <Row>
                  <Form.Group as={Col}>
                    <Form.Label>Name:</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={values.name}
                      onChange={handleChange}
                      isInvalid={!!errors.name}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.name}
                    </Form.Control.Feedback>{" "}
                  </Form.Group>
                  <Form.Group as={Col}>
                    <Form.Label>Code:</Form.Label>
                    <Form.Control
                      type="text"
                      name="abbreviation"
                      value={values.abbreviation}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Row>
                <Row>
                  <Form.Group as={Col}>
                    <Form.Label>League:</Form.Label>
                    <Form.Control
                      as="select"
                      name="league_id"
                      value={values.league_id}
                      onChange={handleChange}
                    >
                      {this.leagueOptions()}
                    </Form.Control>
                  </Form.Group>
                </Row>
                <Button
                  type="submit"
                  variant="primary"
                  className="btn btn-theme float-right"
                >
                  Create Club
                </Button>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    );
  }
}

export default NewClub;
