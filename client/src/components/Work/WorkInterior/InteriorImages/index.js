import React,{ useEffect, useRef, useState } from "react";
import "./InteriorImages.scss";
import replaceBaseURL from "../../../../utils/replaceurl";

const InteriorImages = ({ work }) => {
  const header = document.querySelector("header");
  const [windowHeight, setWindowHeight] = useState(window.innerHeight - header.clientHeight);
  const [activeClick, setActiveClick] = useState(null);
  const modalRef = useRef(null);
  const imgRef = useRef(null);

  header.addEventListener('click', () => {
    if(activeClick) {
      handleChancel();
    }
  })

  function handleImageClick (e) {
    const cloneEl = e.target.children[0].cloneNode(true);
    imgRef.current.appendChild(cloneEl);
    setActiveClick(true);
    document.body.style.overflow = "hidden";
    modalRef.current.style.display = 'block';
  }

  function handleChancel () {
    document.body.style.overflow = "scroll";
    modalRef.current.style.display = 'none';
    imgRef.current.innerHTML = "";
    setActiveClick(false);
  }

  useEffect(() => {
    modalRef.current.style.height = `${windowHeight}px`;
    imgRef.current.style.height = `${windowHeight}px`;
  }, [windowHeight])

  window.addEventListener('resize', () => {
      setWindowHeight(window.innerHeight - header.clientHeight);
  })

  console.log(work)

  return (
    <section className="interior-images">
      {work.response && work.response.footerImage?.map((sliderImg, index) => (
        <div key={index} className="image-element" onClick={handleImageClick} >
          <img src={replaceBaseURL(sliderImg.url)} alt="" />
        </div>
      ))}
      <div className="opened-img-modal" ref={modalRef} >
        <div className="clicked-img" ref={imgRef}></div>
        <svg onClick={handleChancel} width="40px" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
          <path fill="white" d="M24,42a2,2,0,0,1-1.41-3.42l16-16a2,2,0,0,1,2.83,2.83l-16,16A2,2,0,0,1,24,42Z"/>
          <path fill="white" d="M40,42a2,2,0,0,1-1.42-.59l-16-16a2,2,0,0,1,2.83-2.83l16,16A2,2,0,0,1,40,42Z"/>
          <path fill="white" d="M45.67,57.68H18.33a2,2,0,0,1-1.73-1L2.93,33a2,2,0,0,1,0-2L16.6,7.32a2,2,0,0,1,1.73-1H45.67a2,2,0,0,1,1.73,1L61.07,31a2,2,0,0,1,0,2l-5.34,9.26a2,2,0,0,1-3.47-2L57,32,44.52,10.32h-25L7,32,19.48,53.68h25L47,49.41a2,2,0,0,1,3.46,2l-3,5.27A2,2,0,0,1,45.67,57.68Z"/>
        </svg>
      </div>
    </section>
  );
};

export default InteriorImages;
