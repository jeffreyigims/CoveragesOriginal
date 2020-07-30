import React from "react";
import PropTypes from "prop-types";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Formik } from "formik";
import * as yup from "yup";
import { handleClose, run_ajax } from "../Utils.js";

const schema = yup.object({
  name: yup.string().required(),
});

class NewLeague extends React.Component {
  constructor() {
    super();
    this.run_ajax = run_ajax.bind(this);
    this.handleClose = handleClose.bind(this);  }

  state = {
    sports: [],
  };

  componentDidMount() {
    this.getObjects();
  }

  getObjects() {
    this.run_ajax("/sports.json", "GET", {}, (res) => {
      this.setState({ sports: res.data });
    });
  }

  sportOptions = () => {
    return this.state.sports.map((object, index) => {
      return (
        <option key={index} value={object.attributes.id}>
          {" "}
          {object.attributes.name}{" "}
        </option>
      );
    });
  };

  handleCreate = (values) => {
    let data = {
      sport_id: values.sport_id,
      name: values.name,
      level: values.level,
    };
    this.props.run_ajax("/leagues.json", "POST", data);
    this.handleClose(this.props.name);
  };

  render() {
    return (
      <Modal show={this.props.show} onHide={() => this.handleClose(this.props.name)}>
        <Modal.Header closeButton>
          <Modal.Title>New League</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Formik
            validationSchema={schema}
            onSubmit={(values) => this.handleCreate(values)}
            initialValues={{
              name: "",
              level: "",
              sport_id: this.props.selected?.attributes?.id || this.state.sports[0]?.id,
            }}
          >
            {({
              handleSubmit,
              handleChange,
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
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col}>
                    <Form.Label>Level:</Form.Label>
                    <Form.Control
                      type="text"
                      name="level"
                      value={values.level}
                      onChange={handleChange}
                      isInvalid={!!errors.level}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.level}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>
                <Row>
                  <Form.Group as={Col}>
                    <Form.Label>Sport:</Form.Label>
                    <Form.Control
                      as="select"
                      name="sport_id"
                      value={values.sport_id}
                      onChange={handleChange}
                      isInvalid={!!errors.sport_id}
                    >
                      {this.sportOptions()}
                    </Form.Control>
                  </Form.Group>
                  <Form.Control.Feedback type="invalid">
                    {errors.sport_id}
                  </Form.Control.Feedback>
                </Row>
                <Button
                  type="submit"
                  variant="primary"
                  className="btn btn-theme float-right"
                >
                  Create League
                </Button>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    );
  }
}

export default NewLeague;
