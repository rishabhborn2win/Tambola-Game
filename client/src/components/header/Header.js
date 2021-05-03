/* eslint-disable jsx-a11y/accessible-emoji */
import React, { useState, useEffect } from "react";
import "./Header.css";
import { CSSTransition } from "react-transition-group";
import tambolaWrite from "./tambola-write.png";
// import WhatsAppWidget from "react-whatsapp-widget";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import Rules from "../Rules";
import { Link } from "react-router-dom";

export default function Header() {
  const [isNavVisible, setNavVisibility] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 700px)");
    mediaQuery.addListener(handleMediaQueryChange);
    handleMediaQueryChange(mediaQuery);

    return () => {
      mediaQuery.removeListener(handleMediaQueryChange);
    };
  }, []);

  const handleMediaQueryChange = (mediaQuery) => {
    if (mediaQuery.matches) {
      setIsSmallScreen(true);
    } else {
      setIsSmallScreen(false);
    }
  };

  const toggleNav = () => {
    setNavVisibility(!isNavVisible);
  };

  //Reset the app on local system
  const resetGame = (e) => {
    e.preventDefault();
    window.confirm(
      "Are you sure this can't be undone & all your previous history will be deleted!"
    );
    localStorage.removeItem("playerid");
    localStorage.removeItem("gameid");
    localStorage.removeItem("username");
    localStorage.removeItem("ticketid");

  };

  const [open, setOpen] = React.useState(false);
  const onCloseModal = () => {
    setOpen(false);
  };
  const onOpenModal = (e) => {
    e.preventDefault();
    setOpen(true);
  };

  return (
    <header className="Header">
      <Modal open={open} onClose={onCloseModal} center>
        <Rules function={onCloseModal} />
      </Modal>
      <Link to="/">
        <img src={tambolaWrite} className="Logo circle-img" alt="logo" />
      </Link>
      <CSSTransition
        in={!isSmallScreen || isNavVisible}
        timeout={350}
        classNames="NavAnimation"
        unmountOnExit
      >
        <nav className="Nav">
          <a href="/" onClick={(e) => onOpenModal(e)}>
            Rules
          </a>
          {/* <a href="/aboutus" onClick={(e) => e.preventDefault()}> */}
          <Link to="/aboutus">About Us</Link>

          {/* </a> */}
          {/* <a href="/aboutus" onClick={(e) => e.preventDefault()}> */}
          <Link to="/help">Help</Link>
          {/* </a> */}
          <button>
            <a href="#top" onClick={(e) => resetGame(e)}>
              Click here to Reset the app!
            </a>
          </button>
        </nav>
      </CSSTransition>
      <button onClick={toggleNav} className="Burger">
        &#9776;
      </button>
    </header>
  );
}
