import React from "react"
import PropTypes from "prop-types"
import TopBar from './TopBar';
import NavGuest from './NavGuest';
import Survey from './Survey';
import Footer from './Footer';

class Main extends React.Component {
  render () {
    return (
      <React.Fragment>
        <TopBar/>
        <NavGuest/>
        <Survey/>
        <Footer/>
      </React.Fragment>
    );
  }
}

export default Main
