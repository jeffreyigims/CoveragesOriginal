import React from "react";
import Metrics from "./Metrics";
import Card from "react-bootstrap/Card";
import { run_ajax } from "Utils.js";

class Home extends React.Component {
  constructor(props) {
    super();
    this.run_ajax = run_ajax.bind(this);
  }

  state = {
    objects: [],
  };

  componentDidMount() {
    this.getObjects();
  }

  format = (data) => {
    let newData = data.map((item) => item.attributes);
    return newData;
  };

  getObjects = () => {
    this.run_ajax("/metrics.json", "GET", {}, (res) => {
      this.setState({ objects: this.format(res.data) });
    });
  };

  render() {
    return (
      <Card>
        <Card.Header></Card.Header>
        <Card.Body>
          <Metrics objects={this.state.objects} />
        </Card.Body>
        <Card.Footer></Card.Footer>
      </Card>
    );
  }
}

export default Home;
