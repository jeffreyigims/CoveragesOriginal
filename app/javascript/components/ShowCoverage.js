import React from "react"
import PropTypes from "prop-types"
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class ShowCoverage extends React.Component {

  state = {
    has_coverage_line: null,
    notes: '',
    start_date: null,
    end_date: null
  }

  handleInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleUpdate = (event) => {
    event.preventDefault();
    const updatedCoverage = {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      year: this.state.year,
      jersey: this.state.jersey
    }
    this.props.run_ajax('/coverages/'.concat(this.props.selected.id, '.json'), 'PATCH', { coverage: updatedCoverage });
    this.props.switchModal(name = this.props.name)
  }

  handleDelete = (event) => {
    event.preventDefault();
    this.props.run_ajax('/coverages/'.concat(this.props.selected.id, '.json'), 'DELETE');
    this.props.switchModal(name = this.props.name)
  }

  handleClose = () => {
    this.props.switchModal(this.props.name)
  }

  render() {
    if (this.props.selected == null) { return null }
    return (
      <Modal show={this.props.show} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Coverage Details</Modal.Title>
        </Modal.Header>

        <Modal.Body>

          <Form>

          <Row>
              <Form.Group as={Col}>
                <Form.Label>Club:</Form.Label>
                <Form.Control type="text" name="has_coverage_line" defaultValue={this.props.selected.club.name} disabled />
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Group:</Form.Label>
                <Form.Control type="text" name="has_coverage_line" defaultValue={this.props.selected.group.name} disabled />
              </Form.Group>
            </Row>


          <Row>
              <Form.Group as={Col}>
                <Form.Label>Category:</Form.Label>
                <Form.Control type="text" name="has_coverage_line" defaultValue={this.props.selected.category.name} disabled />
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Sub Category:</Form.Label>
                <Form.Control type="text" name="has_coverage_line" defaultValue={this.props.selected.sub_category.name} disabled />
              </Form.Group>
            </Row>


            <Form.Group>
              <Form.Label>Notes:</Form.Label>
              <Form.Control type="text" name="notes" defaultValue={this.props.selected.notes} onChange={this.handleInputChange} />
            </Form.Group>

            <Row>
              <Form.Group as={Col}>
                <Form.Label>Start Date:</Form.Label>
                <DatePicker id="example-datepicker" value={this.props.selected.start_date} onChange={this.handleChange} />
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>End Date:</Form.Label>
                <Form.Control type="checkbox" name="has_coverage_line" defaultValue={this.props.selected.has_coverage_line} onChange={this.handleInputChange} />
              </Form.Group>
            </Row>
            
            <Row>
            <Form.Group as={Col}>
              <Form.Label>Has Coverage Line:</Form.Label>
              <Form.Control type="checkbox" name="has_coverage_line" defaultValue={this.props.selected.has_coverage_line} onChange={this.handleInputChange} />
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label>Verified:</Form.Label>
              <Form.Control type="checkbox" name="verified" defaultValue={this.props.selected.has_coverage} onChange={this.handleInputChange} />
            </Form.Group>
            </Row>

          </Form>

        </Modal.Body>

        <Modal.Footer>
          <Button variant="danger" onClick={this.handleDelete}>Delete Coverage</Button>
          <Button variant="secondary" onClick={this.handleClose}>Close</Button>
          <Button variant="primary" onClick={this.handleUpdate}>Update Coverage</Button>
        </Modal.Footer>
      </Modal>
    )
  }

}

export default ShowCoverage
