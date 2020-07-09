import React from "react";
import PropTypes from "prop-types";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Tabs";
import Card from "react-bootstrap/Card";
import ShowClub from "./ShowClub";
import NewClub from "./NewClub";
import {run_ajax, getObjects, switchModal, showSelected} from 'Utils.js';

class Clubs extends React.Component {
  constructor(){
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
    objectName: "clubs",
    attributes: ["name", "abbreviation", "league_id"]
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
            {object.abbreviation}
          </td>
          <td width="200" align="left">
            {object.league.name}
          </td>
        </tr>
      );
    });
  };

  render() {
    return (
      <>
        <Card>
          <Card.Title>All Clubs</Card.Title>
          <Card.Body>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Code</th>
                  <th>League</th>
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
              New Club
            </Button>
          </Card.Footer>
        </Card>
        <ShowClub
          selected={this.state.selected}
          name={"modal_show"}
          show={this.state.modal_show}
          run_ajax={this.run_ajax}
          switchModal={this.switchModal}
          objectName={this.state.objectName}
          attributes={this.state.attributes}
        />
        <NewClub
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

export default Clubs;
