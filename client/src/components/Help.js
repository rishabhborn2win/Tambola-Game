import React from "react";
import Heading from "./Heading";

const Help = () => {
  return (
    <div>
      <Heading text={"Help!"} />
      <h1>Contact Details:-</h1>
      <div className="container steps-play">
        <p>Name: Rishabh Mishra</p>
        <p>
          <a href="mailto:rishabhborn2win@gmail.com">
            rishabhborn2win@gmail.com
          </a>
        </p>
        <p>
          <a href="tel:+918840576544">Phn No: 8840576544</a>
        </p>
      </div>
    </div>
  );
};

export default Help;
