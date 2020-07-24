import React from "react";
import PropTypes from "prop-types";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";
import Table from "react-bootstrap/Table";
import PaginatedTable from "../PaginatedTable.js";
import { run_ajax } from "../Utils.js";
import { EyeFill } from "react-bootstrap-icons";
import { Check } from "react-bootstrap-icons";

class AdminDashboard extends React.Component {
  constructor() {
    super();
    this.run_ajax = run_ajax.bind(this);
  }

  showRecentObjects = (objects) => {
    return objects.map((object, index) => {
      return (
        <tr key={index}>
          <td width="200" align="left">
            <Button
              variant="link"
              href={"/clubs/" + object.attributes.club.id}
              style={{ color: "black" }}
            >
              {object.attributes.club.name}
            </Button>
          </td>
          <td width="200" align="left">
            {object.attributes.group.name}
          </td>
          <td width="200" align="left">
            {object.attributes.start_date}
          </td>
          <td width="200" align="left">
            {object.attributes.verified ? "true" : "false"}
          </td>
          <td width="100" align="center">
            <Button
              variant="link"
              href={"/coverages/" + object.attributes.id}
              style={{ color: "black" }}
            >
              <EyeFill />
            </Button>
          </td>
        </tr>
      );
    });
  };

  showUnverifiedObjects = (objects) => {
    return objects.map((object, index) => {
      return (
        <tr key={index}>
          <td width="233.3" align="left">
            <Button
              variant="link"
              href={"/clubs/" + object.attributes.club.id}
              style={{ color: "black" }}
            >
              {object.attributes.club.name}
            </Button>
          </td>
          <td width="233.3" align="left">
            {object.attributes.group.name}
          </td>
          <td width="233.3" align="left">
            {object.attributes.start_date}
          </td>
          <td width="100" align="center">
            <Button
              variant="link"
              href={"/coverages/" + object.attributes.id}
              style={{ color: "black" }}
            >
              <Check />
            </Button>
          </td>
          <td width="100" align="center">
            <Button
              variant="link"
              href={"/coverages/" + object.attributes.id}
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
      <>
        <Col>
          <Row>
            <Card>
              <Card.Header></Card.Header>
              <Card.Title style={{ marginTop: "10px" }}>
                Recently Added
              </Card.Title>
              <Card.Body>
                <PaginatedTable
                  tableHeaders={["Club", "Group", "Entered By", "Verified", "View"]}
                  showObjects={this.showRecentObjects}
                  totalPages={"pagesRecent"}
                  currentPage={"pageRecent"}
                  objects={"coveragesRecent"}
                  link={"/admin_dashboard.json?pageRecent="}
                />
              </Card.Body>
              <Card.Footer></Card.Footer>
            </Card>
          </Row>
          <Row>
            <Card>
              <Card.Header></Card.Header>
              <Card.Title style={{ marginTop: "10px" }}>Unverified</Card.Title>
              <Card.Body className="text-center">
              <PaginatedTable
                  tableHeaders={["Club", "Group", "Entered By", "Verified", "View"]}
                  showObjects={this.showUnverifiedObjects}
                  totalPages={"pagesUnverified"}
                  currentPage={"pageUnverified"}
                  objects={"coveragesUnverified"}
                  link={"/admin_dashboard.json?pageUnverified="}
                />
              </Card.Body>
              <Card.Footer></Card.Footer>
            </Card>
          </Row>
        </Col>
      </>
    );
  }
}

export default AdminDashboard;
