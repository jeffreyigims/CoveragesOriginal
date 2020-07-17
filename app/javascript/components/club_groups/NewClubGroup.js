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
  group_id: yup.string().required(),
});

class NewClubGroup extends React.Component {
  constructor() {
    super();
    this.handleClose = handleClose.bind(this);
    this.run_ajax = run_ajax.bind(this);
  }

  state = {
    groups: [],
  };

  componentDidMount() {
    this.getObjects();
  }

  getObjects() {
    this.run_ajax("/groups.json", "GET", {}, (res) => {
      this.setState({ groups: res.data });
    });
  }

  groupOptions = () => {
    return this.state.groups.map((object, index) => {
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
        club_id: this.props.club?.attributes.id,
        group_id: values.group_id
    }
    this.props.run_ajax("/club_groups.json", "POST", data);
    this.handleClose(this.props.name);
  };

  render() {
    return (
      <Modal show={this.props.show} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>New Group</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Formik
            validationSchema={schema}
            onSubmit={(values) => this.handleCreate(values)}
            initialValues={{
              name: this.props.club?.attributes.name,
              group_id: this.state.groups[0]?.attributes.id,
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
                    <Form.Label>Club:</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={values.name}
                      disabled
                    />
                  </Form.Group>
                  <Form.Group as={Col}>
                    <Form.Label>Group:</Form.Label>
                    <Form.Control
                      as="select"
                      name="group_id"
                      value={values.group_id}
                      onChange={handleChange}
                    >
                      {this.groupOptions()}
                    </Form.Control>
                  </Form.Group>
                </Row>
                <Button
                  className="btn btn-theme float-right"
                  type="submit"
                  variant="primary"
                >
                  Create Group
                </Button>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    );
  }
}

export default NewClubGroup;
