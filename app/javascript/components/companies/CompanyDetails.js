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
import GeneralTable from "../GeneralTable.js";

import { run_ajax, switchModal, handleDelete } from "../Utils.js";

class CompanyDetails extends React.Component {
  constructor() {
    super();
    this.run_ajax = run_ajax.bind(this);
    this.handleDelete = handleDelete.bind(this);
    this.switchModal = switchModal.bind(this);
  }

  state = {
    object: null,
    objects: [],
    modal_edit: false,
    modal_add: false,
    tableHeaders: ["Name", "Associated"],
  };

  componentDidMount() {
    this.getObjects();
  }

  getObjects = () => {
    this.run_ajax("/companies/" + this.props.id + ".json", "GET", {}, (res) => {
      this.setState({
        object: res.data,
        objects: res.data.attributes.brokers,
      });
    });
  };

  showObjects = (objects) => {
    return objects.map((object, index) => {
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
          <Card.Header></Card.Header>
          <Card.Title style={{ marginTop: "10px" }}>
            {this.state.object?.attributes.name}
          </Card.Title>
          <Card.Body>
            <GeneralTable
              tableHeaders={this.state.tableHeaders}
              showObjects={this.showObjects}
              objects={this.state.objects}
            />
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
            {this.state.objects.length == 0 && (
              <Button
                className="btn btn-theme float-right"
                variant="danger"
                onClick={() =>
                  this.handleDelete(
                    "companies",
                    this.state.object.attributes.id
                  )
                }
                style={{ marginRight: "10px" }}
              >
                Delete Company
              </Button>
            )}
          </Card.Footer>
        </Card>
        <EditCompany
          object={this.state.object}
          name={"modal_edit"}
          show={this.state.modal_edit}
          run_ajax={this.run_ajax}
          switchModal={this.switchModal}
        />
        <NewBroker
          object={this.state.object}
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
