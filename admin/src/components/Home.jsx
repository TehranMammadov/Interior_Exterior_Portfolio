import React, { Fragment, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Breadcrumb from './Breadcrumb'
import Sidebar from './Sidebar'
import Header from './Header'
import '../assets/css/Intro/IntroHeader.css'

function Home() {
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
        } else {
            fetchApi().then((data) => {
                console.log(data)
                setDefaultData(data.result);
            });
        }
    }, [token])

    // useEffect(() => {
    // }, [])


    const [selectedFile, setSelectedFile] = useState(null);

    const [data, setData] = useState({
        azTitle: "",
        azTitleExtension: "",
        azQuote: "",
        azAuthor: "",
        enTitle: "",
        enTitleExtension: "",
        enQuote: "",
        enAuthor: "",
        ruTitle: "",
        ruTitleExtension: "",
        ruQuote: "",
        ruAuthor: ""
    });

    useEffect(() => {
        setData({
            azTitle: defaultData && defaultData[0].azTitle,
            azTitleExtension: defaultData && defaultData[0].azTitleExtension,
            azQuote: defaultData && defaultData[0].azQuote,
            azAuthor: defaultData && defaultData[0].azAuthor,
            enTitle: defaultData && defaultData[0].enTitle,
            enTitleExtension: defaultData && defaultData[0].enTitleExtension,
            enQuote: defaultData && defaultData[0].enQuote,
            enAuthor: defaultData && defaultData[0].enAuthor,
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
        dataForm.append('id', defaultData && defaultData[0]._id)
        dataForm.append('azTitle', data.azTitle)
        dataForm.append('azTitleExtension', data.azTitleExtension)
        dataForm.append('azQuote', data.azQuote)
        dataForm.append('azAuthor', data.azAuthor)
        dataForm.append('enTitle', data.enTitle)
        dataForm.append('enTitleExtension', data.enTitleExtension)
        dataForm.append('enQuote', data.enQuote)
        dataForm.append('enAuthor', data.enAuthor)
        dataForm.append('ruTitle', data.ruTitle)
        dataForm.append('ruTitleExtension', data.ruTitleExtension)
        dataForm.append('ruQuote', data.ruQuote)
        dataForm.append('ruAuthor', data.ruAuthor)
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
            <Breadcrumb pageName={"Ana Səhifə"} />
            <form onSubmit={handleSubmit}>
                <div className='intro-header'>
                    <label>
                        Ad (az) <br />
                        <input onChange={handleChange} type="text" defaultValue={defaultData && defaultData[0].azAuthor} name='azAuthor' />
                    </label> <br />

                    <label>
                        Ad Əlavəsİ (az) <br />
                        <input onChange={handleChange} type="text" defaultValue={defaultData && defaultData[0].azTitleExtension} name='azTitleExtension' />
                    </label> <br />

                    <label>
                        Mətn (az) <br />
                        <input onChange={handleChange} type="text" defaultValue={defaultData && defaultData[0].azQuote} name='azQuote' />
                    </label> <br />

                    <label>
                        MÜƏLLİF (az) <br />
                        <input onChange={handleChange} type="text" defaultValue={defaultData && defaultData[0].azTitle} name='azTitle' />
                    </label> <br />

                    <label>
                        Ad (en) <br />
                        <input onChange={handleChange} type="text" defaultValue={defaultData && defaultData[0].enAuthor} name='enAuthor' />
                    </label> <br />

                    <label>
                        Ad Əlavəsİ (en) <br />
                        <input onChange={handleChange} type="text" defaultValue={defaultData && defaultData[0].enTitleExtension} name='enTitleExtension' />
                    </label> <br />

                    <label>
                        Mətn (en) <br />
                        <input onChange={handleChange} type="text" defaultValue={defaultData && defaultData[0].enQuote} name='enQuote' />
                    </label> <br />

                    <label>
                        MÜƏLLİF (en) <br />
                        <input onChange={handleChange} type="text" defaultValue={defaultData && defaultData[0].enTitle} name='enTitle' />
                    </label> <br />

                    <div className="file-button">
                        <input onChange={handleFileSelect} accept="image/*" type="file" name="poster" />
                    </div>
                </div>

                <div className="form-buttons-header">
                    <button>
                        Yadda saxla
                    </button>
                </div>
            </form>
        </Fragment>
    )
}

export default Home