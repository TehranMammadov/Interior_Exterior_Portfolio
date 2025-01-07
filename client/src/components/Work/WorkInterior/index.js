import React,{ useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import BreadCrumb from "../../BreadCrumb";
import InteriorContent from "./InteriorContent";
import InteriorMainImage from "./InteriorMainImage";
import Loader from "../../UI/Loader";
import InteriorImages from "./InteriorImages";

const WorkInterior = ({ homeActive, setHomeActive }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (homeActive) {
      setHomeActive(false);
    }
  }, [homeActive]);

  let { id } = useParams();
  const [work, setWork] = useState({});

  useEffect(() => {
    if (id) {
      axios.get(`${process.env.REACT_APP_URL}/api/portfolio/${id}`).then((res) => {
        setIsLoading(false);
        return setWork(res.data)
      });
    }
  }, [id]);

  useEffect(() => {
    const body = document.body;

    const header = document.querySelector("header");
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

  let matchMedia = window.matchMedia("(max-width: 991px)").matches;
  useEffect(() => {
    const viewButton = document.getElementById("view-button-id");
    if (!matchMedia && viewButton.className) {
      viewButton.classList.remove("hover");
    }
  });

  return (
    <>
      {isLoading ? <Loader /> : (
        <>
          <BreadCrumb title={work.response?.title}/>
          <InteriorMainImage work={work} />
          <InteriorContent work={work} />
          <InteriorImages work={work} />
        </>
      )}
    </>
  );
};

export default WorkInterior;
