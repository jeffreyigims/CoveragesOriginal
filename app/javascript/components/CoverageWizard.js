import React from "react";
import PropTypes from "prop-types";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Formik } from "formik";
import * as yup from "yup";
import { run_ajax } from "./Utils.js";
import CoverageWizardSport from "./CoverageWizardSport.js";
import CoverageWizardLeague from "./CoverageWizardLeague.js";
import CoverageWizardClub from "./CoverageWizardClub.js";
import CoverageWizardCoverages from "./CoverageWizardCoverages.js";

const schema = yup.object({
  // name: yup.string().required(),
});

class CoverageWizard extends React.Component {
  constructor() {
    super();
    this.run_ajax = run_ajax.bind(this);
  }

  state = {
    sports: [],
    leagues: [],
    selectedLeagues: [],
    clubs: [],
    selectedClubs: [],
    selectedClub: null,
    step: 1,
  };

  componentDidMount() {
    this.getObjects();
  }

  getObjects = () => {
    this.run_ajax("/sports.json", "GET", {}, (res) => {
      this.setState({ sports: res.data });
    });
    this.run_ajax("/leagues.json", "GET", {}, (res) => {
      this.setState({ leagues: res.data });
    });
    this.run_ajax("/clubs.json", "GET", {}, (res) => {
      this.setState({ clubs: res.data });
    });
  };

  leagueFilter = (values) => {
    let target = this.state.sports[values.sport].attributes.id;
    let newLeagues = this.state.leagues.filter(
      (object) => object.attributes.sport_id === target
    );
    this.setState({ selectedLeagues: newLeagues });
  };

  clubFilter = (values) => {
    let target = this.state.selectedLeagues[values.league].attributes.id;
    let newClubs = this.state.clubs.filter(
      (object) => object.attributes.league_id === target
    );
    this.setState({ selectedClubs: newClubs });
  };

  onSubmit = () => {};

  handleSubmit = (values) => {
    switch (this.state.step) {
      case 1:
        this.leagueFilter(values);
        this.setState({ step: this.state.step + 1 });
        break;
      case 2:
        this.clubFilter(values);
        this.setState({ step: this.state.step + 1 });
        break;
      case 3:
        this.setState({
          selectedClub: this.state.selectedClubs[values.club].attributes.id,
        });
        this.setState({ step: this.state.step + 1 });
        break;
      default:
        this.onSubmit();
    }
  };

  previousPage = () => {
    this.setState({ step: this.state.step - 1 });
  };

  render() {
    return (
      <>
        {this.state.step < 4 && (
          <Card>
            <Card.Header></Card.Header>
            <Card.Title style={{ marginTop: "10px" }}>New Coverage</Card.Title>
            <Card.Body>
              <Formik
                validationSchema={schema}
                onSubmit={(values) => this.handleSubmit(values)}
                initialValues={{
                  sport: 0,
                  league: 0,
                  club: 0,
                }}
              >
                {({
                  handleSubmit,
                  handleChange,
                  handleBlur,
                  values,
                  touched,
                  isValid,
                  errors,
                }) => (
                  <Form noValidate onSubmit={handleSubmit}>
                    {this.state.step === 1 && (
                      <CoverageWizardSport
                        objects={this.state.sports}
                        values={values}
                        isValid={isValid}
                        errors={errors}
                        handleChange={handleChange}
                      />
                    )}
                    {this.state.step === 2 && (
                      <CoverageWizardLeague
                        objects={this.state.selectedLeagues}
                        values={values}
                        isValid={isValid}
                        errors={errors}
                        handleChange={handleChange}
                      />
                    )}
                    {this.state.step === 3 && (
                      <CoverageWizardClub
                        objects={this.state.selectedClubs}
                        values={values}
                        isValid={isValid}
                        errors={errors}
                        handleChange={handleChange}
                      />
                    )}
                    <Button
                      className="btn btn-theme float-right"
                      type="submit"
                      variant="primary"
                    >
                      Next
                    </Button>
                    {this.state.step > 1 && (
                      <Button
                        className="btn btn-theme float-right"
                        variant="primary"
                        onClick={this.previousPage}
                        style={{ marginRight: "10px" }}
                      >
                        Back
                      </Button>
                    )}
                  </Form>
                )}
              </Formik>
            </Card.Body>
          </Card>
        )}
        {this.state.step === 4 && (
          <CoverageWizardCoverages club={this.state.selectedClub} />
        )}
      </>
    );
  }
}

export default CoverageWizard;
