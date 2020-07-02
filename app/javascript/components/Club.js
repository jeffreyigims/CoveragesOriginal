import React from "react"
import PropTypes from "prop-types"
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

class Club extends React.Component {

  clubOptions = () => {
    let filteredClubs = this.props.clubs.filter(object => object.league.id == this.props.selectedLeague.id)
    return filteredClubs.map((club, index) => {
      return (
          <option key={index} value={club.id}> {club.name} </option>
      )
  })}

  render () {
    return (
      <React.Fragment>
        <Form>
        <Form.Group controlId="club">
          <Form.Label>Club:</Form.Label>
          <Form.Control as="select"  name="selectedClub" defaultValue={this.props.selectedClub?.id} onChange={this.props.handleClubChange}>
            <option></option>
            { this.clubOptions() }
          </Form.Control>
        </Form.Group>
        <Button variant="primary" onClick={this.props.previousPage}>Previous</Button>{" "}
        <Button variant="primary" onClick={this.props.nextPage}>Next</Button>
        </Form>
      </React.Fragment>
    );t
  }
}

export default Club
