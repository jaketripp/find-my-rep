import React, { Component } from "react";
import "./App.css";
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      position: "representative",
      state: "",
      APIData: ''
    };
  }

  submit = (e) => {
    e.preventDefault();
    axios.get(`http://localhost:8080/${this.state.position}s/${this.state.state}`).then((response) => {
      this.setState({ APIData: response.data });
    }).catch((error) => {
      console.log(error);
    })
  }

  onPositionChange = (e) => {
    this.setState({ position: e.target.value });
  }
  onStateChange = (e) => {
    this.setState({ state: e.target.value });
  }

  render() {
    return (
      <div className="App">
        <h1>FIND MY REP</h1>
        <form onSubmit={this.submit}>
          <select
            name="position"
            id="position"
            value={this.state.position}
            onChange={this.onPositionChange}
          >
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
      </div>
    );
  }
}

export default App;
