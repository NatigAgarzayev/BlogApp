import {db} from "../db.js"

export const getUserPosts = (req, res) => {
    const q = "SELECT * FROM posts WHERE uid = ? LIMIT 3"

    db.query(q, [req.userId], (err, data) => {
        if(err) return res.json({message: err})

        return res.json({
            data,
            message: "User's posts received successfully."
        })
    })
}

export const newUserAvatar = (req, res) => {
    const q = "UPDATE users SET `img` = ? WHERE `id` = ?"
    db.query(q, [req.body.img, req.userId], (err, data) => {
        console.log(req.body.img, req.userId)
        if(err) return res.json({message: err})

        return res.json({message: "Avatar has been changed successfully."})
    })
}