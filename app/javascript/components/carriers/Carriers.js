import React from "react";
import PropTypes from "prop-types";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import NewCarrier from "./NewCarrier";
import { run_ajax, getObjects, switchModal, showSelected } from "Utils.js";

class Carriers extends React.Component {
  constructor() {
    super();
    this.run_ajax = run_ajax.bind(this);
    this.switchModal = switchModal.bind(this);
  }

  state = {
    objects: [],
    modal_new: false,
    objectName: "Carrier",
    objectPlural: "carriers",
    attributes: ["name"],
  };

  componentDidMount() {
    this.getObjects();
  }

  getObjects = () => {
    this.run_ajax("/" + this.state.objectPlural + ".json", "GET", {}, (res) => {
      this.setState({ objects: res.data });
    });
  };

  showObjects = () => {
    return this.state.objects.map((object, index) => {
      return (
        <tr key={index}>
          <td width="200" align="left">
            <Button
              variant="link"
              href={"/" + this.state.objectPlural + "/" + object.attributes.id}
              style={{ color: "black" }}
            >
              {object.attributes.name}
            </Button>{" "}
          </td>
          <td width="200" align="left">
            {object.attributes.associated_coverages}
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
                  <th>Coverages</th>
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
              New {this.state.objectName}
            </Button>
          </Card.Footer>
        </Card>
        <NewCarrier
          name={"modal_new"}
          show={this.state.modal_new}
          run_ajax={this.run_ajax}
          switchModal={this.switchModal}
          objectName={this.state.objectPlural}
          attributes={this.state.attributes}
        />
      </>
    );
  }
}

export default Carriers;
