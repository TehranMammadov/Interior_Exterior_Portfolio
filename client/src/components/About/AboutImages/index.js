import './AboutImages.scss';
import triangleImg from '../../../assets/images/big-triangle.png';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import React,{ useEffect, useRef } from 'react';
import replaceBaseURL from '../../../utils/replaceurl';

const AboutImages = ({ aboutData }) => {
    gsap.registerPlugin(ScrollTrigger);
    const rotateImage = useRef();

    useEffect(() => {
        gsap.to(
            rotateImage.current,
            {
                transform: "rotate(8deg)",
                duration: 0.2,
                scrollTrigger: {
                    trigger: "#rotate-img",
                    start: "top 70%",
                    scrub: false,
                },
            }
        )
    })

    return (
        <section className='about-images'>
            <div className='about-images__triangle'>
                <img src={triangleImg} alt="" />
            </div>
            {aboutData ?
                <>
                    <div className='about-images__main-img'>
                        <img src={replaceBaseURL(aboutData[0].content[0]?.image[0]?.url)} alt="" />
                    </div>
                    <div className='about-images__small-img'>
                        <div className='about-images__small-img__rotate' ref={rotateImage} id="rotate-img">
                            <img src={replaceBaseURL(aboutData[2].content[1]?.image[0]?.url)} alt="" />
                        </div>
                        {/* <p>{aboutContent[1]?.description}</p> */}
                    </div>
                    <div className='about-images__medium-img'>
                        <img src={replaceBaseURL(aboutData[2].content[2]?.image[0]?.url)} alt="" />
                        {/* <p>{aboutContent[2]?.description}</p> */}
                    </div>
                </>
                : ""
            }    
        </section>
    )
}

export default AboutImages;