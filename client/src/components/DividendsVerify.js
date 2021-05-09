import React from 'react'
import { notifyFill, updateDividend } from "../actions/game";
import { connect } from "react-redux";
import PropTypes from "prop-types";


 const DividendsVerify = ({numCalled, ticket, playername, gameid, updateDividend, game}) => {

    var numberOfTickets = [];
    ticket.map((row) => {
        row.map((num) => {
        if(num!==0) numberOfTickets.push(num);
        return 0;
        })
        return 0;
    })


    const verifyLine = (line) => {
        var r = window.confirm("Are You sure?");
        if(r=== true){
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
        
    }

    const verifyEarlyFive = () => {
        var r = window.confirm("Are You sure?");
        if(r=== true){
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
        if(flag === 5) {
            alert("You Got early 5");
            updateDividend(gameid, playername, 30, "earlyFive")
        }
        else {
            alert("Boogie");
            updateDividend(gameid, playername, -5, "boogie")
        }  
    }
    }

    const verifyFourCorner = () => {
        var r = window.confirm("Are You sure?");
        if(r=== true){
        var flag =0;
        var fourCornerNumbers = [numberOfTickets[0], numberOfTickets[4], numberOfTickets[10], numberOfTickets[14]];
        fourCornerNumbers.map((num) => {
            numCalled.map((number) => {
                if(num === number) flag++
                return 0;
            })
            return 0;
        })

        if(flag === 4){
            alert("You Got Four Corner");
            updateDividend(gameid, playername, 40, "fourCorner");
        }else {
            alert("Boogie");
            updateDividend(gameid, playername, -10, "boogie")
        }  
    }
    }

    const verifyMiddleNumber = () => {
        var r = window.confirm("Are You sure?");
        if(r=== true){
        var flag =0;
        var middleNumber = numberOfTickets[7];
        numCalled.map((num) => {
            if(middleNumber === num) flag++;
            return 0;
        })
        if(flag === 4){
            alert("You Got Middle Number");
            updateDividend(gameid, playername, 30, "fourCorner");
        }else {
            alert("Boogie");
            updateDividend(gameid, playername, -5, "boogie")
        }  
    }
    }

    const verifyHouse = () => {
        var r = window.confirm("Are You sure?");
        if(r=== true){
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
    }

    return (
        <div>
            {!game.dividends.firstLine.winner ?<button onClick={() => verifyLine(0)}>First Line</button> : ""}
            {!game.dividends.secondLine.winner ?<button onClick={() => verifyLine(1)}>Second Line</button> : ""}
            {!game.dividends.thirdLine.winner ?<button onClick={() => verifyLine(2)}>Third Line</button> : ""}
            {!game.dividends.earlyFive.winner ?<button onClick={() => verifyEarlyFive()}>Early 5</button> : ""}
            {!game.dividends.fourCorner.winner ?<button onClick={() => verifyFourCorner()}>Four Corner</button> : ""}
            {!game.dividends.middleNumber.winner ?<button onClick={() => verifyMiddleNumber()}>Middle Number</button> : ""}
            {!game.dividends.house.winner ?<button onClick={() => verifyHouse()}>House 1</button> : ""}
            {game.players.length >2 ? !game.dividends.house2.winner ?<button onClick={() => verifyHouse()}>House 2</button> : "" : ""}
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
