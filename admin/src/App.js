import Home from "./components/Home";
import About from "./components/About/About";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import IntroHeader from "./components/Intro/IntroHeader";
import IntroContact from "./components/Intro/IntroContact";
import Login from "./components/Auth/Login";
import Blog from "./components/Blog/Blog";
import AddBlog from "./components/Blog/AddBlog";
import Work from "./components/Work/Work";
import AddWork from "./components/Work/AddWork";
import Slide1 from "./components/About/Slide1";
import Slide2 from "./components/About/Slide2";
import AboutVideo from "./components/About/Slide3";
import "./App.css";
import VideoAdd from "./components/About/VideoAdd";

function App() {
  let date1 = new Date();
  let date2 = new Date();
  date2.setDate(date1.getDate() + 30);
  let zaman = date2.getTime() - date1.getTime();
  let localDate = Number(localStorage.getItem("date")) + zaman;
  if (localDate < date1.getTime()) {
    localStorage.removeItem("date");
    localStorage.removeItem(
      "$2a$10$ipcxyA96qc1pdz9r1IPYf.DJFQGuJpWXRyBuCEbyRKMl6"
    );
    localStorage.removeItem(
      "DJFQGuJpWXRyBuCEbyRKMl6$2a$10$ipcxyA96qc1pdz9r1IPYf"
    );
  }
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route path="*" element={<Navigate to="/" replace />} />
      <Route exact path="/login" element={<Login />} />

      <Route exact path="/intro-header" element={<IntroHeader />} />

      <Route exact path="/blog" element={<Blog />} />
      <Route exact path="/blog-add" element={<AddBlog />} />

      <Route exact path="/work" element={<Work />} />
      <Route exact path="/work-add" element={<AddWork />} />

      <Route exact path="/about" element={<About />} />
      <Route exact path="/about/slide1" element={<Slide1 />} />
      <Route exact path="/about/slide2" element={<Slide2 />} />
      <Route exact path="/about/video" element={<AboutVideo />} />
      <Route exact path="/about/video-add" element={<VideoAdd />} />

      {/* <Route exact path="/contact" element={<IntroContact />} /> */}
    </Routes>
  );
}

export default App;
