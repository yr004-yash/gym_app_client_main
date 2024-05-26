import React from "react";
import { Link } from "react-router-dom";


const cards = [
  { icon: "flaticon-fitness", title: "Our Classes" , link:"/classes", description:'Experience a variety of invigorating classes tailored to your fitness goals.'},
  { icon: "flaticon-user", title: "Our Trainers", link:"/team", description:'Meet our team of dedicated and certified trainers who are passionate about helping you.' },
  { icon: "flaticon-medal", title: "Memberships" , link:"/pricing", description:'Unlock unlimited access to our exclusive benefits with our flexible membership options.'},
  { icon: "flaticon-calendar", title: "Our Timeline" , link:"/schedule", description:'Embark on a journey towards a healthier lifestyle with our comprehensive fitness timeline.'},
];
const HomebannerCard = () => {
  return (
    <>
      <div className="row align-items-center justify-content-center">
        {cards.map((item, ind) => (
          <div
            className="col-xl-3 col-sm-6 mb-xl-0 mb-4 wow fadeInUp"
            key={ind}
          >
            <div className="icon-bx-wraper style-4 bg-white">
              <div className="icon-bx m-b20">
                <div className="icon-cell text-primary">
                  <i className={item.icon}></i>
                </div>
              </div>
              <div className="icon-content">
                <h4 className="dz-title m-b10">
                  <Link to={item.link} >{item.title}</Link>
                </h4>
                <p className="m-b15">
                  {item.description} 
                </p>
                <Link to={item.link} className="read-more">
                  Read More <i className="fa-solid fa-arrow-right"></i>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default HomebannerCard;
