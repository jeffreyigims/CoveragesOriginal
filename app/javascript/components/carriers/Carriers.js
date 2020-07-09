import React from "react";
import PropTypes from "prop-types";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import ShowCarrier from "./ShowCarrier";
import NewCarrier from "./NewCarrier";
import { run_ajax, getObjects, switchModal, showSelected } from "Utils.js";

class Carriers extends React.Component {
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
    objectName: "carriers",
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
        </tr>
      );
    });
  };

  render() {
    return (
      <>
        <Card>
          <Card.Title>All Carriers</Card.Title>
          <Card.Body>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Name</th>
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
              New Carrier
            </Button>
          </Card.Footer>
        </Card>
        <ShowCarrier
          selected={this.state.selected}
          name={"modal_show"}
          show={this.state.modal_show}
          run_ajax={this.run_ajax}
          switchModal={this.switchModal}
          objectName={this.state.objectName}
          attributes={this.state.attributes}
        />
        <NewCarrier
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

export default Carriers;
