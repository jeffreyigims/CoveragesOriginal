import React from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Test from "./Test";
import NewForm from "./NewForm";
import { run_ajax, switchModal, handleCreate, handleClose } from "Utils.js";
import { Formik } from "formik";
import * as yup from "yup";

const schema = yup.object({
  name: yup.string().required(),
});

class Sports extends React.Component {
  constructor() {
    super();
    this.run_ajax = run_ajax.bind(this);
    this.switchModal = switchModal.bind(this);
    this.handleCreate = handleCreate.bind(this);
    this.handleClose = handleClose.bind(this);
  }

  state = {
    objects: [],
    modal_new: false,
    objectName: "sport",
    attributes: ["name"],
    tableHeaders: ["Name", "Associated Leagues"],
    plural: "sports",
  };

  componentDidMount() {
    this.getObjects();
  }

  getObjects = () => {
    this.run_ajax("/" + this.state.plural + ".json", "GET", {}, (res) => {
      this.setState({ objects: res.data });
    });
  };

  showObjects = (objects) => {
    return objects.map((object, index) => {
      return (
        <tr key={index}>
          <td width="200" align="left">
            <Button
              variant="link"
              href={"/" + this.state.plural + "/" + object.attributes.id}
              style={{ color: "black" }}
            >
              {object.attributes.name}
            </Button>{" "}
          </td>
          <td width="200" align="left">
            {object.attributes.leagues.length}
          </td>
        </tr>
      );
    });
  };

  formStructure = () => {
    return (
      <Formik
        validationSchema={schema}
        onSubmit={(values) => this.handleCreate(values)}
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
              Create Sport
            </Button>
          </Form>
        )}
      </Formik>
    );
  };

  render() {
    return (
      <>
        <Test
          objects={this.state.objects}
          switchModal={this.switchModal}
          objectName={this.state.objectName}
          tableHeaders={this.state.tableHeaders}
          showObjects={this.showObjects}
          plural={this.state.plural}
        />
        <NewForm
          show={this.state.modal_new}
          objectName={this.state.objectName}
          formStructure={this.formStructure}
          switchModal={this.switchModal}
        />
      </>
    );
  }
}

export default Sports;
