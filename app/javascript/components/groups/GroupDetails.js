import React from "react";
import PropTypes, { object } from "prop-types";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Tabs";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import EditGroup from "./EditGroup";
// import NewClubGroup from "../clubs/NewClubGroup.js";

import { run_ajax, getObjects, switchModal, showSelected } from "Utils.js";

class GroupDetails extends React.Component {
  constructor() {
    super();
    this.run_ajax = run_ajax.bind(this);
    this.switchModal = switchModal.bind(this);
    this.showSelected = showSelected.bind(this);
  }

  state = {
    object: null,
    associated: [],
    modal_edit: false,
    modal_new: false,
  };

  componentDidMount() {
    this.getObjects();
  }

  getObjects = () => {
    this.run_ajax("/groups/" + this.props.id + ".json", "GET", {}, (res) => {
      this.setState({
        object: res.data,
        associated: res.data.attributes.club_groups,
      });
    });
  };

  showAssociated = () => {
    return this.state.associated.map((object, index) => {
      return (
        <tr key={index}>
          <td width="200" align="left">
            <Button
              variant="link"
              href={"/leagues/" + object.data.attributes.league.id}
              style={{ color: "black" }}
            >
              {object.data.attributes.league.name}
            </Button>
          </td>
          <td width="200" align="left">
            <Button
              variant="link"
              href={"/clubs/" + object.data.attributes.club.id}
              style={{ color: "black" }}
            >
              {object.data.attributes.club.name}
            </Button>{" "}
          </td>
          <td width="200" align="left">
            {object.data.attributes.club.abbreviation}
          </td>
        </tr>
      );
    });
  };

  render() {
    return (
      <>
        <Card>
          <Card.Title>{this.state.object?.attributes.name}</Card.Title>
          <Card.Body>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>League</th>
                  <th>Name</th>
                  <th>Code</th>
                </tr>
              </thead>
              <tbody>{this.showAssociated()}</tbody>
            </Table>
          </Card.Body>
          <Card.Footer>
            {/* <Button
              className="btn btn-theme float-right"
              variant="primary"
              onClick={(slot) => this.switchModal("modal_new")}
            >
              Add Club
            </Button> */}
            <Button
              className="btn btn-theme float-right"
              variant="primary"
              onClick={(slot) => this.switchModal("modal_edit")}
              style={{ marginRight: "10px" }}
            >
              Edit Group
            </Button>
          </Card.Footer>
        </Card>
        <EditGroup
          object={this.state.object}
          name={"modal_edit"}
          show={this.state.modal_edit}
          run_ajax={this.run_ajax}
          switchModal={this.switchModal}
        />
        {/* <NewClubGroup
          object={this.state.object}
          name={"modal_new"}
          show={this.state.modal_new}
          run_ajax={this.run_ajax}
          switchModal={this.switchModal}
        /> */}
      </>
    );
  }
}

export default GroupDetails;
