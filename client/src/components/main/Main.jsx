import React, { useEffect, useState } from 'react'
import './Main.css'
import axios from 'axios'
import moment from "moment"
import { useNavigate } from 'react-router-dom'
import nopostimg from "../../images/nopost.png"

function Main() {

    const [posts, setPosts] = useState([])
    const nav = useNavigate()

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const res = await axios.get("/posts")
                setPosts(res.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchPost()
    }, [])

    const handleSinglePost = (id) => {
        nav(`/${id}`)
    }
    const getText = (html) => {
        const doc = new DOMParser().parseFromString(html, "text/html")
        return doc.body.textContent
    }
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
                    {
                        posts && posts.map(item => (
                            <div key={item.id} onClick={() => handleSinglePost(item.id)} className="posts__item">
                                <div className="post__image">
                                    {
                                        item.img ?
                                            <img src={item.img} alt="post_img" />
                                            :
                                            <img src={nopostimg} alt="post_img" />
                                    }
                                </div>
                                <div className="post__info">
                                    <div className="post__author">{item.owner}</div>
                                    <span>•</span>
                                    <div className="post__time">{moment(item.date).fromNow()}</div>
                                </div>
                                <div className="post__title">{item.title}</div>
                                <div className="post__text">{getText(item.desc)}</div>
                                <div className="post__categories">
                                    <div className="post__categories-item">{item.cat}</div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}
/* 
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
*/

export default Main