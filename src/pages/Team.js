import React, { useEffect, useState } from "react";
import { IMAGES } from "../constants/theme";
import NewsLetter from "../elements/NewsLetter";
import PageTitle from "../elements/PageTitle";
import axios from "axios";

const mediaBlog = [
  { images: IMAGES.team1, title: "EMILY" },
  { images: IMAGES.team2, title: "EMMA" },
  { images: IMAGES.team3, title: "OLIVER" },
  { images: IMAGES.team4, title: "ELIJAH" },
  { images: IMAGES.team5, title: "JAMES" },
  { images: IMAGES.team6, title: "AMELIA" },
];

const Team = () => {
  const [trainers, setTrainers] = useState([]);
  const [selectedTrainer, setSelectedTrainer] = useState(null);

  useEffect(() => {
    const fetchTrainers = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/getAllTrainers`);
        setTrainers(response.data.trainers);
      } catch (error) {
        console.error("Error fetching trainers:", error);
      }
    };
    fetchTrainers();
  }, []);

  const openModal = (trainer) => {
    setSelectedTrainer(trainer);
  };

  const closeModal = () => {
    setSelectedTrainer(null);
  };

  return (
    <>
      <div className="page-content bg-white">
        <PageTitle parentTitle="Pages" activePage="Our Team" />
        <section className="content-inner">
          <div className="container">
            <div className="row">
              {trainers.map((trainer, index) => (
                <div className="col-lg-3 col-sm-6 m-b30" key={index}  style={{ height:'50%', width:'25%'}}>
                  <div className="dz-team style-1"  style={{height:'100%', width:'100%', }} onClick={() => openModal(trainer)}>
                    <div className="dz-media"  style={{ height:'100%', width:'100%'}}>
                      <div style={{ objectFit:'cover',height:'100%', width:'100%'}}>
                        <img style={{height:'100%',width:'100%',objectFit:'cover',marginBottom:'0px',paddingBottom:'0px'}} src={`${process.env.REACT_APP_BACKEND_URL}/${trainer.image}`} alt="" />
                      </div>
                    </div>
                    <div className="dz-content" style={{fontSize:'10%',width:'100%',height:'20%', transform:'skewY(-17deg) translateY(-100%)'}}>
                      <span className="dz-name" style={{width:'100%',height:'100%',fontSize:'1200%'}}>{trainer.name}</span>
                      <span className="dz-position" style={{height:'90%',fontSize:'1000%'}}>Yoga trainer</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        {selectedTrainer && (
          <div className="modal" tabIndex="-1" role="dialog" style={{ display: "block" }}>
            <div className="modal-dialog" role="document">
              <div className="modal-content" style={{height:'90vh',borderRadius:'1rem'}}>
                <div className="modal-header" style={{height:'10%'}}>
                  <h5 className="modal-title">{selectedTrainer.name}</h5>
                  <button type="button" style={{width:'7%',height:'auto', borderRadius:'0.2rem',backgroundColor:'#9B3922',color:'white'}} className="close" onClick={closeModal}>
                    <span>&times;</span>
                  </button>
                </div>
                <div className="modal-body" style={{height:'88%',width:'100%',overflowY:'scroll',msOverflowStyle:'none',scrollbarWidth:'none', display:'flex',flexDirection:'column',justifyContent:'space-evenly'}}>
                  <div style={{width:'100%', height:'80%'}}>
                    <img style={{ objectFit:'cover',width:'100%',height:'100%'}} src={`${process.env.REACT_APP_BACKEND_URL}/${selectedTrainer.image}`} alt="" />
                  </div>
                  <p style={{marginTop:'1rem', display:'flex'}}><h6 style={{ color:'#B67352', paddingRight:'1rem'}}>Description: </h6> {selectedTrainer.description}</p>
                  <p style={{ display:'flex'}}><h6 style={{color:'#B67352', paddingRight:'1rem'}}>Rating:</h6> {selectedTrainer.rating}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Team;
