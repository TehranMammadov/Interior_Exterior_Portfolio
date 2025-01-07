import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom'
import "../../assets/css/About/Slide1.css";
import Breadcrumb from "../Breadcrumb";
import axios from "axios";
import Sidebar from '../Sidebar'
import Header from '../Header'

const Slide1 = () => {
  const token = localStorage.getItem("$2a$10$ipcxyA96qc1pdz9r1IPYf.DJFQGuJpWXRyBuCEbyRKMl6")
  const refresh = localStorage.getItem("DJFQGuJpWXRyBuCEbyRKMl6$2a$10$ipcxyA96qc1pdz9r1IPYf")

  const navigate = useNavigate();

  const [aboutData, setAboutData] = useState([])

  const fetchApi = () => {
    return fetch(`${process.env.REACT_APP_URL}/api/about`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        'x-leyla-authorization': "Bearer " + token,
        'x-leyla-refreshtoken': "Bearer " + refresh,
      },
    }, { withCredentials: true })
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
    if (!token && token == null) {
      navigate("/login")
    }
  }, [token])

  useEffect(() => {
    fetchApi().then((data) => {
      setAboutData(data.result);
  });
  }, [])
  

  const [selectedFile, setSelectedFile] = useState(null);
  const [inputs, setInputs] = useState({
    azTitle: "",
    azQuote: "",
    enTitle: "",
    enQuote: "",
    ruTitle: "",
    ruQuote: "",
  });

  useEffect(() => {
    setInputs({
      azTitle: aboutData && aboutData[0]?.azTitle,
      azQuote: aboutData && aboutData[0]?.azQuote,
      enTitle: aboutData && aboutData[0]?.enTitle,
      enQuote: aboutData && aboutData[0]?.enQuote,
    })
  }, [aboutData])
  
  const onChangeHandler = (event) => {
    setInputs({ ...inputs, [event.target.name]: event.target.value });
  };
  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataForm = new FormData();
    dataForm.append("id", aboutData && aboutData[0]?._id);
    dataForm.append("azTitle", inputs.azTitle);
    dataForm.append("azQuote", inputs.azQuote);
    dataForm.append("enTitle", inputs.enTitle);
    dataForm.append("enQuote", inputs.enQuote);
    dataForm.append("ruTitle", inputs.ruTitle);
    dataForm.append("ruQuote", inputs.ruQuote);
    dataForm.append("about", selectedFile);


    try {
      await axios.patch(
        `${process.env.REACT_APP_URL}/api/admin/about`,
        dataForm,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            'x-leyla-authorization': "Bearer " + token,
            'x-leyla-refreshtoken': "Bearer " + refresh,
          },
        },
        { withCredentials: true }
      );

      alert("Redaktə Edildi")
    } catch (e) {
      alert('Redaktə Edilmədə Səhvlik Yarandı')
    }
  };
  return (
    <section className="slide1-container">
      <Sidebar />
      <Header />
      <Breadcrumb pageName={"HAQQIMDA"} />
      <section className="slide1">
        <div className="input title">
          <h3>Başlıq (az)</h3>
          <input
            name="azTitle"
            onChange={onChangeHandler}
            type="text"
            value={inputs.azTitle}
          />
        </div>
        <div className="input title">
          <h3>Mətn (az)</h3>
          <input
            onChange={onChangeHandler}
            value={inputs.azQuote}
            name="azQuote"
            type="text"
          />
        </div>
        <div className="input title">
          <h3>Başlıq (en)</h3>
          <input
            name="enTitle"
            onChange={onChangeHandler}
            type="text"
            value={inputs.enTitle}
          />
        </div>
        <div className="input title">
          <h3>Mətn (en)</h3>
          <input
            onChange={onChangeHandler}
            value={inputs.enQuote}
            name="enQuote"
            type="text"
          />
        </div>
        <div className="input file">
          <h3>Şəkİl</h3>
          <input
            onChange={handleFileSelect}
            accept="image/*"
            className="file-input"
            type="file"
          />
        </div>
      </section>
      <div className="button-container">
        {/* <button className="cancel">cancel</button> */}
        <button type="submit" className="save" onClick={handleSubmit}>
          Yadda saxla
        </button>
      </div>
    </section>
  );
};

export default Slide1;
