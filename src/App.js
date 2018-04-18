import React, { Component } from "react";
import axios from "axios";

import "./App.css";
import MoreInfo from './components/MoreInfo';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      position: "",
      state: "",
      APIData: "",
      formError: "",
      infoClass: "placeholder info-field",
      selectedPersonInfo: {
        state: "",
        party: "",
        name: "",
        firstName: "First Name",
        lastName: "Last Name",
        district: "District",
        phone: "Phone",
        office: "Office",
        link: ""
      }
    };
  }

  submit = e => {
    e.preventDefault();
    if (this.state.state && this.state.position) {
      axios
        .get(`http://localhost:8080/${this.state.position}/${this.state.state}`)
        .then(response => {
          this.setState({
            APIData: response.data,
            formError: ""
          });
        })
        .catch(error => {
          console.log(error);
          this.setState({
            formError: "Something went wrong, please try again later."
          });
        });
    } else {
      this.setState({
        formError: "Please select a Congress position and US State"
      });
    }
  };

  onSelectChange = (e, property) => {
    let newState = {
      APIData: "",
      selectedPersonInfo: {
        state: "",
        party: "",
        name: "",
        firstName: "First Name",
        lastName: "Last Name",
        district: "District",
        phone: "Phone",
        office: "Office",
        link: ""
      },
      infoClass: "placeholder info-field"
    };
    newState[property] = e.target.value;
    this.setState(newState);
  };

  partyAbbreviation = {
    Republican: "R",
    Democrat: "D",
    Independent: "I"
  };

  showMoreInfo = person => {
    let { state, party, name, district, phone, office, link } = person;

    this.setState({
      infoClass: "info-field",
      selectedPersonInfo: {
        state,
        party,
        name,
        firstName: name.split(" ")[0],
        lastName: name
          .split(" ")
          .slice(1)
          .join(" "),
        district: `District ${district}`,
        phone,
        office,
        link
      }
    });
  };

  render() {
    return (
      <div className="App">
        <h1 className="blue">Who's My Representative?</h1>
        <div className="form">
          <form onSubmit={this.submit}>
            <select
              name="position"
              id="position"
              value={this.state.position}
              onChange={e => this.onSelectChange(e, "position")}
              aria-label="Congress position"
            >
              <option value="">Select a Congress position</option>
              <option value="Representatives">Representatives</option>
              <option value="Senators">Senators</option>
            </select>
            <select
              name="state"
              id="state"
              value={this.state.state}
              onChange={e => this.onSelectChange(e, "state")}
              aria-label="US State"
            >
              <option value="">Select a State</option>
              <option value="AL">Alabama</option>
              <option value="AK">Alaska</option>
              <option value="AZ">Arizona</option>
              <option value="AR">Arkansas</option>
              <option value="CA">California</option>
              <option value="CO">Colorado</option>
              <option value="CT">Connecticut</option>
              <option value="DE">Delaware</option>
              <option value="FL">Florida</option>
              <option value="GA">Georgia</option>
              <option value="HI">Hawaii</option>
              <option value="ID">Idaho</option>
              <option value="IL">Illinois</option>
              <option value="IN">Indiana</option>
              <option value="IA">Iowa</option>
              <option value="KS">Kansas</option>
              <option value="KY">Kentucky</option>
              <option value="LA">Louisiana</option>
              <option value="ME">Maine</option>
              <option value="MD">Maryland</option>
              <option value="MA">Massachusetts</option>
              <option value="MI">Michigan</option>
              <option value="MN">Minnesota</option>
              <option value="MS">Mississippi</option>
              <option value="MO">Missouri</option>
              <option value="MT">Montana</option>
              <option value="NE">Nebraska</option>
              <option value="NV">Nevada</option>
              <option value="NH">New Hampshire</option>
              <option value="NJ">New Jersey</option>
              <option value="NM">New Mexico</option>
              <option value="NY">New York</option>
              <option value="NC">North Carolina</option>
              <option value="ND">North Dakota</option>
              <option value="OH">Ohio</option>
              <option value="OK">Oklahoma</option>
              <option value="OR">Oregon</option>
              <option value="PA">Pennsylvania</option>
              <option value="RI">Rhode Island</option>
              <option value="SC">South Carolina</option>
              <option value="SD">South Dakota</option>
              <option value="TN">Tennessee</option>
              <option value="TX">Texas</option>
              <option value="UT">Utah</option>
              <option value="VT">Vermont</option>
              <option value="VA">Virginia</option>
              <option value="WA">Washington</option>
              <option value="WV">West Virginia</option>
              <option value="WI">Wisconsin</option>
              <option value="WY">Wyoming</option>
            </select>
            <button type="submit" className="submitBtn">
              Submit
            </button>
          </form>
          {this.state.formError && (
            <p className="error">
              <em>{this.state.formError}</em>
            </p>
          )}
        </div>
        <div className="row">
          <div className="list">
            {this.state.position &&
              this.state.state &&
              this.state.APIData.success && (
                <h3>
                  List / <span className="blue">{this.state.position}</span>
                </h3>
              )}
            {this.state.position &&
              this.state.state &&
              this.state.APIData.success && (
                <ul>
                  <li>
                    <div>Name</div> <div className="party">Party</div>
                  </li>
                  {this.state.APIData.results.map((person, i) => {
                    let selectedPersonName = this.state.selectedPersonInfo.name;
                    return (
                      <li
                        key={i}
                        onClick={() => this.showMoreInfo(person)}
                        className={
                          selectedPersonName === person.name ? "selected" : ""
                        }
                      >
                        <div>{person.name} </div>
                        <div className="party">
                          {this.partyAbbreviation[person.party]}
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
          </div>
          {this.state.APIData.success && <MoreInfo {...this.state} />}
        </div>
      </div>
    );
  }
}

export default App;
