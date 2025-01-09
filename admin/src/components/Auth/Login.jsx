import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../assets/css/Auth/Auth.css'

const Login = () => {
    const token = localStorage.getItem("$2a$10$ipcxyA96qc1pdz9r1IPYf.DJFQGuJpWXRyBuCEbyRKMl6")
    const refresh = localStorage.getItem("DJFQGuJpWXRyBuCEbyRKMl6$2a$10$ipcxyA96qc1pdz9r1IPYf")
    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
            navigate("/")
        }
    }, [token, navigate])

    const [credentials, setCredentials] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        const value = e.target.value;
        setCredentials({
            ...credentials,
            [e.target.name]: value
        });
    };


    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const response =
                await axios.post(`${process.env.REACT_APP_URL}/api/user/login`, credentials)
                    .then((res) => {
                        let date=new Date();
                        localStorage.setItem("$2a$10$ipcxyA96qc1pdz9r1IPYf.DJFQGuJpWXRyBuCEbyRKMl6", res.data.accessToken);
                        localStorage.setItem("DJFQGuJpWXRyBuCEbyRKMl6$2a$10$ipcxyA96qc1pdz9r1IPYf", res.data.refreshToken);
                        localStorage.setItem('date',date.getTime());
                        navigate('/')
                    })
                    .catch((err) => {
                        alert(err)
                    })

        } catch (error) {
            alert(error)
        }
    }

    return (
        <div className='auth'>
            <h1>Giriş Edin</h1>
            <form onSubmit={handleSubmit}>
                <div className="input-box">
                    <label>E-poçt</label>
                    <input onChange={handleChange} type="email" name='email' />
                </div>
                <div className="input-box">
                    <label>Şifrə</label>
                    <input onChange={handleChange} type="password" name='password' />
                </div>
                <button className='login-btn' type='submit'>
                    Daxİl ol
                </button>
            </form>
        </div>
    )
}

export default Login