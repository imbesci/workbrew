import * as React from "react";
import "./Button.css";

export const Button = () => {
  const [clicked, setClicked] = React.useState(true);

  const onClick = () => {
    setClicked(!clicked);
  };

  return (
    <div className="buttonContainer">
      <button className="clickButton" onClick={onClick}>
        {clicked ? "Click it!" : "Good job"}
      </button>
    </div>
  );
};