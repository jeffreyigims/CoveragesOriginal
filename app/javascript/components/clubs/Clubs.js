import React from "react";
import PropTypes from "prop-types";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Tabs";
import Card from "react-bootstrap/Card";
import NewClub from "./NewClub";
import GeneralTable from "../GeneralTable.js";
import { run_ajax, switchModal } from "../Utils.js";

class Clubs extends React.Component {
  constructor() {
    super();
    this.run_ajax = run_ajax.bind(this);
    this.switchModal = switchModal.bind(this);
  }

  state = {
    objects: [],
    modal_new: false,
    tableHeaders: ["Name", "Code", "League", "Groups"],
  };

  componentDidMount() {
    this.getObjects();
  }

  getObjects = () => {
    this.run_ajax("/clubs.json", "GET", {}, (res) => {
      this.setState({ objects: res.data });
    });
  };

  showObjects = (objects) => {
    return objects.map((object, index) => {
      return (
        <tr key={index}>
          <td width="200" align="left">
            <Button
              variant="link"
              href={"/clubs/" + object.attributes.id}
              style={{ color: "black" }}
            >
              {object.attributes.name}
            </Button>
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
          <Card.Header></Card.Header>
          <Card.Title style={{ marginTop: "10px" }}>All Clubs</Card.Title>
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
