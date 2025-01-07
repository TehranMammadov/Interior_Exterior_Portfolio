import React,{ useEffect, useState } from "react";
import "./Contact.scss";
import ContactForm from "./ContactForm";
import { useTranslation } from 'react-i18next'


const Contact = ({ homeActive, setHomeActive }) => {
  useEffect(() => {
    if (homeActive) {
      setHomeActive(false);
    }
  }, [homeActive]);

  useEffect(() => {
    if (window.location.href.includes("contact")) {
      const body = document.body;
      const header = body.querySelector("header");
      if (!body.className) {
        header.className = "header";
        body.classList.add("background-color-white");
        header.classList.add("background-color-white");
      }
      return () => {
        body.className = "";
        header.classList.remove("background-color-white");
      };
    }
  });
  let matchMedia = window.matchMedia("(max-width: 486px)").matches;
  const [isSent, setIsSent] = useState(false);
  const { t } = useTranslation();

  return (
    <section className="contact">
      {!isSent ? (
        <>
          <p className="contact__work-together">{t ('home.news-title')}</p>

          <div className="contact__details">
            <h1>{t ('home.news-title1')}</h1>
            <p className="contact__details__description">
            {t ('home.news-title2')}
            </p>
            <div className="contact__details__messagge-send-part">
              <ContactForm setIsSent={setIsSent} />
              <div className="contact__details__messagge-send-part__contact-info">
                <p>(+994 50) 994 91 51</p>
                {/* <p>high.interiordesignn@gmail.com</p> */}
              </div>
            </div>
            <div className="contact__details__social">
              <p> 
                <a target={"_blank"} href="https://www.instagram.com/leylanaibjabbarli/">INSTAGRAM</a>
              </p>
              <p>
                <a target={"_blank"} href="https://www.youtube.com/channel/UCf_hfMzj_wZu07GOXWUpRfQ">YOUTUBE</a>
              </p>
            </div>
          </div>
        </>
      ) : (
        <div style={{}} className="contact__details sent">
          <svg
            className="svg"
            width="74"
            height="67"
            viewBox="0 0 74 67"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M66.3049 18.2211L37 64.0981L7.69514 18.2211L66.3049 18.2211Z"
              stroke="#99D4C2"
              strokeWidth="3"
            />
            <path
              d="M49.0545 28.3606L27.75 61.9495L6.4455 28.3606L49.0545 28.3606Z"
              stroke="#99D4C2"
              strokeWidth="3"
            />
          </svg>

          <h1 className="h1">
          {t ('Contact.message')}
          </h1>
        </div>
      )}
    </section>
  );
};

export default Contact;
