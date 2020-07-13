import React from "react";
import PropTypes, { object } from "prop-types";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Tabs";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import EditSubCategory from "./EditSubCategory";

import { run_ajax, getObjects, switchModal, showSelected } from "Utils.js";

class SubCategoryDetails extends React.Component {
  constructor() {
    super();
    this.run_ajax = run_ajax.bind(this);
    this.switchModal = switchModal.bind(this);
    this.showSelected = showSelected.bind(this);
  }

  state = {
    object: null,
    coverages: [],
    modal_edit: false,
  };

  componentDidMount() {
    this.getObjects();
  }

  getObjects = () => {
    this.run_ajax(
      "/sub_categories/" + this.props.id + ".json",
      "GET",
      {},
      (res) => {
        this.setState({
          object: res.data,
          coverages: res.data.attributes.coverages,
        });
      }
    );
  };

  showCoverages = () => {
    return this.state.coverages.map((object, index) => {
      return (
        <tr key={index}>
          <td width="200" align="left">
            <Button
              variant="link"
              href={"/clubs/" + object.data.attributes.club.id}
              style={{ color: "black" }}
            >
              {object.data.attributes.club.name}
            </Button>
          </td>
          <td width="200" align="left">
            {object.data.attributes.group.name}
          </td>
          <td width="200" align="left">
            {object.data.attributes.start_date}
          </td>
          <td width="200" align="left">
            {object.data.attributes.end_date}
          </td>
          <td width="200" align="left">
            {object.data.attributes.verified ? "true" : "false"}
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
                  <th>Club</th>
                  <th>Group</th>
                  <th>Start</th>
                  <th>End</th>
                  <th>Verified</th>
                </tr>
              </thead>
              <tbody>{this.showCoverages()}</tbody>
            </Table>
          </Card.Body>
          <Card.Footer>
            <Button
              className="btn btn-theme float-right"
              variant="primary"
              onClick={(slot) => this.switchModal("modal_edit")}
              style={{ marginRight: "10px" }}
            >
              Edit Sub
            </Button>
          </Card.Footer>
        </Card>
        <EditSubCategory
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

export default SubCategoryDetails;
