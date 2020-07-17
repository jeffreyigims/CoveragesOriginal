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
import { handleClose, run_ajax } from "../Utils.js";

const schema = yup.object({
  name: yup.string().required(),
});

class ShowSport extends React.Component {
  constructor() {
    super();
    this.handleClose = handleClose.bind(this);
    this.run_ajax = run_ajax.bind(this);
  }

  handleUpdate = (values) => {
    let data = {
      name: values.name,
    };
    this.props.run_ajax(
      "/sports/".concat(this.props.selected.attributes.id, ".json"),
      "PATCH",
      data
    );
    this.handleClose(this.props.name);
  };

  render() {
    return (
      <>
        <Modal show={this.props.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Sport</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Formik
              validationSchema={schema}
              onSubmit={(values) => this.handleUpdate(values)}
              initialValues={{
                name: this.props.selected?.attributes.name,
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
                  {this.props.leagues.length === 0 ? (
                    <Button variant="danger" onClick={this.handleDelete}>
                      Delete Sport
                    </Button>
                  ) : (
                    ""
                  )}
                  <Button
                    type="submit"
                    variant="primary"
                    className="btn btn-theme float-right"
                  >
                    Update Sport
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

export default ShowSport;
