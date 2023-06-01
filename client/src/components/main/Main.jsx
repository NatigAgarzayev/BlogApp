import React from 'react'
import './Main.css'
import postImage1 from '../../images/post__image.jpg'
import postImage2 from '../../images/post__image2.jpg'
import postImage3 from '../../images/post__image3.jpg'


function Main() {
    return (
        <div className="main">
            <div className="container">
                <div className="banner">
                    THE BLOG
                </div>
                <div className="post__section">
                    All blog posts
                </div>
                <div className="posts">
                    <div className="posts__item">
                        <div className="post__image">
                            <img src={postImage1} alt="post_img" />
                        </div>
                        <div className="post__info">
                            <div className="post__author">Alec Whitten</div>
                            <span>•</span>
                            <div className="post__time"> 1 Jan 2023</div>
                        </div>
                        <div className="post__title">Bill Walsh leadership lessons</div>
                        <div className="post__text">Like to know the secrets of transforming a 2-14 team into a 3x Super Bowl winning Dynasty?</div>
                        <div className="post__categories">
                            <div className="post__categories-item">Leadership</div>
                        </div>
                    </div>
                    <div className="posts__item">
                        <div className="post__image">
                            <img src={postImage2} alt="post_img" />
                        </div>
                        <div className="post__info">
                            <div className="post__author">Alec Whitten</div>
                            <span>•</span>
                            <div className="post__time"> 1 Jan 2023</div>
                        </div>
                        <div className="post__title">Bill Walsh leadership lessons</div>
                        <div className="post__text">Like to know the secrets of transforming a 2-14 team into a 3x Super Bowl winning Dynasty?</div>
                        <div className="post__categories">
                            <div className="post__categories-item">Leadership</div>
                        </div>
                    </div>
                    <div className="posts__item">
                        <div className="post__image">
                            <img src={postImage3} alt="post_img" />
                        </div>
                        <div className="post__info">
                            <div className="post__author">Alec Whitten</div>
                            <span>•</span>
                            <div className="post__time"> 1 Jan 2023</div>
                        </div>
                        <div className="post__title">Bill Walsh leadership lessons</div>
                        <div className="post__text">Like to know the secrets of transforming a 2-14 team into a 3x Super Bowl winning Dynasty?</div>
                        <div className="post__categories">
                            <div className="post__categories-item">Leadership</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Main