import React, { Fragment, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "../../assets/css/Work/Work.css";
import Breadcrumb from "../Breadcrumb";
import Sidebar from "../Sidebar";
import Header from "../Header";
import Loader from "../Loader";

const Work = () => {
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

  const [data, setData] = useState([]);
  const [id, setId] = useState();

  const [modal, setModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const fetchApi = () => {
    return fetch(`${process.env.REACT_APP_URL}/api/portfolio`, {
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
      setData(data.result);
      setIsLoading(false);
    });
  }, []);

  const deleteWork = async (e) => {
    const id = e;
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_URL}/api/admin/portfolio`,
        {
          headers: {
            "x-leyla-authorization": "Bearer " + token,
            "x-leyla-refreshtoken": "Bearer " + refresh,
          },
          data: {
            id: id,
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

      alert("Portfel Silindi");

      fetchApi().then((data) => {
        setData(data.result);
        setIsLoading(false);
      });
    } catch (e) {
      alert("Portfel Silinməsində Səhvlik Yarandı");
    }
  };

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
    module: [],
  });

  const handleChange = (e) => {
    const value = e.target.value;
    setEditData({
      ...editData,
      [e.target.name]: value,
    });
  };

  const ModulehandleChange=(e,index)=>{
    let modulem=editData.module.map((md,ind)=>{
      if(ind===index){
        return {
          ...md,
          [e.target.name]:e.target.value
        }}
        else{
          return {
          ...md
        }
      }
      
    });
    setEditData({
      ...editData,
      'module': [...modulem],
    });
  }

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleFileSelect2 = (event) => {
    setSelectedFile2(event.target.files);
  };

  const event = document.querySelector("#files");

  const [peopleInfo, setPeopleInfo] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataForm = new FormData();
    dataForm.append("id", id);
    dataForm.append("azTitle", editData.azTitle);
    dataForm.append("azDescription", editData.azDescription);
    dataForm.append("azContent", editData.azContent);
    dataForm.append("enTitle", editData.enTitle);
    dataForm.append("enDescription", editData.enDescription);
    dataForm.append("enContent", editData.enContent);
    dataForm.append("ruTitle", editData.ruTitle);
    dataForm.append("ruDescription", editData.ruDescription);
    dataForm.append("ruContent", editData.ruContent);
    dataForm.append("module", JSON.stringify(editData.module));
    dataForm.append("poster", selectedFile);
    dataForm.append("footerImage", selectedFile2);
    if(event?.files){
      for (let i = 0; i < event.files.length; i++) {
        dataForm.append("footerImage", event.files[i]);
      }
    }
    try {
      const response = await axios.patch(
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
      alert("Redaktə Edildi");

      fetchApi().then((data) => {
        setData(data.result);
      });

      setModal(false);
    } catch (e) {
      alert('Redaktə Edilmədə Səhvlik Yarandı')
    }
  };
  if (isLoading) {
    return <Loader />;
  }
  return (
    <Fragment>
      <Sidebar />
      <Header />
      <Breadcrumb pageName="Portfel" />

      {modal ? (
        <div className="work-edit-modal">
          <button onClick={() => setModal(false)} className="modal-close-btn">
            X
          </button>

          <form onSubmit={handleSubmit}>
            <label>
            Başlıq (az) <br />
              <input
                onChange={handleChange}
                defaultValue={editData.azTitle}
                type="text"
                name="azTitle"
              />
            </label>{" "}
            <br />
            <label>
            Mətn (az) <br />
              <input
                onChange={handleChange}
                defaultValue={editData.azDescription}
                type="text"
                name="azDescription"
              />
            </label>{" "}
            <br />
            <label>
            Başlıq (en) <br />
              <input
                onChange={handleChange}
                defaultValue={editData.enTitle}
                type="text"
                name="enTitle"
              />
            </label>{" "}
            <br />
            <label>
            Mətn (en) <br />
              <input
                onChange={handleChange}
                defaultValue={editData.enDescription}
                type="text"
                name="enDescription"
              />
            </label>{" "}
            <br />
            <h2>Əlavə məlumatlar</h2><br/>
            {editData?.module?.map((e,index) => {
              return (
                <>
                <h4>Məlumat {index+1}</h4><br/>
                  <label>
                  məlumat başlığı (az) <br />
                    <input
                      onChange={(e)=>ModulehandleChange(e,index)}
                      defaultValue={e.azModuleTitle}
                      type="text"
                      name="azModuleTitle"
                    />
                  </label>{" "}
                  <br />
                  <label>
                  məlumat detalı (az) <br />
                    <input
                      onChange={(e)=>ModulehandleChange(e,index)}
                      defaultValue={e.azModuleDescription}
                      type="text"
                      name="azModuleDescription"
                    />
                  </label>{" "}
                  <br />
                  <label>
                  məlumat başlığı (en) <br />
                    <input
                      onChange={(e)=>ModulehandleChange(e,index)}
                      defaultValue={e.enModuleTitle}
                      type="text"
                      name="enModuleTitle"
                    />
                  </label>{" "}
                  <br />
                  <label>
                  məlumat detalı (en) <br />
                    <input
                      onChange={(e)=>ModulehandleChange(e,index)}
                      defaultValue={e.enModuleDescription}
                      type="text"
                      name="enModuleDescription"
                    />
                  </label>{" "}
                  <br />
                </>
              );
            })}
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
            <br />
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
            <div className="blog-button blog-edit-button">
              <button type="submit">Yadda saxla</button>
            </div>
          </form>
        </div>
      ) : (
        <div className="work">
          <div style={{ marginBottom: "50px" }}>
            {data &&
              data.map((e) => {
                return (
                  <div className="work-container">
                    <p>{e.azTitle}</p>
                    <i
                      onClick={() => {
                        setModal(true);
                        setId(e._id);
                        setEditData({
                          azTitle: e.azTitle,
                          azDescription: e.azDescription,
                          azContent: e.azContent,
                          enTitle: e.enTitle,
                          enDescription: e.enDescription,
                          enContent: e.enContent,
                          ruTitle: e.ruTitle,
                          ruDescription: e.ruDescription,
                          ruContent: e.ruContent,
                          module: e.module,
                        });
                      }}
                      class="fas fa-edit"
                    ></i>
                    <i
                      onClick={() => deleteWork(e._id)}
                      class="fas fa-trash"
                    ></i>
                  </div>
                );
              })}
          </div>
          <div className="work-button">
            <Link to="/work-add">
              <button>"Əlavə et"</button>
            </Link>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Work;
