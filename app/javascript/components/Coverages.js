import React from "react"
import PropTypes from "prop-types"
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

class Coverages extends React.Component {

  state = {
    carriers: [],
    companies: [],
    categories: [],
    selectedCategory: null,
    selectedSubCategoryID: null,
    coverageCarriers: [],
    coverageBrokers: []
  }

  run_ajax = (link, method = "GET", data = {}, callback = () => { }) => {
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

  getCarriers = () => {
    this.run_ajax('/carriers.json', 'GET', {}, (res) => { this.setState({ carriers: res }) });
  }

  getCompanies = () => {
    this.run_ajax('/companies.json', 'GET', {}, (res) => { this.setState({ companies: res }) });
  }

  getCategories = () => {
    this.run_ajax('/categories.json', 'GET', {}, (res) => { this.setState({ categories: res }) });
  }

  componentDidMount() {
    this.getCarriers()
    this.getCompanies()
    this.getCategories()
  }

  categoryOptions = () => {
    return this.state.categories.map((category, index) => {
      return (
        <option key={index} value={category.id}> {category.name} </option>
      )
    })
  }

  subCategoryOptions = () => {
    if (this.state.selectedCategory == null) { return }
    return this.state.selectedCategory.sub_categories.map((sub_category, index) => {
      return (
        <option key={index} value={sub_category.id}> {sub_category.name} </option>
      )
    })
  }

  carriersOptions = () => {
    return this.state.carriers.map((carrier, index) => {
      return (
        <option key={index} value={carrier.id}> {carrier.name} </option>
      )
    })
  }

  brokersOptions = () => {
    return this.state.companies.map((company, index) => {
      return company.brokers.map((broker, index) => {
        return (
          <option key={index} value={broker.id}> {company.name} - {broker.name} </option>
        )
      })
    })
  }

  handleCategoryChange = (event) => {
    this.setState(
      { selectedCategory: this.state.categories.filter(category => category.id == event.target.value)[0] },
    );
  }

  handleSubCategoryChange = (event) => {
    this.setState(
      { selectedSubCategoryID: event.target.value },
    );
  }

  handleCarriersChange = (event) => {
    var options = event.target.options;
    var value = [];
    for (var i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    this.setState(
      { coverageCarriers: value },
    );
  }

  handleBrokersChange = (event) => {
    var options = event.target.options;
    var value = [];
    for (var i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    this.setState(
      { coverageBrokers: value },
    );
  }

  render() {
    return (
      <React.Fragment>
        <Form>
          <Form.Group controlId="categories">
            <Form.Label>Category:</Form.Label>
            <Form.Control as="select" name="selectedCategory" onChange={this.handleCategoryChange}>
              <option></option>
              {this.categoryOptions()}
            </Form.Control>
            <Form.Label>Sub Category:</Form.Label>
            <Form.Control as="select" name="selectedCategory" onChange={this.handleSubCategoryChange}>
              <option></option>
              {this.subCategoryOptions()}
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="carriers">
            <Form.Label>Carriers:</Form.Label>
            <Form.Control as="select" multiple name="coverageCarriers" onChange={this.handleCarriersChange}>
              {this.carriersOptions()}
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="brokers">
            <Form.Label>Brokers:</Form.Label>
            <Form.Control as="select" multiple name="coverageBrokers" onChange={this.handleBrokersChange}>
              {this.brokersOptions()}
            </Form.Control>
          </Form.Group>
          <Button variant="primary" onClick={this.props.previousPage}>Submit and Create Another</Button>
          <Button variant="primary" onClick={this.props.nextPage}>Submit and Finish</Button>
        </Form>
      </React.Fragment>
    );
  }
}

export default Coverages
