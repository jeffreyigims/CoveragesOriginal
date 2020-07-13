import React from "react";
import PropTypes from "prop-types";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Tabs";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import NewCategory from "./NewCategory";
import { run_ajax, switchModal } from "Utils.js";

class Categories extends React.Component {
  constructor() {
    super();
    this.run_ajax = run_ajax.bind(this);
    this.switchModal = switchModal.bind(this);
  }

  state = {
    objects: [],
    modal_new: false,
    objectName: "categories",
    attributes: ["name"],
  };

  componentDidMount() {
    this.getObjects();
  }

  getObjects = () => {
    this.run_ajax("/categories.json", "GET", {}, (res) => {
      this.setState({ objects: res.data });
    });
  };

  showObjects = () => {
    return this.state.objects.map((object, index) => {
      return (
        <tr key={index}>
          <td width="200" align="left">
            <Button
              variant="link"
              href={"/categories/" + object.attributes.id}
              style={{ color: "black" }}
            >
              {object.attributes.name}
            </Button>{" "}
          </td>
          <td width="200" align="left">
            {object.attributes.associated_sub_categories}
          </td>
        </tr>
      );
    });
  };

  render() {
    return (
      <>
        <Card>
          <Card.Title>All Categories</Card.Title>
          <Card.Body>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Associated Subs</th>
                </tr>
              </thead>
              <tbody>{this.showObjects()}</tbody>
            </Table>
          </Card.Body>
          <Card.Footer>
            <Button
              className="btn btn-theme float-right"
              variant="primary"
              onClick={(slot) => this.switchModal("modal_new")}
            >
              New Category
            </Button>
          </Card.Footer>
        </Card>
        <NewCategory
          name={"modal_new"}
          show={this.state.modal_new}
          run_ajax={this.run_ajax}
          switchModal={this.switchModal}
          objectName={this.state.objectName}
          attributes={this.state.attributes}
        />
      </>
    );
  }
}

export default Categories;
