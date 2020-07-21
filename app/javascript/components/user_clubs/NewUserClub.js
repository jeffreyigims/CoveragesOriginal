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

const schema = yup.object({});

class NewUserClub extends React.Component {
  constructor() {
    super();
    this.run_ajax = run_ajax.bind(this);
    this.handleClose = handleClose.bind(this);
  }

  state = {
    clubs: [],
  };

  componentDidMount() {
    this.getObjects();
  }

  getObjects() {
    this.run_ajax("/clubs.json", "GET", {}, (res) => {
      this.setState({ clubs: res.data });
    });
  }

  clubOptions = () => {
    return this.state.clubs.map((object, index) => {
      return (
        <option key={index} value={index}>
          {" "}
          {object.attributes.name}{" "}
        </option>
      );
    });
  };

  handleCreate = (values) => {
    let data = {
      user_id: this.props.object.attributes.id,
      club_id: this.state.clubs[values.club].attributes.id,
      active: true,
    };
    this.props.run_ajax("/user_clubs.json", "POST", data);
    this.handleClose(this.props.name);
  };

  render() {
    return (
      <Modal show={this.props.show} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>New Contact</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Formik
            validationSchema={schema}
            onSubmit={(values) => this.handleCreate(values)}
            initialValues={{
              user: this.props.object?.attributes.name,
              club: 0,
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
                    <Form.Label>User:</Form.Label>
                    <Form.Control
                      type="text"
                      name="user"
                      value={values.user}
                      disabled
                    />
                  </Form.Group>
                  <Form.Group as={Col}>
                    <Form.Label>Club:</Form.Label>
                    <Form.Control
                      as="select"
                      name="club"
                      value={values.club}
                      onChange={handleChange}
                    >
                      {this.clubOptions()}
                    </Form.Control>
                  </Form.Group>
                </Row>
                <Button
                  type="submit"
                  variant="primary"
                  className="btn btn-theme float-right"
                >
                  Create Contact
                </Button>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    );
  }
}

export default NewUserClub;
