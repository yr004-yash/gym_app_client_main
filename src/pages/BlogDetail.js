import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { IMAGES } from '../constants/theme';
import BlogSidebar from '../elements/BlogSidebar';
import NewsLetter from '../elements/NewsLetter';
import PageTitle from '../elements/PageTitle';
import axios from 'axios';

const Comment = ({ index }) => {
    return (

        <div className="comment-body">
            {/* <div className="comment-info"> */}
            <div className="dz-meta title">
                <ul>
                    <li>
                        <cite className="fn">{index.user}</cite>
                    </li>{"     "}
                    <li>
                        <span>{new Date(index.date).toLocaleDateString()}</span>
                    </li>
                </ul>

            </div>
            <p>{index.comment}</p>
            <div className="reply">
                <a href="#respond" className="comment-reply-link">
                    <span><i className="fa-solid fa-share"></i>REPLY</span>
                </a>
            </div>
            {/* </div> */}
        </div>

    )
}



const BlogDetail = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [blog, setBlog] = useState(null);
    const [commentData, setCommentData] = useState({ name: '', message: '' });
    const [comments, setComments] = useState([]);
    const [tempcom, setTempcom] = useState(-1);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const blogId = location.pathname.split('/').pop();
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/getAblog/${blogId}`);
                // console.log(response.data);
                setBlog(response.data);

            } catch (error) {
                console.error("Error fetching blog:", error);
            }
        };
        const fetchComments = async () => {
            try {
                const blogId = location.pathname.split('/').pop();
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/getComments/${blogId}`);
                if (response.data) {
                    setComments(response.data);
                }
            } catch (error) {
                console.error("Error fetching comments:", error);
            }
        };

        fetchBlog();
        fetchComments();

    }, [location, tempcom]);
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCommentData({ ...commentData, [name]: value });
    };

    const checkAuth = async () => {
        try {
            const AuthStr = 'Bearer '.concat(localStorage.getItem('token'));
            const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/clients/auth`, {
                headers: {
                    "Authorization": AuthStr
                }
            });
        } catch (e) {
            navigate('/login');
            console.log(e);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        await checkAuth();
        try {
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/saveComment/${blog._id}`, {
                user: commentData.name,
                comment: commentData.message
            });
            setTempcom(1);
            setTempcom(0);
            // You can update the UI accordingly, e.g., refresh comments, show success message, etc.
        } catch (error) {
            console.error('Error saving comment:', error);
            // Handle error (e.g., show error message)
        }
    };


    return (
        <>
            <div className="page-content bg-white">
                {blog ? (
                    <>
                        <PageTitle activePage="Blog Detail" parentTitle="Blog" />
                        <section className="content-inner">
                            <div className="container">
                                <div className="row" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <div className="col-xl-12 col-lg-12" >
                                        <div className="blog-single dz-card sidebar" style={{ borderRadius: '1rem' }}>
                                            <div className="dz-media" style={{ height: "30rem", borderTopLeftRadius: '1rem', borderTopRightRadius: '1rem' }}>
                                                <img
                                                    className="card-img-top"
                                                    src={`${process.env.REACT_APP_BACKEND_URL}/${blog.image}`}
                                                    alt=""
                                                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                                />
                                            </div>
                                            <div className="dz-info m-b30" style={{ padding: '3rem', wordWrap: 'break-word', overflowWrap: 'break-word' }}>
                                                <div className="dz-meta" style={{ marginBottom: '3rem' }}>
                                                    <ul>
                                                        <li className="post-author">

                                                            <img src={IMAGES.avatar2} alt="" /> {" "}
                                                            <span>By {blog.author}</span>

                                                        </li>{" "}
                                                        <li className="post-date">{new Date(blog.date).toLocaleDateString()}</li>{" "}
                                                        <li className="post-comment">{blog.comments ? blog.comments.length : 0} comments</li>
                                                    </ul>
                                                </div>
                                                <h2 className="dz-title" style={{ marginBottom: '1.5rem' }}>{blog.title}</h2>
                                                <h6 style={{ color: 'whitesmoke', opacity: '0.7' }}>Description</h6>
                                                <div className="dz-post-text">
                                                    <div dangerouslySetInnerHTML={{ __html: blog.content }}></div>
                                                </div>


                                                {/* from here edit kr bhai */}
                                                <div className="dz-share-post" style={{ width: '100%', display: 'flex',flexDirection:'column', alignItems: 'center', justifyContent: 'space-between' }}>
                                                    <div className="post-tags" style={{ height:'50%',width: '100%', wordWrap: 'break-word', overflowWrap: 'break-word'}}>
                                                        <h6 className="m-b0 m-r10 d-inline">Tags:</h6>
                                                        {/* <Link to={"#"}><span>Corporate</span></Link>
                                                            <Link to={"#"}><span>Blog</span></Link>
                                                            <Link to={"#"}><span>Marketing</span></Link> */}
                                                        {blog.tags.map(item => (
                                                            item.slice(1, -1).split(',').map(tag => (
                                                                <span style={{opacity:'0.8',color:'black',marginLeft:'0.7rem',borderRadius:'0.6rem',backgroundColor:'#ae7121',paddingLeft:'0.5rem',paddingRight:'0.5rem',padding:'0.1rem'}} key={tag.trim()}>{tag.trim().slice(1, -1)}</span>
                                                            ))
                                                        ))}
                                                    </div>
                                                    <div style={{height:'50%',  width: '100%', display: 'flex', alignItems: 'center' }} className="dz-social-icon dark">
                                                        <ul style={{ width: '100%', display: 'flex' }}>
                                                            <li style={{ margin: '1rem', width: '0.9rem', height: '0.9rem' }}><Link style={{ borderRadius: '0.4rem', padding: '0.2rem' }} target="_blank"
                                                                to="https://www.facebook.com/" rel="noreferrer"
                                                            >
                                                                <i style={{ width: '1.5rem' }} className="fab fa-facebook-f" />
                                                            </Link>
                                                            </li>
                                                            <li style={{ margin: '1rem', width: '0.9rem', height: '0.9rem' }}><Link style={{ borderRadius: '0.4rem', padding: '0.2rem' }} target="_blank" to="https://www.instagram.com/" rel="noreferrer">
                                                                <i style={{ width: '1.5rem' }} className="fab fa-instagram" />
                                                            </Link>
                                                            </li>
                                                            <li style={{ margin: '1rem', width: '0.9rem', height: '0.9rem' }}><Link style={{ borderRadius: '0.4rem', padding: '0.2rem' }} target="_blank" to="https://twitter.com/" rel="noreferrer"><i style={{ width: '1.5rem' }} className="fab fa-twitter" /></Link></li>
                                                            <li style={{ margin: '1rem', width: '0.9rem', height: '0.9rem' }}><Link style={{ borderRadius: '0.4rem', padding: '0.2rem' }} target="_blank" to="https://www.youtube.com/" rel="noreferrer" ><i style={{ width: '1.5rem' }} className="fab fa-youtube" /> </Link></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>


                                        <div className="clear" id="comment-list">
                                            <div className="comments-area style-1 clearfix" id="comments">
                                                <div className="widget-title">
                                                    <h4 className="title">Comments</h4>
                                                </div>
                                                <div className="clearfix">
                                                    <ol className="comment-list">
                                                        {comments.map((comment, index) => (
                                                            <li key={index} className="comment">
                                                                <Comment index={comment} />
                                                            </li>
                                                        ))}
                                                    </ol>
                                                </div>

                                                <div className="widget-title" id="respond">
                                                    <h4 className="title">Leave A Comment</h4>
                                                </div>
                                                <div className="clearfix">
                                                    <div className="default-form comment-respond style-1" >
                                                        <form className="comment-form" id="commentform" onSubmit={handleSubmit}>
                                                            <p className="comment-form-author">
                                                                <label>Name <span className="required">*</span></label>
                                                                <input type="text" name="name" placeholder="Your Name" value={commentData.name} onChange={handleInputChange} required />
                                                            </p>
                                                            <p className="comment-form-comment">
                                                                <label>Message <span className="required">*</span></label>
                                                                <textarea rows="8" name="message" placeholder="Your Comment" value={commentData.message} onChange={handleInputChange} required></textarea>
                                                            </p>
                                                            <p className="form-submit">
                                                                <button type="submit" className="btn btn-primary btn-skew btn-icon" id="submit"><span>Submit Now</span></button>
                                                            </p>
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* <div className="col-xl-4 col-lg-4">
                                <BlogSidebar />
                            </div> */}
                                </div>
                            </div>
                        </section>
                    </>
                ) : (
                    // Render loading or error message when blog is null
                    <div>Loading...</div>
                )}
                {/* <section className="call-action style-1 footer-action">
			        <div className="container">
                        <NewsLetter />
                    </div>
                </section> */}
            </div>
        </>
    );
};

export default BlogDetail;