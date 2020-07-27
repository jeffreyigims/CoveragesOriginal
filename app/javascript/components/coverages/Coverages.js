import React from "react";
import PropTypes from "prop-types";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import NewCoverage from "./NewCoverage";
import { switchModal } from "../Utils.js";
import PaginatedTable from "../PaginatedTable.js";
import { EyeFill } from "react-bootstrap-icons";

class Coverages extends React.Component {
  constructor() {
    super();
    this.switchModal = switchModal.bind(this);
  }

  state = {
    modal_new: false,
  };

  showCoverages = (objects) => {
    return objects.map((coverage, index) => {
      return (
        <tr key={index}>
          <td width="200" align="left">
            <Button
              variant="link"
              href={"/clubs/" + coverage.attributes.club.id}
              style={{ color: "black" }}
            >
              {coverage.attributes.club.name}
            </Button>{" "}
          </td>
          <td width="200" align="left">
            {coverage.attributes.group.name}
          </td>
          <td width="200" align="left">
            <Button
              variant="link"
              href={"/categories/" + coverage.attributes.category.id}
              style={{ color: "black" }}
            >
              {coverage.attributes.category.name}
            </Button>{" "}
          </td>
          <td width="200" align="left">
            <Button
              variant="link"
              href={"/sub_categories/" + coverage.attributes.sub_category.id}
              style={{ color: "black" }}
            >
              {coverage.attributes.sub_category.name}
            </Button>{" "}
          </td>
          <td width="200" align="left">
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

  render() {
    return (
      <React.Fragment>
        <Card>
          <Card.Header></Card.Header>
          <Card.Title style={{ marginTop: "10px" }}>All Coverages</Card.Title>
          <Tabs transition={false}>
            <Tab eventKey="Verified" title="Verified">
              <Card.Body>
                <PaginatedTable
                  tableHeaders={[
                    "Club",
                    "Group",
                    "Category",
                    "Sub",
                    "Verified",
                    "View",
                  ]}
                  showObjects={this.showCoverages}
                  totalPages={"pages"}
                  currentPage={"page"}
                  objects={"coverages"}
                  link={"/coverages.json?verified=true&page="}
                />
              </Card.Body>
            </Tab>
            <Tab eventKey="Unverified" title="Unverified">
              <Card.Body>
                <PaginatedTable
                  tableHeaders={[
                    "Club",
                    "Group",
                    "Category",
                    "Sub",
                    "Verified",
                    "View",
                  ]}
                  showObjects={this.showCoverages}
                  totalPages={"pages"}
                  currentPage={"page"}
                  objects={"coverages"}
                  link={"/coverages.json?verified=false&page="}
                />
              </Card.Body>
            </Tab>
          </Tabs>
          <Card.Footer>
            <Button
              className="btn btn-theme float-right"
              variant="primary"
              onClick={(slot) => this.switchModal("modal_new")}
            >
              New Coverage
            </Button>
          </Card.Footer>
        </Card>
        <NewCoverage
          name={"modal_new"}
          show={this.state.modal_new}
          // run_ajax={this.run_ajax}
          switchModal={this.switchModal}
        />
      </React.Fragment>
    );
  }
}

export default Coverages;
