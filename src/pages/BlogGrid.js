import React,{useState,useEffect} from 'react';
import {Link} from 'react-router-dom';
import ModalVideo from 'react-modal-video'
import 'react-modal-video/css/modal-video.min.css';
import { IMAGES } from '../constants/theme';
import BlogGridSlider from '../elements/BlogGridSlider';
import NewsLetter from '../elements/NewsLetter';
import PageTitle from '../elements/PageTitle';
import axios from 'axios';

const cardBlog = [
    {image1: IMAGES.bloggrid1, image2: IMAGES.avatar1, author: "Jone Doe", title:"How to keep your Body.", date:"17 May 2023", },
    {image1: IMAGES.bloggrid2, image2: IMAGES.avatar2, author: "Frenchi", title:"Best 50 Tips For Fitness.", date:"18 May 2023", },
    {image1: IMAGES.bloggrid3, image2: IMAGES.avatar3, author: "Bucher", title:"The Philosophy Of Fitness.", date:"22 May 2023", },
    {image1: IMAGES.bloggrid4, image2: IMAGES.avatar1, author: "Jemmy", title:"Fitness Strategies For Beginners.", date:"24 May 2023", },
];
const cardBlog2 = [
    {image1: IMAGES.bloggrid6, image2: IMAGES.avatar1, author: "Atrin", title:"14 Days To A Better Fitness.", date:"17 May 2023", },
    {image1: IMAGES.bloggrid7, image2: IMAGES.avatar2, author: "Deep", title:"3 Ways Create Better Fitness.", date:"16 May 2023", },
    {image1: IMAGES.bloggrid8, image2: IMAGES.avatar3, author: "Noare", title:"What Can You Do About Fitness.", date:"22 May 2023", },
];



const BlogGrid = () => {
    const [isOpen, setOpen] = useState(false);
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/getAllBlogs`);

                setBlogs(response.data);

                // console.log(response.data.blogs);
            } catch (error) {
                console.error("Error fetching blogs:", error);
            }
        };

        // Call the fetchBlogs function
        fetchBlogs();
    }, []);

    return (
        <>
            <div className="page-content bg-white">
                <PageTitle activePage="Blog Grid" parentTitle="Blog" />
                <section className="content-inner">
                    <div className="container">
                        <div className="row">
                            {blogs.map((blog, index) => (
                                <div className="col-md-6 col-lg-4 mb-4" style={{padding:'1.8rem'}} key={index}>
                                    <div className="card h-100">
                                        <img
                                            className="card-img-top"
                                            src={`${process.env.REACT_APP_BACKEND_URL}/${blog.image}`}
                                            alt=""
                                            style={{ width: "100%", height: "200px", objectFit: "cover" }}
                                        />
                                        <div className="card-body" style={{backgroundColor:'3E3232', borderRadius:'0rem'}}>
                                            <div className="d-flex justify-content-between align-items-center mb-2" style={{paddingBottom:'2.5rem'}}>
                                                <div className="author">
                                                 <img src={IMAGES.avatar1} alt="" className="me-1" />
                                                    <span style={{fontSize:'0.7rem'}}>By {blog.author}</span>
                                                </div>
                                                <div className="date" style={{fontSize:'0.7rem'}}>
                                                    <span>{new Date(blog.date).toLocaleDateString()}</span>
                                                </div>
                                            </div>
                                            <h5 className="card-title" style={{marginBottom:'1rem'}}>
                                                <Link to={`/blog-details/${blog._id}`}>{blog.title}</Link>
                                            </h5>
                                            <div style={{opacity:'0.7'}} dangerouslySetInnerHTML={{ __html: blog.content.substring(0, 80) + "....." }}></div>
                                            <Link to={`/blog-details/${blog._id}`} className="btn btn-primary btn-sm mt-3">
                                                Read More
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
                {/* <section className="call-action style-1 footer-action">
                    <div className="container">
                        <NewsLetter />
                    </div>
                </section> */}
            </div>
            <ModalVideo channel='youtube' autoplay isOpen={isOpen} videoId="X_9VoqR5ojM" onClose={() => setOpen(false)} />
        </>
    );
};

export default BlogGrid;