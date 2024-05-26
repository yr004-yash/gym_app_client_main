import React from 'react';
import {Link} from 'react-router-dom';
import {Tab, Nav} from 'react-bootstrap';
import { IMAGES } from '../constants/theme';

const FitnessGoal = ({isOpenModal}) => {
    return (
        <>
            <div className="col-lg-6 about-content m-b30">
                <div className="section-head m-0">
                    <span className="sub-title" style={{color:'white'}}>ABOUT US</span>
                    <h2 className="title">We Help To Get <span>Fitness</span> Goal</h2>
                    <p className="m-0" style={{color:'lightgrey',opacity:'0.98'}}>We are an independent gym that is committed to working with you to gain the results you want. Whether your aim is to loose weight</p>
                </div>
                <div className="" data-wow-delay="0.8s">
                    <Tab.Container defaultActiveKey={'Mission'}>
                        <Nav as="ul" className="nav nav-tabs style-1 m-b20 m-t30">
                            <Nav.Item as="li" className="nav-item">
                                <Nav.Link className="nav-link" eventKey={'Mission'}>
                                    <span>Our Mission</span>
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item as="li" className="nav-item">
                                <Nav.Link className="nav-link" eventKey={'Vision'}>
                                    <span>Our Vision</span>
                                </Nav.Link>
                            </Nav.Item>
                        </Nav>
                        <Tab.Content className="tab-content m-sm-b30 m-b40 p-r30" id="myTabContent">
                            <Tab.Pane eventKey={'Mission'}>
                                <div className="content">
                                    <p>"Our mission is to empower individuals to prioritize their health and well-being by providing access to top-notch facilities and personalized support. We strive to foster a diverse and inclusive community where everyone feels welcomed and motivated to achieve their fitness goals. Through our commitment to excellence and inclusivity, we aim to inspire positive lifestyle changes and promote holistic wellness."</p>
                                </div>
                            </Tab.Pane>
                            <Tab.Pane eventKey={'Vision'}>
                                <div className="content">
                                    <p>"Our gym site is a dynamic center for health and wellness, offering cutting-edge facilities and personalized guidance to empower members on their fitness journey. Embracing inclusivity, we foster a supportive community where everyone feels valued and encouraged. Our mission is to inspire individuals to reach their full potential, both physically and mentally, creating a transformative space where connections are forged and goals are achieved."</p>
                                </div>
                            </Tab.Pane>
                        </Tab.Content>
                    </Tab.Container>
                </div>
                <div className="contact-us">
                    <span className="icon"><i className="fa-solid fa-phone"></i></span>
                    <div className="content">
                        <span style={{color:'white'}}>Call us for help</span>
                        <h4 className="number">12 452 1505</h4>
                    </div>
                </div>
            </div>
            <div className="col-lg-6 m-b30">
                <div className="dz-media">  
                    <div className="image-box">
                        <div className="video-bx1 h-auto w-auto overflow-visible">
                            <img src={IMAGES.boxpic1} alt="" />
                            <div className="video-btn sm">
                                <Link to={"#"} className="popup-youtube" 
                                    onClick={()=> isOpenModal(true)} >
                                    <i className="fa fa-play"/>
                                </Link> 
                            </div>
                        </div>
                        <div className="info-box">
                            <span><i className="flaticon-play text-primary"></i> High Quality Video</span>							
                        </div>
                    </div>
                    <div className="image-box">
                        <img src={IMAGES.boxpic2} alt="" />
                        <div className="info-box">
                            <span><i className="flaticon-athletics text-primary"></i> Proffesional Trainer</span>
                        </div>
                    </div>
                </div>
            </div>
                    
        </>
    );
};

export default FitnessGoal;