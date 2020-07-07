import React from "react";
import PropTypes from "prop-types";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

class Login extends React.Component {
  state = {
    show: true,
    username: "",
    password: "",
  };

  run_ajax = (
    link,
    method = "GET",
    data = {},
    callback = () => {
      
    }
  ) => {
    let options;
    if (method == "GET") {
      options = { method: method };
    } else {
      options = {
        method: method,
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "same-origin",
      };
    }

    fetch(link, options)
      .then((response) => {
        if (!response.ok) {
          throw response;
        }
        return response.json();
      })
      .then((result) => {
        callback(result);
      })
      .catch((error) => {
        if (error.statusText) {
          this.setState({ error: error });
        }
        callback(error);
      });
  };

  handleInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleClose = () => {
    this.setState({
      username: "",
      password: "",
    });
    this.setState({ show: !this.state.show });
  };

  handleLogin = (event) => {
    event.preventDefault();
    const params = {
      username: this.state.username,
      password: this.state.password
    };
    this.run_ajax(
      "/sessions",
      "POST",
      { params: params }
    );
  };

  render() {
    return (
      <Modal show={this.state.show} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Username:</Form.Label>
              <Form.Control type="text" name="username" onChange={this.handleInputChange}/>
            </Form.Group>

            <Form.Group>
              <Form.Label>Password:</Form.Label>
              <Form.Control type="text" name="password" onChange={this.handleInputChange}/>
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={this.handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={this.handleLogin}>
            Login
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default Login;
