import React from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import '../assets/css/Header.css'

function Header() {
  const navigate = useNavigate();

  const token = localStorage.getItem("$2a$10$ipcxyA96qc1pdz9r1IPYf.DJFQGuJpWXRyBuCEbyRKMl6")
  const refresh = localStorage.getItem("DJFQGuJpWXRyBuCEbyRKMl6$2a$10$ipcxyA96qc1pdz9r1IPYf")

  const logout = async e => {
    try {
      const response = await axios
        .post(`${process.env.REACT_APP_URL}/api/user/logout`, {}, {
          headers: {
            'x-leyla-authorization': "Bearer " + token,
            'x-leyla-refreshtoken': "Bearer " + refresh,
          }
        }, { withCredentials: true });
      if (response.status === 200) {
        localStorage.removeItem("$2a$10$ipcxyA96qc1pdz9r1IPYf.DJFQGuJpWXRyBuCEbyRKMl6")
        localStorage.removeItem("DJFQGuJpWXRyBuCEbyRKMl6$2a$10$ipcxyA96qc1pdz9r1IPYf")
        navigate("/login")
      }

    } catch (e) {
      alert(e)
    }
  }

  return (
    <header id='header'>
      <h1>ADMİN Leyla Naİb Cabbarlı</h1>

      <div>
        <button onClick={logout} className='logout'>Çıxış</button>
      </div>
    </header>
  )
}

export default Header