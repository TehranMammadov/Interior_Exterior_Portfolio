import React, { useEffect, useState } from "react";
import "./AboutVideos.scss";
import axios from "axios";
import { useTranslation } from "react-i18next";
const AboutVideos = () => {
  const [aboutVideo, setAboutVideo] = useState([]);
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_URL}/api/video`).then((res) => {
      return setAboutVideo(res.data.result);
    });
  }, []);
  const { t } = useTranslation();
  return (
    <section className="about-videos">
      {aboutVideo && aboutVideo?.map((video, index) => (
        <div key={index} className="about-videos-player-container">
          <iframe
            src={`https://www.youtube.com/embed/${
              video && video.url.split("youtu.be/")[1]
            }`}
            frameBorder="0"
            title="Embedded Youtube"
          />
          <p>{video && video.description}</p>
          <a href={video.url} target="_blank">
            {t("about.videoSwitch.link")}
          </a>
        </div>
      ))}
    </section>
  );
};

export default AboutVideos;
