import React, {useEffect} from "react";
import { Link, useNavigate } from 'react-router-dom'
import Breadcrumb from "../Breadcrumb";
import Sidebar from '../Sidebar'
import Header from '../Header'
import "../../assets/css/About/About.css";
const About = () => {

  const token = localStorage.getItem("$2a$10$ipcxyA96qc1pdz9r1IPYf.DJFQGuJpWXRyBuCEbyRKMl6")
  const refresh = localStorage.getItem("DJFQGuJpWXRyBuCEbyRKMl6$2a$10$ipcxyA96qc1pdz9r1IPYf")

  const navigate = useNavigate();

  useEffect(() => {
    if (!token && token == null) {
      navigate("/login")
    }
  }, [token])

  return (
    <section className="about-container">
      <Sidebar />
      <Header />
      <Breadcrumb pageName={"Haqqımızda"} />
      <section className="about">
        <div className="slides">
          <Link to="/about/slide1">
            <p>Haqqımda</p>
          </Link>
          <Link to="/about/slide2">
            <p>Şəkillər</p>
          </Link>
          <Link to="/about/video">
            <p>Videolar</p>
          </Link>
        </div>
      </section>
    </section>
  );
};

export default About;
