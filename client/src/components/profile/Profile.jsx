import React, { useEffect, useState } from 'react'
import "./Profile.css"
import { useSelector } from 'react-redux'
import axios from 'axios'
import moment from "moment"
import { useNavigate } from 'react-router-dom'
import noimg from "../../images/noimg.webp"
import nopostimg from "../../images/nopost.png"
function Profile() {

    const { user } = useSelector(state => state.auth)
    const [posts, setPosts] = useState([])
    const [avatar, setAvatar] = useState()
    const [avaImg, setAvaImg] = useState(user?.img)
    const nav = useNavigate()


    useEffect(() => {
        const fetchUserPosts = async () => {
            try {
                const res = await axios.get("/users")
                setPosts(res.data.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchUserPosts()
    }, [])

    const handleSinglePost = (id) => {
        nav(`/${id}`)
    }

    const getText = (html) => {
        const doc = new DOMParser().parseFromString(html, "text/html")
        return doc.body.textContent
    }

    const handleAvatar = async () => {
        try {
            console.log(avaImg)
            await axios.put("/users/avatar", { img: avaImg })
            setAvatar(false)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="profile">
            {
                avatar &&
                (
                    <>
                        <div onClick={() => setAvatar(false)} className="overlay3"></div>
                        <div className="avatar__content">
                            <h3>Your avatar: </h3>
                            <input className="form__input" name="img" type="text" value={avaImg} onChange={(e) => setAvaImg(e.target.value)} placeholder="Your profile image url.." />
                            <button onClick={handleAvatar} className='profile__btn1'>Save image</button>
                        </div>
                    </>
                )
            }
            <div className="container">
                <div className="profile__content">
                    <ul className="profile__list">
                        <li onClick={() => setAvatar(true)} className="profile__list-item">
                            {
                                user?.img ? <img src={user.img} alt="profile" /> : <img src={noimg} alt="profile" />
                            }
                        </li>
                        <li className="profile__list-item">
                            {user?.username}
                        </li>
                    </ul>
                </div>
                <h2 className='posts__title'>My posts:</h2>
                {
                    posts.length ?
                        <div className='posts'>
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
                        :
                        <div className='no__posts'>You don't have any posts :( </div>
                }
            </div>
        </div>
    )
}
/* 
<ul className="post__list">
                            </ul> */
export default Profile