import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PageTitle from '../elements/PageTitle';
import axios from 'axios';

const Services = () => {
    const [purchaseHistory, setPurchaseHistory] = useState([]);
    const [orderHistory, setOrderHistory] = useState([]);
    const [classesHistory, setClassesHistory] = useState([]);
    const [membershipHistory, setMembershipHistory] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const purchaseHistory = async () => {
            try {
                const AuthStr = 'Bearer '.concat(localStorage.getItem('token'));
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/clients/purchase/history`,
                    {
                        headers: {
                            "Authorization": AuthStr
                        }
                    }
                );

                const products = {};
                const { purchasedProducts } = response.data?.purchaseHistory[0];
                for (let i = 0; i < purchasedProducts?.length; i++) {
                    if (!products[purchasedProducts[i].products]) {
                        products[purchasedProducts[i].products] = 0;
                    }
                    products[purchasedProducts[i].products] += Number(purchasedProducts[i].quantity);
                }

                const { allPurchasedProducts } = response.data?.purchaseHistory[0];
                for (let i = 0; i < allPurchasedProducts?.length; i++) {
                    allPurchasedProducts[i]['quantity'] = products[allPurchasedProducts[i]._id];
                }

                setMembershipHistory(response.data?.purchaseHistory[0]?.purchasedMembership);
                setClassesHistory(response.data?.purchaseHistory[0]?.purchasedClasses);
                setPurchaseHistory(response.data?.purchaseHistory[0]);
                setOrderHistory(allPurchasedProducts);
            } catch (error) {
                console.error("Error fetching purchase history:", error);
            }
        }
        purchaseHistory();
    }, []);

    const onLogout = async () => {

        const AuthStr = 'Bearer '.concat(localStorage.getItem('token'));
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/clients/logout`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": AuthStr
                },
                credentials: "include"
            });
            if (response) {
                localStorage.removeItem('token');
                localStorage.removeItem('name');
                localStorage.removeItem('id');
                navigate('/', { replace: true });
            }
        }
        catch (err) {
            console.log(err);
        }

    }

    const renderStars = (rating) => {
        const stars = [];
        for (let i = 0; i < rating; i++) {
            stars.push(<i key={i} className="fa fa-star" />);
        }
        return stars;
    };

    return (
        <>
            <div className="page-content bg-white">
                <PageTitle activePage="Profile" parentTitle="Profile" />
                <section className="content-inner overflow-hidden">
                    <div className="container">
                        <div className="row mb-4">
                            <div className="col-lg-6">
                                <div className="input-group input-line">
                                    <input
                                        value={purchaseHistory.email}
                                        required
                                        type="text"
                                        className="form-control"
                                        placeholder="Email"
                                        disabled
                                    />
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="input-group input-line">
                                    <input
                                        value={purchaseHistory.name}
                                        required
                                        type="text"
                                        className="form-control"
                                        placeholder="Username"
                                        disabled
                                    />
                                </div>
                            </div>
                            <Link disabled style={{ color: "black", marginTop: '1rem', cursor:'default' }} className="btn btn-primary shadow-primary btn-skew"><span>Products purchase history</span></Link>
                            {orderHistory.map((product, index) => (
                                <div className="col-xl-3 col-md-6 m-b30 mt-5" key={index}>
                                    <div className="icon-bx-wraper style-1 box-hover">
                                        <div className="icon-bx m-b30">
                                            <span className="icon-cell" style={{ width: '100%', height: '100%' }}>
                                                <img className="img-fluid" style={{ objectFit: 'cover', height: '100%', width: '100%' }} src={`http://localhost:5000/${product.image}`} alt={product.name} />
                                            </span>
                                        </div>
                                        <div className="icon-content">
                                            <h5 className="dz-title m-b10"><Link to={"#"}>{product.name}</Link></h5>
                                            <p className="m-b5" style={{ fontSize: '0.75rem', opacity: '0.8', color: '#fff' }}><b>Brand:</b> <b style={{ opacity: '0.8' }}>{product.brand}</b></p>
                                            <p className="m-b30 "> <b style={{ opacity: '0.6', fontSize: '0.8rem' }}>{product.rating} <div className='fa fa-star'></div></b></p>
                                            <p className="m-b15"><b>Quantity:</b><b style={{ opacity: '0.6', color: '#D6DAC8' }}> {product.quantity}</b></p>
                                            <p className="m-b15"><b>Price:</b><b style={{ opacity: '0.6', color: '#D6DAC8' }}> ${product.money}</b></p>
                                            <p className="m-b10" style={{ fontSize: '0.9rem' }}><b>Availability:</b> <b style={{ opacity: '0.6' }}>{product.availability}</b></p>
                                            <p className="m-b20" style={{ fontSize: '0.9rem' }}><b>Code: </b><b style={{ opacity: '0.6' }}>{product.code}</b></p>
                                            <p className="m-b25"><b>Tags: </b><b style={{ opacity: '0.6' }}>{
                                                product.tags.map(item => (
                                                    item.slice(1, -1).split(',').map(tag => (
                                                        <span key={tag.trim()} className="badge badge-success  me-1" style={{ borderRadius: '0.5rem', backgroundColor: '#61481C' }}>{tag.trim().slice(1, -1)}</span>
                                                    ))
                                                ))
                                            }</b></p>
                                            <div className="m-b10">
                                                <label htmlFor={`size_${index}`}><b>Size: </b>{product.size}</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <Link disabled style={{ color: "black", marginTop: '1rem', cursor:'default' }} className="btn btn-primary shadow-primary btn-skew"><span>Classes purchase history</span></Link>
                            {classesHistory.map((classItem, index) => (
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
                                            
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <Link disabled style={{ color: "black", marginTop: '1rem', cursor:'default' }} className="btn btn-primary shadow-primary btn-skew"><span>Membership purchase history</span></Link>
                            {membershipHistory.map((data, ind) => (
                                <div className="col-lg-4 col-md-6 mt-4 m-b30" key={ind}>
                                    <div className={`pricingtable-wrapper box-hover style-1`}>
                                        <div className="pricingtable-inner">
                                            <div className={`pricingtable-title`} >{data.title}</div>
                                            <div className="pricingtable-price">
                                                <h2 className="pricingtable-bx text-primary">${data.price}<small>/ Month</small></h2>
                                                <p>A good choice when working remotely With Your Clients</p>
                                            </div>
                                            <ul className="pricingtable-features">
                                                <li>Review Your Question</li>
                                                <li>Work with Resources</li>
                                                <li>Social Media Marketing</li>
                                                <li>Analysis of Your "I Have"</li>
                                                <li>Support & Mentoring</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'end' }}>
                            <Link onClick={onLogout} className="btn btn-primary btn-sm mt-3">
                                Logout
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
};

export default Services;