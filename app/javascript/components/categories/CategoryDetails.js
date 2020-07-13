import React from "react";
import PropTypes, { object } from "prop-types";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Tabs";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import EditCategory from "./EditCategory";
import NewSubCategory from "../sub_categories/NewSubCategory.js";

import { run_ajax, getObjects, switchModal, showSelected } from "Utils.js";

class LeagueDetails extends React.Component {
  constructor() {
    super();
    this.run_ajax = run_ajax.bind(this);
    this.switchModal = switchModal.bind(this);
    this.showSelected = showSelected.bind(this);
  }

  state = {
    object: null,
    subs: [],
    selectedCoverages: [],
    modal_edit_league: false,
    modal_new_club: false,
  };

  componentDidMount() {
    this.getObjects();
  }

  getObjects = () => {
    this.run_ajax("/categories/" + this.props.id + ".json", "GET", {}, (res) => {
      this.setState({ object: res.data, subs: res.data.attributes.sub_categories});
    });
  };

  showSubs = () => {
    return this.state.subs.map((object, index) => {
      return (
        <tr key={index}>
          <td width="200" align="left">
            <Button
              variant="link"
              href={"/sub_categories/" + object.data.attributes.id}
              style={{ color: "black" }}
            >
              {object.data.attributes.name}
            </Button>
          </td>
          <td width="200" align="left">
            {object.data.attributes.associated_coverages}
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
                  <th>Name</th>
                  <th>Coverages</th>
                </tr>
              </thead>
              <tbody>{this.showSubs()}</tbody>
            </Table>
          </Card.Body>
          <Card.Footer>
            <Button
              className="btn btn-theme float-right"
              variant="primary"
              onClick={(slot) => this.switchModal("modal_new")}
            >
              Add Sub
            </Button>
            <Button
              className="btn btn-theme float-right"
              variant="primary"
              onClick={(slot) => this.switchModal("modal_edit")}
              style={{ marginRight: "10px" }}
            >
              Edit Category
            </Button>
          </Card.Footer>
        </Card>
        <EditCategory
          category={this.state.object}
          name={"modal_edit"}
          show={this.state.modal_edit}
          run_ajax={this.run_ajax}
          switchModal={this.switchModal}
        />
        <NewSubCategory
          category={this.state.object}
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
