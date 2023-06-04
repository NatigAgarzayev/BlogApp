import {db} from "../db.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export const register = (req, res) => {
    const q = "SELECT * FROM users WHERE username = ?"

    db.query(q, [req.body.username], (err, data) => {
        if(err) res.json({message: err})
        if(data.length) return res.status(409).json({message: "User already exist!"})


        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(req.body.password, salt)


        const q = "INSERT INTO users(`username`, `password`) VALUES (?)"
        const values = [
            req.body.username,
            hash
        ]

        db.query(q, [values], (err, data) => {
            if(err) res.json({message: err})
            return res.status(200).json({message: "User has been created."})
        })
    })
}

export const login = (req, res) => {
    const q = "SELECT * FROM users WHERE username = ?"

    db.query(q, [req.body.username], (err, data) => {
        if(err) res.json({message: err})
        if(data.length === 0) return res.status(404).json({message: "User is not found!"})

        const isPassCorrect = bcrypt.compareSync(req.body.password, data[0].password)

        if(!isPassCorrect) return res.status(400).json({message: "Wrong username or password!"})

        const token = jwt.sign({id:data[0].id}, "ismayil")
        const user = data[0]
        res.cookie("access_token", token, { httpOnly: true}).status(200).json({
            user,
            token
        })

    })

}

export const logout = (req, res) => {
    res.clearCookie("access_token", {
        sameSite: "none",
        secure: true
    }).status(200).json({message: "User has been logged out."})
}

export const getMe = (req, res) => {
    const q = "SELECT * FROM users WHERE id = ?"
    db.query(q, [req.userId], (err, data) => {
        if(err) res.json({message: err})
        const token = jwt.sign({id:data[0].id}, "ismayil")
        const user = data[0]
        res.json({
            user,
            token
        })
    })

}