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

class EditBroker extends React.Component {
  constructor() {
    super();
    this.run_ajax = run_ajax.bind(this);
    this.handleClose = handleClose.bind(this);
  }

  handleUpdate = (values) => {
    let data = {
      name: values.name,
    };
    this.props.run_ajax(
      "/brokers/".concat(this.props.object.attributes.id, ".json"),
      "PATCH",
      data
    );
    this.handleClose(this.props.name);
  };

  render() {
    return (
      <Modal show={this.props.show} onHide={() => this.handleClose(this.props.name)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Broker</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Formik
            validationSchema={schema}
            onSubmit={(values) => this.handleUpdate(values)}
            initialValues={{
              name: this.props.object?.attributes.name,
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
                  Update Broker
                </Button>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    );
  }
}

export default EditBroker;
