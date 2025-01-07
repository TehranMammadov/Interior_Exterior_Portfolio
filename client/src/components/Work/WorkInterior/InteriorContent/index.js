import React from "react";
import "./InteriorContent.scss";


const InteriorContent = ({ work }) => {
  return (
    <section className="interior-content">
      <p>{work.response && work?.response?.description}</p>
    </section>
  );
};

export default InteriorContent;