import React from "react";
import PropTypes from "prop-types";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import NewLeague from "./NewLeague";
import { run_ajax, switchModal } from "Utils.js";

class Leagues extends React.Component {
  constructor() {
    super();
    this.run_ajax = run_ajax.bind(this);
    this.switchModal = switchModal.bind(this);
  }

  state = {
    leagues: [],
    selectedLeagues: [],
    sports: [],
    modal_new: false,
  };

  componentDidMount() {
    this.getObjects();
  }

  getObjects = () => {
    this.run_ajax("/leagues.json", "GET", {}, (res) => {
      this.setState({ leagues: res.data, selectedLeagues: res.data });
    });
    this.run_ajax("/sports.json", "GET", {}, (res) => {
      this.setState({ sports: res.data });
    });
  };

  sportOptions = () => {
    return this.state.sports.map((object, index) => {
      return (
        <option key={index} value={object.attributes.id}>
          {" "}
          {object.attributes.name}{" "}
        </option>
      );
    });
  };

  showObjects = () => {
    return this.state.selectedLeagues.map((object, index) => {
      return (
        <tr key={index}>
          <td width="200" align="left">
            <Button
              variant="link"
              href={"/leagues/" + object.attributes.id}
              style={{ color: "black" }}
            >
              {object.attributes.name}
            </Button>
          </td>
          <td width="200" align="left">
            {object.attributes.level}
          </td>
        </tr>
      );
    });
  };

  handleSportChange = (event) => {
    var leagues = [];
    if (event.target.value == -1) {
      leagues = this.state.leagues;
    } else {
      leagues = this.state.leagues.filter(
        (object) => object.attributes.sport_id == event.target.value
      );
    }
    this.setState({ selectedLeagues: leagues });
  };

  render() {
    return (
      <>
        <Card>
          <Card.Title>All Leagues</Card.Title>
          <Card.Body>
            <Form>
              <Row>
                <Form.Group as={Col}>
                  <Form.Label>Sport:</Form.Label>
                  <Form.Control
                    as="select"
                    name="selectedSport"
                    onChange={this.handleSportChange}
                  >
                    <option value={-1}>All</option>
                    {this.sportOptions()}
                  </Form.Control>
                </Form.Group>
              </Row>
            </Form>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Level</th>
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
              New League
            </Button>
          </Card.Footer>
        </Card>
        <NewLeague
          name={"modal_new"}
          show={this.state.modal_new}
          switchModal={this.switchModal}
          run_ajax={this.run_ajax}
          sports={this.state.sports}
        />
      </>
    );
  }
}

export default Leagues;