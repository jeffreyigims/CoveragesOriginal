import React from "react";
import PropTypes from "prop-types";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Jumbotron from "react-bootstrap/Jumbotron";
import Card from "react-bootstrap/Card";
import { PieChart, Pie, Legend, Tooltip } from "recharts";
import { ResponsivePie } from "@nivo/pie";

import { run_ajax, handleInputChange } from "Utils.js";

class Metrics extends React.Component {
  constructor() {
    super();
    this.run_ajax = run_ajax.bind(this);
    this.handleInputChange = handleInputChange.bind(this);
  }

  state = {
    leagues: [],
    selectedLeague: null,
    selectedLeagueData: null,
  };

  componentDidMount() {
    this.getObjects();
  }

  getObjects() {
    this.run_ajax("/leagues.json", "GET", {}, (res) => {
      this.setState({ leagues: res });
    });
  }

  getLeagueData(id) {
    this.run_ajax("/charts.json?league_id=" + id, "GET", {}, (res) => {
      this.setState({ selectedLeagueData: res });
    });
  }

  leagueOptions = () => {
    return this.state.leagues.map((object, index) => {
      return (
        <option key={index} value={object.id}>
          {" "}
          {object.name}{" "}
        </option>
      );
    });
  };

  handleLeagueChange = (event) => {
    this.setState({ selectedLeague: event.target.value });
    this.getLeagueData(event.target.value);
  };

  render() {
    const MyResponsivePie = (data) => (
      <ResponsivePie
          data={data}
          margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
          innerRadius={0.5}
          padAngle={0.7}
          cornerRadius={3}
          colors={{ scheme: 'nivo' }}
          borderWidth={1}
          borderColor={{ from: 'color', modifiers: [ [ 'darker', 0.2 ] ] }}
          radialLabelsSkipAngle={10}
          radialLabelsTextXOffset={6}
          radialLabelsTextColor="#333333"
          radialLabelsLinkOffset={0}
          radialLabelsLinkDiagonalLength={16}
          radialLabelsLinkHorizontalLength={24}
          radialLabelsLinkStrokeWidth={1}
          radialLabelsLinkColor={{ from: 'color' }}
          slicesLabelsSkipAngle={10}
          slicesLabelsTextColor="#333333"
          animate={true}
          motionStiffness={90}
          motionDamping={15}
          defs={[
              {
                  id: 'dots',
                  type: 'patternDots',
                  background: 'inherit',
                  color: 'rgba(255, 255, 255, 0.3)',
                  size: 4,
                  padding: 1,
                  stagger: true
              },
              {
                  id: 'lines',
                  type: 'patternLines',
                  background: 'inherit',
                  color: 'rgba(255, 255, 255, 0.3)',
                  rotation: -45,
                  lineWidth: 6,
                  spacing: 10
              }
          ]}
          fill={[
              {
                  match: {
                      id: 'ruby'
                  },
                  id: 'dots'
              },
              {
                  match: {
                      id: 'c'
                  },
                  id: 'dots'
              },
              {
                  match: {
                      id: 'go'
                  },
                  id: 'dots'
              },
              {
                  match: {
                      id: 'python'
                  },
                  id: 'dots'
              },
              {
                  match: {
                      id: 'scala'
                  },
                  id: 'lines'
              },
              {
                  match: {
                      id: 'lisp'
                  },
                  id: 'lines'
              },
              {
                  match: {
                      id: 'elixir'
                  },
                  id: 'lines'
              },
              {
                  match: {
                      id: 'javascript'
                  },
                  id: 'lines'
              }
          ]}
          legends={[
              {
                  anchor: 'bottom',
                  direction: 'row',
                  translateY: 56,
                  itemWidth: 100,
                  itemHeight: 18,
                  itemTextColor: '#999',
                  symbolSize: 18,
                  symbolShape: 'circle',
                  effects: [
                      {
                          on: 'hover',
                          style: {
                              itemTextColor: '#000'
                          }
                      }
                  ]
              }
          ]}
      />
  )

    return (
      <>
        <Card style={{ height: "500px" }}>
          <Card.Header>
            <Form>
              <Row>
                <Form.Group as={Col}>
                  <Form.Label>League:</Form.Label>
                  <Form.Control
                    as="select"
                    name="selectedLeague"
                    onChange={this.handleLeagueChange}
                  >
                    {this.leagueOptions()}
                  </Form.Control>
                </Form.Group>
              </Row>
            </Form>
          </Card.Header>
          <Card.Body>
            {this.state.selectedLeagueData != null &&
              MyResponsivePie(this.state.selectedLeagueData)}
          </Card.Body>
        </Card>
      </>
    );
  }
}

export default Metrics;
