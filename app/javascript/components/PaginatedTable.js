import React from "react";
import PropTypes from "prop-types";
import { Pagination } from "semantic-ui-react";
import GeneralTable from "./GeneralTable.js";
import Row from "react-bootstrap/Row";
import { run_ajax } from "./Utils.js";
import Container from "react-bootstrap/Container";

class PaginatedTable extends React.Component {
  constructor() {
    super();
    this.run_ajax = run_ajax.bind(this);
  }

  state = {
    objects: [],
    currentPage: 1,
    totalPages: 0,
  };

  componentDidMount() {
    this.getObjects();
  }

  getObjects = () => {
    this.run_ajax(
      this.props.link + this.state.currentPage,
      "GET",
      {},
      (res) => {
        this.setState({
          objects: res[this.props.objects].data,
          totalPages: res[this.props.totalPages],
          currentPage: res[this.props.currentPage],
        });
      }
    );
  };

  handlePageChange = (e, { activePage }) => {
    this.run_ajax(this.props.link + activePage, "GET", {}, (res) => {
      this.setState({
        objects: res[this.props.objects].data,
        totalPages: res[this.props.totalPages],
        currentPage: res[this.props.currentPage],
      });
    });
  };

  render() {
    return (
      <React.Fragment>
        <Container>
          <Row className="row justify-content-center">
            <GeneralTable
              tableHeaders={this.props.tableHeaders}
              showObjects={this.props.showObjects}
              objects={this.state.objects}
            />
            <Pagination
              onPageChange={this.handlePageChange}
              defaultActivePage={this.state.currentPage}
              totalPages={this.state.totalPages}
            />
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}

export default PaginatedTable;
