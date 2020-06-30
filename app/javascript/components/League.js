import React from "react"
import PropTypes from "prop-types"
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

class League extends React.Component {

  leagueOptions = () => {
    return this.props.leagues.filter(object => object.sport.id == this.props.selectedSport.id)
                             .map((league, index) => {
      return (
          <option key={index} value={league.id}> {league.name} </option>
      )
  })}

  render () {
    return (
      <React.Fragment>
        <Form>
        <Form.Group controlId="league">
          <Form.Label>League:</Form.Label>
          <Form.Control as="select"  name="selectedLeague" defaultValue={this.props.selectedLeague?.id} onChange={this.props.handleLeagueChange}>
            <option></option>
            { this.leagueOptions() }
          </Form.Control>
        </Form.Group>
        <Button variant="primary" onClick={this.props.previousPage}>Previous</Button>
        <Button variant="primary" onClick={this.props.nextPage}>Next</Button>
        </Form>
      </React.Fragment>
    );t
  }
}

export default League
