import React, { useEffect, useRef, useState } from "react";
import { IMAGES } from "../constants/theme";
import MainBanner3 from "../components/MainBanner3";
import ModalVideo from "react-modal-video";
import HomebannerCard from "../elements/HomebannerCard";
import { AboutServicesDetails } from "../components/AboutServices";
import IconBox from "../elements/IconBox";
import { Link, useLocation } from "react-router-dom";
import Home3Services from "../components/Home3Services";
import Portfolio from "../components/Portfolio";
import Home3testimonial from "../components/Home3testimonial";
import OurBlog from "../components/OurBlog";
import Clients from "../elements/Clients";
import ContectInfo from "../components/ContectInfo";
import axios from "axios";
import {
  ReactCompareSlider,
  ReactCompareSliderImage,
} from "react-compare-slider";

const Home3 = () => {
  const [open, setOpen] = useState(false);
  const swiperRef = useRef(null);
  const location = useLocation().pathname;

  useEffect(() => {
    const body = document.querySelector("body");  
    body.setAttribute("data-theme-color", 'color_3'); 
    localStorage.setItem("theme", "color_3");
    localStorage.setItem("themeInd", 2);
  }, [location]);
  const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/getAllBlogs`);
                setBlogs(response.data);
            } catch (error) {
                console.error("Error fetching blogs:", error);
            }
        };
        fetchBlogs();
    }, []);
  return (
    <>
      <ModalVideo
        channel="youtube"
        youtube={{ mute: 0, autoplay: 0 }}
        isOpen={open}
        videoId="X_9VoqR5ojM"
        onClose={() => setOpen(false)}
      />
      <div className="page-content bg-white style-1">
        <div className="main-bnr-two">
          <div
            className="banner-inner"
            style={{
              backgroundImage: `url(${IMAGES.BackgroundBg15})`,
              backgroundSize: " cover",
            }}
          >
            <MainBanner3 open={setOpen} />
          </div>
        </div>
        <section className="clearfix section-wrapper1">
          <div className="container">
            <HomebannerCard />
          </div>
        </section>
        <section
          className="about-bx3"
          style={{
            backgroundImage: ` url(${IMAGES.BgImage8})`,
            backgroundPosition: " center",
            backgroundSize: "100%",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="content-inner">
            <div className="container">
              <div className="row align-items-end">
                <AboutServicesDetails />
                <div className="col-lg-6 m-md-b30">
                  <div className="dz-media p-r20">
                    <img
                      src={IMAGES.aboutPic7}
                      alt=""
                      className="wow fadeInUp"
                      data-wow-delay="0.4s"
                    />
                    <div className="tag">
                      <h2>20</h2>
                      <h5>YEAR EXPERIENCE</h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section
          className="content-inner section-wrapper-1"
          style={{
            backgroundImage: ` url(${IMAGES.BgImage7})`,
            backgroundSize: " cover",
            backgroundRepeat: " no-repeat",
          }}
        >
          <div className="container">
            <IconBox />
          </div>
        </section>
        
        <div className="content-inner">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-6 m-b30 wow fadeInUp">
                <ReactCompareSlider
                  itemOne={
                    <ReactCompareSliderImage
                      src={IMAGES.beforeimg}
                      srcSet={IMAGES.beforeimg}
                      alt="Image one"
                    />
                  }
                  itemTwo={
                    <ReactCompareSliderImage
                      src={IMAGES.afterimg}
                      srcSet={IMAGES.afterimg}
                      alt="Image two"
                    />
                  }
                />
              </div>
              <div className="col-lg-6">
                <div className="section-head style-1 wow fadeInUp">
                  <h5 className="sub-title">GYm Time</h5>
                  <h2 className="title">
                    Workout Routine for Better{" "}
                    <span className="text-primary">Fitness Results</span>
                  </h2>
                  <p>
                    Nunc vulputate urna ut erat posuere accumsan. Curabitur ut
                    commodo mauris, ac volutpat dui. Nullam eget enim ut mi
                    bibendum ultrices. Pellentesque non feugia.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <section className="clearfix">
          <Portfolio />
        </section>
        {/* <section
          className="content-inner testimonial-swiper-wrapper-3"
          style={{
            backgroundImage: `url(${IMAGES.BgImage9})`,
            backgroundPosition: " center",
            backgroundSize: " 100%",
          }}
        > */}
          {/* <div className="container">
            <div className="section-head style-1 text-center">
              <h5 className="sub-title wow fadeInUp">TESTIMONIAL</h5>
              <h2 className="title wow fadeInUp">
                What <span className="text-primary">Client</span> Say’s
              </h2>
            </div>
            <Home3testimonial refVal={swiperRef} />
          </div> */}
          {/* <div
            onClick={() => {
              swiperRef.current.swiper.slidePrev();
            }}
            className="dz-swiper-prev3"
          >
            <i className="fa-solid fa-arrow-left"></i>
          </div> */}
          {/* <div
            onClick={() => {
              swiperRef.current.swiper.slideNext();
            }}
            className="dz-swiper-next3"
          >
            <i className="fa-solid fa-arrow-right"></i>
          </div> */}
        {/* </section> */}
        <section
          className="content-inner-2 overflow-hidden"
          style={{
            backgroundImage: `url(${IMAGES.BgImage1})`,
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="container">
            <div className="section-head style-1 text-center">
              <h2 className="title">
                Latest <span className="text-primary">Blogs</span>
              </h2>
            </div>
            <OurBlog  blogs={blogs}/>
          </div>
        </section>
        <div className="half-shape-top-w theme-bg content-inner-1 ">
          <div className="container">
            <div className="clients-box">
              <Clients />
            </div>
          </div>
        </div>
        <section
          className="content-inner-2 theme-bg contact-section style-2"
          style={{
            backgroundImage: ` url(${IMAGES.BgImage10})`,
            backgroundPosition: " center",
          }}
        >
        </section>
        <div className="map z-index-none">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d28896.531392443423!2d75.81462525569334!3d25.133445080066668!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x537f208422eb8f28!2sW3ITEXPERTS%20-%20Software%20Development%20Company%20in%20kota!5e0!3m2!1sen!2sin!4v1669897446044!5m2!1sen!2sin"
            style={{
              border: "0",
              marginBottom: "-7px",
              width: "100%",
              height: "400px",
            }}
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </>
  );
};

export default Home3;
