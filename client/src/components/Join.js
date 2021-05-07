import React, { useState } from "react";
import { Redirect } from "react-router";
import { loadGame } from "../actions/game";

export const Join = ({ match }) => {
  const [formData, setFormData] = useState({
    playername: match.params.username,
    gameID: match.params.gameid,
    ticketId: match.params.ticketid,
  });

  const { playername, gameID, ticketId } = formData;

  localStorage.setItem("username", playername);
  localStorage.setItem("playerid", gameID);
  localStorage.setItem("ticketId", ticketId);

  loadGame();

  return (
    <div>
      <Redirect to="/play" />
    </div>
  );
};
