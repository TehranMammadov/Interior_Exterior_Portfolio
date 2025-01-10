import React, { useState, useEffect } from "react";
import BreadCrumb from "../BreadCrumb";
import AboutImages from "./AboutImages";
import LeylaAbout from "./LeylaAbout";
import Loader from "../UI/Loader";
import axios from "axios";
import AboutVideos from "./AboutVideos";

const About = ({ homeActive, setHomeActive }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (homeActive) {
      setHomeActive(false);
    }
  }, [homeActive]);

  useEffect(() => {
    const body = document.body;
    const header = document.querySelector("header");
    const footer = document.querySelector("footer");
    const u = document.querySelector("u");
    if (!body.className) {
      header.className = "header";
      body.classList.add("background-color-blue");
      header.classList.add("background-color-blue");
      header.classList.add("header-white");
      footer.classList.add("footer-white");
      u.classList.add("u-white");
    }
    return () => {
      body.className = "";
      header.className = "header";
      footer.classList.remove("footer-white");
      u.classList.remove("u-white");
    };
  });

  const [aboutData, setAboutData] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_URL}/api/about`).then((res) => {
      setIsLoading(false);
      return setAboutData(res.data.result);
    });
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <BreadCrumb />
          <LeylaAbout aboutData={aboutData} />
          <AboutImages aboutData={aboutData} />
          <AboutVideos />
        </>
      )}
    </>
  );
};

export default About;
