import React from "react";

function ErrorMessage(props) {
  return (
    <p className="error">
      <em>{props.formError}</em>
    </p>
  );
}

export default ErrorMessage;
