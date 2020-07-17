import React from "react";
import PropTypes, { object } from "prop-types";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import EditCategory from "./EditCategory";
import GeneralTable from "../GeneralTable.js";
import NewSubCategory from "../sub_categories/NewSubCategory.js";

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
    tableHeaders: ["Name", "Coverages"],
  };

  componentDidMount() {
    this.getObjects();
  }

  getObjects = () => {
    this.run_ajax(
      "/categories/" + this.props.id + ".json",
      "GET",
      {},
      (res) => {
        this.setState({
          object: res.data,
          objects: res.data.attributes.sub_categories,
        });
      }
    );
  };

  showObjects = (objects) => {
    return objects.map((object, index) => {
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
          <Card.Header></Card.Header>
          <Card.Title style={{ marginTop: "10px" }}>
            {this.state.object?.attributes.name}
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
            {this.state.objects.length == 0 && (
              <Button
                className="btn btn-theme float-right"
                variant="danger"
                onClick={() =>
                  this.handleDelete(
                    "categories",
                    this.state.object.attributes.id
                  )
                }
                style={{ marginRight: "10px" }}
              >
                Delete Category
              </Button>
            )}
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
