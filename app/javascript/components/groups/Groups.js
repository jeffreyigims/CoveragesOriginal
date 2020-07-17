import React from "react";
import PropTypes from "prop-types";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import NewGroup from "./NewGroup";
import GeneralTable from "../GeneralTable.js";
import { run_ajax, switchModal, capitalize, pluralize } from "../Utils.js";

class Groups extends React.Component {
  constructor() {
    super();
    this.run_ajax = run_ajax.bind(this);
    this.switchModal = switchModal.bind(this);
    this.capitalize = capitalize.bind(this);
  }

  state = {
    objects: [],
    modal_new: false,
    objectName: "group",
    plural: "groups",
    attributes: ["name"],
    tableHeaders: ["Name", "Associated Clubs"],
  };

  componentDidMount() {
    this.getObjects();
  }

  getObjects = () => {
    this.run_ajax("/" + this.state.plural + ".json", "GET", {}, (res) => {
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
              href={"/" + this.state.plural + "/" + object.attributes.id}
              style={{ color: "black" }}
            >
              {object.attributes.name}
            </Button>{" "}
          </td>
          <td width="200" align="left">
            {object.attributes.club_groups.length}
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
          <Card.Title style={{ marginTop: "10px" }}>
            All {this.capitalize(this.state.plural)}
          </Card.Title>
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
              New {this.capitalize(this.state.objectName)}
            </Button>
          </Card.Footer>
        </Card>
        <NewGroup
          name={"modal_new"}
          show={this.state.modal_new}
          run_ajax={this.run_ajax}
          switchModal={this.switchModal}
          objectName={this.state.objectName}
          plural={this.state.plural}
          attributes={this.state.attributes}
        />
      </>
    );
  }
}

export default Groups;
