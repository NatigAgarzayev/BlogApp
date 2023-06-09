import { db } from "../db.js"

export const getPosts = (req, res) => {
    const q = "SELECT * FROM posts"

    db.query(q, [], (err, data) => {
        if(err) return res.json({message: err})

        res.json(data)
    })
    
}
export const getPostById = (req, res) => {
    const q = "SELECT p.id, `username`, `title`, `desc`, p.img, u.img AS userImg, `uid`, `cat`,`date` FROM users u JOIN posts p ON u.id = p.uid WHERE p.id = ? "

    db.query(q, [req.params.id], (err, data) => {
        if(err) return res.json({message: err})

        return res.json(data[0])
    })

}
export const createPost = (req, res) => {
    const q = "INSERT INTO posts(`title`, `desc`, `date`, `img`, `uid`, `cat`, `owner`) VALUES (?)"
    const values = [
        req.body.title,
        req.body.desc,
        req.body.date,
        req.body.img,
        req.body.uid,
        req.body.cat,
        req.body.owner,
    ]
    db.query(q, [values], (err, data) => {
        if(err) return res.json({message: err})

        return res.status(200).json({message: "Post has been created."})
    })

}
export const deletePost = (req, res) => {
    const q = "DELETE FROM posts WHERE id = ?"

    db.query(q, [req.params.id], (err, data) => {
        if(err) return res.json({message: err})

        res.json({message: "Post has been deleted."})
    })
}

export const updatePost = (req, res) => {
    const q = "UPDATE posts SET `title` = ?, `desc` = ?, `img` = ?, `cat` = ? WHERE `id` = ?"

    const values = [
        req.body.title,
        req.body.desc,
        req.body.img,
        req.body.cat,
    ]

    db.query(q, [...values, req.params.id], (err, data) => {
        if(err) return res.json({message: err})

        return res.status(200).json({message: "Post has been updated."})
    })
}