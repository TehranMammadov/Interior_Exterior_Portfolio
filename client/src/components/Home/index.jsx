import React, { useEffect, useState } from "react";
import AboutLeyla from "./AboutLeyla";
import Contact from "../Contact";
import ExclusiveDesigns from "./ExclusiveDesigns";
import LeylaNaib from "./LeylaNaib";
import ReadMore from "./ReadMore";
import ViewAll from "./ViewAll";
import Loader from "../UI/Loader";
import axios from "axios";

const Home = ({ setHomeActive, homeActive }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [windowScrollY, setWindowScrollY] = useState(0);
  const windowHeight = window.innerHeight;
  const windowHeightHalf = window.innerHeight / 2;
  const body = document.body;
  let matchMedia = window.matchMedia("(max-width: 991px)").matches;

  window.addEventListener(
    "scroll",
    function () {
      setWindowScrollY(window.scrollY);
    },
    true
  );

  useEffect(() => {
    if (!homeActive) {
      setHomeActive(true);
    }
  }, [homeActive]);

  useEffect(() => {
    const header = document.querySelector("header");
    if (header.className.includes("header-white")) {
      header.classList.remove("header-white");
    }
  }, []);

  useEffect(() => {
    const header = document.querySelector("header");
    if (window.location.href.includes("")) {
      body.classList.add("background-color-white");
      if (windowScrollY < windowHeightHalf) {
        if (body.className) {
          body.className = "";
          body.classList.add("background-color-white");
        }
      } else if (
        windowScrollY > windowHeightHalf &&
        windowScrollY < windowHeightHalf + windowHeight
      ) {
        if (body.className) {
          body.className = "";
          body.classList.add("background-color-blue");
          if (matchMedia) {
            const section = document.querySelector(".view-all");
            section.style.backgroundColor = "#3e71f1";
          }
        }
      } else if (
        windowScrollY > windowHeightHalf + windowHeight &&
        windowScrollY < windowHeightHalf + 2 * windowHeight
      ) {
        if (body.className) {
          body.className = "";
          // background mobile ucun background if serti daxil edilmelidir
          body.classList.add("background-color-lightgreen");
          if (matchMedia) {
            const section = document.querySelector(".view-all");
            section.style.backgroundColor = "#99d4c2";
          }
        }
      } else if (
        windowScrollY > windowHeightHalf + 2 * windowHeight &&
        windowScrollY < windowHeightHalf + 3 * windowHeight
      ) {
        if (body.className) {
          body.className = "";
          body.classList.add("background-color-purple");
          if (matchMedia) {
            const section = document.querySelector(".view-all");
            section.style.backgroundColor = "transparent";
          }
        }
      } else if (
        windowScrollY > windowHeightHalf + 3 * windowHeight &&
        windowScrollY < windowHeightHalf * 2 + 4 * windowHeight
      ) {
        if (body.className) {
          body.className = "";
          body.classList.add("background-color-pink");
        }
      } else if (
        windowScrollY > windowHeightHalf + 4 * windowHeight &&
        windowScrollY < windowHeightHalf + 5 * windowHeight
      ) {
        if (body.className) {
          body.className = "";
          body.classList.add("background-color-white");
        }
      }
      return () => {
        body.className = "";
        header.className = "header";
      };
    }
  }, [windowScrollY]);
  // document.styleSheets[0].insertRule('body::-webkit-scrollbar-thumb {background: #a462c0 !important}', 0);

  // all home page components request
  const [aboutLeila, setAboutLeila] = useState([]);
  const [portfolioData, setPortfolioData] = useState([]);
  const [categoryNameData, setCategoryNameData] = useState([]);
  const [blogDataHome, setBlogDataHome] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_URL}/api/main`).then((res) => {
      setIsLoading(false);
      return setAboutLeila(res.data.result);
    });
    axios.get(`${process.env.REACT_APP_URL}/api/portfolio`).then((res) => {
      setIsLoading(false);
      return setPortfolioData(res.data.result);
    });
    axios.get(`${process.env.REACT_APP_URL}/api/blog`).then((res) => {
      setIsLoading(false);
      return setBlogDataHome(res.data.result.splice(0, 2));
    });
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <LeylaNaib aboutLeila={aboutLeila} />
          <AboutLeyla aboutLeila={aboutLeila} />
          <ViewAll portfolioData={portfolioData} />
          <ExclusiveDesigns
            portfolioData={portfolioData}
            categoryNameData={categoryNameData}
          />
          <ReadMore blogDataHome={blogDataHome} />
          <Contact />
        </>
      )}
    </>
  );
};

export default Home;
