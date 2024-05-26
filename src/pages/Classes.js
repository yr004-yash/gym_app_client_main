import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ClientSlider from '../components/ClientSlider';
import { IMAGES, SVGICON } from '../constants/theme';
import LatestSlider from '../elements/LatestSlider';
import NewsLetter from '../elements/NewsLetter';
import PageTitle from '../elements/PageTitle';
import WorkoutSlider from '../elements/WorkoutSlider';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import Swal from 'sweetalert2';

const Classes = () => {
    const [classes, setClasses] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchClasses = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/getAllClasses`);
                setClasses(response.data);
            } catch (error) {
                console.error("Error fetching classes:", error);
            }
        };

        fetchClasses();
    }, [refresh]);

    const renderStars = (rating) => {
        const stars = [];
        for (let i = 0; i < rating; i++) {
            stars.push(<i key={i} className="fa fa-star" />);
        }
        return stars;
    };

    const userDetails = async (classItem) => {
        try {
            const AuthStr = 'Bearer '.concat(localStorage.getItem('token'));
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/clients/checkIfRegisterClass`,
                {
                    classId: classItem._id,
                },
                {
                    headers: {
                        "Authorization": AuthStr
                    }
                }
            );

            if (response.data.success === false) {
                Swal.fire({
                    title: "Failed",
                    text: `${response.data.message}!`,
                    icon: "info"
                });
                return;
            }

            if (response.data.success === true) {
                localStorage.setItem('classId', classItem._id);
                navigate('/user-details', {
                    state: { totalPrice: classItem.money, CustomMessage: "Class" }
                });
            }
        } catch (error) {
            console.error("Error fetching purchase history:", error);
        }
    }

    return (
        <>
            <div className="page-content bg-white">
                <PageTitle activePage="Classes" parentTitle="Classes" />
                <section className="content-inner overflow-hidden">
                    <div className="container">
                        <div className="row">
                            {classes.map((classItem, index) => (
                                // className="col-xl-3 col-md-6 m-b30" 
                                <div className="col-xl-3 col-md-6 m-b30" key={index}>
                                    <div className="icon-bx-wraper style-1 box-hover">
                                        <div className="icon-content">
                                            <h4 className="dz-title m-b10">{classItem.topic}</h4>
                                            <p className="m-b5" style={{ fontSize: '0.75rem', opacity: '0.8', color: '#fff' }}><b>Instructor:</b> <b style={{ opacity: '0.6' }}>{classItem.instructor}</b></p>
                                            <div className="m-b5"><b>{classItem.rating}  </b>{renderStars(classItem.rating)}</div>
                                            <p className="m-b25"><b>Price: </b><b style={{ opacity: '0.9', color: '#D6DAC8' }}> ${classItem.money}</b></p>
                                            <br></br>
                                            <p className="m-b20" style={{ fontSize: '0.9rem' }}><b>Availability: </b> <b style={{ opacity: '0.6' }}>{classItem.remainCapacity}/{classItem.Capacity}</b></p>
                                            <p className="m-b20" style={{ fontSize: '0.9rem' }}><b>Date: </b><b style={{ opacity: '0.6' }}>{new Date(classItem.date).toLocaleDateString()}</b></p>
                                            <p className="m-b20" style={{ fontSize: '0.9rem' }}><b>Time: </b> <b style={{ opacity: '0.6' }}>{classItem.starttime} - {classItem.endtime}</b></p>
                                            <p className="m-b15" style={{ fontSize: '0.9rem' }}><b>Tags: </b><b style={{ opacity: '0.9' }}>{classItem.tags.map(tag => <span key={tag} className="badge badge-success  me-1" style={{ borderRadius: '0.5rem', backgroundColor: '#61481C' }}>{tag}</span>)}</b></p>
                                            <Button style={{ color: "black", marginTop: '1rem' }} className="btn btn-primary shadow-primary btn-skew" onClick={() => userDetails(classItem)}><span>Register</span></Button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
};

export default Classes;