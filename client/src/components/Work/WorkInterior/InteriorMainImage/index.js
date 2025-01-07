import React from "react";
import "./InteriorMainImage.scss";
import { useTranslation } from 'react-i18next'
import replaceBaseURL from "../../../../utils/replaceurl";

const InteriorMainImage = ({ work }) => {
  const { t } = useTranslation();
  return (
    <section className="main-img-container">
      <aside className="details-aside">
        <h2> {t ('portfolio.text')}</h2>
        {work.response && work.response?.moduleTitle?.map((e, index) => (
          <div className="details-container" key={index}>
            <span>{work.response?.moduleTitle[index]}</span>
            <h3>{work.response?.moduleDescription[index]}</h3>
          </div>
        ))}
      </aside>
      <aside className="image-aside">
        <img src={replaceBaseURL(work.response && work.response?.posterImage[0]?.url)} alt="" />
        <p>{work.response && work.response?.title}</p>
      </aside>
    </section>
  );
};

export default InteriorMainImage;