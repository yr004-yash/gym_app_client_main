import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IMAGES } from '../constants/theme';
import NewsLetter from '../elements/NewsLetter';
import PageTitle from '../elements/PageTitle';
import axios from 'axios';
import Swal from 'sweetalert2';

const pricingBlog = [
    { rate: '49', title: 'Basic', prime: 'premium' },
    { rate: '59', title: 'Ultra' },
    { rate: '69', title: 'Pro' },
];

const Pricing = () => {
    const [hoverEffect, setHoverEffect] = useState(1);
    const navigate = useNavigate();

    const userDetails = async (data) => {
        const { rate } = data;
        try {
            const AuthStr = 'Bearer '.concat(localStorage.getItem('token'));
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/clients/checkIfRegisterMembership`,
                {
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
                localStorage.setItem('rate', data.rate);
                localStorage.setItem('title', data.title);
                navigate('/user-details', {
                    state: { totalPrice: rate, CustomMessage: "Membership" }
                });
            }
        } catch (error) {
            console.error("Error fetching purchase history:", error);
        }
    }

    // const buyMembership = async (data) => {
    //     try {
    //         const AuthStr = 'Bearer '.concat(localStorage.getItem('token'));
    //         const response = await axios.post("http://localhost:5000/api/clients/membership",
    //             {
    //                 name: data.title,
    //                 price: data.rate,
    //                 duraion: 30,
    //             },
    //             {
    //                 headers: {
    //                     "Authorization": AuthStr
    //                 }
    //             }
    //         );

    //         if(response.data.success === false) {
    //             Swal.fire({
    //                 title: "Failed",
    //                 text: `${response.data.message}!`,
    //                 icon: "info"
    //             });
    //             return;
    //         }
    //         Swal.fire({
    //             title: "Success",
    //             text: "You are registered this membership!",
    //             icon: "success"
    //         });
    //         setRefresh(!refresh);
    //     } catch (error) {
    //         console.error("Error fetching purchase history:", error);
    //     }
    // };

    return (
        <>
            <div className="page-content bg-white">
                <PageTitle activePage={'Pricing'} parentTitle="Pages" />
                <section className="content-inner rounded-shape-top overflow-hidden" style={{ backgroundImage: "url(" + IMAGES.BgImage1 + ")" }}>
                    <div className="container">
                        <div className="row">
                            {pricingBlog.map((data, ind) => (
                                <div className="col-lg-4 col-md-6 m-b30" key={ind}>
                                    <div className={`pricingtable-wrapper box-hover style-1 ${ind === hoverEffect ? 'active' : ''}`}
                                        onMouseEnter={() => setHoverEffect(ind)}
                                    >
                                        <div className="pricingtable-inner">
                                            <div className={`pricingtable-title ${data.prime}`} >{data.title}</div>

                                            <div className="pricingtable-price">
                                                <h2 className="pricingtable-bx text-primary">${data.rate}<small>/ Month</small></h2>
                                                <p>A good choice when working remotely With Your Clients</p>
                                            </div>
                                            <ul className="pricingtable-features">
                                                <li>Review Your Question</li>
                                                <li>Work with Resources</li>
                                                <li>Social Media Marketing</li>
                                                <li>Analysis of Your "I Have"</li>
                                                <li>Support & Mentoring</li>
                                            </ul>
                                            <div className="pricingtable-footer">
                                                <button className="btn btn-primary btn-skew" onClick={() => userDetails(data)}><span>Purchase</span></button>
                                            </div>
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

export default Pricing;