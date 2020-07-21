import React from "react";
import PropTypes from "prop-types";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

class CoverageWizardSport extends React.Component {
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
          <Form.Label>Sport:</Form.Label>
          <Form.Control
            as="select"
            name="sport"
            value={this.props.values.sport}
            onChange={this.props.handleChange}
            isInvalid={!!this.props.errors.sport}
          >
            {this.objectOptions()}
          </Form.Control>
          <Form.Control.Feedback type="invalid">
            {this.props.errors.sport}
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
    );
  }
}

export default CoverageWizardSport;
