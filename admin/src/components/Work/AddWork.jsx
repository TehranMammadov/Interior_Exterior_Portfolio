import React, { Fragment, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Breadcrumb from "../Breadcrumb";
import Sidebar from "../Sidebar";
import Header from "../Header";
import "../../assets/css/Work/AddWork.css";

const AddWork = () => {
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

  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFile2, setSelectedFile2] = useState(null);

  const [editData, setEditData] = useState({
    azTitle: "",
    azDescription: "",
    azContent: "",
    enTitle: "",
    enDescription: "",
    enContent: "",
    ruTitle: "",
    ruDescription: "",
    ruContent: "",
  });

  const handleChange = (e) => {
    const value = e.target.value;
    setEditData({
      ...editData,
      [e.target.name]: value,
    });
  };

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleFileSelect2 = (event) => {
    setSelectedFile2(event.target.files[0]);
  };

  const [inputList, setInputList] = useState([
    {
      azModuleTitle: "",
      azModuleDescription: "",
      enModuleTitle: "",
      enModuleDescription: "",
      ruModuleTitle: "",
      ruModuleDescription: "",
    },
  ]);
  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };

  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setInputList([
      ...inputList,
      {
        azModuleTitle: "",
        azModuleDescription: "",
        enModuleTitle: "",
        enModuleDescription: "",
        ruModuleTitle: "",
        ruModuleDescription: ""
      },
    ]);
  };

  const event = document.querySelector("#files");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataForm = new FormData();
    dataForm.append("azTitle", editData.azTitle);
    dataForm.append("azDescription", editData.azDescription);
    dataForm.append("azContent", editData.azContent);
    dataForm.append("enTitle", editData.enTitle);
    dataForm.append("enDescription", editData.enDescription);
    dataForm.append("enContent", editData.enContent);
    dataForm.append("ruTitle", editData.ruTitle);
    dataForm.append("ruDescription", editData.ruDescription);
    dataForm.append("ruContent", editData.ruContent);
    dataForm.append("poster", selectedFile);
    dataForm.append("module",  JSON.stringify(inputList));
    for (let i = 0; i < event.files.length; i++) {
      dataForm.append("footerImage", event.files[i]);
    }

    for (let i = 0; i < inputList.length; i++) {
      dataForm.append("module", JSON.stringify(inputList[i]));
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_URL}/api/admin/portfolio`,
        dataForm,
        {
          headers: {
            "Content-Type": "multipart/form-data",
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
      alert("Yeni Portfel Əlavə Edildi");
    } catch (e) {
      alert('Portfel Əlavə Edilməsində Səhvlik Yarandı');
    }
  };

  return (
    <Fragment>
      <Sidebar />
      <Header />
      <Breadcrumb pageName="Add Work" />

      <div className="work-add">
        <form onSubmit={handleSubmit}>
          <label>
          Başlıq (az) <br />
            <input
              onChange={handleChange}
              type="text"
              name="azTitle"
              required
            />
          </label>{" "}
          <br />
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
          Başlıq (en) <br />
            <input
              onChange={handleChange}
              type="text"
              name="enTitle"
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
            Poster Şəklİ <br />
          </label>{" "}
          <br />
          <div className="file-button">
            <input
              onChange={handleFileSelect}
              accept="image/*"
              type="file"
              name="poster"
            />
          </div>
          <br/>
          <label>
          Dİgər şəkİllər <br />
          </label>{" "}
          <br />
          <div className="file-button">
            <input
              onChange={handleFileSelect2}
              id="files"
              multiple
              accept="image/*"
              type="file"
              name="footerImage"
            />
          </div>

          <br/>
          {inputList.map((x, i) => {
            return (
              <div className="add-modal">
                <label>
                məlumat başlığı (az)<br/>
                  <input
                    name="azModuleTitle"
                    value={x.azTitle}
                    onChange={(e) => handleInputChange(e, i)}
                  />
                </label><br/>
       
                <label>
                məlumat detalı (az)<br/>
                  <input
                    name="azModuleDescription"
                    value={x.azDescription}
                    onChange={(e) => handleInputChange(e, i)}
                  />
                </label><br/>

                <label>
                məlumat başlığı (en)<br/>
                  <input
                    name="enModuleTitle"
                    value={x.enTitle}
                    onChange={(e) => handleInputChange(e, i)}
                  />
                </label><br/>

                <label>
                məlumat detalı (en)<br/>
                  <input
                    name="enModuleDescription"
                    value={x.enDescription}
                    onChange={(e) => handleInputChange(e, i)}
                  />
                </label>

                <div className="btn-box">
                  {inputList.length !== 1 && (
                    <>
                       <button
                      className="RemoveField"
                      onClick={() => handleRemoveClick(i)}
                    >
                      Sİl
                    </button>
                    <br/>
                    </>
                 
                  )}
                  <br />
                  {inputList.length - 1 === i && (
                    <button className="AddField" onClick={handleAddClick}>
                      Daha çox məlumat əlavə et
                    </button>
                  )}
                </div>
              </div>
            );
          })}
          <div className="blog-button blog-edit-button">
            <button type="submit">Yadda saxla</button>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

export default AddWork;
