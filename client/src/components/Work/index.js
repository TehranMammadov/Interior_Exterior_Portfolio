import React, { useEffect, useState } from "react";
import WorkCards from "./WorkCards";
import BreadCrumb from "../BreadCrumb";
import axios from "axios";
import Loader from "../UI/Loader";

const Work = ({ homeActive, setHomeActive }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [workData, setWorkData] = useState([]);
  let matchMedia = window.matchMedia("(max-width: 991px)").matches;

  useEffect(() => {
    if (homeActive) {
      setHomeActive(false);
    }
  }, [homeActive]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_URL}/api/portfolio`)
      .then((res) => {
        setIsLoading(false)
        return setWorkData(res.data.result)
      });
  }, []);

  useEffect(() => {
    const viewButton = document.getElementById("view-button-id");
    if (!matchMedia && viewButton.className) {
      viewButton.classList.remove("hover");
    }
  });

  useEffect(() => {
    const body = document.body;
    const header = body.querySelector("header");
    const breadCrumb = document.getElementsByClassName("bread-crumb")[0];
    if (!body.className) {
      header.className = "header";

      body.classList.add("background-color-lightgreen");
      header.classList.add("background-color-lightgreen");
      if (breadCrumb) breadCrumb.classList.add("bread-crumb-black");
    }
    return () => {
      body.className = "";
      header.classList.remove("background-color-lightgreen");
      if (breadCrumb) breadCrumb.classList.remove("bread-crumb-black");
    };
  });

  return (
    <>
      {isLoading ? <Loader /> : (
        <>
          <BreadCrumb />
          <WorkCards workData={workData} />
        </>
      )}
    </>
  );
};

export default Work;