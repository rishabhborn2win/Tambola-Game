import React from 'react'
import Heading from './Heading'
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import {loadTicketPlayer}  from '../actions/game'
import TicketList from './TicketList';
import Ticket from './Ticket';

export const PlayerDetail = ({setshowPlayer, player}) => {
    const [open, setOpen] = React.useState(true);
    const onCloseModal = () => {
      if(setshowPlayer){
          setshowPlayer(false)
      }
    setOpen(false);
  };
    return (
        <div>
      <Modal open={open} onClose={onCloseModal} center>
        <div>
          <Heading text="Player Detail"/>
          <div>{player.name}</div>
          {/* {player.tickets ? <Ticket ></Ticket> : "There are no Tickets for this Player!"} */}
        </div>
      </Modal>
    </div>
    )
}
