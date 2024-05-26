import React from 'react';
import {Link} from 'react-router-dom';
import { IMAGES } from '../constants/theme';
import BlogSidebar from '../elements/BlogSidebar';
import NewsLetter from '../elements/NewsLetter';
import PageTitle from '../elements/PageTitle';


const mediaBlog = [
    {image1: IMAGES.bloglarg1, image2: IMAGES.avatar1, author: "Jone Doe", title:"Learn About Fitness From These Mistakes In 60 Seconds.", date:"17 May 2023", },
    {image1: IMAGES.bloglarg2, image2: IMAGES.avatar2, author: "Frenchi", title:"Learn Truth About Fitness In The Next 60 Seconds.", date:"18 May 2023", },
    {image1: IMAGES.bloglarg5, image2: IMAGES.avatar3, author: "Bucher", title:"5 Things Everyone Gets Wrong About Fitness.", date:"22 May 2023", },
    {image1: IMAGES.bloglarg4, image2: IMAGES.avatar1, author: "Jemmy", title:"15 Hilarious Videos About Fitness.", date:"24 May 2023", },
];

const BlogLargeSidebar = () => {
    return (
        <>
            <div className="page-content bg-white">
                <PageTitle activePage="Blog Large Sidebar" parentTitle="Blog" />
                <section className="content-inner">
                    <div className="container">
                        <div className="row ">
                            <div className="col-xl-8 col-lg-8">
                                <div className="row">
                                    {mediaBlog.map((item, ind)=>(
                                        <div className="col-lg-12 m-b40" key={ind}>
                                            <div className="dz-card style-1 overlay-shine m-b40">
                                                <div className="dz-media">
                                                    <Link to={"/blog-details"}><img src={item.image1} alt="" /></Link>
                                                </div>
                                                <div className="dz-info">
                                                    <div className="dz-meta">
                                                        <ul>
                                                            <li className="post-author">
                                                                <Link to={"#"}>
                                                                    <img src={item.image2} alt="" /> {" "}
                                                                    <span>By {item.author}</span>
                                                                </Link>
                                                            </li>{" "}
                                                            <li className="post-date"><Link to={"#"}> {item.date}</Link></li>{" "}
                                                            <li className="post-comment"><Link to={"#"}>{1+ind} comment</Link></li>
                                                        </ul>
                                                    </div>
                                                    <h4 className="dz-title"><Link to={"/blog-details"}>{item.title}</Link></h4>
                                                    <p>Donec accumsan enim sit amet dolor rhoncus scelerisque. Suspendisse dictum, enim a interdum facilisis.</p>
                                                    <Link to={"/blog-details"} className="btn btn-primary btn-skew"><span>READ MORE</span></Link>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    <div className="col-lg-12 m-b40">
                                        <nav aria-label="Blog Pagination">
                                            <ul className="pagination text-center m-t20">
                                                <li className="page-item"><Link to={"#"} className="page-link prev"><i className="fas fa-chevron-left"></i></Link></li>
                                                <li className="page-item"><Link to={"#"} className="page-link active"><span>1</span></Link></li>
                                                <li className="page-item"><Link to={"#"} className="page-link"><span>2</span></Link></li>
                                                <li className="page-item"><Link to={"#"} className="page-link"><span>3</span></Link></li>
                                                <li className="page-item"><Link to={"#"} className="page-link"><span>4</span></Link></li>
                                                <li className="page-item"><Link to={"#"} className="page-link next"><i className="fas fa-chevron-right"></i></Link></li>
                                            </ul>
                                        </nav>
                                    </div>
                                    
                                </div>   
                            </div>
                            <div className="col-xl-4 col-lg-4">
                                <BlogSidebar />
                            </div>
                        </div>
                    </div>
                </section>
                <section className="call-action style-1 footer-action">
			        <div className="container">
                        <NewsLetter />
                    </div>
                </section>
   
            </div>   
        </>
    );
};

export default BlogLargeSidebar;


// import React from 'react';
// import {Link} from 'react-router-dom';
// import { IMAGES } from '../constants/theme';
// import BlogSidebar from '../elements/BlogSidebar';
// import NewsLetter from '../elements/NewsLetter';
// import PageTitle from '../elements/PageTitle';

// const Comment = ({image, title}) =>{
//     return(
        
//         <div className="comment-body">
//             <div className="comment-author vcard"> 
//                 <img className="avatar photo" src={image} alt="" />  
//             </div>
//             <div className="comment-info">
//                 <div className="title">
//                     <cite className="fn">{title}</cite>
//                     <span>07 March, 2023</span>
//                 </div>
//                 <p>Integer consectetur diam vitae imperdiet iaculis. In faucibus, sem sit amet tincidunt egestas, magna ligula interdum leo.</p>
//                 <div className="reply"> 
//                     <Link to={"#"} className="comment-reply-link"><span><i className="fa-solid fa-share"></i>REPLY</span></Link> 
//                 </div>
//             </div>
//         </div>
        
//     )
// }

// const BlogDetail = () => {
//     return (
//         <>
//             <div className="page-content bg-white">
//                 <PageTitle activePage="Blog Detail" parentTitle="Blog" />
//                 <section className="content-inner">
//                     <div className="container">
//                         <div className="row ">
//                             <div className="col-xl-8 col-lg-8">
//                                 <div className="blog-single dz-card sidebar">
//                                     <div className="dz-media">
//                                         <img src={IMAGES.bloglarg1} alt=""/>
//                                     </div>
//                                     <div className="dz-info m-b30">
//                                         <div className="dz-meta">
//                                             <ul>
//                                                 <li className="post-author">
//                                                     <Link to={"#"}>
//                                                         <img src={IMAGES.avatar2} alt="" /> {" "}
//                                                         <span>By Jone Doe</span>
//                                                     </Link>
//                                                 </li>{" "}
//                                                 <li className="post-date"><Link to={"#"}> 17 May 2023</Link></li>{" "}
//                                                 <li className="post-comment"><Link to={"#"}>3 comment</Link></li>
//                                             </ul>
//                                         </div>
//                                         <h2 className="dz-title">Learn About Fitness From These Mistakes In The Next 60 Seconds.</h2>
                                        
//                                         <div className="dz-post-text">
//                                             <p>A wonderful serenity has taken possession of my entire soul, like these sweet mornings of spring which I enjoy with my whole heart. I am alone, and feel the charm of existence in this spot, which was created for the bliss of souls like mine. I am so happy</p>
//                                             <p>For the bliss of souls like mine. I am so happy, my dear friend, so absorbed in the exquisite sense of mere tranquil existence, that I neglect my talents. I should be incapable of drawing Link single stroke at the present moment; and yet I feel that I never was a greater artist than now. When, while the lovely valley teems with vapour around me, and the meridian sun strikes the upper surface of the impenetrable foliage of my trees, and but a few stray gleams steal into.</p>
//                                             <blockquote className="wp-block-quote">
//                                                 <p>“ A wonderful serenity has taken possession of my entire soul, like these sweet mornings of spring which I enjoy with my whole heart. I am alone, and feel the charm. ”.</p>
//                                                 <cite> William Son </cite>
//                                             </blockquote>
//                                             <p>The inner sanctuary, I throw myself down among the tall grass by the trickling stream; and, as I lie close to the earth, a thousand unknown plants are noticed by me: when I hear the buzz of the little world among the stalks, and grow familiar with the countless indescribable forms of the insects and flies, then I feel the presence of the Almighty, who formed us in his own image, and the breath.</p>
//                                             <ul className="m-b30">
//                                                 <li>A wonderful serenity has taken possession.</li>
//                                                 <li>Of my entire soul, like these sweet mornings of spring which.</li>
//                                                 <li>I enjoy with my whole heart.</li>
//                                                 <li>This spot, which was created For the bliss of souls like mine.</li>
//                                             </ul>
//                                             <p>The inner sanctuary, I throw myself down among the tall grass by the trickling stream; and, as I lie close to the earth, a thousand unknown plants are noticed by me: when I hear the buzz of the little world among the stalks, and grow familiar with the countless indescribable forms of the insects and flies, then I feel the presence of the Almighty.</p>
//                                         </div>
//                                         <div className="dz-share-post">
//                                             <div className="post-tags">
//                                             <h6 className="m-b0 m-r10 d-inline">Tags:</h6>
//                                                 <Link to={"#"}><span>Corporate</span></Link>
//                                                 <Link to={"#"}><span>Blog</span></Link>
//                                                 <Link to={"#"}><span>Marketing</span></Link>
//                                             </div>
//                                             <div className="dz-social-icon dark">
//                                                 <ul>
//                                                     <li><Link target="_blank" 
//                                                          to="https://www.facebook.com/" rel="noreferrer"
//                                                          >
//                                                             <i className="fab fa-facebook-f" />
//                                                          </Link>
//                                                     </li>
//                                                     <li><Link target="_blank"  to="https://www.instagram.com/" rel="noreferrer">
//                                                             <i className="fab fa-instagram" />
//                                                         </Link>
//                                                     </li>
//                                                     <li><Link target="_blank" to="https://twitter.com/" rel="noreferrer"><i className="fab fa-twitter" /></Link></li>
//                                                     <li><Link target="_blank" to="https://www.youtube.com/" rel="noreferrer" ><i className="fab fa-youtube" /> </Link></li>
//                                                 </ul>
//                                             </div>									
//                                         </div>
//                                     </div>
//                                 </div>
                                
                                
//                                 <div className="clear" id="comment-list">
//                                     <div className="comments-area style-1 clearfix" id="comments">
//                                         <div className="widget-title">
//                                             <h4 className="title">Comments</h4>
//                                         </div>
//                                         <div className="clearfix">
//                                             <ol className="comment-list">
//                                                 <li className="comment">
//                                                      <Comment image={IMAGES.avatarlarge1} title="Lillian Walsh"/>
                                                    
//                                                     <ol className="children">
//                                                         <li className="comment">
//                                                             <Comment image={IMAGES.avatarlarge3} title="Boni Joye" />
//                                                         </li>
//                                                     </ol>
//                                                 </li>
//                                                 <li className="comment">
//                                                     <Comment image={IMAGES.avatarlarge2} title="Lillian Walsh" />
//                                                 </li>
//                                             </ol>
//                                         </div>
                                        
//                                         <div className="widget-title">
//                                             <h4 className="title">Leave A Reply</h4>
//                                         </div>
//                                         <div className="clearfix">
//                                             <div className="default-form comment-respond style-1" id="respond">
//                                                 <form className="comment-form" id="commentform" method="post">
//                                                     <p className="comment-form-author">
//                                                         <label>Name <span className="required">*</span></label>
//                                                         <input type="text" name="FirstName" placeholder="First Name" id="FirstName" />
//                                                     </p>
//                                                     <p className="comment-form-email">
//                                                         <label>Email <span className="required">*</span></label>
//                                                         <input type="text" placeholder="Email" name="email" id="email" />
//                                                     </p>
//                                                     <p className="comment-form-comment">
//                                                         <label>Message</label>
//                                                         <textarea rows="8" name="Message" placeholder="Message" id="Message"></textarea>
//                                                     </p>
//                                                     <p className="form-submit">
//                                                         <button type="submit" className="btn btn-primary btn-skew btn-icon" id="submit"><span>Submit Now</span></button>
//                                                     </p>
//                                                 </form>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                             <div className="col-xl-4 col-lg-4">
//                                 <BlogSidebar />
//                             </div>
//                         </div>
//                     </div>   
//                 </section>
//                 {/* <section className="call-action style-1 footer-action">
// 			        <div className="container">
//                         <NewsLetter />
//                     </div>
//                 </section> */}
//             </div>
//         </>
//     );
// };

// export default BlogDetail;