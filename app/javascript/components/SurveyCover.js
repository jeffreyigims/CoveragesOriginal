import React from "react"
import useState from 'react'
import PropTypes from "prop-types"
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Formik from 'formik'

class SurveyCover extends React.Component {

  state = {
    first_name: '',
    last_name: '',
    phone: '',
    email: ''
  }

  handleInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  startSurvey = (event) => {
    const [validated, setValidated] = useState(false)
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    }
    setValidated(true)
    const new_user = {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      phone: this.state.phone,
      email: this.state.email
  }
    /*    this.props.run_ajax('/users.json', 'POST', {"user": new_user});*/
    this.props.nextPage()
  }

  render () {
    return (
      <React.Fragment>
        <Form>
        <Form.Group>
          <Form.Label>First Name:</Form.Label>
          <Form.Control type="text" required name="first_name" onChange={this.handleInputChange}></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Last Name:</Form.Label>
          <Form.Control type="text"  name="last_name" onChange={this.handleInputChange}></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Phone:</Form.Label>
          <Form.Control type="text"  name="phone" onChange={this.handleInputChange}></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Email:</Form.Label>
          <Form.Control type="text"  name="email" onChange={this.handleInputChange}></Form.Control>
        </Form.Group>
        <Button variant="primary" onClick={this.startSurvey}>Start Survey</Button>
        </Form>
      </React.Fragment>
    );
  }
}

export default SurveyCover
