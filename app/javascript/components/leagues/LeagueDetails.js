import React from "react";
import PropTypes, { object } from "prop-types";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Tabs";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import EditLeague from "./ShowLeague";
import NewClub from "../clubs/NewClub.js";

import { run_ajax, getObjects, switchModal, showSelected } from "Utils.js";

class LeagueDetails extends React.Component {
  constructor() {
    super();
    this.run_ajax = run_ajax.bind(this);
    this.switchModal = switchModal.bind(this);
    this.showSelected = showSelected.bind(this);
  }

  state = {
    league: null,
    clubs: [],
    selectedCoverages: [],
    modal_edit_league: false,
    modal_new_club: false,
  };

  componentDidMount() {
    this.getObjects();
  }

  getObjects = () => {
    this.run_ajax("/leagues/" + this.props.id + ".json", "GET", {}, (res) => {
      this.setState({ league: res.data });
    });
    this.run_ajax(
      "/clubs.json?for_league=" + this.props.id,
      "GET",
      {},
      (res) => {
        this.setState({ clubs: res.data });
      }
    );
  };

  showClubs = () => {
    return this.state.clubs.map((object, index) => {
      return (
        <tr key={index}>
          <td width="200" align="left">
            <Button
              variant="link"
              href={"/clubs/" + object.id}
              style={{ color: "black" }}
            >
              {object.attributes.name}
            </Button>
          </td>
          <td width="200" align="left">
            {object.attributes.abbreviation}
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
          <Card.Title>{this.state.league?.attributes.name}</Card.Title>
          <Card.Body>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Code</th>
                  <th>Groups</th>
                </tr>
              </thead>
              <tbody>{this.showClubs()}</tbody>
            </Table>
          </Card.Body>
          <Card.Footer>
            <Button
              className="btn btn-theme float-right"
              variant="primary"
              onClick={(slot) => this.switchModal("modal_new_club")}
            >
              Add Club
            </Button>
            <Button
              className="btn btn-theme float-right"
              variant="primary"
              onClick={(slot) => this.switchModal("modal_edit_league")}
              style={{ marginRight: "10px" }}
            >
              Edit League
            </Button>
          </Card.Footer>
        </Card>
        <EditLeague
          league={this.state.league}
          name={"modal_edit_league"}
          show={this.state.modal_edit_league}
          run_ajax={this.run_ajax}
          switchModal={this.switchModal}
        />
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

export default LeagueDetails;
