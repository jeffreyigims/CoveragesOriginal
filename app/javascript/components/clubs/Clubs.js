import React from "react";
import PropTypes from "prop-types";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Tabs";
import Card from "react-bootstrap/Card";
import ShowClub from "./ShowClub";
import NewClub from "./NewClub";
import { PencilSquare } from 'react-bootstrap-icons';
import { run_ajax, getObjects, switchModal, showSelected } from "Utils.js";

class Clubs extends React.Component {
  constructor() {
    super();
    this.run_ajax = run_ajax.bind(this);
    this.switchModal = switchModal.bind(this);
    this.showSelected = showSelected.bind(this);
  }

  state = {
    objects: [],
    modal_new_club: false,
  };

  componentDidMount() {
    this.getObjects();
  }

  getObjects = () => {
    this.run_ajax("/clubs.json", "GET", {}, (res) => {
      this.setState({ objects: res.data});
    });
  };


  showObjects = () => {
    return this.state.objects.map((object, index) => {
      return (
        <tr key={index} >
          <td width="200" align="left" >
            <Button variant="link" href={"/clubs/" + object.attributes.id} style={{color: "black"}}>{object.attributes.name}</Button>
          </td>
          <td width="200" align="left">
            {object.attributes.abbreviation}
          </td>
          <td width="200" align="left">
            {object.attributes.league.name}
          </td>
          <td width="200" align="left">
            {object.attributes.club_groups_count}
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
                  <th>Groups</th>
                </tr>
              </thead>
              <tbody>{this.showObjects()}</tbody>
            </Table>
          </Card.Body>
          <Card.Footer>
            <Button
              className="btn btn-theme float-right"
              variant="primary"
              onClick={(slot) => this.switchModal("modal_new_club")}
            >
              New Club
            </Button>
          </Card.Footer>
        </Card>
        <NewClub
          league={this.state.league}
          name={"modal_new_club"}
          show={this.state.modal_new_club}
          run_ajax={this.run_ajax}
          switchModal={this.switchModal}
        />
      </>
    );
  }
}

export default Clubs;