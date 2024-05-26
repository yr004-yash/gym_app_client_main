import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ClientSlider from '../components/ClientSlider';
import { IMAGES, SVGICON } from '../constants/theme';
import LatestSlider from '../elements/LatestSlider';
import NewsLetter from '../elements/NewsLetter';
import PageTitle from '../elements/PageTitle';
import WorkoutSlider from '../elements/WorkoutSlider';
import Swal from 'sweetalert2';
import axios from 'axios';

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
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/getAllProducts`);

                setProducts(response.data);

                // console.log(response.data.products);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        // Call the fetchproducts function
        fetchProducts();
    }, []);

    const addProduct = async (product) => {
        try {

            const AuthStr = 'Bearer '.concat(localStorage.getItem('token'));
            await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/clients/${product._id}/cart`,
                {
                    name: product.name,
                    description: product.description,
                    rating: product.rating,
                    image: product.image,
                    money: product.money,
                    availability: product.availability,
                    code: product.code,
                    tags: JSON.stringify(product.tags),
                    size: product.size,
                    brand: product.brand,
                },
                {
                    headers: {
                        "Authorization": AuthStr
                    },
                });

            Swal.fire({
                title: "Success!",
                text: "Product is added to cart!",
                icon: "success"
            });
        } catch (error) {
            console.error("Error adding trainer:", error);
        }
    };

    const checkAuth = async (product) => {
        try {
            const AuthStr = 'Bearer '.concat(localStorage.getItem('token'));
            const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/clients/auth`, {
                headers: {
                    "Authorization": AuthStr
                }
            });
            await addProduct(product);
        } catch (e) {
            navigate('/login');
            console.log(e);
        }
    }

    const selectedSize = (e, product) => {
        const updatedProducts = products.map(products => {
            if (products._id === product._id) {
                return { ...products, size: e.target.value };
            }
            return products;
        });
        setProducts(updatedProducts);
    }
    return (
        <>
            <div className="page-content bg-white">
                <PageTitle activePage="Services" parentTitle="Services" />
                <section className="content-inner overflow-hidden" >
                    <div className="container">
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
                                            <div className="m-b10">
                                                <label htmlFor={`size_${index}`}><b>Size:</b></label>
                                                <select id={`size_${index}`} name={`size_${index}`} onChange={(e) => selectedSize(e, product)}>
                                                    <option value="xs">XS</option>
                                                    <option value="sm">SM</option>
                                                    <option value="md">MD</option>
                                                    <option value="lg">LG</option>
                                                    <option value="xl">XL</option>
                                                </select>
                                            </div>

                                            <Link onClick={() => checkAuth(product)} style={{ color: "black", marginTop: '1rem' }} className="btn btn-primary shadow-primary btn-skew"><span>Add to cart</span></Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
                {/* <section className="content-inner portfolio-wrapper">
                    <div className="portfolio-wrapper-inner">
                        <div className="container-fluid  p-0">
                            <WorkoutSlider />
                        </div>
                    </div>
                    <svg className="shape-up" width="635" height="107" viewBox="0 0 635 107" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M577 0L-16 107L635 45L577 0Z" fill="var(--primary-dark)" />
                    </svg>
                    <svg className="shape-down" width="673" height="109" viewBox="0 0 673 109" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M682 0L0 56L682 109V0Z" fill="var(--primary)" />
                    </svg>
                </section> */}
                {/* <section className="content-inner-1 testimonial-wrapper1" data-text="FEEDBACK" style={{ backgroundImage: "url(" + IMAGES.BgImage2 + ")", backgroundPosition: "center" }}>
                    <div className="container">
                        <div className="section-head text-center">
                            <h5 className="sub-title">TESTIMONIAL</h5>
                            <h2 className="title">What Client Say’s</h2>
                        </div>
                        <ClientSlider />

                    </div>
                    <div className="avatar1"><img src={IMAGES.avatarlarge1} alt="" /></div>
                    <div className="avatar2"><img src={IMAGES.avatarlarge2} alt="" /></div>
                    <div className="avatar3"><img src={IMAGES.avatar3} alt="" /></div>
                    <div className="avatar4"><img src={IMAGES.avatarlarge1} alt="" /></div>
                    <div className="avatar5"><img src={IMAGES.avatarlarge2} alt="" /></div>
                    <div className="avatar6"><img src={IMAGES.avatar3} alt="" /></div>
                    <img className="svg-shape rotate-360" src={SVGICON.circlebigSvg1} alt="" />
                    <img className="svg-shape-2 rotate-360" src={SVGICON.circlebigSvg2} alt="" />
                </section> */}
                {/* <section className="content-inner-1 overflow-hidden" style={{ backgroundImage: "url(" + IMAGES.BgImage1 + ")" }}>
                    <LatestSlider />
                </section> */}

            </div>
        </>
    );
};

export default Services;