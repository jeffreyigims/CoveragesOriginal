import React from "react";
import PropTypes from "prop-types";
import Table from "react-bootstrap/Table";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import GeneralTable from "./GeneralTable.js";

class GenericTable extends React.Component {
  render() {
    return (
      <>
        <Card>
          <Card.Header></Card.Header>
          <Card.Title style={{ marginTop: "10px" }}>
            All{" "}
            {this.props.plural.charAt(0).toUpperCase() +
              this.props.plural.slice(1)}
          </Card.Title>
          <Card.Body>
            <GeneralTable
              tableHeaders={this.props.tableHeaders}
              showObjects={this.props.showObjects}
              objects={this.props.objects}
            />
          </Card.Body>
          <Card.Footer>
            <Button
              className="btn btn-theme float-right"
              variant="primary"
              onClick={(slot) => this.props.switchModal("modal_new")}
            >
              New{" "}
              {this.props.objectName.charAt(0).toUpperCase() +
                this.props.objectName.slice(1)}
            </Button>
          </Card.Footer>
        </Card>
      </>
    );
  }
}

export default GenericTable;
