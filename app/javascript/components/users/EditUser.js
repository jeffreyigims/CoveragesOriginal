import React from "react";
import PropTypes from "prop-types";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import { Formik } from "formik";
import * as yup from "yup";
import {
  handleClose,
  handleUpdate,
  updateHelper,
  handleDelete,
} from "../Utils.js";

const schema = yup.object({
  first_name: yup.string().required(),
  last_name: yup.string().required(),
  role: yup.number().required(),
  username: yup.string().required(),
});

class EditUser extends React.Component {
  constructor() {
    super();
    this.handleDelete = handleDelete.bind(this);
  }

  state = {
      roles: ["admin", "contact", "employee"],
  };

  handleClose = () => {
    this.props.switchModal(this.props.name);
  };

  handleUpdate = (values) => {
    let data = {
      first_name: values.first_name,
      last_name: values.last_name,
      role: this.state.roles[values.role],
      username: values.username,
    };
    this.props.run_ajax(
      "/users/".concat(this.props.object.attributes.id, ".json"),
      "PATCH",
      { user: data }
    );
    this.handleClose();
  };

  roleOptions = () => {
    return this.state.roles.map((object, index) => {
      return (
        <option key={index} value={index}>
          {" "}
          {object}{" "}
        </option>
      );
    });
  };

  render() {
    return (
      <>
        <Modal show={this.props.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit User</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Formik
              validationSchema={schema}
              onSubmit={(values) => this.handleUpdate(values)}
              initialValues={{
                first_name: this.props.object?.attributes.first_name,
                last_name: this.props.object?.attributes.last_name,
                role: this.state.roles.indexOf(this.props.object?.attributes.role),
                username: this.props.object?.attributes.username,
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
                      <Form.Label>First Name:</Form.Label>
                      <Form.Control
                        type="text"
                        name="first_name"
                        value={values.first_name}
                        onChange={handleChange}
                        isInvalid={!!errors.first_name}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.first_name}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col}>
                      <Form.Label>Last Name:</Form.Label>
                      <Form.Control
                        type="text"
                        name="last_name"
                        value={values.last_name}
                        onChange={handleChange}
                        isInvalid={!!errors.last_name}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.last_name}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Row>
                  <Row>
                    <Form.Group as={Col}>
                      <Form.Label>Role:</Form.Label>
                      <Form.Control
                        as="select"
                        name="role"
                        value={values.role}
                        onChange={handleChange}
                      >
                        {this.roleOptions()}
                      </Form.Control>
                    </Form.Group>
                    <Form.Group as={Col}>
                      <Form.Label>Username:</Form.Label>
                      <Form.Control
                        type="text"
                        name="username"
                        value={values.username}
                        onChange={handleChange}
                        isInvalid={!!errors.username}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.username}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Row>
                  <Button
                    className="btn btn-theme float-right"
                    type="submit"
                    variant="primary"
                  >
                    Update User
                  </Button>
                </Form>
              )}
            </Formik>
          </Modal.Body>
        </Modal>
      </>
    );
  }
}

export default EditUser;
