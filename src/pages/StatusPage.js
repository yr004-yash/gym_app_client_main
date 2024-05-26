import React, { useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import PageTitle from '../elements/PageTitle';
import axios from 'axios';
import Swal from 'sweetalert2';

const UserDetails = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { state } = location;

    // This is the data that we get from the payment gateway after the payment is done
    
    // state : {
    //     TransactionId,
    //     CustomMessage,
    //     PaymentStatus,
    //     OrderId,
    //     Amount,
    //     CurrencyCode,
    //     OrderReceiptLink,
    //     CustomMessage, // Membership, Class, Cart
    // };

    useEffect(() => {
        if (state && state?.CustomMessage) {
            console.log('Payment Data:', state.CustomMessage);
            if (state.CustomMessage === "Membership") {
                const buyMembership = async (data) => {
                    try {
                        const AuthStr = 'Bearer '.concat(localStorage.getItem('token'));
                        const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/clients/membership`,
                            {
                                name: localStorage.getItem('rate'),
                                price:  localStorage.getItem('title'),
                                duraion: 30,
                            },
                            {
                                headers: {
                                    "Authorization": AuthStr
                                }
                            }
                        );

                        Swal.fire({
                            title: "Success",
                            text: "You are registered this membership!",
                            icon: "success"
                        });

                        localStorage.removeItem('rate');
                        localStorage.removeItem('title');
                    } catch (error) {
                        console.error("Error fetching purchase history:", error);
                    }
                };

                buyMembership();
            }

            if (state.CustomMessage === "Class") {
                const buyClass = async (classItem) => {
                    try {
                        const AuthStr = 'Bearer '.concat(localStorage.getItem('token'));
                        const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/clients/class`,
                            {
                                classId: localStorage.getItem('classId'),
                            },
                            {
                                headers: {
                                    "Authorization": AuthStr
                                }
                            }
                        );

                        Swal.fire({
                            title: "Success",
                            text: "You are registered in this class!",
                            icon: "success"
                        });

                        localStorage.removeItem('classId')
                    } catch (error) {
                        console.error("Error fetching purchase history:", error);
                    }
                };

                buyClass();
            }

            if (state.CustomMessage === "Cart") {
                const buyAllOrders = async () => {
                    try {
                        const AuthStr = 'Bearer '.concat(localStorage.getItem('token'));
                        const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/clients/orders`,
                            {
                            },
                            {
                                headers: {
                                    "Authorization": AuthStr,
                                    'Accept': '*/*',
                                }
                            }
                        );

                        Swal.fire({
                            title: "Success",
                            text: "You've purchased all the products!",
                            icon: "success"
                        });
                    } catch (error) {
                        console.error("Error updating cart products:", error);
                    }
                }

                buyAllOrders();
            }
        } else {
            console.error('No payment data found in redirect');
        }
    }, [location]);

    return (
        <>
            <div className="page-content bg-white">
                <PageTitle activePage="User Details" parentTitle="User Details" />
                <section className="content-inner overflow-hidden">
                    <div className="container">
                    </div>
                </section>
            </div>
        </>
    );
};

export default UserDetails;