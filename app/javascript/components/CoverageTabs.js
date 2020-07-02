import React from "react"
import PropTypes from "prop-types"
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import Container from 'react-bootstrap/Container'
import TopBar from './TopBar'
import NavGuest from './NavGuest'
import Footer from './Footer'
import CoveragesTable from './CoveragesTable';

class CoverageTabs extends React.Component {

  state = {
    verifiedCoverages: [],
    unverifiedCoverages: []
  }

  run_ajax = (link, method = "GET", data = {}, callback = () => { this.get_players() }) => {
    let options
    if (method == "GET") {
      options = { method: method }
    } else {
      options = {
        method: method,
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'same-origin'
      }
    }

    fetch(link, options)
      .then((response) => {
        if (!response.ok) {
          throw (response);
        }
        return response.json();
      })
      .then(
        (result) => {
          callback(result);
        })
      .catch((error) => {
        if (error.statusText) {
          this.setState({ error: error })
        }
        callback(error);
      })
  }

  get_verifiedCoverages = () => {
    this.run_ajax('/coverages.json?verified=true', 'GET', {}, (res) => { this.setState({ verifiedCoverages: res }) });
  }

  get_unverifiedCoverages = () => {
    this.run_ajax('/coverages.json?verified=false', 'GET', {}, (res) => { this.setState({ unverifiedCoverages: res }) });
  }

  componentDidMount() {
    this.get_verifiedCoverages()
    this.get_unverifiedCoverages()
  }

  render() {
    return (
      <React.Fragment>
        <TopBar />
        <NavGuest />
        <Container style={{margin:"40px"}}>
          <Tabs transition={false}>
            <Tab eventKey="Verified" title="Verified">
              <CoveragesTable
                coverages={this.state.verifiedCoverages} />
            </Tab>
            <Tab eventKey="Unverified" title="Unverified">
              <CoveragesTable
                coverages={this.state.unverifiedCoverages} />
            </Tab>
          </Tabs>
        </Container>
        <Footer />
      </React.Fragment>
    );
  }
}

export default CoverageTabs
