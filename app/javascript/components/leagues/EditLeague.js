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
  handleUpdate,
  updateHelper,
  handleDelete,
} from "Utils.js";

const schema = yup.object({
  level: yup.string(),
});

class EditLeague extends React.Component {
  constructor() {
    super();
    this.handleInputChange = handleInputChange.bind(this);
    this.handleDelete = handleDelete.bind(this);
  }

  state = {
    name: null,
  };

  handleClose = () => {
    this.props.switchModal(this.props.name);
  };

  handleUpdate = (values) => {
    let data = {
      level: values.level,
    };
    this.props.run_ajax(
      "/leagues/".concat(this.props.league.attributes.id, ".json"),
      "PATCH",
      data
    );
    this.handleClose();
  };

  render() {
    return (
      <Modal show={this.props.show} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit League</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Formik
            validationSchema={schema}
            onSubmit={(values) => this.handleUpdate(values)}
            initialValues={{
              name: this.props.league?.attributes.name,
              sport: this.props.league?.attributes.sport.name,
              level: this.props.league?.attributes.level || "",
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
                      disabled
                    />
                  </Form.Group>

                  <Form.Group as={Col}>
                    <Form.Label>Sport:</Form.Label>
                    <Form.Control
                      type="text"
                      name="sport"
                      value={values.sport}
                      disabled
                    />
                  </Form.Group>
                </Row>
                <Row>
                  <Form.Group as={Col}>
                    <Form.Label>Level:</Form.Label>
                    <Form.Control
                      type="text"
                      name="level"
                      value={values.level}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Row>
                <Button
                  type="submit"
                  variant="primary"
                  className="btn btn-theme float-right"
                >
                  Update League
                </Button>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    );
  }
}

export default EditLeague;
