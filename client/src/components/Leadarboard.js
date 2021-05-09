import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import React from 'react'

export const Leadarboard = ({game, setOpenLeadarboard}) => {

    const [open, setOpen] = React.useState(true);
    const onCloseModal = () => {
      setOpen(false);
      setOpenLeadarboard(false);
    };

    


    return (
        <div>
            <Modal open={open} onClose={onCloseModal} center>
            <div>
            <table>
                <tr>
                    <td>Award</td>
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
                    <td>{!game.dividends["firstLine"].winner ? " " :  game.dividends["secondLine"].winner}</td>
                </tr>
                <tr>
                    <td>Third Line</td>
                    <td>50</td>
                    <td>{!game.dividends["firstLine"].winner ? " " :  game.dividends["thirdLine"].winner}</td>
                </tr>
                <tr>
                    <td>Full House</td>
                    <td>100</td>
                    <td>{!game.dividends["firstLine"].winner ? " " :  game.dividends["house"].winner}</td>
                </tr>
            </table>
           </div>
           <br />
            <div className="player-scoreboard">
                <table>
                    <tr>
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
