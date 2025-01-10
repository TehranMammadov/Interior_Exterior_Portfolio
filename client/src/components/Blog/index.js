import React,{ useEffect, useState } from "react";
import BreadCrumb from "../BreadCrumb";
import axios from "axios";
import BlogNews from "./BlogItems";
import Loader from "../UI/Loader";

const Blog = ({ homeActive, setHomeActive }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [blogData, setBlogData] = useState([]);
  let matchMedia = window.matchMedia("(max-width: 991px)").matches;

  useEffect(() => {
    if (homeActive) {
      setHomeActive(false);
    }
  }, [homeActive]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_URL}/api/blog`).then((res) => {
      setIsLoading(false);
      return setBlogData(res.data.result);
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
    const footer = document.querySelector("footer");
    const header = document.querySelector("header");
    const u = document.querySelector("u");

    if (!body.className) {
      header.className = "header";
      body.classList.add("background-color-pink");
      header.classList.add("background-color-pink");
      header.classList.add("header-white");
      footer.classList.add("footer-white");
      u.classList.add("u-white");
    }
    return () => {
      body.className = "";
      header.classList.remove("background-color-pink");
      footer.classList.remove("footer-white");
      u.classList.remove("u-white");
    };
  });

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <BreadCrumb />
          <BlogNews blogData={blogData} />
        </>
      )}
    </>
  );
};

export default Blog;
