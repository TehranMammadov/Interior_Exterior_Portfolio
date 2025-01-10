import React,{ useEffect, useState } from "react";
import "./ExclusiveDesigns.scss";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next'
import replaceBaseURL from "../../../utils/replaceurl";

const ExclusiveDesigns = ({ portfolioData, categoryNameData }) => {
  let matchMedia = window.matchMedia("(max-width: 991px)").matches;
  const [cardIndex, setCardIndex] = useState();
  const { t } = useTranslation();
  const onViewButton = () => {
    if (!matchMedia) {
      document.getElementById("view-button-id").classList.add("hover");
      const element = document.querySelector(".hover");
      if (element) {
        const mousecursor = document.querySelector(".app-cursor");
        mousecursor.classList.add("pointer");

        if (cardIndex % 2 === 0) {
          document
            .getElementById("view-button-id")
            .classList.add("white-view-button");
        } else if (cardIndex % 2 !== 0) {
          document
            .getElementById("view-button-id")
            .classList.remove("white-view-button");
        }
      }
    }
  };
  const offViewButton = () => {
    const viewButton = document.getElementById("view-button-id");
    const mousecursor = document.querySelector(".app-cursor");
    if(viewButton?.className.includes("hover")) {
      viewButton.classList.remove("hover");
    }
    if(mousecursor?.className.includes('pointer')) {
      mousecursor.classList.remove("pointer");
    }
  };

  useEffect(() => {
    console.log(portfolioData)
  }, [portfolioData])

  return (
    <section className="exclusive-design">
      <div className="exclusive-design__container">
        <Link
          to={`/portfolio/interior/${portfolioData && portfolioData[0]?._id}`}
          onMouseMove={() => (onViewButton(), setCardIndex(0))}
          onMouseOut={offViewButton}
        >
          <div className="exclusive-design__container__card-item">
            <div className="exclusive-design__container__card-item__title-and-desc">
              <h1>{t ('home.placeholder1')}</h1>
            </div>
            <div className="exclusive-design__container__card-item__image">
              <img
                src={portfolioData && portfolioData[0]?.posterImage[0]?.url.replace(process.env.REACT_APP_URL_PROD, process.env.REACT_APP_URL_DEV)}
                alt=""
              />
            </div>
          </div>
        </Link>
        <Link
          to={`/portfolio/interior/${portfolioData && portfolioData[1]?._id}`}
          // onClick={(e) => {
          //   e.preventDefault();
          // }}
          onMouseMove={() => (onViewButton(), setCardIndex(1))}
          onMouseOut={offViewButton}
        >
          <div className="exclusive-design__container__card-item">
            <div className="exclusive-design__container__card-item__title-and-desc">
              <h1>{t ('home.placeholder2')}</h1>
            </div>
            <div className="exclusive-design__container__card-item__image">
              <img
                src={portfolioData && portfolioData[1]?.posterImage[0]?.url.replace(process.env.REACT_APP_URL_PROD, process.env.REACT_APP_URL_DEV)}
                alt=""
              />
            </div>
          </div>
        </Link>
        <Link
          to={`/portfolio/interior/${portfolioData && portfolioData[13]?._id}`}
          // onClick={(e) => {
          //   e.preventDefault();
          // }}
          onMouseMove={() => (onViewButton(), setCardIndex(2))}
          onMouseOut={offViewButton}
        >
          <div className="exclusive-design__container__card-item">
            <div className="exclusive-design__container__card-item__title-and-desc">
              <h1>{t ('home.placeholder3')}</h1>
            </div>
            <div className="exclusive-design__container__card-item__image">
              <img
                src={portfolioData && portfolioData[13]?.posterImage[0]?.url.replace(process.env.REACT_APP_URL_PROD, process.env.REACT_APP_URL_DEV)}
                alt=""
              />
            </div>
          </div>
        </Link>
        <Link
          to={`/portfolio/interior/${portfolioData && portfolioData[17]?._id}`}
          onMouseMove={() => (onViewButton(), setCardIndex(3))}
          onMouseOut={offViewButton}
        >
          <div className="exclusive-design__container__card-item">
            <div className="exclusive-design__container__card-item__title-and-desc">
              <h1>{t ('home.placeholder4')}</h1>
            </div>
            <div className="exclusive-design__container__card-item__image">
              <img
                src={portfolioData && portfolioData[17]?.posterImage[0]?.url.replace(process.env.REACT_APP_URL_PROD, process.env.REACT_APP_URL_DEV)}
                alt=""
              />
            </div>
          </div>
        </Link>
        <Link
          to={`/portfolio/interior/${portfolioData && portfolioData[11]?._id}`}
          // onClick={(e) => {
          //   e.preventDefault();
          // }}
          onMouseMove={() => (onViewButton(), setCardIndex(4))}
          onMouseOut={offViewButton}
        >
          <div className="exclusive-design__container__card-item">
            <div className="exclusive-design__container__card-item__title-and-desc">
              <h1>{t ('home.placeholder5')}</h1>
            </div>
            <div className="exclusive-design__container__card-item__image">
              <img
                src={replaceBaseURL(portfolioData && portfolioData[11]?.posterImage[0]?.url)}
                alt=""
              />
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
};

export default ExclusiveDesigns;