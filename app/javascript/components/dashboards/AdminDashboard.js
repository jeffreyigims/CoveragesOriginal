import React from "react";
import PropTypes from "prop-types";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";
import Table from "react-bootstrap/Table";
import GeneralTable from "../GeneralTable.js";
import PaginatedTable from "../PaginatedTable.js";
// import Pagination from "react-bootstrap-4-pagination";
import { Pagination } from "semantic-ui-react";
import { run_ajax, switchModal } from "../Utils.js";
import { EyeFill } from "react-bootstrap-icons";
import { Check } from "react-bootstrap-icons";

class AdminDashboard extends React.Component {
  constructor() {
    super();
    this.run_ajax = run_ajax.bind(this);
    this.switchModal = switchModal.bind(this);
  }

  state = {
    // recent: [],
    // pagesRecent: 0,
    // pageRecent: 0,
    // recentTableHeaders: ["Club", "Group", "Entered By", "Verified", "View"],
    // unverified: [],
    // pagesUnverified: 0,
    // pageUnverified: 0,
    // unverifiedTableHeaders: ["Club", "Group", "Entered By", "Verfiy", "View"],
  };

  // componentDidMount() {
  //   this.getObjects();
  // }

  // getObjects = () => {
  //   this.run_ajax("/admin_dashboard.json", "GET", {}, (res) => {
  //     this.setState({
  //       recent: res.coveragesRecent.data,
  //       pagesRecent: res.pagesRecent,
  //       pageRecent: res.pageRecent,
  //       unverified: res.coveragesUnverified.data,
  //       pagesUnverified: res.pagesUnverified,
  //       pageUnverified: res.pageUnverified,
  //     });
  //   });
  // };

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

  // handlePageChangeRecent = (e, { activePage }) => {
  //   console.log(activePage);
  //   this.run_ajax(
  //     "/admin_dashboard.json?pageRecent=" + activePage,
  //     "GET",
  //     {},
  //     (res) => {
  //       this.setState({
  //         recent: res.coveragesRecent.data,
  //         pagesRecent: res.pagesRecent,
  //         pageRecent: res.pageRecent,
  //         unverified: res.coveragesUnverified.data,
  //         pagesUnverified: res.pagesUnverified,
  //         pageUnverified: res.pageUnverified,
  //       });
  //     }
  //   );
  // };

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
