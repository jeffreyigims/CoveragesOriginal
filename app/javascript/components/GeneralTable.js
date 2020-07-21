import React from "react";
import PropTypes from "prop-types";
import Table from "react-bootstrap/Table";

/* To use this component, props must include the following: 
   - List of strings of table headers
   - Function to render rows of the table 
   - The objects to be passed to the function that renders rows 
*/

class GeneralTable extends React.Component {
  render() {
    if (this.props.objects.length == 0) {
      return this.props.message || "There are no entries in the database.";
    }
    return (
      <>
        <Table striped bordered hover>
          <thead>
            <tr>
              {this.props.tableHeaders.map((header) => (
                <th key={header}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>{this.props.showObjects(this.props.objects)}</tbody>
        </Table>
      </>
    );
  }
}

export default GeneralTable;
