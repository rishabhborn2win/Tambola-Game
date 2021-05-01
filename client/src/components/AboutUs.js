import React from "react";
import Heading from "./Heading";
// import tambola from "./header/tambola.png";

const AboutUs = () => {
  return (
    <div>
      <Heading text={"About Us!"} />
      <div className="container">
        <div className="detail-of-game">
          <div className="container">
            {/* <img src={tambola} alt="Tambola Icon" class="rounded" /> */}
            <p className="text-details-game">
              This Game is designed to play the tambola live with your family
              members on one Single platform.
            </p>
            <div className="steps-play">
              <h3> Important Note:-</h3>
              <p>
                <b>
                  You can host the game and the player having the room id can
                  join the game and the player can generate at max 6 tickets for
                  themself to play the game and the host can verify that tickets
                  too on the host Dashboard.
                  <br />
                  <br /> The numbers are called on the board Player can mark the
                  numbers on ticket at there own dashboard and when there is
                  some claim they can ask the host to verify, and if ita a
                  correct claim you <b>WIN</b> and Game continues as till all
                  the dividends is completed.
                </b>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
