import React from "react";
import PropTypes from "prop-types";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import ShowCompany from "./ShowCompany";
import NewCompany from "./NewCompany";
import { run_ajax, getObjects, switchModal, showSelected } from "Utils.js";

class Companies extends React.Component {
  constructor() {
    super();
    this.run_ajax = run_ajax.bind(this);
    this.getObjects = getObjects.bind(this);
    this.switchModal = switchModal.bind(this);
    this.showSelected = showSelected.bind(this);
  }

  state = {
    objects: [],
    modal_show: false,
    modal_new: false,
    selected: null,
    objectName: "companies",
    attributes: ["name"],
  };

  componentDidMount() {
    this.getObjects();
  }

  showObjects = () => {
    return this.state.objects.map((object, index) => {
      return (
        <tr key={index} onClick={(slot) => this.showSelected(object)}>
          <td width="200" align="left">
            {object.name}
          </td>
          <td width="200" align="left">
            {object.brokers.length}
          </td>
        </tr>
      );
    });
  };

  render() {
    return (
      <>
        <Card>
          <Card.Title>All Companies</Card.Title>
          <Card.Body>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Brokers</th>
                </tr>
              </thead>
              <tbody>{this.showObjects()}</tbody>
            </Table>
          </Card.Body>
          <Card.Footer>
            <Button
              className="btn btn-theme float-right"
              variant="primary"
              onClick={(slot) => this.switchModal("modal_new")}
            >
              New Company
            </Button>
          </Card.Footer>
        </Card>
        <ShowCompany
          selected={this.state.selected}
          name={"modal_show"}
          show={this.state.modal_show}
          run_ajax={this.run_ajax}
          switchModal={this.switchModal}
          objectName={this.state.objectName}
          attributes={this.state.attributes}
        />
        <NewCompany
          name={"modal_new"}
          show={this.state.modal_new}
          run_ajax={this.run_ajax}
          switchModal={this.switchModal}
          objectName={this.state.objectName}
          attributes={this.state.attributes}
        />
      </>
    );
  }
}

export default Companies;
