import React from "react"
import PropTypes from "prop-types"
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

class ClubGroup extends React.Component {

  clubGroupOptions = () => {
    let filteredClubGroups = this.props.clubGroups.filter(object => object.club.id == this.props.selectedClub.id)
    return filteredClubGroups.map((clubGroup, index) => {
      return (
          <option key={index} value={clubGroup.id}> {clubGroup.group.name} </option>
      )
  })}

  render () {
    return (
      <React.Fragment>
        <Form>
        <Form.Group controlId="clubGroup">
          <Form.Label>Club Group:</Form.Label>
          <Form.Control as="select"  name="selectedClubGroup" defaultValue={this.props.selectedClubGroup?.id} onChange={this.props.handleClubGroupChange}>
            <option></option>
            { this.clubGroupOptions() }
          </Form.Control>
        </Form.Group>
        <Button variant="primary" onClick={this.props.previousPage}>Previous</Button>{" "}
        <Button variant="primary" onClick={this.props.nextPage}>Next</Button>
        </Form>
      </React.Fragment>
    );t
  }
}

export default ClubGroup
