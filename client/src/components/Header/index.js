import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Logo from "../../assets/images/logo.png";
import LogoWhite from "../../assets/images/logo-signature-white.png";
import MultiLanguageMenu from "./MultiLanguageMenu";
import { useTranslation } from 'react-i18next'
import "./Header.scss";
import HeaderJSON from "./Header.json";

const Header = ({ onMouseEnter, onMouseLeave, homeActive }) => {

  const { t } = useTranslation();
  const navigate = useNavigate();
  const [header] = useState(HeaderJSON.items);
  const headerContainer = useRef(null);
  const windowHeight = window.innerHeight;
  const windowHeightHalf = window.innerHeight / 2;

  const [windowScrollY, setWindowScrollY] = useState(0);
  window.addEventListener(
    "scroll",
    function () {
      setWindowScrollY(window.scrollY);
    },
    true
  );

  useEffect(() => {
    const headerColor = headerContainer.current;
    if (window.location.href.includes("") && homeActive) {
      if (windowScrollY < windowHeightHalf) {
        if (headerContainer.current.className) {
          headerColor.className = "header";
          headerContainer.current.classList.remove("header-white");
        }
        headerContainer.current.classList.add("background-color-white");
      } else if (
        windowScrollY > windowHeightHalf &&
        windowScrollY < windowHeightHalf + windowHeight
      ) {
        if (headerContainer.current.className) {
          headerColor.className = "header";
          headerContainer.current.classList.add("header-white");
        }
        headerContainer.current.classList.add("background-color-blue");
      } else if (
        windowScrollY > windowHeightHalf + windowHeight &&
        windowScrollY < windowHeightHalf + 2 * windowHeight
      ) {
        if (headerContainer.current.className) {
          headerColor.className = "header";

          headerContainer.current.classList.remove("header-white");
        }
        headerContainer.current.className = "header";
        headerContainer.current.classList.add("background-color-lightgreen");
      } else if (
        windowScrollY > windowHeightHalf + 2 * windowHeight &&
        windowScrollY < windowHeightHalf + 3 * windowHeight
      ) {
        if (headerContainer.current.className) {
          headerColor.className = "header";
        }
        headerContainer.current.classList.add("header-white");
        headerContainer.current.classList.add("background-color-purple");
      } else if (
        windowScrollY > windowHeightHalf + 3 * windowHeight &&
        windowScrollY < windowHeightHalf * 2 + 4 * windowHeight
      ) {
        if (headerContainer.current.className) {
          headerColor.className = "header";
        }
        headerContainer.current.classList.add("header-white");
        headerContainer.current.classList.add("background-color-pink");
      } else if (
        windowScrollY > windowHeightHalf + 4 * windowHeight &&
        windowScrollY < windowHeightHalf + 5 * windowHeight
      ) {
        if (headerContainer.current.className) {
          headerColor.className = "header";
          headerContainer.current.classList.remove("header-white");
        }
      }
    }
  }, [windowScrollY]);
  let matchMedia = window.matchMedia("(max-width: 991px)").matches;

  const [panel, setPanel] = useState(false);
  const headerPanelHandler = () => {
    setPanel(true);
    document.body.style.overflowY = "hidden";
  };
  const headerPanelRemoveHandler = () => {
    setPanel(false);
    document.body.style.overflowY = null;
  };

  const logoClickHandler = () => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
    navigate("/");
  };

  return (
    <header className="header" ref={headerContainer}>
      {matchMedia ? (
        <>
          <div onClick={logoClickHandler} className="logo-mobile">
            <img
              src={Logo}
              className="logo-dark-mobile"
              alt="mobile_logo"
            />
            <img
              src={LogoWhite}
              className="logo-white-mobile"
              alt="mobile_logo"
            />
          </div>
          <div className="header__nav__mobile">
            <button onClick={headerPanelHandler} className="btn">
              Menu
            </button>
          </div>
          <div className={panel ? "header__panel active" : "header__panel"}>
            <button className="close-btn " onClick={headerPanelRemoveHandler}>
              X
            </button>
            <ul className="navigation">
              <li>
                <Link onClick={headerPanelRemoveHandler} to="about">
            {t ('header.about')} 
                </Link>
              </li>
              <li>
                <Link onClick={headerPanelRemoveHandler} to="services">
                  Service
                </Link>
              </li>
              <li>
                <Link onClick={headerPanelRemoveHandler} to="portfolio">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link onClick={headerPanelRemoveHandler} to="blog">
                  Bloq
                </Link>
              </li>
              <li>
                <Link onClick={headerPanelRemoveHandler} to="contact">
                  Əlaqə
                </Link>
              </li>
              <MultiLanguageMenu/> 
            </ul>
          </div>
        </>
      ) : (
        <>
          <div className="logo" onClick={logoClickHandler}>
            <img className="logo-black" src={Logo} alt="logo" />
            <img className="logo-white" src={LogoWhite} alt="logo" />
          </div>
          <nav className="header__nav">
             <ul className="navigation">
              <li>
                <Link to="about">
            {t ('header.about')} 
                </Link>
              </li>
              <li>
                <Link to="services">
                 {t ('header.service')}
                </Link>
              </li>
              <li>
                <Link to="portfolio">
                {t ('header.portfolio')}
                </Link>
              </li>
              <li>
                <Link to="blog">
                {t ('header.bloq')}
                </Link>
              </li>
              <li>
                <Link to="contact">
                {t ('header.contact')}
                </Link>
              </li>
                <MultiLanguageMenu/> 
            </ul>
          </nav>
        </>
      )}
    </header>
  );
};

export default Header;
