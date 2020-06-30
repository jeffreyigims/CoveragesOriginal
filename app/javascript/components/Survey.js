import React from "react"
import PropTypes from "prop-types"
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import League from './League';
import Sport from './Sport';
import Club from './Club';
import ClubGroup from './ClubGroup';
import Coverages from './Coverages';

class Survey extends React.Component {

  state = { 
    sports: [],
    selectedSport: null,
    leagues: [],
    filteredLeagues: [],
    selectedLeague: null,
    clubs: [],
    selectedClub: null,
    clubGroups: [],
    selectedClubGroup: null,
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

getClubGroups = () => {
  this.run_ajax('/club_groups.json', 'GET', {}, (res) => {this.setState({clubGroups: res})});
}

componentDidMount() {
    this.getSports()
    this.getLeagues()
    this.getClubs()
    this.getClubGroups()
}

handleSportChange = (event) => {
  this.setState(
    {selectedSport: this.state.sports.filter(sport => sport.id == event.target.value)[0]},
    );
}

handleLeagueChange = (event) => {
  this.setState(
    {selectedLeague: this.state.leagues.filter(league => league.id == event.target.value)[0]},
    );
}

handleClubChange = (event) => {
  this.setState(
    {selectedClub: this.state.clubs.filter(club => club.id == event.target.value)[0]},
    );
}

handleClubGroupChange = (event) => {
  this.setState(
    {selectedClubGroup: this.state.clubGroups.filter(clubGroup => clubGroup.id == event.target.value)[0]},
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
        <Jumbotron >
          <Container>
        {this.state.page == 5 && <Sport 
          previousPage={this.previousPage}
          nextPage={this.nextPage}
          sports={this.state.sports}
          selectedSport={this.state.selectedSport}
          handleSportChange={this.handleSportChange}/>}
        {this.state.page == 2 && <League 
           previousPage={this.previousPage}
           nextPage={this.nextPage}
           selectedSport={this.state.selectedSport}
           leagues={this.state.leagues}
           selectedLeague={this.state.selectedLeague}
           handleLeagueChange={this.handleLeagueChange}/>}
         {this.state.page == 3 && <Club 
           previousPage={this.previousPage}
           nextPage={this.nextPage}
           selectedLeague={this.state.selectedLeague}
           clubs={this.state.clubs}
           handleClubChange={this.handleClubChange}/>}
         {this.state.page == 4 && <ClubGroup
           previousPage={this.previousPage}
           nextPage={this.nextPage}
           selectedClub={this.state.selectedClub}
           clubGroups={this.state.clubGroups}
           handleClubGroupChange={this.handleClubGroupChange}/>}
         {this.state.page == 1 && <Coverages
           previousPage={this.previousPage}
           nextPage={this.nextPage}
           selectedClubGroup={this.state.selectedClubGroup}/>}
           </Container>
         </Jumbotron>
      </React.Fragment>
    );
  }
}

export default Survey
