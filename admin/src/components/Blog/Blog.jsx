import React from "react";
import { Fragment, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Breadcrumb from "../Breadcrumb";
import Sidebar from "../Sidebar";
import Header from "../Header";
import "../../assets/css/Blog/Blog.css";
import Loader from "../Loader";

const Blog = () => {
  const token = localStorage.getItem(
    "$2a$10$ipcxyA96qc1pdz9r1IPYf.DJFQGuJpWXRyBuCEbyRKMl6"
  );
  const refresh = localStorage.getItem(
    "DJFQGuJpWXRyBuCEbyRKMl6$2a$10$ipcxyA96qc1pdz9r1IPYf"
  );
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    if (!token && token == null) {
      navigate("/login");
    }
  }, [token]);

  const [data, setData] = useState([]);
  const [id, setId] = useState();

  const [modal, setModal] = useState(false);

  const fetchApi = () => {
    return fetch(
      `${process.env.REACT_APP_URL}/api/blog`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "x-leyla-authorization": "Bearer " + token,
          "x-leyla-refreshtoken": "Bearer " + refresh,
        },
      },
      { withCredentials: true }
    )
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

  const [selectedFile, setSelectedFile] = useState(null);
  const [editData, setEditData] = useState({
    azTitle: "",
    azDescription: "",
    azContent: "",
    enDescription: "",
    enTitle: "",
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

  const deleteBlog = async (e) => {
    const id = e;
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_URL}/api/admin/blog`,
        {
          headers: {
            "x-leyla-authorization": "Bearer " + token,
            "x-leyla-refreshtoken": "Bearer " + refresh,
          },
          data: {
            id: id
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
      alert("Blog Silindi");

      fetchApi().then((data) => {
        setData(data.result);
      });
    } catch (e) {
      alert("Bloq Silinməsində Səhvlik Yarandı");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataForm = new FormData();
    dataForm.append("id", id);
    dataForm.append("azTitle", editData.azTitle);
    dataForm.append("azDescription", editData.azDescription);
    dataForm.append("azContent", editData.azContent);
    dataForm.append("enTitle", editData.enTitle);
    dataForm.append("enDescription", editData.enDescription);
    dataForm.append("enContent", editData.azContent);
    dataForm.append("ruTitle", editData.ruTitle);
    dataForm.append("ruDescription", editData.ruDescription);
    dataForm.append("ruContent", editData.azContent);
    dataForm.append("poster", selectedFile);

    try {
      const response = await axios.patch(
        `${process.env.REACT_APP_URL}/api/admin/blog`,
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
      {modal ? (
        <>
          <Breadcrumb pageName={"Edit Blog"} />
          <div className="blog-edit-modal">
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
              <label>
                BLOQ LİNKİ <br />
                <input
                  onChange={handleChange}
                  defaultValue={editData.azContent}
                  type="url"
                  name="azContent"
                />
              </label>{" "}
              <br />
              <br />
              <div className="file-button">
                <input
                  onChange={handleFileSelect}
                  accept="image/*"
                  multiple
                  type="file"
                  name="poster"
                />
              </div>
              <div className="blog-button blog-edit-button">
                <button type="submit">Yadda saxla</button>
              </div>
            </form>
          </div>
        </>
      ) : (
        <>
          <Breadcrumb pageName={"Bloq"} />

          <div className="blog">
            <div className="blog-container">
              {data &&
                data.map((e) => {
                  return (
                    <div key={e.azTitle && e.azTitle} className="blog-cards">
                      <p>{e.azTitle && e.azTitle.slice(0, 100)}</p>
                      <p>{e.azDescription && e.azDescription.slice(0, 100)}</p>
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
                            enContent: e.azContent
                          });
                        }}
                        class="fas fa-edit"
                      ></i>
                      <i
                        onClick={() => deleteBlog(e._id)}
                        class="fas fa-trash"
                      ></i>
                    </div>
                  );
                })}
            </div>
          </div>

          <div className="blog-button">
            <Link to="/blog-add">
              <button>Bloq əlavə et</button>
            </Link>
          </div>
        </>
      )}
    </Fragment>
  );
};

export default Blog;
