import React from "react"
import PropTypes from "prop-types"
import Table from 'react-bootstrap/Table'
import Container from 'react-bootstrap/Tabs'
import ShowCoverage from './ShowCoverage'

class CoveragesTable extends React.Component {

  state = {
    modal_show: false,
    modal_new: false,
    selected: null
  }

  showCoverages = () => {
    return this.props.coverages.map((coverage, index) => {
      return (
        <tr key={index} onClick={slot => this.showCoverage(coverage)}>
          <td width="200" align="left">{coverage.sport.name}</td>
          <td width="200" align="left">{coverage.league.name}</td>
          <td width="200" align="left">{coverage.club.name}</td>
          <td width="200" align="left">{coverage.group.name}</td>
          <td width="200" align="left">{coverage.category.name}</td>
          <td width="200" align="left">{coverage.sub_category.name}</td>
          <td width="200" align="left">{coverage.has_coverage_line ? "true" : "false"}</td>
          <td width="200" align="left">{coverage.notes}</td>
          <td width="200" align="left">{coverage.start_date}</td>
          <td width="200" align="left">{coverage.end_date}</td>
          <td width="200" align="left">{coverage.verified ? "true" : "false"}</td>
        </tr>
      )
    })
  }

  switchModal = (name) => {
    const modal = name
    this.setState(prevState => ({
      [modal]: !prevState[modal]
    }));
  }

  showCoverage = (id) => {
    this.setState({
      selected: id
    });
    this.switchModal("modal_show")
  }

  render() {
    return (
      <>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Sport</th>
              <th>League</th>
              <th>Club</th>
              <th>Group</th>
              <th>Category</th>
              <th>Sub</th>
              <th>Coverage</th>
              <th>Notes</th>
              <th>Start</th>
              <th>End</th>
              <th>Verified</th>
            </tr>
          </thead>
          <tbody>
            {this.showCoverages()}
          </tbody>
        </Table>
        <ShowCoverage
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

export default CoveragesTable
