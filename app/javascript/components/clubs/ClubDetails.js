import React from "react";
import PropTypes, { object } from "prop-types";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Tabs";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ShowClub from "./ShowClub";
import NewClub from "./NewClub";
import NewClubGroup from "./NewClubGroup";
import NewCoverage from "../coverages/NewCoverage";
import ShowCoverage from "./ShowCoverage";
import { run_ajax, getObjects, switchModal, showSelected } from "Utils.js";
import { ArrowRight } from "react-bootstrap-icons";

class ClubDetails extends React.Component {
  constructor() {
    super();
    this.run_ajax = run_ajax.bind(this);
    this.switchModal = switchModal.bind(this);
    this.showSelected = showSelected.bind(this);
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
        this.setState({ coverages: res, selectedCoverages: res });
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

  showCoverages = () => {
    return this.state.selectedCoverages.map((coverage, index) => {
      return (
        <tr key={index} onClick={(slot) => this.showCoverage(coverage)}>
          <td width="200" align="left">
            {coverage.category.name}
          </td>
          <td width="300" align="left">
            {coverage.sub_category.name}
          </td>
          <td width="200" align="left">
            {coverage.start_date}
          </td>
          <td width="200" align="left">
            {coverage.end_date}
          </td>
          <td width="100" align="left">
            {coverage.verified ? "true" : "false"}
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
        (object) => object.club_group_id == target.data.attributes.id
      );
    }
    this.setState({ selectedCoverages: coverages, group: target.data });
  };

  render() {
    return (
      <>
        <Card>
          <Card.Title>{this.state.club?.attributes.name}</Card.Title>
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
            <Table striped bordered hover responsive className="header-fixed">
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Sub</th>
                  <th>Start</th>
                  <th>End</th>
                  <th>Verified</th>
                </tr>
              </thead>
              <tbody>{this.showCoverages()}</tbody>
            </Table>
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
        <NewCoverage
          name={"modal_new_coverage"}
          show={this.state.modal_new_coverage}
          run_ajax={this.run_ajax}
          switchModal={this.switchModal}
          group={this.state.group?.attributes}
          club={this.state.club?.attributes}
        />
      </>
    );
  }
}

export default ClubDetails;
