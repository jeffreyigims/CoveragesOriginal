import React from "react";
import PropTypes, { object } from "prop-types";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Tabs";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import EditSport from "./ShowSport";
import NewLeague from "../leagues/NewLeague.js";

import { run_ajax, getObjects, switchModal } from "Utils.js";

class SportDetails extends React.Component {
  constructor() {
    super();
    this.run_ajax = run_ajax.bind(this);
    this.switchModal = switchModal.bind(this);
  }

  state = {
    sport: null,
    leagues: [],
    modal_edit: false,
    modal_add: false,
  };

  componentDidMount() {
    this.getObjects();
  }

  getObjects = () => {
    this.run_ajax("/sports/" + this.props.id + ".json", "GET", {}, (res) => {
      this.setState({ sport: res.data, leagues: res.data.attributes.leagues });
    });
  };

  showLeagues = () => {
    return this.state.leagues.map((object, index) => {
      return (
        <tr key={index}>
          <td width="200" align="left">
            <Button
              variant="link"
              href={"/leagues/" + object.data.attributes.id}
              style={{ color: "black" }}
            >
              {object.data.attributes.name}
            </Button>
          </td>
          <td width="200" align="left">
            {object.data.attributes.level}
          </td>
        </tr>
      );
    });
  };

  render() {
    return (
      <>
        <Card>
          <Card.Title>{this.state.sport?.attributes.name}</Card.Title>
          <Card.Body>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Level</th>
                </tr>
              </thead>
              <tbody>{this.showLeagues()}</tbody>
            </Table>
          </Card.Body>
          <Card.Footer>
            <Button
              className="btn btn-theme float-right"
              variant="primary"
              onClick={(slot) => this.switchModal("modal_add")}
            >
              Add League
            </Button>
            <Button
              className="btn btn-theme float-right"
              variant="primary"
              onClick={(slot) => this.switchModal("modal_edit")}
              style={{ marginRight: "10px" }}
            >
              Edit Sport
            </Button>
          </Card.Footer>
        </Card>
        <EditSport
          selected={this.state.sport}
          leagues={this.state.leagues}
          name={"modal_edit"}
          show={this.state.modal_edit}
          run_ajax={this.run_ajax}
          switchModal={this.switchModal}
        />
        <NewLeague
          selected={this.state.sport}
          name={"modal_add"}
          show={this.state.modal_add}
          run_ajax={this.run_ajax}
          switchModal={this.switchModal}
        />
      </>
    );
  }
}

export default SportDetails;
