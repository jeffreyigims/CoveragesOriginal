import React from "react";
import PropTypes from "prop-types";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Formik } from "formik";
import * as yup from "yup";

import { handleInputChange, handleClose, run_ajax } from "Utils.js";

const schema = yup.object({
  name: yup.string().required(),
});

class NewSubCategory extends React.Component {
  constructor() {
    super();
    this.run_ajax = run_ajax.bind(this);
  }

  componentDidMount() {}

  handleClose = () => {
    this.props.switchModal(this.props.name);
  };

  handleCreate = (values) => {
    let data = {
      category_id: this.props.category.attributes.id,
      name: values.name,
    };
    this.props.run_ajax("/sub_categories.json", "POST", data);
    this.handleClose();
  };

  render() {
    return (
      <Modal show={this.props.show} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>New Sub Category</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Formik
            validationSchema={schema}
            onSubmit={(values) => this.handleCreate(values)}
            initialValues={{
              category: this.props.category?.attributes.name,
              name: "",
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
                    <Form.Label>Category:</Form.Label>
                    <Form.Control
                      type="text"
                      name="category"
                      value={values.category}
                      disabled
                    />
                  </Form.Group>
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
                  type="submit"
                  variant="primary"
                  className="btn btn-theme float-right"
                >
                  Create Sub
                </Button>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    );
  }
}

export default NewSubCategory;
