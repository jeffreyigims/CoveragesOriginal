import React from "react";
import PropTypes from "prop-types";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import TopBar from "./TopBar";
import NavGuest from "./NavGuest";
import Footer from "./Footer";
import CoveragesTable from "./CoveragesTable";

class CoverageTabs extends React.Component {
  state = {
    verifiedCoverages: [],
    unverifiedCoverages: [],
  };

  run_ajax = (
    link,
    method = "GET",
    data = {},
    callback = () => {
      this.get_coverages();
    }
  ) => {
    let options;
    if (method == "GET") {
      options = { method: method };
    } else {
      options = {
        method: method,
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "same-origin",
      };
    }

    fetch(link, options)
      .then((response) => {
        if (!response.ok) {
          throw response;
        }
        return response.json();
      })
      .then((result) => {
        callback(result);
      })
      .catch((error) => {
        if (error.statusText) {
          this.setState({ error: error });
        }
        callback(error);
      });
  };

  get_verifiedCoverages = () => {
    this.run_ajax("/coverages.json?verified=true", "GET", {}, (res) => {
      this.setState({ verifiedCoverages: res });
    });
  };

  get_unverifiedCoverages = () => {
    this.run_ajax("/coverages.json?verified=false", "GET", {}, (res) => {
      this.setState({ unverifiedCoverages: res });
    });
  };

  get_coverages = () => {
    this.get_verifiedCoverages();
    this.get_unverifiedCoverages();
  };

  componentDidMount() {
    this.get_coverages();
  }

  render() {
    return (
      <React.Fragment>
        <Card>
          <Card.Title>All Coverages</Card.Title>
          <Tabs transition={false}>
            <Tab eventKey="Verified" title="Verified">
              <Card.Body>
                <CoveragesTable
                  coverages={this.state.verifiedCoverages}
                  run_ajax={this.run_ajax}
                />
              </Card.Body>
            </Tab>
            <Tab eventKey="Unverified" title="Unverified">
              <Card.Body>
                <CoveragesTable
                  coverages={this.state.unverifiedCoverages}
                  run_ajax={this.run_ajax}
                />
              </Card.Body>
            </Tab>
          </Tabs>
        </Card>
      </React.Fragment>
    );
  }
}

export default CoverageTabs;
