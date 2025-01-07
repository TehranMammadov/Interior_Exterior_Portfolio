import React, { Fragment, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Breadcrumb from '../Breadcrumb'
import Sidebar from '../Sidebar'
import Header from '../Header'
import '../../assets/css/Intro/IntroHeader.css'

function IntroHeader() {
    const token = localStorage.getItem("$2a$10$ipcxyA96qc1pdz9r1IPYf.DJFQGuJpWXRyBuCEbyRKMl6")
    const refresh = localStorage.getItem("DJFQGuJpWXRyBuCEbyRKMl6$2a$10$ipcxyA96qc1pdz9r1IPYf")
    const [defaultData, setDefaultData] = useState();
    const navigate = useNavigate();

    const fetchApi = () => {
        return fetch(`${process.env.REACT_APP_URL}/api/main`, {
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
            setDefaultData(data.result);
        });
    }, [])


    const [selectedFile, setSelectedFile] = useState(null);

    const [data, setData] = useState({
        title: "",
        titleExtension: "",
        quote: "",
        author: ""
    });

    useEffect(() => {
        setData({
            title: defaultData && defaultData[0].title,
            titleExtension: defaultData && defaultData[0].titleExtension,
            quote: defaultData && defaultData[0].quote,
            author: defaultData && defaultData[0].author,
        })
    }, [defaultData])


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
        dataForm.append('title', data.title)
        dataForm.append('titleExtension', data.titleExtension)
        dataForm.append('quote', data.quote)
        dataForm.append('author', data.author)
        dataForm.append('poster', selectedFile)

        try {
            const response = await axios.patch(`${process.env.REACT_APP_URL}/api/admin/main`, dataForm, {
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
            alert("Redaktə Edildi")

        } catch (e) {
            alert('Redaktə Edilmədə Səhvlik Yarandı')
        }

    };

    return (
        <Fragment>
            <Sidebar />
            <Header />
            <Breadcrumb pageName={"Intro Header"} />
            <form onSubmit={handleSubmit}>
                <div className='intro-header'>
                    <label>
                        Title <br />
                        <input onChange={handleChange} type="text" defaultValue={defaultData && defaultData[0].title} name='title' />
                    </label> <br />

                    <label>
                        Title Extension <br />
                        <input onChange={handleChange} type="text" defaultValue={defaultData && defaultData[0].titleExtension} name='titleExtension' />
                    </label> <br />

                    <label>
                        Quote <br />
                        <input onChange={handleChange} type="text" defaultValue={defaultData && defaultData[0].quote} name='quote' />
                    </label> <br />

                    <label>
                        Author <br />
                        <input onChange={handleChange} type="text" defaultValue={defaultData && defaultData[0].author} name='author' />
                    </label> <br />

                    <div className="file-button">
                        <input onChange={handleFileSelect} accept="image/*" type="file" name="poster" />
                    </div>
                </div>

                <div className="form-buttons-header">
                    <button>
                        Save
                    </button>
                </div>
            </form>
        </Fragment>
    )
}

export default IntroHeader