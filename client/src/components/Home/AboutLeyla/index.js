import "./AboutLeyla.scss";
import quoteIcon from "../../../assets/images/quote.png";
import triangle from "../../../assets/images/triangle-home.png";
import React, { useEffect } from "react";
import replaceBaseURL from "../../../utils/replaceurl";

const AboutLeyla = ({ aboutLeila }) => {
  useEffect(() => {
    console.log(aboutLeila)
  }, [aboutLeila])
  return (
    <section className="about-leila">
      <div className="about-leila__image">
        <img src={replaceBaseURL(aboutLeila[0] && aboutLeila[0]?.image[0]?.url)} alt="Leila Image" />
      </div>
      <div className="about-leila__description">
        <div className="about-leila__description__texts">
          <img src={quoteIcon} alt="" />
          <p>{aboutLeila[0] && aboutLeila[0]?.quote}</p>
        </div>
        <div className="about-leila__description__triangle">
          <div className="about-leila__description__triangle__image">
            <img src={triangle} alt="" />
          </div>
          <h1 className="about-leila__h1">{aboutLeila[0] && aboutLeila[0]?.title}</h1>
        </div>
      </div>
    </section>
  );
};

export default AboutLeyla;