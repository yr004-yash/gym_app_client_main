import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ClientSlider from '../components/ClientSlider';
import { IMAGES, SVGICON } from '../constants/theme';
import LatestSlider from '../elements/LatestSlider';
import NewsLetter from '../elements/NewsLetter';
import PageTitle from '../elements/PageTitle';
import WorkoutSlider from '../elements/WorkoutSlider';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/fontawesome-free-solid';
import Swal from 'sweetalert2';

const wrapperBlog = [
    { title: "Right Nutrition", image: IMAGES.boxlog1 },
    { title: "Health & Fitness", image: IMAGES.boxlog2 },
    { title: "Gym & Exercise", image: IMAGES.boxlog3 },
    { title: "Health Motivation", image: IMAGES.boxlog4 },
    { title: "Healthy Heart", image: IMAGES.boxlog5 },
    { title: "Smoothie & Juice", image: IMAGES.boxlog6 },
    { title: "Yoga & Exercise", image: IMAGES.boxlog7 },
    { title: "Health Motivation", image: IMAGES.boxlog8 },
];

const Services = () => {
    const [hover, setHover] = useState(0);
    const [refresh, setRefresh] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0);
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();


    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const AuthStr = 'Bearer '.concat(localStorage.getItem('token'));
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/clients/cart`,
                    {
                        headers: {
                            "Authorization": AuthStr
                        }
                    }
                );

                let priceSum = 0;
                for (let i = 0; i < response.data.cartProducts.length; i++) {
                    priceSum += Number(response.data.cartProducts[i].money) * response.data.cartProducts[i].quantity;
                }

                setProducts(response.data.cartProducts);
                setTotalPrice(priceSum);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        // Call the fetchproducts function
        fetchProducts();
    }, [refresh]);

    const addQuantity = (e, product) => {
        const updatedProducts = products.map(products => {
            if (products._id === product._id) {
                return { ...products, quantity: products.quantity + 1 };
            }
            return products;
        });
        setProducts(updatedProducts);
    };

    const subtractQuanity = (e, product) => {
        const updatedProducts = products.map(products => {
            if (products._id === product._id) {
                if (products.quantity - 1 < 0) {
                    return { ...products, quantity: products.quantity };
                }
                return { ...products, quantity: products.quantity - 1 };
            }
            return products;
        });
        setProducts(updatedProducts);
    }

    const updateQuantity = async (product) => {
        try {
            const { productId } = product.cpId;
            const { size, quantity } = product;
            const AuthStr = 'Bearer '.concat(localStorage.getItem('token'));
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/clients/${productId}/cart/updateQuantity`,
                {
                    size,
                    quantity
                },
                {
                    headers: {
                        "Authorization": AuthStr
                    }
                }
            );

            if (quantity === 0) {
                Swal.fire({
                    title: "Success!",
                    text: "Deleted product from cart!",
                    icon: "success"
                });
            } else {
                Swal.fire({
                    title: "Success!",
                    text: "Updated quantity in cart!",
                    icon: "success"
                });
            }

            setRefresh(!refresh);
        } catch (error) {
            console.error("Error updating cart products:", error);
        }
    }

    // const buyAllOrders = async () => {
    //     try {
    //         const AuthStr = 'Bearer '.concat(localStorage.getItem('token'));
    //         const response = await axios.post(`http://localhost:5000/api/clients/orders`,
    //             {
    //                 Amount: totalPrice,
    //                 CurrencyCode: "JMD",
    //             },
    //             {
    //                 headers: {
    //                     "Authorization": AuthStr,
    //                     'Accept': '*/*',
    //                 }
    //             }
    //         );
    //         setRefresh(!refresh);
    //     } catch (error) {
    //         console.error("Error updating cart products:", error);
    //     }
    // }

    const userDetails = async () => {
        navigate('/user-details', {
            state: { totalPrice: totalPrice, CustomMessage: "Cart" }
        });
    }

    return (
        <>
            <div className="page-content bg-white">
                <PageTitle activePage="Cart" parentTitle="Cart" />
                <section className="content-inner overflow-hidden">
                    <div className="container">
                        <div className='mb-4' style={{ display: 'flex', justifyContent: 'right' }}>
                            <button className="btn btn-primary shadow-primary btn-skew" disabled={(totalPrice > 0) ? false : true} onClick={userDetails}>Buy</button>
                        </div>
                        <div className="row">
                            {products.map((product, index) => (
                                <div className="col-xl-3 col-md-6 m-b30" key={index}>
                                    <div className="icon-bx-wraper style-1 box-hover">
                                        <div className="icon-bx m-b30">
                                            <span className="icon-cell" style={{ width: '100%', height: '100%' }}>
                                                <img className="img-fluid" style={{ objectFit: 'cover', height: '100%', width: '100%' }} src={`${process.env.REACT_APP_BACKEND_URL}/${product.image}`} alt={product.name} />
                                            </span>
                                        </div>
                                        <div className="icon-content">
                                            <h5 className="dz-title m-b10"><Link to={"#"}>{product.name}</Link></h5>
                                            <p className="m-b5" style={{ fontSize: '0.75rem', opacity: '0.8', color: '#fff' }}><b>Brand:</b> <b style={{ opacity: '0.8' }}>{product.brand}</b></p>
                                            <p className="m-b30 "> <b style={{ opacity: '0.6', fontSize: '0.8rem' }}>{product.rating} <div className='fa fa-star'></div></b></p>
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
                                            <p className="m-b10" style={{ display: 'flex', alignItems: 'center' }}>Quantity:
                                                <FontAwesomeIcon icon={faPlus} style={{ cursor: "pointer", borderRadius: '0.6rem', width: '0.8rem', height: '0.8rem', padding: '0.5rem', marginLeft: '0.8rem', marginRight: '0.8rem', backgroundColor: '#61481C' }} onClick={(e) => addQuantity(e, product)} />
                                                {product.quantity}
                                                <FontAwesomeIcon icon={faMinus} style={{ cursor: "pointer", borderRadius: '0.6rem', width: '0.8rem', height: '0.8rem', padding: '0.5rem', marginLeft: '0.8rem', marginRight: '0.8rem', backgroundColor: '#61481C' }} onClick={(e) => subtractQuanity(e, product)} /></p>
                                            <p className="m-b10">Size: {product.size}</p>
                                            <div style={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
                                                <button className="btn btn-primary shadow-primary btn-skew" onClick={() => updateQuantity(product)}>Save</button>
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

export default Services;