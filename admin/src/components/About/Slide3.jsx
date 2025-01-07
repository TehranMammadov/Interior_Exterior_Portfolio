import React, { useState } from "react";
import Breadcrumb from "../Breadcrumb";
import "../../assets/css/About/Slide3.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useRef } from "react";
import { useEffect } from "react";
import Sidebar from "../Sidebar";
import Header from "../Header";

const AboutVideo = () => {
  const token = localStorage.getItem(
    "$2a$10$ipcxyA96qc1pdz9r1IPYf.DJFQGuJpWXRyBuCEbyRKMl6"
  );
  const refresh = localStorage.getItem(
    "DJFQGuJpWXRyBuCEbyRKMl6$2a$10$ipcxyA96qc1pdz9r1IPYf"
  );

  const navigate = useNavigate();
  const [aboutData, setAboutData] = useState([]);

  useEffect(() => {
    if (!token && token == null) {
      navigate("/login");
    }
  }, [token]);

  const fetchApi = () => {
    return fetch(`${process.env.REACT_APP_URL}/api/video`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-leyla-authorization": "Bearer " + token,
        "x-leyla-refreshtoken": "Bearer " + refresh,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((responseJson) => {
        return responseJson;
      })
      .catch((error) => {
        console.error(JSON.stringify(error));
      });
  };
  useEffect(() => {
    fetchApi().then((data) => {
      setAboutData(data.result);
    });
  }, []);

  const handleSubmit = (e,id,index) => {
    e.preventDefault();
    const dataForm = {};
    dataForm.id= id;
    dataForm.azTitle = aboutData[index].azTitle;
    dataForm.azDescription = aboutData[index].azDescription;
    dataForm.enTitle = aboutData[index].enTitle;
    dataForm.enDescription = aboutData[index].enDescription;
    dataForm.ruTitle = aboutData[index].ruTitle;
    dataForm.ruDescription = aboutData[index].ruDescription;
    dataForm.url = aboutData[index].url;

   try {
      const response = axios.patch(
        `${process.env.REACT_APP_URL}/api/admin/video`,
        dataForm,
        {
          headers: {
            "Content-Type": "application/json",
            "x-leyla-authorization": "Bearer " + token,
            "x-leyla-refreshtoken": "Bearer " + refresh,
          },
        }
      );
      alert("Video Redaktə edildi");
    }
    catch (error) {
      console.log(error);
      alert("Video Redaktə Edilə Bilmədi");
    }
  };

  const handleDelete = (id) => {
    try {
      const response = axios.delete(
        `${process.env.REACT_APP_URL}/api/admin/video/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            "x-leyla-authorization": "Bearer " + token,
            "x-leyla-refreshtoken": "Bearer " + refresh,
          },
        }
      );
      alert("Video Silindi");
      fetchApi().then((data) => {
        setAboutData(data.result);
      });
    }
    catch (error) {
      console.log(error);
      alert("Video Silinmədi");
    }
  }

  const handleChange = (e, index) => {
    const values = [...aboutData];
    values[index][e.target.name] = e.target.value;
    setAboutData(values);
  };

  return (
    <section className="slide3-container">
      <Sidebar />
      <Header />
      <Breadcrumb pageName={"VİDEOLAR"} />
      <div className="button-container">
        <Link to="/about/video-add">
          <button className="button-add">+ Əlavə et</button>
        </Link>
      </div>

      <div className="slides">
        {aboutData &&
          aboutData.map((input, index) => {
            return (
              <div key={index} className="slide3">
                <h3>Video {index + 1}</h3>
                <br />
                <div className="input title">
                  <h4>Mətn (az)</h4>
                  <br />
                  <input
                    onChange={(e) => handleChange(e, index)}
                    placeholder="Az Description"
                    type="text"
                    value={input.azDescription}
                    name="azDescription"
                  />
                </div>
                <div className="input title">
                  <h4>Mətn (en)</h4>
                  <br />
                  <input
                    onChange={(e) => handleChange(e, index)}
                    placeholder="En Description"
                    type="text"
                    value={input.enDescription}
                    name="enDescription"
                  />
                </div>
                <div className="input title">
                  <h4>Link</h4>
                  <br />
                  <input
                    onChange={(e) => handleChange(e, index)}
                    placeholder="Url"
                    type="url"
                    value={input.url}
                    name="url"
                  />
                </div>
                <div className="button-container">
                  <button onClick={(e)=>{
                    handleSubmit(e,input._id,index);
                  }} className="save">
                    yadda saxla
                  </button> 
                  <button className="save" style={{background:'red'}} onClick={()=>handleDelete(input._id)} type="button">SİL</button>
                </div>
              </div>
            );
          })}
      </div>
    </section>
  );
};

export default AboutVideo;
