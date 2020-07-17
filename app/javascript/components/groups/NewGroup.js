import React from "react";
import PropTypes from "prop-types";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Formik } from "formik";
import * as yup from "yup";
import { handleClose, run_ajax, handleCreate } from "../Utils.js";

const schema = yup.object({
  name: yup.string().required(),
});

class NewGroup extends React.Component {
  constructor() {
    super();
    this.handleClose = handleClose.bind(this);
    this.run_ajax = run_ajax.bind(this);
    this.handleCreate = handleCreate.bind(this);
  }

  render() {
    return (
      <Modal show={this.props.show} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            New{" "}
            {this.props.objectName.charAt(0).toUpperCase() +
              this.props.objectName.slice(1)}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Formik
            validationSchema={schema}
            onSubmit={(values) =>
              this.handleCreate(values, this.props.attributes)
            }
            initialValues={{
              name: "",
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
                </Row>
                <Button
                  className="btn btn-theme float-right"
                  type="submit"
                  variant="primary"
                >
                  Create{" "}
                  {this.props.objectName.charAt(0).toUpperCase() +
                    this.props.objectName.slice(1)}
                </Button>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    );
  }
}

export default NewGroup;
