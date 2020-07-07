import React from "react";
import PropTypes from "prop-types";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Tabs";
import Card from "react-bootstrap/Card";
import ShowSport from "./ShowSport";

class Sports extends React.Component {
  state = {
    objects: [],
    modal_show: false,
    modal_new: false,
    selected: null,
    notes: null,
  };

  componentDidMount() {
    this.getObjects();
  }

  run_ajax = (
    link,
    method = "GET",
    data = {},
    callback = () => {
      this.getSports();
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

  getObjects = () => {
    this.run_ajax("/sports.json", "GET", {}, (res) => {
      this.setState({ objects: res });
    });
  };

  showObjects = () => {
    return this.state.objects.map((object, index) => {
      return (
        <tr key={index} onClick={(slot) => this.showSelected(object)}>
          <td width="200" align="left">
            {object.id}
          </td>
          <td width="200" align="left">
            {object.name}
          </td>
          <td width="200" align="left">
            {object.associated_leagues}
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

  showSelected = (id) => {
    this.setState({
      selected: id,
    });
    this.switchModal("modal_show");
  };

  render() {
    return (
      <>
        <Card>
          <Card.Title>All Sports</Card.Title>
          <Card.Body>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Identification</th>
                  <th>Name</th>
                  <th>Associated Leagues</th>
                </tr>
              </thead>
              <tbody>{this.showObjects()}</tbody>
            </Table>
          </Card.Body>
        </Card>
        <ShowSport
          selected={this.state.selected}
          name={"modal_show"}
          show={this.state.modal_show}
          run_ajax={this.run_ajax}
          switchModal={this.switchModal}
        />
      </>
    );
  }
}

export default Sports;
