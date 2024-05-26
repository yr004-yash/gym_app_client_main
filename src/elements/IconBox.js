import React, { useState } from "react";
import { SVGICON } from "../constants/theme";
import { Link } from "react-router-dom";

const boxSVG = [
  {
    icon: "flaticon-exercise-2",
    svg: SVGICON.iconBox1,
    title: "Our Mission",
    num: 1,
    content:"Our mission is to empower individuals to prioritize their health and well-being by providing.....",
    
  },
  {
    icon: "flaticon-dumbbells",
    svg: SVGICON.iconBox2,
    title: "Vision",
    num: 2,
    content:"Our gym site is a dynamic center for health and wellness, offering cutting-edge facilities and.....",
   
  },
];
const IconBox = () => {
  const [addActive, setActive] = useState(1);
  return (
    <>
      <div className="row align-items-center">
        {boxSVG.map((item, ind) => (
          <div className="col-xl-6 col-md-6 mb-4 wow fadeInLeft" key={ind}>
            <div
              onMouseEnter={() => setActive(ind)}
              className={`icon-bx-wraper style-5 ${
                addActive === ind ? "active" : ""
              }`}
            >
              <div className="icon-bx m-b40">
                <div className="icon-cell text-primary">
                  <i className={item.icon}></i>
                </div>
              </div>
              <div className="icon-content">
                <h4 className="dz-title m-b10">
                  <Link to="/about-us">{item.title}</Link>
                </h4>
                <p className="m-b15">
                  {item.content}
                </p>
                <Link to="/about-us" className="read-more">
                  Read More <i className="fa-solid fa-arrow-right"></i>
                </Link>
              </div>
              <div className="badge">
                {" "}
                <span>{item.num}</span>
              </div>
              {item.svg}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default IconBox;
