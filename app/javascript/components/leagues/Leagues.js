import React from "react";
import PropTypes from "prop-types";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Tabs";
import Card from "react-bootstrap/Card";
import ShowLeague from "./ShowLeague";
import {run_ajax, getObjects, switchModal, showSelected} from 'Utils.js';

class Leagues extends React.Component {
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
    objectName: "leagues",
    attributes: ["name", "level"]
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
            {object.level}
          </td>
          <td width="200" align="left">
            {object.sport.name}
          </td>
        </tr>
      );
    });
  };

  render() {
    return (
      <>
        <Card>
          <Card.Title>All Leagues</Card.Title>
          <Card.Body>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Level</th>
                  <th>Sport</th>
                </tr>
              </thead>
              <tbody>{this.showObjects()}</tbody>
            </Table>
          </Card.Body>
        </Card>
        <ShowLeague
          selected={this.state.selected}
          name={"modal_show"}
          show={this.state.modal_show}
          run_ajax={this.run_ajax}
          switchModal={this.switchModal}
          objectName={this.state.objectName}
          attributes={this.state.attributes}
        />
      </>
    );
  }
}

export default Leagues;
