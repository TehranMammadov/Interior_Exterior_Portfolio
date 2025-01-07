import React,{ useEffect } from "react";
import BreadCrumb from "../BreadCrumb";
import Advantages from "./AllServices/Advantages";
import Guarantee from "./AllServices/Guarantee";
import Insurance from "./AllServices/Insurance";
import RepairStages from "./AllServices/RepairStages";
import RepairStagesFields from "./AllServices/RepairStages/RepairStagesFields";
import './Service.scss';

const Service = ({ homeActive, setHomeActive }) => {
  useEffect(() => {
    if (homeActive) {
      setHomeActive(false);
    }
  }, [homeActive])

  useEffect(() => {
    const body = document.body;
    const header = body.querySelector("header");
    const footer = document.querySelector("footer");
    if (!body.className) {
      header.className = "header";
      body.classList.add("background-color-purple");
      header.classList.add("background-color-purple");
      header.classList.add("header-white");
      footer.classList.add("footer-white");
    }
    return () => {
      body.className = "";
      header.classList.remove("background-color-purple");
      header.classList.remove("header-white");
      footer.classList.remove("footer-white");
    };
  });

  let matchMedia = window.matchMedia("(max-width: 991px)").matches;
  useEffect(() => {
    const viewButton = document.getElementById("view-button-id");
    const mousecursor = document.querySelector(".app-cursor");
    if (!matchMedia && viewButton.className) {
      viewButton.classList.remove("hover");
    }
    if(mousecursor?.className.includes('pointer')) {
      mousecursor.classList.remove("pointer");
    }
  });

  return (
    <>
      <BreadCrumb />
      <section className="service">
        <div className="service-main">
          <h1 className="service-main__title">Tikinti</h1>
          <div className="service-main__all-fields">
            <Advantages />
            <Guarantee />
            <Insurance />
            <RepairStages />
          </div>
        </div>
        <RepairStagesFields />
      </section>
    </>
  );
};

export default Service;