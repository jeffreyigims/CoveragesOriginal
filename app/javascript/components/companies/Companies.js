import React from "react";
import PropTypes from "prop-types";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import NewCompany from "./NewCompany";
import { run_ajax, getObjects, switchModal, showSelected } from "Utils.js";

class Companies extends React.Component {
  constructor() {
    super();
    this.run_ajax = run_ajax.bind(this);
    this.switchModal = switchModal.bind(this);
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

  getObjects = () => {
    this.run_ajax("/companies.json", "GET", {}, (res) => {
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
              href={"/companies/" + object.attributes.id}
              style={{ color: "black" }}
            >
              {object.attributes.name}
            </Button>{" "}
          </td>
          <td width="200" align="left">
            {object.attributes.brokers.length}
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
