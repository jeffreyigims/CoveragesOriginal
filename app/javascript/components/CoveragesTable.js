import React from "react";
import PropTypes from "prop-types";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Tabs";
import Button from "react-bootstrap/Button";
import ShowCoverage from "./ShowCoverage";

class CoveragesTable extends React.Component {
  state = {
    modal_show: false,
    modal_new: false,
    selected: null,
    notes: null,
  };

  showCoverages = () => {
    return this.props.coverages.map((coverage, index) => {
      return (
        <tr key={index} onClick={(slot) => this.showCoverage(coverage)}>
          <td width="200" align="left">
            {" "}
            <Button
              variant="link"
              href={"/leagues/" + coverage.attributes.league.id}
              style={{ color: "black" }}
            >
              {coverage.attributes.league.name}
            </Button>
          </td>
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
        </tr>
      );
    });
  };

  switchModal = (name) => {
    const modal = name;
    this.setState((prevState) => ({
      [modal]: !prevState[modal],
    }));
  };

  showCoverage = (id) => {
    this.setState({
      selected: id,
    });
    this.switchModal("modal_show");
  };

  render() {
    return (
      <>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>League</th>
              <th>Club</th>
              <th>Group</th>
              <th>Category</th>
              <th>Sub</th>
              <th>Verified</th>
            </tr>
          </thead>
          <tbody>{this.showCoverages()}</tbody>
        </Table>
        <ShowCoverage
          selected={this.state.selected}
          name={"modal_show"}
          show={this.state.modal_show}
          run_ajax={this.props.run_ajax}
          switchModal={this.switchModal}
        />
      </>
    );
  }
}

export default CoveragesTable;
