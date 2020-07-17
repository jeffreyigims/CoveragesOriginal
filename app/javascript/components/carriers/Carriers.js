import React from "react";
import PropTypes from "prop-types";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import NewCarrier from "./NewCarrier";
import GeneralTable from "../GeneralTable.js";
import { run_ajax, switchModal } from "../Utils.js";

class Carriers extends React.Component {
  constructor() {
    super();
    this.run_ajax = run_ajax.bind(this);
    this.switchModal = switchModal.bind(this);
  }

  state = {
    objects: [],
    modal_new: false,
    objectName: "Carrier",
    plural: "carriers",
    attributes: ["name"],
    tableHeaders: ["Name", "Coverages"],
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
            {object.attributes.associated_coverages}
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
          <Card.Title style={{ marginTop: "10px" }}>All Carriers</Card.Title>
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
              New {this.state.objectName}
            </Button>
          </Card.Footer>
        </Card>
        <NewCarrier
          name={"modal_new"}
          show={this.state.modal_new}
          run_ajax={this.run_ajax}
          switchModal={this.switchModal}
          objectName={this.state.objectPlural}
          attributes={this.state.attributes}
        />
      </>
    );
  }
}

export default Carriers;
