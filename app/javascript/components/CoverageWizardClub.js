import React from "react";
import PropTypes from "prop-types";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

class CoverageWizardLeague extends React.Component {
  objectOptions = () => {
    return this.props.objects.map((object, index) => {
      return (
        <option key={index} value={index}>
          {" "}
          {object.attributes.name}{" "}
        </option>
      );
    });
  };

  render() {
    return (
      <Row>
        <Form.Group as={Col}>
          <Form.Label>Club:</Form.Label>
          <Form.Control
            as="select"
            name="club"
            value={this.props.values.club}
            onChange={this.props.handleChange}
            isInvalid={!!this.props.errors.club}
          >
            {this.objectOptions()}
          </Form.Control>
          <Form.Control.Feedback type="invalid">
            {this.props.errors.club}
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
    );
  }
}

export default CoverageWizardLeague;
