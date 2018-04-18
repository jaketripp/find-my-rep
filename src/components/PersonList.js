import React from "react";

let partyAbbreviation = {
  Republican: "R",
  Democrat: "D",
  Independent: "I"
};

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
            <li
              key={i}
              onClick={() => props.showMoreInfo(person)}
              className={selectedPersonName === person.name ? "selected" : ""}
            >
              <div>{person.name} </div>
              <div className="party">{partyAbbreviation[person.party]}</div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default PersonList;
