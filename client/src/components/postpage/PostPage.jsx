import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from "react-router-dom"
import "./PostPage.css"
import moment from "moment"
import axios from "axios"
import { useSelector } from 'react-redux'
import { checkIsAuth } from "../../features/authSlice"

function PostPage() {

    const [post, setPost] = useState()
    const { id } = useParams()
    const { user } = useSelector(state => state.auth)
    const isAuth = useSelector(checkIsAuth)
    const nav = useNavigate()
    useEffect(() => {
        const fetchPost = async () => {
            const res = await axios.get(`/posts/${id}`)
            setPost(res.data)
        }
        fetchPost()
    }, [isAuth])

    const getText = (html) => {
        const doc = new DOMParser().parseFromString(html, "text/html")
        return doc.body.textContent
    }

    const handleDeletePost = async (id) => {
        try {
            await axios.delete(`/posts/${id}`).then(() => nav("/"))
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            {
                !isAuth ? <div className="not__ava">You should be logged in/registered to see the post.</div>
                    :
                    (

                        <div className="postpage">
                            <div className="container">
                                <div className="post__title2">{post?.title}</div>
                                <div className="post__info2">
                                    <div className="post__owner">{post?.username}</div>
                                    <span>•</span>
                                    <div className="post__date">{moment(post?.date).fromNow()}</div>
                                </div>
                                <div className="post__img">
                                    {
                                        post?.img ?
                                            <img src={post.img} alt="post_img" />
                                            :
                                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBKEGmmEQ4WlpXIfdqhhaFbJER2pXMLOFU3A&usqp=CAU" alt="post_img" />
                                    }
                                </div>
                                <div className="post__text2">{getText(post?.desc)}</div>
                                {
                                    isAuth && post?.uid === user?.id &&
                                    (<div className="actions">
                                        <button onClick={() => handleDeletePost(post.id)} className="delete__btn">Delete</button>
                                        <button onClick={() => nav(`/update/${post.id}`)} className="update__btn">Update</button>
                                    </div>)
                                }
                            </div>
                        </div>
                    )
            }
        </>
    )
}

export default PostPage