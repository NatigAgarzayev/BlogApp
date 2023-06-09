import React, { useState } from 'react'
import "./AddPost.css"
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import axios from "axios"
import { useNavigate } from 'react-router-dom'
import { useSelector } from "react-redux"
import moment from 'moment'


function AddPost() {
    const { user } = useSelector(state => state.auth)
    const [title, setTitle] = useState("")
    const [value, setValue] = useState("")
    const [img, setImg] = useState("")
    const [cat, setCat] = useState(null)
    const nav = useNavigate()
    const handleCreatePost = async () => {
        try {
            if (title.trim() === "" || value.trim() === "") return
            const dateNow = moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
            console.log(dateNow)
            const data = {
                title: title,
                desc: value,
                date: dateNow,
                img: img,
                uid: user.id,
                cat: cat,
                owner: user.username,
            }
            await axios.post("/posts", data).then(() => nav("/"))
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="addpost">
            <div className="container">
                <div className="addpost__content">
                    <div className="forms">
                        <h2>Title</h2>
                        <input maxLength={85} type="text" placeholder="Write your title here..." value={title} onChange={e => setTitle(e.target.value)} />
                        <h2>Text</h2>
                        <div className="text__editor">
                            <ReactQuill className="textarea__react" theme="snow" value={value} onChange={setValue} />
                        </div>
                        <button onClick={handleCreatePost} className='button__post'>Post</button>
                    </div>
                    <div className="options">
                        <div className="upload__image">
                            <h2>Upload Image</h2>
                            <label htmlFor="file">Paste the url of img for the post</label>
                            <input type="text" name="" id="file" value={img} onChange={(e) => setImg(e.target.value)} placeholder='Paste here...' />
                            <button onClick={() => setImg("")} className="btn__delete">Remove the image</button>
                        </div>
                        <div className="categories">
                            <h2>Category:</h2>
                            <div className="categ">
                                <div className="cat">
                                    <input type="radio" name="cat" id="art" value="Art" onChange={e => setCat(e.target.value)} />
                                    <label htmlFor="art">Art</label>
                                </div>
                                <div className="cat">
                                    <input type="radio" name="cat" id="food" value="Food" onChange={e => setCat(e.target.value)} />
                                    <label htmlFor="food">Food</label>
                                </div>
                                <div className="cat">
                                    <input type="radio" name="cat" id="Science" value="Science" onChange={e => setCat(e.target.value)} />
                                    <label htmlFor="Science">Science</label>
                                </div>
                                <div className="cat">
                                    <input type="radio" name="cat" id="sport" value="Sport" onChange={e => setCat(e.target.value)} />
                                    <label htmlFor="sport">Sport</label>
                                </div>
                                <div className="cat">
                                    <input type="radio" name="cat" id="Tech" value="Tech" onChange={e => setCat(e.target.value)} />
                                    <label htmlFor="Tech">Tech</label>
                                </div>
                                <div className="cat">
                                    <input type="radio" name="cat" id="Design" value="Design" onChange={e => setCat(e.target.value)} />
                                    <label htmlFor="Design">Design</label>
                                </div>
                                <div className="cat">
                                    <input type="radio" name="cat" id="cinema" value="Cinema" onChange={e => setCat(e.target.value)} />
                                    <label htmlFor="cinema">Cinema</label>
                                </div>
                                <div className="cat">
                                    <input type="radio" name="cat" id="game" value="Game" onChange={e => setCat(e.target.value)} />
                                    <label htmlFor="game">Game</label>
                                </div>
                                <div className="cat">
                                    <input type="radio" name="cat" id="people" value="People" onChange={e => setCat(e.target.value)} />
                                    <label htmlFor="people">People</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddPost