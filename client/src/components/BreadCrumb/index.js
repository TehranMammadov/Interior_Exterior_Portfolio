import "./BreadCrumb.scss";
import React,{ Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTranslation } from 'react-i18next'

const BreadCrumb = ({title=''}) => {
  let matchMedia = window.matchMedia("(max-width: 991px)").matches;
  const { t } = useTranslation();
  const [countCrumb2, setcountCrumb2] = useState(false);
  const [countCrumb3, setcountCrumb3] = useState(false);

  let location = useLocation();
  let pathnames = location.pathname.split("/");

  useEffect(() => {
    if (pathnames.length === 2) {
      setcountCrumb2(true);
    } else if (pathnames.length >= 3) {
      setcountCrumb3(true);
    }
  }, [pathnames.length]);

  return !matchMedia ? (
    <section className="bread-crumb">
      <Link to="/">{t('header.home')} &sdot;</Link>
      {countCrumb2 ? (
        <a>{pathnames[1]} &sdot;</a>
      ) : countCrumb3 ? (
        <>
          <Link to={`/${pathnames[1]}`}>{pathnames[1]} &sdot;</Link>
          {
            title===''?(
              <a>{pathnames[2]} &sdot;</a>
            ):(
              <a>{title} &sdot;</a>
            )
          }
        </>
      ) : (
        ""
      )}
    </section>
    
  ) : (
    <></>
  );
};

export default BreadCrumb;
