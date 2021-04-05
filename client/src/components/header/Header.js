/* eslint-disable jsx-a11y/accessible-emoji */
import React, { useState, useEffect } from "react";
import "./Header.css";
import { CSSTransition } from "react-transition-group";

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

  //   Reset the app on local system
  const resetGame = () => {
    alert("Are You sure?");
    localStorage.removeItem("playerid");
    localStorage.removeItem("username");
  };

  return (
    <header className="Header">
      <img src="./logo192.png" className="Logo circle-img" alt="logo" />
      <CSSTransition
        in={!isSmallScreen || isNavVisible}
        timeout={350}
        classNames="NavAnimation"
        unmountOnExit
      >
        <nav className="Nav">
          <a href="/">Home</a>
          <a href="/">About Us</a>
          <a href="/">Help</a>
          <button>
            <a href="#top" onClick={() => resetGame()}>Click here to Reset the app!</a>
          </button>
        </nav>
      </CSSTransition>
      <button onClick={toggleNav} className="Burger">
        &#9776;
      </button>
    </header>
  );
}
