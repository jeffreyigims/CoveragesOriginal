import React from "react";
import PropTypes, { object } from "prop-types";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Tabs";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import EditCompany from "./EditCompany";
import NewBroker from "../brokers/NewBroker.js";

import { run_ajax, getObjects, switchModal } from "Utils.js";

class CompanyDetails extends React.Component {
  constructor() {
    super();
    this.run_ajax = run_ajax.bind(this);
    this.switchModal = switchModal.bind(this);
  }

  state = {
    object: null,
    associated: [],
    modal_edit: false,
    modal_add: false,
  };

  componentDidMount() {
    this.getObjects();
  }

  getObjects = () => {
    this.run_ajax("/companies/" + this.props.id + ".json", "GET", {}, (res) => {
      this.setState({ object: res.data, associated: res.data.attributes.brokers });
    });
  };

  showAssociated = () => {
    return this.state.associated.map((object, index) => {
      return (
        <tr key={index}>
          <td width="200" align="left">
            <Button
              variant="link"
              href={"/brokers/" + object.data.attributes.id}
              style={{ color: "black" }}
            >
              {object.data.attributes.name}
            </Button>
          </td>
          <td width="200" align="left">
            {object.data.attributes.associated_coverages}
          </td>
        </tr>
      );
    });
  };

  render() {
    return (
      <>
        <Card>
          <Card.Title>{this.state.object?.attributes.name}</Card.Title>
          <Card.Body>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Coverages</th>
                </tr>
              </thead>
              <tbody>{this.showAssociated()}</tbody>
            </Table>
          </Card.Body>
          <Card.Footer>
            <Button
              className="btn btn-theme float-right"
              variant="primary"
              onClick={(slot) => this.switchModal("modal_add")}
            >
              Add Broker
            </Button>
            <Button
              className="btn btn-theme float-right"
              variant="primary"
              onClick={(slot) => this.switchModal("modal_edit")}
              style={{ marginRight: "10px" }}
            >
              Edit Company
            </Button>
          </Card.Footer>
        </Card>
        <EditCompany
          selected={this.state.object}
          name={"modal_edit"}
          show={this.state.modal_edit}
          run_ajax={this.run_ajax}
          switchModal={this.switchModal}
        />
        <NewBroker
          selected={this.state.object}
          name={"modal_add"}
          show={this.state.modal_add}
          run_ajax={this.run_ajax}
          switchModal={this.switchModal}
        />
      </>
    );
  }
}

export default CompanyDetails;
