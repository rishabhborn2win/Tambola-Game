import React from 'react'
import { notifyFill, updateDividend } from "../actions/game";
import { connect } from "react-redux";
import PropTypes from "prop-types";


 const DividendsVerify = ({numCalled, ticket, playername, gameid, updateDividend, game}) => {
    const verifyLine = (line) => {

        var nameOfPrize = line === 0 ? "firstLine" : line === 1 ? "secondLine" : line === 2 ? "thirdLine" : ""
        var numbers =[]
        var flag=0;
        ticket[line].map((num) => {
            if(num!==0){
            numbers.push(num);
            numCalled.map((numCalled) => {
                if(num === numCalled) flag++
                return 0;
            })
         }
         return 0;
        })
        if(flag === 5) {
            alert(`You Got ${line+1} Line`);
            updateDividend(gameid, playername, 50, nameOfPrize)
        }
        else {
            alert("Boogie");
            updateDividend(gameid, playername, -10, "boogie")
        }  
    }

    const verifyHouse = () => {
        var flag=0;
        ticket.map((row) => {
        row.map((num) => {
            if(num!==0){
            numCalled.map((numCalled) => {
                if(num === numCalled) flag++;
                return 0;
            })
         }
         return 0;
        })
        return 0;
    })
        if(flag === 15) {
            alert("You Got House");
            updateDividend(gameid, playername, 100, "house")
        }
        else {
            alert("Boogie");
            updateDividend(gameid, playername, -50, "boogie")
        }  
    }

    return (
        <div>
            {!game.dividends.firstLine.winner ?<button onClick={() => verifyLine(0)}>First Line</button> : ""}
            {!game.dividends.secondLine.winner ?<button onClick={() => verifyLine(1)}>Second Line</button> : ""}
            {!game.dividends.thirdLine.winner ?<button onClick={() => verifyLine(2)}>Third Line</button> : ""}
            {!game.dividends.house.winner ?<button onClick={verifyHouse}>House</button> : ""}
        </div>
    )
}

DividendsVerify.prototype = {
    notifyFill: PropTypes.func.isRequired,
    updateDividend: PropTypes.func.isRequired,
  };

  const mapStateToProps = (state) => ({
      game: state.game.game
  })

  
  export default connect(mapStateToProps, { notifyFill, updateDividend })(
    DividendsVerify
  );
