import React from "react";
import PropTypes, { object } from "prop-types";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import EditClub from "./EditClub";
import NewClub from "./NewClub";
import NewClubGroup from "../club_groups/NewClubGroup";
import NewCoverage from "./NewCoverage";
import GeneralTable from "../GeneralTable.js";
import { EyeFill } from "react-bootstrap-icons";
import { run_ajax, switchModal, handleDelete } from "../Utils.js";

class ClubDetails extends React.Component {
  constructor() {
    super();
    this.run_ajax = run_ajax.bind(this);
    this.switchModal = switchModal.bind(this);
    this.handleDelete = handleDelete.bind(this);
  }

  state = {
    club: null,
    group: null,
    coverages: [],
    groups: [],
    selectedCoverages: [],
    modal_show: false,
    modal_new: false,
    selected: null,
    objectName: "clubs",
    attributes: ["group_id"],
    modal_new_coverage: false,
    tableHeaders: ["Category", "Sub", "Notes", "Verified", "View"],
  };

  componentDidMount() {
    this.getObjects();
  }

  getObjects = () => {
    this.run_ajax(
      "/" + this.state.objectName + "/" + this.props.id + ".json",
      "GET",
      {},
      (res) => {
        this.setState({
          club: res.data,
          groups: res.data.attributes.club_groups,
        });
      }
    );
    this.run_ajax(
      "/coverages.json?for_club=" + this.props.id,
      "GET",
      {},
      (res) => {
        this.setState({ coverages: res.coverages.data, selectedCoverages: res.coverages.data });
      }
    );
  };

  groupOptions = () => {
    return this.state.groups.map((object, index) => {
      return (
        <option key={index} value={index}>
          {" "}
          {object.data.attributes.group.name}{" "}
        </option>
      );
    });
  };

  showCoverages = (objects) => {
    return objects.map((coverage, index) => {
      return (
        <tr key={index}>
          <td width="200" align="left">
            <Button
              variant="link"
              href={"/categories/" + coverage.attributes.category.id}
              style={{ color: "black" }}
            >
              {coverage.attributes.category.name}
            </Button>{" "}
          </td>
          <td width="300" align="left">
            {coverage.attributes.sub_category.name}
          </td>
          <td width="200" align="left">
            {coverage.attributes.notes}
          </td>
          <td width="100" align="left">
            {coverage.attributes.verified ? "true" : "false"}
          </td>
          <td width="100" align="center">
            <Button
              variant="link"
              href={"/coverages/" + coverage.attributes.id}
              style={{ color: "black" }}
            >
              <EyeFill />
            </Button>
          </td>
        </tr>
      );
    });
  };

  handleGroupChange = (event) => {
    var target = null;
    var coverages = [];
    if (event.target.value == -1) {
      coverages = this.state.coverages;
    } else {
      target = this.state.groups[event.target.value];
      coverages = this.state.coverages.filter(
        (object) => object.attributes.club_group_id == target.data.attributes.id
      );
    }
    this.setState({ selectedCoverages: coverages, group: target?.data });
  };

  render() {
    return (
      <>
        <Card>
          <Card.Header></Card.Header>
          <Card.Title style={{ marginTop: "10px" }}>
            {this.state.club?.attributes.name}
          </Card.Title>
          <Card.Body>
            <Form>
              <Row>
                <Form.Group as={Col}>
                  <Form.Label>Group:</Form.Label>
                  <Form.Control
                    as="select"
                    name="selectedGroup"
                    onChange={this.handleGroupChange}
                  >
                    <option value={-1}>All</option>
                    {this.groupOptions()}
                  </Form.Control>
                </Form.Group>
              </Row>
            </Form>
            <GeneralTable
              tableHeaders={this.state.tableHeaders}
              showObjects={this.showCoverages}
              objects={this.state.coverages}
            />
          </Card.Body>
          <Card.Footer>
            {"      "}
            <Button
              className="btn btn-theme float-right"
              variant="primary"
              onClick={(slot) => this.switchModal("modal_new")}
            >
              Add Group
            </Button>
            {this.state.group != null && (
              <Button
                className="btn btn-theme float-right"
                variant="primary"
                onClick={(slot) => this.switchModal("modal_new_coverage")}
                style={{ marginRight: "10px" }}
              >
                New Coverage
              </Button>
            )}
            {this.state.coverages.length == 0 && (
              <Button
                className="btn btn-theme float-right"
                variant="danger"
                onClick={() =>
                  this.handleDelete("clubs", this.state.club.attributes.id)
                }
                style={{ marginRight: "10px" }}
              >
                Delete Club
              </Button>
            )}
          </Card.Footer>
        </Card>
        <NewClubGroup
          name={"modal_new"}
          show={this.state.modal_new}
          run_ajax={this.run_ajax}
          switchModal={this.switchModal}
          objectName={this.state.objectName}
          attributes={this.state.attributes}
          club={this.state.club}
        />
        {this.state.modal_new_coverage && (
          <NewCoverage
            name={"modal_new_coverage"}
            show={this.state.modal_new_coverage}
            run_ajax={this.run_ajax}
            switchModal={this.switchModal}
            group={this.state.group?.attributes}
            club={this.state.club?.attributes}
          />
        )}
      </>
    );
  }
}

export default ClubDetails;
