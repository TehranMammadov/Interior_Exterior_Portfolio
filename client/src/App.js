import React, { useState, lazy, Suspense,  } from "react";
import { Routes, Route } from "react-router-dom";
import CustomCursor from "./components/UI/CustomCursor";

import Home from "./components/Home";
import About from "./components/About";
import NotFound from "./components/UI/NotFound";
import Work from "./components/Work";
import WorkInterior from "./components/Work/WorkInterior";
import ViewButton from "./components/UI/ViewButton";
import Blog from "./components/Blog";
import BlogInterior from "./components/Blog/BlogInterior";
import Service from "./components/Service";
import Contact from "./components/Contact";
import PageScrollTop from "./components/UI/PageScrollTop/PageScrollTop";
import "./styles/styles.scss";


import { useLocation, useNavigate } from 'react-router-dom';
import { axiosInterceptorHandler } from './utils/AxiosInterceptor';
import Cookies from 'js-cookie';
import { BroadcastChannel } from 'broadcast-channel';
import Header from "./components/Header";
// import headData from './data/head-data.json';
import Footer  from "./components/Footer";




const App = () => {
  const [cursor, setCursor] = useState(false);
  const [homeActive, setHomeActive] = useState(false);
  let matchMedia = window.matchMedia("(max-width: 991px)").matches;

  let navigate = useNavigate();
  // const windowLocation = useLocation().pathname;
  const language = Cookies.get('i18next');
  const broadcastChannel = new BroadcastChannel('language-changed');

  axiosInterceptorHandler(navigate, language);

  broadcastChannel.onmessage = (msg) => {
    if (msg === 'language changed') {
      window.location.reload(true);
    }
  };

  const onMouseEnter = () => {
    setCursor(true);
  };
  const onMouseLeave = () => {
    setCursor(false);
  };

  return (
    <>
      <PageScrollTop />
      <Header
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        homeActive={homeActive}
      />
      {!matchMedia ? <CustomCursor cursor={cursor} /> : <></>}

      <ViewButton />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              homeActive={homeActive}
              setHomeActive={setHomeActive}
            />
          }
        ></Route>
        <Route
          path="/about"
          element={
            <About homeActive={homeActive} setHomeActive={setHomeActive} />
          }
        ></Route>
        <Route
          path="/services"
          element={
            <Service homeActive={homeActive} setHomeActive={setHomeActive} />
          }
        ></Route>
        <Route
          path="/portfolio"
          element={
            <Work homeActive={homeActive} setHomeActive={setHomeActive} />
          }
        ></Route>
        <Route
          path="/portfolio/:id"
          element={
            <WorkInterior
              homeActive={homeActive}
              setHomeActive={setHomeActive}
            />
          }
        ></Route>
        <Route
          path="/blog"
          element={
            <Blog homeActive={homeActive} setHomeActive={setHomeActive} />
          }
        ></Route>
        <Route
          path="/blog/:id"
          element={
            <BlogInterior
              homeActive={homeActive}
              setHomeActive={setHomeActive}
            />
          }
        ></Route>
        <Route
          path="/contact"
          element={
            <Contact homeActive={homeActive} setHomeActive={setHomeActive} />
          }
        ></Route>
        {/* // for not found page*/}
        <Route
          path="*"
          element={
            <NotFound homeActive={homeActive} setHomeActive={setHomeActive} />
          }
        />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
