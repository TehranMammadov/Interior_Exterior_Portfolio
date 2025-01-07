import React, { useRef, useEffect } from "react";
import "./Loader.scss";
import giphy from '../../../assets/images/giphy.gif'

const Loader = () => {
  const loaderRef = useRef(null);
  useEffect(() => {
    const location = window.location.href.split("/");
    if (location[3] === '' || location[3] === 'seminar') {
      loaderRef.current.style.backgroundColor = "#FFFFFF";
    } else if (location[3] === 'blog') {
      loaderRef.current.style.backgroundColor = "#D66CA3";
    } else if (location[3] === 'portfolio') {
      loaderRef.current.style.backgroundColor = "#99D4C2";
    } else if (location[3] === 'about') {
      loaderRef.current.style.backgroundColor = "#3E71F1";
    } else if (location[3] === 'services') {
      loaderRef.current.style.backgroundColor = "#BC85D4";
    }
  }, []);

  return (
    <div className="loader" ref={loaderRef}>
      <div className="loader-img">
        <img src={giphy} alt="" />
      </div>
    </div>
  )
};

export default Loader;