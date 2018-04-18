import React, { Component } from "react";
import axios from "axios";

import "./styles/default.css";
import "./styles/Form.css";
import "./styles/PersonList.css";
import "./styles/PersonListItem.css";
import "./styles/MoreInfo.css";
import "./styles/ErrorMessage.css";

import Form from "./components/Form";
import MoreInfo from "./components/MoreInfo";
import PersonList from "./components/PersonList";
import ErrorMessage from "./components/ErrorMessage";

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

  submitForm = e => {
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

  shouldShowList = () => {
    return (
      this.state.position && this.state.state && this.state.APIData.success
    );
  };

  render() {
    return (
      <div className="App">
        <h1 className="blue">Who's My Representative?</h1>
        <div className="form">
          <Form
            submit={this.submitForm}
            onSelectChange={this.onSelectChange}
            position={this.state.position}
            state={this.state.state}
          />
          {this.state.formError && (
            <ErrorMessage formError={this.state.formError} />
          )}
        </div>
        <div className="row">
          {this.shouldShowList() && (
            <PersonList {...this.state} showMoreInfo={this.showMoreInfo} />
          )}
          {this.state.APIData.success && <MoreInfo {...this.state} />}
        </div>
      </div>
    );
  }
}

export default App;
