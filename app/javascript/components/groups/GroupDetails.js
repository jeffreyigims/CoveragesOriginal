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
import GeneralTable from "../GeneralTable.js";
// import NewClubGroup from "../clubs/NewClubGroup.js";

import { run_ajax, getObjects, switchModal } from "../Utils.js";

class GroupDetails extends React.Component {
  constructor() {
    super();
    this.run_ajax = run_ajax.bind(this);
    this.switchModal = switchModal.bind(this);
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

  handleDelete = () => {
    this.run_ajax("/groups/".concat(this.props.id), "DELETE", {}, () => {});
    window.location.replace("/groups");
  };

  showObjects = () => {
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
            <GeneralTable
              tableHeaders={["League", "Name", "Code"]}
              showObjects={this.showObjects}
              objects={this.state.associated}
            />
          </Card.Body>
          <Card.Footer>
            <Button
              className="btn btn-theme float-right"
              variant="primary"
              onClick={() => this.switchModal("modal_edit")}
            >
              Edit Group
            </Button>
            {this.state.associated.length == 0 && (
              <Button
                className="btn btn-theme float-right"
                variant="danger"
                onClick={this.handleDelete}
                style={{ marginRight: "10px" }}
              >
                Delete Group
              </Button>
            )}
          </Card.Footer>
        </Card>
        <EditGroup
          object={this.state.object}
          name={"modal_edit"}
          show={this.state.modal_edit}
          run_ajax={this.run_ajax}
          switchModal={this.switchModal}
        />
      </>
    );
  }
}

export default GroupDetails;
