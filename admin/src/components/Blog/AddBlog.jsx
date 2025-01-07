import React from 'react'
import { Fragment, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import '../../assets/css/Blog/AddBlog.css'
import Sidebar from '../Sidebar'
import Header from '../Header'
import Breadcrumb from '../Breadcrumb'

const AddBlog = () => {
  const token = localStorage.getItem("$2a$10$ipcxyA96qc1pdz9r1IPYf.DJFQGuJpWXRyBuCEbyRKMl6")
  const refresh = localStorage.getItem("DJFQGuJpWXRyBuCEbyRKMl6$2a$10$ipcxyA96qc1pdz9r1IPYf")

  const navigate = useNavigate();


  useEffect(() => {
    if (!token && token == null) {
      navigate("/login")
    }
  }, [token])
  const [selectedFile, setSelectedFile] = useState(null);

  const [data, setData] = useState({
    azTitle: "",
    azDescription: "",
    azContent: "",
    enDescription: "",
    enTitle: "",
    enContent: "",
    ruTitle: "",
    ruDescription: "",
    ruContent: ""
  });

  const handleChange = (e) => {
    const value = e.target.value;
    setData({
      ...data,
      [e.target.name]: value
    });
  };

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0])
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataForm = new FormData()
    dataForm.append("azTitle", data.azTitle);
    dataForm.append("azDescription", data.azDescription);
    dataForm.append("azContent", data.azContent);
    dataForm.append("enTitle", data.enTitle);
    dataForm.append("enDescription", data.enDescription);
    dataForm.append("enContent", data.azContent);
    dataForm.append("ruTitle", data.ruTitle);
    dataForm.append("ruDescription", data.ruDescription);
    dataForm.append("ruContent", data.azContent);
    dataForm.append('poster', selectedFile)
    try {
      const response = await axios.post(`${process.env.REACT_APP_URL}/api/admin/blog`, dataForm, {
        headers: {
          "Content-Type": "multipart/form-data",
          'x-leyla-authorization': "Bearer " + token,
          'x-leyla-refreshtoken': "Bearer " + refresh,
        }
      }, { withCredentials: true });
      if (response.status === 401) {
        localStorage.removeItem("$2a$10$ipcxyA96qc1pdz9r1IPYf.DJFQGuJpWXRyBuCEbyRKMl6");
        localStorage.removeItem("DJFQGuJpWXRyBuCEbyRKMl6$2a$10$ipcxyA96qc1pdz9r1IPYf");
        navigate("/login")
      }
      alert("Yeni Bloq Əlavə Edildi")

    } catch (e) {
      alert('Bloq Əlavə Edilməsində Səhvlik Yarandı')
    }

  };

  return (
    <Fragment>
      <Sidebar />
      <Header />
      <Breadcrumb pageName="Bloq əlavə etmək" />
      <div className='blog-add'>
        <form onSubmit={handleSubmit}>

        <label>
                Başlıq (az) <br />
                <input
                  onChange={handleChange}
                  defaultValue={data.azTitle}
                  type="text"
                  name="azTitle"
                />
              </label>{" "}
              <br />
              <label>
                Mətn (az) <br />
                <input
                  onChange={handleChange}
                  defaultValue={data.azDescription}
                  type="text"
                  name="azDescription"
                />
              </label>{" "}
              <br />
              <label>
                Başlıq (en) <br />
                <input
                  onChange={handleChange}
                  defaultValue={data.enTitle}
                  type="text"
                  name="enTitle"
                />
              </label>{" "}
              <br />
              <label>
                Mətn (en) <br />
                <input
                  onChange={handleChange}
                  defaultValue={data.enDescription}
                  type="text"
                  name="enDescription"
                />
              </label>{" "}
              <br />
              <label>
                BLOQ LİNKİ <br />
                <input
                  onChange={handleChange}
                  defaultValue={data.azContent}
                  type="url"
                  name="azContent"
                />
              </label>{" "}
              <br />

          <div className="file-button">
            <input onChange={handleFileSelect} accept="image/*" type="file" name="poster" />
          </div>

          <div className="blog-button blog-edit-button">
            <button type='submit'>Yadda saxla</button>
          </div>

        </form>
      </div>
    </Fragment>
  )
}

export default AddBlog