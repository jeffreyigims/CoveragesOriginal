import React from "react";
import PropTypes from "prop-types";
import Modal from "react-bootstrap/Modal";

class GeneralForm extends React.Component {
  render() {
    return (
      <Modal
        show={this.props.show}
        onHide={() => this.props.switchModal("modal_new")}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            New{" "}
            {this.props.objectName.charAt(0).toUpperCase() +
              this.props.objectName.slice(1)}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>{this.props.formStructure()}</Modal.Body>
      </Modal>
    );
  }
}

export default GeneralForm;
