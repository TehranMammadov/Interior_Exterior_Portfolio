import React, { useState } from "react";
import Breadcrumb from "../Breadcrumb";
import "../../assets/css/About/Slide2.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Sidebar from "../Sidebar";
import Header from "../Header";

const Slide2 = () => {
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

  const [idItem, setIdItem] = useState([]);
  const [selectedFile, setSelectedFile] = useState([
    { about: null },
    { about: null },
    { about: null },
  ]);

  const handleFileSelect = (event, index) => {
    const newInputs = selectedFile.map((el, i) => {
      if (i === index) return { about: event.target.files[0] };
      return el;
    });
    setSelectedFile(newInputs);
  };

  const fetchApi = () => {
    return fetch(`${process.env.REACT_APP_URL}/api/about`, {
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
      let ids = [];
      for (let item of data.result[0].content) {
        ids.push({ _id: item._id });
      }
      setIdItem(ids);
    });
  }, []);

  async function patchImage(updatedData, id) {
    try {
      await axios.patch(
        `${process.env.REACT_APP_URL}/api/admin/about/content/${id}`,
        updatedData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "x-leyla-authorization": "Bearer " + token,
            "x-leyla-refreshtoken": "Bearer " + refresh,
          },
        },
        { withCredentials: true }
      );

      alert("Redaktə Edildi");
    } catch (e) {
      alert("Redaktə Edildi");
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    selectedFile.map((item, index) => {
      if (item.about) {
        let formData = new FormData()
        formData.append("about", item.about);
        patchImage(formData, idItem[index]._id)
      }
    })
  };

  return (
    <section className="slide2-container">
      <Sidebar />
      <Header />
      <Breadcrumb pageName={"ŞƏKİLLƏR"} />
      <div className="slide2">
        <div className="input file">
          <label htmlFor="">Şəkil 1</label>
          <input
            className="file-input"
            type="file"
            name="about1"
            onChange={(event) => handleFileSelect(event, 0)}
          />
        </div>
        <div className="input file">
          <label htmlFor="">Şəkil 2</label>
          <input
            className="file-input"
            type="file"
            name="about2"
            onChange={(event) => handleFileSelect(event, 1)}
          />
        </div>
        <div className="input file">
          <label htmlFor="">Şəkil 3</label>
          <input
            className="file-input"
            type="file"
            name="about3"
            onChange={(event) => handleFileSelect(event, 2)}
          />
        </div>
      </div>
      <div className="button-container">
        <button onClick={handleSubmit} className="save">
          Yadda saxla
        </button>
      </div>
    </section>
  );
};

export default Slide2;
