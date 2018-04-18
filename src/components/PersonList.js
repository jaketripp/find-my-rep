import React from "react";
import PersonListItem from "./PersonListItem";

function PersonList(props) {
  return (
    <div className="list">
      <h3>
        List / <span className="blue">{props.position}</span>
      </h3>

      <ul>
        <li>
          <div>Name</div> <div className="party">Party</div>
        </li>

        {props.APIData.results.map((person, i) => {
          let selectedPersonName = props.selectedPersonInfo.name;
          return (
            <PersonListItem
              key={i}
              {...props}
              person={person}
              selectedPersonName={selectedPersonName}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default PersonList;
