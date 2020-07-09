import React from "react"
import PropTypes from "prop-types"
import { run_ajax } from "Utils.js";

class Charts extends React.Component {
  constructor() {
    super();
    this.run_ajax = run_ajax.bind(this);
  }

  state = {
    carriers: [],
    companies: [],
  };

  componentDidMount() {
    this.getObjects();
  }

  getObjects = () => {
    this.run_ajax("/carriers.json", "GET", {}, (res) => {
      this.setState({ carriers: res });
    });
    this.run_ajax("/companies.json", "GET", {}, (res) => {
      this.setState({ companies: res });
    });
  }

  render () {
    return (
      <React.Fragment>
      </React.Fragment>
    );
  }
}

export default Charts
