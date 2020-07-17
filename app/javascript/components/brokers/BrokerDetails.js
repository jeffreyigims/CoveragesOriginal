import React from "react";
import PropTypes, { object } from "prop-types";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import EditBroker from "./EditBroker";
import GeneralTable from "../GeneralTable.js";
import { EyeFill } from "react-bootstrap-icons";

import { run_ajax, switchModal } from "../Utils.js";

class BrokerDetails extends React.Component {
  constructor() {
    super();
    this.run_ajax = run_ajax.bind(this);
    this.switchModal = switchModal.bind(this);
  }

  state = {
    object: null,
    objects: [],
    modal_edit: false,
    tableHeaders: ["Club", "Group", "Start", "Verified", "View"],
  };

  componentDidMount() {
    this.getObjects();
  }

  getObjects = () => {
    this.run_ajax("/brokers/" + this.props.id + ".json", "GET", {}, (res) => {
      this.setState({
        object: res.data,
        objects: res.data.attributes.coverages,
      });
    });
  };

  handleDelete = () => {
    this.run_ajax(
      "/brokers/".concat(this.state.object.attributes.id),
      "DELETE",
      {},
      () => {}
    );
    window.location.replace("/companies/".concat(this.state.object.attributes.company.id));
  };

  showObjects = (objects) => {
    return objects.map((object, index) => {
      return (
        <tr key={index}>
          <td width="200" align="left">
            <Button
              variant="link"
              href={"/clubs/" + object.data.attributes.club.id}
              style={{ color: "black" }}
            >
              {object.data.attributes.club.name}
            </Button>
          </td>
          <td width="200" align="left">
            {object.data.attributes.group.name}
          </td>
          <td width="200" align="left">
            {object.data.attributes.start_date}
          </td>
          <td width="200" align="left">
            {object.data.attributes.verified ? "true" : "false"}
          </td>
          <td width="100" align="center">
            <Button
              variant="link"
              href={"/coverages/" + object.data.attributes.id}
              style={{ color: "black" }}
            >
              <EyeFill />
            </Button>
          </td>
        </tr>
      );
    });
  };

  render() {
    return (
      <>
        <Card>
          <Card.Header></Card.Header>
          <Card.Title style={{ marginTop: "10px" }}>
            {this.state.object?.attributes.name}
          </Card.Title>
          <Card.Body>
            <Table striped bordered hover>
              <GeneralTable
                tableHeaders={this.state.tableHeaders}
                showObjects={this.showObjects}
                objects={this.state.objects}
              />
            </Table>
          </Card.Body>
          <Card.Footer>
            <Button
              className="btn btn-theme float-right"
              variant="primary"
              onClick={(slot) => this.switchModal("modal_edit")}
              style={{ marginRight: "10px" }}
            >
              Edit Broker
            </Button>
            {this.state.objects.length == 0 && (
              <Button
                className="btn btn-theme float-right"
                variant="danger"
                onClick={() => this.handleDelete()}
                style={{ marginRight: "10px" }}
              >
                Delete Broker
              </Button>
            )}
          </Card.Footer>
        </Card>
        <EditBroker
          object={this.state.object}
          name={"modal_edit"}
          show={this.state.modal_edit}
          run_ajax={this.run_ajax}
          switchModal={this.switchModal}
        />
      </>
    );
  }
}

export default BrokerDetails;
