import React from "react"
import PropTypes from "prop-types"
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import League from './League';
import Sport from './Sport';
import Club from './Club';

class Survey extends React.Component {

  state = { 
    sports: [],
    selectedSport: null,
    leagues: [],
    selectedLeague: null,
    clubs: [],
    selectedClub: null,
    page: 1
}

run_ajax = (link, method="GET", data={}, callback = () => {}) => {
  let options
  if (method == "GET") {
      options = { method: method}
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
          this.setState({error: error})
      }
      callback(error);
  })
}

getSports = () => {
    this.run_ajax('/sports.json', 'GET', {}, (res) => {this.setState({sports: res, selectedSport: res[0]})});
}

getLeagues = () => {
  this.run_ajax('/leagues.json', 'GET', {}, (res) => {this.setState({leagues: res})});
}

getClubs = () => {
  this.run_ajax('/clubs.json', 'GET', {}, (res) => {this.setState({clubs: res})});
}

componentDidMount() {
    this.getSports()
    this.getLeagues()
    this.getClubs()
}

handleSportChange = (event) => {
  this.setState(
    {selectedSport: this.state.sports[event.target.value]},
    );
}

handleLeagueChange = (event) => {
  this.setState(
    {selectedLeague: this.state.leagues[event.target.value]},
    );
}

handleInputChange = (event) => {
  this.setState({ [event.target.name]: event.target.value });
}


nextPage = () => {
  this.setState(
    {page: this.state.page += 1}
  )
}

previousPage = () => {
  this.setState(
    {page: this.state.page -= 1}
  )
}

  render () {
    return (
      <React.Fragment>
        {this.state.page == 1 && <Sport 
          previousPage={this.previousPage}
          nextPage={this.nextPage}
          sports={this.state.sports}
          handleSportChange={this.handleSportChange}/>}
        {this.state.page == 2 && <League 
           previousPage={this.previousPage}
           nextPage={this.nextPage}
           sport={this.state.selectedSport}
           leagues={this.state.leagues}
           handleLeagueChange={this.handleLeagueChange}/>}
         {this.state.page == 3 && <Club 
           previousPage={this.previousPage}
           nextPage={this.nextPage}
           league={this.state.selectedLeague}
           clubs={this.state.clubs}
           handleClubChange={this.handleClubChange}/>}
      </React.Fragment>
    );
  }
}

export default Survey
