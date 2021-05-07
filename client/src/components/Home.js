import { Link } from "react-router-dom";
import { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "./layout/Spinner";
import { Button } from "react-bootstrap";
import { loadGame } from "../actions/game";
// import { Redirect } from "react-router-dom";
import "./style.css";
import Heading from "./Heading";
import { Fragment } from "react";
import Host from "./Host";
import Player from "./Player";
import QRCode from "qrcode.react";
import man from "./man.png";
import * as htmlToImage from "html-to-image";

function Home({ game }) {
  useEffect(() => {
    loadGame();
  });
  useEffect(() => {
    if (navigator.share === undefined) {
      if (window.location.protocol === "http:") {
        window.location.replace(
          window.location.href.replace(/^http:/, "https:")
        );
      }
    }
  }, []);

  loadGame();

  //this code can be use to make any image onclick download

  // const downloadQR = () => {
  //   const canvas = document.getElementById("123456");
  //   const pngUrl = canvas
  //     .toDataURL("image/png")
  //     .replace("image/png", "image/octet-stream");
  //   let downloadLink = document.createElement("a");
  //   downloadLink.href = pngUrl;
  //   downloadLink.download = "123456.png";
  //   document.body.appendChild(downloadLink);
  //   downloadLink.click();
  //   document.body.removeChild(downloadLink);
  // };

  var numCalled = [];
  if (game.game) {
    game.game.numbers.map((num) => {
      if (num.called === true) {
        numCalled.push(num.number);
        // console.log(numCalled)
      }
      return 0;
    });
  }

  //This is use to make any element of the html as a png image

  var node = document.getElementById("123456");
  var urlOfImage;

  htmlToImage
    .toPng(node)
    .then(function (dataUrl) {
      urlOfImage = dataUrl;
      // var img = new Image();
      // img.src = dataUrl;
      // img.id="1234567";
      // document.body.appendChild(img);
    })
    .catch(function (error) {
      console.error("oops, something went wrong!", error);
    });

  //this is use to make the file shareable
  const handleOnSubmit = async () => {
    const response = await fetch(urlOfImage);
    // here image is url/location of image
    const blob = await response.blob();
    const file = new File([blob], "share.jpg", { type: blob.type });
    console.log(file);
    if (navigator.share) {
      await navigator
        .share({
          title: "title",
          text: "Join The game Using QR",
          // url: "/join",
          files: [file],
        })
        .then(() => console.log("Successful share"))
        .catch((error) => console.log("Error in sharing", error));
    } else {
      console.log(`system does not support sharing files.`);
    }
  };

  //find player in the game
  //we have the username as the player joins the game

  if (localStorage.gameid || localStorage.playerid) {
    loadGame();
    var typeOfPlayer;
    if (localStorage.gameid) typeOfPlayer = "Host";
    else if (localStorage.username)
      typeOfPlayer = `Player : ${localStorage.username}`;

    // if(game.game === null) return <Fragment><Spinner></Spinner></Fragment>;
    // else {
    return (
      <Fragment>
        <Heading text={`Game Dashboard (${typeOfPlayer})`} />
        {game.loading ? (
          <Spinner></Spinner>
        ) : (
          <div className="container">
            <Link to="/play">
              <button className="btn btn-lg">Resume Game</button>
              <br></br>
              <br></br>
            </Link>
            <div className="host-player">
              {game !== null ? (
                <Fragment>
                  <Host game={game.game} total={numCalled.length}></Host>
                  {game.game ? (
                    localStorage.gameid === game.game._id ? (
                      <Player game={game.game ? game.game : {}} />
                    ) : (
                      ""
                    )
                  ) : (
                    ""
                  )}
                </Fragment>
              ) : (
                <div></div>
              )}
            </div>
          </div>
        )}
      </Fragment>
    );
    // }
  }

  return (
    <Fragment>
      <Heading text="Welcome to Tambola," />
      {/* The code below is use to generate the QR Code */}
      <QRCode
    id="123456"
    value="https://tambola-numbers.herokuapp.com "
    size={290}
    level={"H"}
    includeMargin={true}
  />
      {/* <a onClick={downloadQR}> Download QR </a> */}
      <a onClick={handleOnSubmit}> Share QR </a>

      <span class="text-span">Select Option:-</span>
      <div class="container" id="image">
        <Link to="/join">
          <Button variant="success" className="button-lg">
            Join Games
          </Button>
        </Link>{" "}
        <Link to="/create">
          <Button variant="success" className="button-lg">
            Create A Game
          </Button>
        </Link>
      </div>
    </Fragment>
  );
}
Home.propTypes = {
  game: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  game: state.game,
});

export default connect(mapStateToProps)(Home);
