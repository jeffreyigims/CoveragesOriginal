import React from "react";
import PropTypes, { object } from "prop-types";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Tabs";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import EditLeague from "./EditLeague";
import NewClub from "../clubs/NewClub.js";
import GeneralTable from "../GeneralTable.js";
import { run_ajax, switchModal, handleDelete } from "../Utils.js";

class LeagueDetails extends React.Component {
  constructor() {
    super();
    this.run_ajax = run_ajax.bind(this);
    this.switchModal = switchModal.bind(this);
    this.handleDelete = handleDelete.bind(this);
  }

  state = {
    object: null,
    objects: [],
    selectedCoverages: [],
    modal_edit: false,
    modal_new: false,
    tableHeaders: ["Name", "Code", "Groups"],
  };

  componentDidMount() {
    this.getObjects();
  }

  getObjects = () => {
    this.run_ajax("/leagues/" + this.props.id + ".json", "GET", {}, (res) => {
      this.setState({ object: res.data, objects: res.data.attributes.clubs });
    });
  };

  showObjects = (objects) => {
    return objects.map((object, index) => {
      return (
        <tr key={index}>
          <td width="200" align="left">
            <Button
              variant="link"
              href={"/clubs/" + object.data.attributes.id}
              style={{ color: "black" }}
            >
              {object.data.attributes.name}
            </Button>
          </td>
          <td width="200" align="left">
            {object.data.attributes.abbreviation}
          </td>
          <td width="200" align="left">
            {object.data.attributes.club_groups_count}
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
              tableHeaders={this.state.tableHeaders}
              showObjects={this.showObjects}
              objects={this.state.objects}
            />
          </Card.Body>
          <Card.Footer>
            <Button
              className="btn btn-theme float-right"
              variant="primary"
              onClick={(slot) => this.switchModal("modal_new")}
            >
              Add Club
            </Button>
            <Button
              className="btn btn-theme float-right"
              variant="primary"
              onClick={(slot) => this.switchModal("modal_edit")}
              style={{ marginRight: "10px" }}
            >
              Edit League
            </Button>
            {this.state.objects.length == 0 && (
              <Button
                className="btn btn-theme float-right"
                variant="danger"
                onClick={() =>
                  this.handleDelete("leagues", this.state.object.attributes.id)
                }
                style={{ marginRight: "10px" }}
              >
                Delete League
              </Button>
            )}
          </Card.Footer>
        </Card>
        <EditLeague
          league={this.state.object}
          name={"modal_edit"}
          show={this.state.modal_edit}
          run_ajax={this.run_ajax}
          switchModal={this.switchModal}
        />
        <NewClub
          league={this.state.object}
          name={"modal_new"}
          show={this.state.modal_new}
          run_ajax={this.run_ajax}
          switchModal={this.switchModal}
        />
      </>
    );
  }
}

export default LeagueDetails;
