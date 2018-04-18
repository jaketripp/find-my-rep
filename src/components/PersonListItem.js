import React from "react";

let partyAbbreviation = {
  Republican: "R",
  Democrat: "D",
  Independent: "I"
};

function PersonList(props) {
  let { person, selectedPersonName } = props;
  return (
    <li
      onClick={() => props.showMoreInfo(person)}
      className={selectedPersonName === person.name ? "selected" : ""}
    >
      <div>{person.name} </div>
      <div className="party">{partyAbbreviation[person.party]}</div>
    </li>
  );
}

export default PersonList;
