import React, { Fragment, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Breadcrumb from "../Breadcrumb";
import Sidebar from "../Sidebar";
import Header from "../Header";
import "../../assets/css/Work/AddWork.css";

const VideoAdd = () => {
  const token = localStorage.getItem(
    "$2a$10$ipcxyA96qc1pdz9r1IPYf.DJFQGuJpWXRyBuCEbyRKMl6"
  );
  const refresh = localStorage.getItem(
    "DJFQGuJpWXRyBuCEbyRKMl6$2a$10$ipcxyA96qc1pdz9r1IPYf"
  );

  const navigate = useNavigate();

  useEffect(() => {
    if (!token && token == null) {
      navigate("/login");
    }
  }, [token]);


  const [editData, setEditData] = useState({
    azTitle: "",
    azDescription: "",
    enTitle: "",
    enDescription: "",
    ruTitle: "",
    ruDescription: "",
    url:""
  });

  const handleChange = (e) => {
    const value = e.target.value;
    setEditData({
      ...editData,
      [e.target.name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataForm ={};
    dataForm.azTitle= editData.azTitle || '';
    dataForm.azDescription=editData.azDescription || '';
    dataForm.enTitle=editData.enTitle || '';
    dataForm.enDescription=editData.enDescription || '';
    dataForm.ruTitle=editData.ruTitle || '';
    dataForm.ruDescription=editData.ruDescription || '';
    dataForm.url=editData.url || '';

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_URL}/api/admin/video`,
        dataForm,
        {
          headers: {
            "Content-Type": "application/json",
            "x-leyla-authorization": "Bearer " + token,
            "x-leyla-refreshtoken": "Bearer " + refresh,
          },
        },
        { withCredentials: true }
      );
      if (response.status === 401) {
        localStorage.removeItem(
          "$2a$10$ipcxyA96qc1pdz9r1IPYf.DJFQGuJpWXRyBuCEbyRKMl6"
        );
        localStorage.removeItem(
          "DJFQGuJpWXRyBuCEbyRKMl6$2a$10$ipcxyA96qc1pdz9r1IPYf"
        );
        navigate("/login");
      }
      alert("Yeni Video Əlavə Edildi");
        navigate("/about/video");
    } catch (e) {
      alert('Video Əlavə Edilməsində Səhvlik Yarandı');
    }
  };

  return (
    <Fragment>
      <Sidebar />
      <Header />
      <Breadcrumb pageName="Vİdeo əlavə etmək" />

      <div className="work-add">
        <form onSubmit={handleSubmit}>
          <label>
          Mətn (az) <br />
            <input
              onChange={handleChange}
              type="text"
              name="azDescription"
              required
            />
          </label>{" "}
          <br />
        
          <label>
          Mətn (en) <br />
            <input
              onChange={handleChange}
              type="text"
              name="enDescription"
              required
            />
          </label>{" "}
          <br />
          <label>
          Url<br />
            <input
              onChange={handleChange}
              type="url"
              name="url"
              required
            />
          </label>{" "}
          <br />
          <div className="blog-button blog-edit-button">
            <button type="submit">Yadda saxla</button>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

export default VideoAdd;
