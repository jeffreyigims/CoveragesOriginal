import React from "react";
import PropTypes, { object } from "prop-types";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Tabs";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import EditUser from "./EditUser";
import NewUserClub from "../user_clubs/NewUserClub.js";
import GeneralTable from "../GeneralTable.js";
import { run_ajax, switchModal, handleDelete } from "../Utils.js";

class UserDetails extends React.Component {
  constructor() {
    super();
    this.run_ajax = run_ajax.bind(this);
    this.switchModal = switchModal.bind(this);
    this.handleDelete = handleDelete.bind(this);
  }

  state = {
    object: null,
    contact: null,
    modal_edit: false,
    modal_new: false,
  };

  componentDidMount() {
    this.getObjects();
  }

  getObjects = () => {
    this.run_ajax("/users/" + this.props.id + ".json", "GET", {}, (res) => {
      this.setState({
        object: res.data,
        contact: res.data.attributes.current_contact.data,
      });
    });
  };

  handleDeleteClub = () => {
    this.run_ajax(
      "/user_clubs/".concat(this.state.contact?.attributes.id),
      "DELETE",
      {},
      this.getObjects()
    );
  };

  render() {
    return (
      <>
        <Card>
          <Card.Header></Card.Header>
          <Card.Title style={{ marginTop: "10px" }}>User Details</Card.Title>
          <Card.Body>
            <Row>Name: {this.state.object?.attributes.name}</Row>
            <Row>Username: {this.state.object?.attributes.username}</Row>
            <Row>Role: {this.state.object?.attributes.role}</Row>
            {this.state.object?.attributes.role == "contact" && (
              <Row>
                Associated Club:{" "}
                {
                  <Button
                    variant="link"
                    href={"/clubs/" + this.state.contact?.attributes.club.id}
                    style={{ color: "black" }}
                  >
                    {this.state.contact?.attributes.club.name}
                  </Button>
                }
              </Row>
            )}
          </Card.Body>
          <Card.Footer>
            {this.state.object?.attributes.role == "contact" &&
              this.state.contact == null && (
                <Button
                  variant="primary"
                  onClick={(slot) => this.switchModal("modal_new")}
                >
                  Add Club
                </Button>
              )}
            {this.state.object?.attributes.role == "contact" &&
              this.state.contact != null && (
                <Button
                  variant="danger"
                  onClick={(slot) => this.handleDeleteClub()}
                >
                  Delete Club
                </Button>
              )}
            <Button
              className="btn btn-theme float-right"
              variant="primary"
              onClick={(slot) => this.switchModal("modal_edit")}
              style={{ marginRight: "10px" }}
            >
              Edit User
            </Button>
            <Button
              className="btn btn-theme float-right"
              variant="danger"
              onClick={() =>
                this.handleDelete("users", this.state.object.attributes.id)
              }
              style={{ marginRight: "10px" }}
            >
              Delete User
            </Button>
          </Card.Footer>
        </Card>
        <EditUser
          object={this.state.object}
          name={"modal_edit"}
          show={this.state.modal_edit}
          run_ajax={this.run_ajax}
          switchModal={this.switchModal}
        />
        <NewUserClub
          object={this.state.object}
          name={"modal_new"}
          show={this.state.modal_new}
          run_ajax={this.run_ajax}
          switchModal={this.switchModal}
        />
      </>
    );
  }
}

export default UserDetails;
