import React, {useEffect} from 'react'
import { Leadarboard } from './Leadarboard'
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loadGame, leaveGame } from "../actions/game"
import Gameover from './gameover.mp4'
import Host from './Host';

 const GameOver = ({loadGame, game, leaveGame, numCalled}) => {
    useEffect(() => {
        loadGame()
    }, [])
   

    const leave = async (e) => {
        e.preventDefault();
        await leaveGame(
          localStorage.getItem("playerid"),
          localStorage.getItem("username")
        );
        window.location.href = '/'
      };
    return (
        <div className="container" style={{marginBottom: "30%"}}>
            <video width="320" height="240" autoPlay loop={true}>
                <source src={Gameover} type="video/mp4" />
                    Your browser does not support the video tag.
            </video> 
            <h2>LEAVE GAME!</h2>
            <div className="trash">
            <a href="#top" class="" onClick={(e) => leave(e)}>
              &#9166;
            </a>
            </div>
            <div>
            {game ? <table className="score-board">
                <tr class="top-row-table">
                    <td >Award</td>
                    <td>Point</td>
                    <td>Winner</td>
                </tr>
                <tr>
                    <td>First Line</td>
                    <td>50</td>
                    <td>{!game.dividends["firstLine"].winner ? " " :  game.dividends["firstLine"].winner}</td>
                </tr>
                <tr>
                    <td>Second Line</td>
                    <td>50</td>
                    <td>{!game.dividends["secondLine"].winner ? " " :  game.dividends["secondLine"].winner}</td>
                </tr>
                <tr>
                    <td>Third Line</td>
                    <td>50</td>
                    <td>{!game.dividends["thirdLine"].winner ? " " :  game.dividends["thirdLine"].winner}</td>
                </tr>
                <tr>
                    <td>Early 5</td>
                    <td>30</td>
                    <td>{!game.dividends["earlyFive"].winner ? " " :  game.dividends["earlyFive"].winner}</td>
                </tr>
                <tr>
                    <td>Four Corner</td>
                    <td>40</td>
                    <td>{!game.dividends["fourCorner"].winner ? " " :  game.dividends["fourCorner"].winner}</td>
                </tr>
                <tr>
                    <td>Middle Number</td>
                    <td>30</td>
                    <td>{!game.dividends["middleNumber"].winner ? " " :  game.dividends["middleNumber"].winner}</td>
                </tr>
                <tr>
                    <td>Full House</td>
                    <td>100</td>
                    <td>{!game.dividends["house"].winner ? " " :  game.dividends["house"].winner}</td>
                </tr>
                {/* {game.players.length > 2 ? <tr>
                    <td>Full House 2</td>
                    <td>100</td>
                    <td>{!game.dividends["firstLine"].winner ? " " :  game.dividends["house"].winner}</td>
                </tr> : ""} */}
            </table> : "" }
            <br/><br/>
           </div>
           <Host game={game} total={numCalled.length} />
            {/* {game ? game.dividends !== undefined ? <Leadarboard game={game} /> : "" : ""} */}
        </div>
    )
}

GameOver.prototype = {
    loadGame: PropTypes.func.isRequired,
    leaveGame: PropTypes.func.isRequired,
    game: PropTypes.object.isRequired,
    numCalled: PropTypes.object.isRequired,
  };
  
  const mapStateToProps = (state) => ({
    game: state.game.game,
    numCalled: state.game.numCalled
  });
  
  export default connect(mapStateToProps, {loadGame, leaveGame})(
    GameOver
  );