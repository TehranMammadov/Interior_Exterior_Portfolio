import React, { Fragment, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Breadcrumb from '../Breadcrumb'
import Sidebar from '../Sidebar'
import Header from '../Header'
import '../../assets/css/Intro/IntroContact.css'
import Loader from '../Loader'

function IntroContact() {
    const [Messages, setMessages] = useState()
    const token = localStorage.getItem("$2a$10$ipcxyA96qc1pdz9r1IPYf.DJFQGuJpWXRyBuCEbyRKMl6")
    const refresh = localStorage.getItem("DJFQGuJpWXRyBuCEbyRKMl6$2a$10$ipcxyA96qc1pdz9r1IPYf")
    const [isLoading, setIsLoading] = useState(true)

    const navigate = useNavigate();

    useEffect(() => {
        if (!token && token == null) {
            navigate("/login")
        }
    }, [token])

    const fetchApi = () => {
        return fetch(`${process.env.REACT_APP_URL}/api/admin/message/1/20`, {
            method: "GET",
            headers: {
                'x-leyla-authorization': "Bearer " + token,
                'x-leyla-refreshtoken': "Bearer " + refresh,
            },
        }, { withCredentials: true })
            .then((response) => {
                if (response.status === 401) {
                    localStorage.removeItem("$2a$10$ipcxyA96qc1pdz9r1IPYf.DJFQGuJpWXRyBuCEbyRKMl6");
                    localStorage.removeItem("DJFQGuJpWXRyBuCEbyRKMl6$2a$10$ipcxyA96qc1pdz9r1IPYf");
                    navigate("/login")
                }
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
        if (!token) {
            navigate("/login")
        }

        fetchApi().then((data) => {
            setMessages(data.result);
            setIsLoading(false)
        });
    }, [token, navigate])
    if(isLoading) {
        return (
            <Loader/>
        )
    }
    return (
        <Fragment>
            <Sidebar />
            <Header />
            <Breadcrumb pageName={"Əlaqə"} />
            {/* <div className="intro-contact-container">

                {Messages && Messages.map((e) => {
                    return (
                        <div key={e._id} className="intro-contact-message">
                            <input className='intro-contact-message-input' type="checkbox" name="" id="" />
                            {e.starred
                                ?
                                <svg onClick={() => e.starred === true} width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6.91 6.51155L8.5 1.61804L10.09 6.51155C10.1971 6.84117 10.5043 7.06434 10.8508 7.06434H15.9962L11.8335 10.0887C11.5531 10.2924 11.4358 10.6535 11.5429 10.9831L13.1329 15.8766L8.97023 12.8523C8.68983 12.6486 8.31016 12.6486 8.02977 12.8523L3.8671 15.8766L5.4571 10.9831C5.5642 10.6535 5.44687 10.2924 5.16648 10.0887L1.0038 7.06434H6.14915C6.49574 7.06434 6.8029 6.84117 6.91 6.51155Z" stroke="#D9D9D9" />
                                </svg>
                                :
                                <svg onClick={() => e.starred === false} className='intro-contact-message-star' width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6.91 6.51155L8.5 1.61804L10.09 6.51155C10.1971 6.84117 10.5043 7.06434 10.8508 7.06434H15.9962L11.8335 10.0887C11.5531 10.2924 11.4358 10.6535 11.5429 10.9831L13.1329 15.8766L8.97023 12.8523C8.68983 12.6486 8.31016 12.6486 8.02977 12.8523L3.8671 15.8766L5.4571 10.9831C5.5642 10.6535 5.44687 10.2924 5.16648 10.0887L1.0038 7.06434H6.14915C6.49574 7.06434 6.8029 6.84117 6.91 6.51155Z" fill="#F4C276" stroke="#F4C276" />
                                </svg>
                            }
                            <h5 className='intro-contact-message-name'>{e.email}</h5>
                            <h5 className='intro-contact-message-topic'>{e.message}</h5>
                            <p className='intro-contact-message-text'>{e.phone}</p>
                        </div>
                    )
                })}
            </div> */}
        </Fragment>
    )
}

export default IntroContact