import React from "react";
import Location from "react-icons/lib/fa/location-arrow";
import ExternalLink from "react-icons/lib/fa/external-link";
import Phone from "react-icons/lib/fa/phone";

function MoreInfo(props) {
  return (
    <div className="moreInfo">
      <h3>Info</h3>
      <div className="fields">
        <p className={props.infoClass}>{props.selectedPersonInfo.firstName}</p>
        <p className={props.infoClass}>{props.selectedPersonInfo.lastName}</p>
        {props.selectedPersonInfo.district !== "District " &&
          props.position === "Representatives" && (
            <p className={props.infoClass}>
              {props.selectedPersonInfo.district}
            </p>
          )}
        <p className={props.infoClass}>
          <a
            href={
              props.selectedPersonInfo.phone !== "Phone"
                ? `tel:${props.selectedPersonInfo.phone}`
                : "#"
            }
            target="_blank"
            rel="noopener"
            className="blue"
          >
            <Phone /> {props.selectedPersonInfo.phone}
          </a>
        </p>
        <p className={props.infoClass}>
          <a
            href={
              props.selectedPersonInfo.office !== "Office"
                ? `https://www.google.com/maps?q=${
                    props.selectedPersonInfo.office
                  }`
                : "#"
            }
            target="_blank"
            rel="noopener"
            className="blue"
          >
            <Location /> {props.selectedPersonInfo.office}
          </a>
        </p>
        <p className={props.infoClass}>
          <a
            href={
              props.selectedPersonInfo.link
                ? props.selectedPersonInfo.link
                : "#"
            }
            target="_blank"
            rel="noopener"
            className="blue"
          >
            <ExternalLink />{" "}
            {props.selectedPersonInfo.firstName !== "First Name" &&
              `${props.selectedPersonInfo.firstName} ${
                props.selectedPersonInfo.lastName
              }'s`}{" "}
            Website
          </a>
        </p>
      </div>
    </div>
  );
}

export default MoreInfo;
