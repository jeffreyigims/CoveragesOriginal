import React from "react"
import PropTypes from "prop-types"
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

class Sport extends React.Component {

  sportOptions = () => {
    return this.props.sports.map((sport, index) => {
      return (
          <option key={index} value={index}> {sport.name} </option>
      )
  })}

  render () {
    return (
      <React.Fragment>
        <Form>
        <Form.Group controlId="sport">
          <Form.Label>Sport:</Form.Label>
          <Form.Control as="select"  name="selectedSport" onChange={this.props.handleSportChange}>
            <option></option>
            { this.sportOptions() }
          </Form.Control>
        </Form.Group>
        <Button variant="primary" onClick={this.props.nextPage}>Next Page</Button>
        </Form>
      </React.Fragment>
    );
  }
}

export default Sport
