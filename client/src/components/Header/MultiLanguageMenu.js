import React, { memo, useEffect, useState } from "react";
import dropdown from "../../assets/images/dropdown.png";
import { Link } from "react-router-dom";
import i18next from "i18next";
import Cookies from "js-cookie";
import { useTranslation } from "react-i18next";
import { BroadcastChannel } from "broadcast-channel";
import './Header.scss'

const MultiLanguageMenu = () => {

  let mediaQuery = window.matchMedia("(min-width: 991px)").matches;
  const broadcastChannel = new BroadcastChannel("language-changed");
  const [langChanged, setLangChanged] = useState(null);
  const { t } = useTranslation(),
    [dropDownActive, setDropDownActive] = useState(false),
    language = Cookies.get("i18next"),
    navbarLiDiv = document.getElementsByClassName("multiLanguage-div"),
    navbarLiDropdown = document.getElementsByClassName(
      "multiLanguage-dropdown"
    );

  useEffect(() => {
    if (langChanged) {
      i18next.changeLanguage(langChanged);
    }
  }, [langChanged]);

  const changeLanguageHandler = (e) => {
    const newLang = e.target.innerText.toLowerCase();

    if (language !== newLang) {
      window.location.reload(true);
      broadcastChannel.postMessage("language changed");
      setLangChanged(newLang);
      // i18next.changeLanguage(newLang);
    }
  };

  const onClickHandler = () => {
    // if (!mediaQuery) {
    setDropDownActive(!dropDownActive);
    if (dropDownActive) {
      navbarLiDiv[0].classList.remove("active-dropdown");
      navbarLiDropdown[0].style.transform = "rotateX(360deg)";
    } else {
      navbarLiDiv[0].classList.add("active-dropdown");
      navbarLiDropdown[0].style.transform = "rotateX(180deg)";
    }
    // }
  };


  return (
    <li
      className="multiLanguage"
      onClick={onClickHandler}
    >
      <Link to="#">
        {t("header.lng")}{" "}
        <img
        alt=""
          className="multiLanguage-dropdown"
          id="mobile-dropdown"
          src={dropdown}
        />
      </Link>
      <div className="multiLanguage-div lang-dropdown-div">
        <div className="multiLanguage-div-inner" id="inner-div-language">
          <Link to="#" onClick={(e) => changeLanguageHandler(e)}>
            <p>az</p>
          </Link>
          <Link to="#" onClick={(e) => changeLanguageHandler(e)}>
            <p>en</p>
          </Link>
        </div>
      </div>
    </li>
  );
};

export default MultiLanguageMenu;
