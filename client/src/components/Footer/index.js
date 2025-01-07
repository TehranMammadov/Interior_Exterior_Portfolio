import React,{ useEffect, useRef } from "react";
import "./Footer.scss";

const Footer = () => {
  const footerRef = useRef(null);

  useEffect(() => {
    const footer = footerRef.current;
    if (
      window.location.href.includes("") ||
      window.location.href.includes("portfolio")
    ) {
      if (footer.className) {
        return () => {
          footer.className = "footer";
        };
      }
    } else if (
      window.location.href.includes("about") ||
      window.location.href.includes("blog") ||
      window.location.href.includes("service") || 
      window.location.href.includes("seminar")
    ) {
      if (footer.className) {
        return () => {
          footer.className = "footer footer-white";
        };
      }
    }
  }, []);

  return (
    <footer className="footer" ref={footerRef}>
      <div className="footer__social-media">
        <a
          target={"_blank"}
          href="https://www.instagram.com/leylanaibjabbarli/"
        >
          Instagram
        </a>
        <a
          target={"_blank"}
          href="https://www.youtube.com/channel/UCf_hfMzj_wZu07GOXWUpRfQ"
        >
          YouTube
        </a>
      </div>
      <div className="footer__policy">
        <p>
          <a target={"_blank"} href="https://claradix.com">
          desıgned by <u>claradıx</u>
          </a>
        </p>
        <p>&copy; 2025</p>
      </div>
    </footer>
  );
};

export default Footer;
