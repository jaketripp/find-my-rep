import React, { Component } from "react";
import "./App.css";
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      position: "",
      state: "",
      APIData: "",
      formError: "",
      selectedPersonInfo: {
        name: "Jake Tripp",
        link: "https://jaketripp.com"
      }
    };
  }

  submit = e => {
    e.preventDefault();
    if (this.state.state && this.state.position) {
      axios
        .get(
          `http://localhost:8080/${this.state.position}s/${this.state.state}`
        )
        .then(response => {
          this.setState({
            APIData: response.data,
            formError: ""
          });
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      this.setState({
        formError: "Please choose a Congress position AND US State"
      });
    }
  };

  onPositionChange = e => {
    this.setState({ position: e.target.value });
  };
  onStateChange = e => {
    this.setState({ state: e.target.value });
  };

  partyAbbreviation = {
    Republican: "R",
    Democrat: "D",
    Independent: "I"
  };

  showMoreInfo = (e) => {
    console.log(e);
  }

  render() {
    return (
      <div className="App">
        <h1>FIND MY REP</h1>
        <div className="form">
          <form onSubmit={this.submit}>
            <select
              name="position"
              id="position"
              value={this.state.position}
              onChange={this.onPositionChange}
            >
              <option value="">Select a Congress position</option>
              <option value="representative">Representative</option>
              <option value="senator">Senator</option>
            </select>
            <select
              name="state"
              id="state"
              value={this.state.state}
              onChange={this.onStateChange}
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
              <option value="DC">District Of Columbia</option>
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
            <button type="submit">Submit</button>
          </form>
          {this.state.formError && (
            <p className="error">{this.state.formError}</p>
          )}
        </div>
        <div className="list">
          {this.state.APIData.success && (
            <h3>
              {this.state.position === "representatives"
                ? `Representatives - ${this.state.state}`
                : `Senators - ${this.state.state}`}
            </h3>
          )}
          {this.state.APIData.success && (
            <ul>
              <li>Name Party</li>
              {this.state.APIData.results.map((person, i) => {
                return (
                  <li key={i} onClick={this.showMoreInfo}>
                    {person.name} {this.partyAbbreviation[person.party]}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
        <div className="moreInfo">
          <h3>Info</h3>
          <div className="fields">
            <input
              placeholder="First Name"
              value={this.state.selectedPersonInfo.name.split(" ")[0]}
              readOnly
            />
            <input
              placeholder="Last Name"
              value={this.state.selectedPersonInfo.name.split(" ")[0]}
              readOnly
            />
            <input
              placeholder="District"
              value={this.state.selectedPersonInfo.name.split(" ")[0]}
              readOnly
            />
            <input
              placeholder="Phone"
              value={this.state.selectedPersonInfo.name.split(" ")[0]}
              readOnly
            />
            <input
              placeholder="Office"
              value={this.state.selectedPersonInfo.name.split(" ")[0]}
              readOnly
            />
            <a
              href={this.state.selectedPersonInfo.link}
              target="_blank"
              rel="noopener"
            >
              Website
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
