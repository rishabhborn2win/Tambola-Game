import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import React from 'react'

export const Leadarboard = ({game, setOpenLeadarboard}) => {

    const [open, setOpen] = React.useState(true);
    const onCloseModal = () => {
      setOpen(false);
      if(setOpenLeadarboard){
      setOpenLeadarboard(false);
      }
    };

    
    return (
        <div>
            <Modal open={open} onClose={onCloseModal} center>
            <div>
            <table className="score-board">
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
            </table>
           </div>
           <br />
            <div className="player-scoreboard">
                <table>
                    <tr className="top-row-table">
                        <td>Player</td>
                        <td>Score</td>
                    </tr>
                    {
                    game.players.map((player) => {
                        return (
                            <tr>
                                <td>{player.name}</td>
                                <td>{player.score}</td>
                            </tr>
                        )
                    })
                }
                </table>
                
            </div>
            </Modal>
        </div>
    )
}
