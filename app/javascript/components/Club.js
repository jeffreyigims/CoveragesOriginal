import React from "react"
import PropTypes from "prop-types"
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

class Club extends React.Component {

  clubOptions = () => {
    let filteredClubs = this.props.league == null ? this.props.clubs : this.props.clubs.filter(object => object.league.id == this.props.league.id)
    return filteredClubs.map((club, index) => {
      return (
          <option key={index} value={index}> {club.name} </option>
      )
  })}

  render () {
    return (
      <React.Fragment>
        <Form>
        <Form.Group controlId="club">
          <Form.Label>Club:</Form.Label>
          <Form.Control as="select"  name="selectedClub" onChange={this.props.handleClubChange}>
            <option></option>
            { this.clubOptions() }
          </Form.Control>
        </Form.Group>
        <Button variant="secondary" onClick={this.props.previousPage}>Previous</Button>
        <Button variant="primary" onClick={this.props.nextPage}>Next</Button>
        </Form>
      </React.Fragment>
    );t
  }
}

export default Club
