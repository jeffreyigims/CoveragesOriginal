import React from "react";
import PropTypes from "prop-types";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Tabs";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import NewGroup from "./NewGroup";
import { run_ajax, switchModal } from "Utils.js";

class Groups extends React.Component {
  constructor() {
    super();
    this.run_ajax = run_ajax.bind(this);
    this.switchModal = switchModal.bind(this);
  }

  state = {
    objects: [],
    modal_new: false,
    objectName: "groups",
    attributes: ["name"],
  };

  componentDidMount() {
    this.getObjects();
  }

  getObjects = () => {
    this.run_ajax("/groups.json", "GET", {}, (res) => {
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
              href={"/groups/" + object.attributes.id}
              style={{ color: "black" }}
            >
              {object.attributes.name}
            </Button>{" "}
          </td>
          <td width="200" align="left">
            {object.attributes.associated_clubs}
          </td>
        </tr>
      );
    });
  };

  render() {
    return (
      <>
        <Card>
          <Card.Title>All Groups</Card.Title>
          <Card.Body>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Associated Clubs</th>
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
              New Group
            </Button>
          </Card.Footer>
        </Card>
        <NewSport
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

export default Groups;
