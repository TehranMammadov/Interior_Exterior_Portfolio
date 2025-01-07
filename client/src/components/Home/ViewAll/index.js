import React,{ useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./ViewAll.scss";
import { useTranslation } from 'react-i18next'
import replaceBaseURL from "../../../utils/replaceurl";

const ViewAll = ({ portfolioDataHome }) => {
  const [valueData, setValueData] = useState(0);
  const [cardIndex, setCardIndex] = useState();
  const imageContainer = useRef();
  const inputRangeRef = useRef();
  const { t } = useTranslation();

  let matchMedia = window.matchMedia("(max-width: 991px)").matches;

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

  const onChangeInput = (event) => {
    const container = imageContainer.current;
    container.scrollTop = Number(event.target.value);
  };
  const onScrollHandler = (event) => {
    const container = imageContainer.current;
    const input = inputRangeRef.current;
    let b = container.scrollHeight - container.clientHeight;
    input.setAttribute("max", b);
    let a = container.scrollTop;
    setValueData(a);
  };
  const onMouseOverFunc = (event) => {
    const element = event.target;
    if (element) {
      const mousecursor = document.querySelector(".app-cursor");
      mousecursor.classList.add("pointer");
    }
  };
  const onMouseOutFunc = (event) => {
    const element = event.target;
    if (element) {
      const mousecursor = document.querySelector(".app-cursor");
      mousecursor.classList.remove("pointer");
    }
  };

  console.log(portfolioDataHome)

  return (

    <section className="view-all">
      <div className="view-all__title">
        {!matchMedia ? <p>{t('home.banner-btn')}</p> : <p>{t('home.news-title3')}</p>}
        <Link to="/portfolio">
          <div>
            <svg viewBox="0 0 57 12" xmlns="http://www.w3.org/2000/svg">
              <path d="M56.5303 6.53034C56.8232 6.23744 56.8232 5.76257 56.5303 5.46967L51.7574 0.696704C51.4645 0.40381 50.9896 0.40381 50.6967 0.696704C50.4038 0.989597 50.4038 1.46447 50.6967 1.75736L54.9393 6L50.6967 10.2426C50.4038 10.5355 50.4038 11.0104 50.6967 11.3033C50.9896 11.5962 51.4645 11.5962 51.7574 11.3033L56.5303 6.53034ZM-6.55671e-08 6.75L56 6.75L56 5.25L6.55671e-08 5.25L-6.55671e-08 6.75Z" />
            </svg>
          </div>
        </Link>
      </div>
      <div className="view-all__images-section">
        <div
          className="view-all__images-section__cards"
          onScroll={onScrollHandler}
          ref={imageContainer}
        >
          {portfolioDataHome &&
            portfolioDataHome?.map((item, index) => (
              <Link
                to={`/portfolio/interior/${item._id}`}
                key={index}
                onMouseMove={() => (onViewButton(), setCardIndex(index))}
                onMouseOut={offViewButton}
                onClick={offViewButton}
              >
                <div className="view-all__images-section__cards__card-item">
                  <div className="view-all__images-section__cards__card-item__image">
                    <img
                      src={replaceBaseURL(item.posterImage && item?.posterImage[0]?.url)}
                      alt="background images"
                    />
                  </div>
                  {matchMedia ? (
                    <div className="view-all__images-section__cards__card-item__product-name">
                      <p>{item.title}</p>
                      <span>
                        <svg
                          width="27"
                          height="12"
                          viewBox="0 0 27 12"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M26.5303 6.53033C26.8232 6.23744 26.8232 5.76257 26.5303 5.46967L21.7574 0.696701C21.4645 0.403808 20.9896 0.403808 20.6967 0.696701C20.4038 0.989594 20.4038 1.46447 20.6967 1.75736L24.9393 6L20.6967 10.2426C20.4038 10.5355 20.4038 11.0104 20.6967 11.3033C20.9896 11.5962 21.4645 11.5962 21.7574 11.3033L26.5303 6.53033ZM-6.55671e-08 6.75L26 6.75L26 5.25L6.55671e-08 5.25L-6.55671e-08 6.75Z"
                            fill="#151515"
                          />
                        </svg>
                      </span>
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              </Link>
            ))}
        </div>
        <div className="view-all__images-section__scroll-card-line">
          <input
            type="range"
            ref={inputRangeRef}
            onChange={onChangeInput}
            onMouseOver={onMouseOverFunc}
            onMouseOut={onMouseOutFunc}
            min="0"
            max={100}
            value={valueData}
          />
        </div>
      </div>
    </section>
  );
};

export default ViewAll;
