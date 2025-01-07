import React,{ useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import BreadCrumb from "../../BreadCrumb";
import axios from "axios";
import Loader from "../../UI/Loader";
import "./BlogInterior.scss";
import { useTranslation } from "react-i18next";
import replaceBaseURL from "../../../utils/replaceurl";

const BlogInterior = ({ homeActive, setHomeActive }) => {
  const [isLoading, setIsLoading] = useState(true);

  const { t } = useTranslation();

  useEffect(() => {
    if (homeActive) {
      setHomeActive(false);
    }
  }, [homeActive]);

  let { id } = useParams();
  const [blog, setBlog] = useState({});

  useEffect(() => {
    if (id) {
      axios.get(`${process.env.REACT_APP_URL}/api/blog/${id}`).then((res) => {
        setIsLoading(false);
        return setBlog(res.data.result);
      });
    }
  }, [id]);

  useEffect(() => {
    const body = document.body;
    const header = document.querySelector("header");
    const footer = document.querySelector("footer");
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
      header.className = "header";
      footer.classList.remove("footer-white");
      u.classList.remove("u-white");
    };
  });

  let matchMedia = window.matchMedia("(max-width: 991px)").matches;
  useEffect(() => {
    const viewButton = document.getElementById("view-button-id");
    if (!matchMedia && viewButton.className) {
      viewButton.classList.remove("hover");
    }
  });

  const enterParagraph = document.querySelector("#enter-paragraph");
  const paragraph1 = document.querySelector("#paragraph-1");
  const paragraph2 = document.querySelector("#paragraph-2");
  const paragraph3 = document.querySelector("#paragraph-3");

  const [singleLetterCount, setSingleLetterCount] = useState([]);
  const [filteredLetterCount, setFilteredLetterCount] = useState([]);
  const [singleWords, setSingleWords] = useState([]);

  useEffect(() => {
    if (singleLetterCount && enterParagraph) {
      for (let i = 0; i < singleWords?.length; i++) {
        addedCharacter(singleWords[i]);
      }
      return;
    }
  }, [singleLetterCount]);

  function addedCharacter(wordCharacter) {
    if (enterParagraph?.textContent?.split("").length < 500) {
      enterParagraph.textContent += " " + wordCharacter;
      return;
    } else if (paragraph1?.textContent?.split("").length < 500) {
      paragraph1.textContent += " " + wordCharacter;
      return;
    } else if (paragraph2?.textContent?.split("").length < 500) {
      paragraph2.textContent += " " + wordCharacter;
      return;
    } else {
      paragraph3.textContent += " " + wordCharacter;
      // return;
    }
  }

  // filtered singleLetterCount due to space and created new filtered array
  useEffect(() => {
    if (singleLetterCount) {
      const filtered = singleLetterCount?.filter(function (value) {
        return value !== " ";
      });
      if (filtered.length !== 0) {
        setFilteredLetterCount(filtered);
        return;
      }
      return;
    }
  }, [singleLetterCount]);

  // raw description splitted due to space
  useEffect(() => {
    if (blog) {
      setSingleLetterCount(blog?.description?.split(""));
      setSingleWords(blog?.description?.split(" "));
      return;
    }
  }, [blog]);

  // removed paragraph due to letter's count
  // NOTE: paragraphs' display is block by default
  useEffect(() => {
    if (
      filteredLetterCount?.length < 500 ||
      filteredLetterCount?.length === 500
    ) {
      if (paragraph1 && paragraph2 && paragraph3) {
        paragraph1.style.display = "none";
        paragraph2.style.display = "none";
        paragraph3.style.display = "none";
        return;
      }
    } else if (
      filteredLetterCount?.length < 1000 ||
      filteredLetterCount?.length === 1000
    ) {
      if (paragraph2 && paragraph3) {
        paragraph2.style.display = "none";
        paragraph3.style.display = "none";
        return;
      }
    } else if (
      filteredLetterCount?.length < 1500 ||
      filteredLetterCount?.length === 1500
    ) {
      if (paragraph3) {
        paragraph3.style.display = "none";
        return;
      }
    }
  }, [filteredLetterCount]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <BreadCrumb title={blog?.title}/>
          <section className="blog-interior">
            <div className="blog-interior__blog-details-container">
              <h1 className="blog-interior__blog-details-container__title">
                {blog && blog?.title}<br/>
                <a href={`${blog.content}`} target="_blank" style={{
                  color: "white",
                  fontSize: "1.5rem",
                  fontWeight: "bold",
                  textDecoration: "underline",
                  marginTop: "1rem"
                }}>{t('bloq.content')}</a>
              </h1>
              <div className="blog-interior__blog-details-container__image-and-image-detail">
                <p id="enter-paragraph"></p>
                <div className="img-cont">
                  <img
                    src={replaceBaseURL(blog?.image && blog.image[0]?.url)}
                    alt="blog_image"
                  />
                </div>
              </div>
              <div className="blog-interior__blog-details-container__author-article">
                <p className="paragraph part-first" id="paragraph-1"></p>
                <p className="paragraph part-second" id="paragraph-2"></p>
              </div>
              <div className="blog-interior__blog-details-container__article-end">
                <p className="paragraph part-last" id="paragraph-3"></p>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default BlogInterior;
