import bodyParser from "body-parser"
import express from "express"
import cors from "cors"
import authRoutes from "./routes/auth.js"
import userRoutes from "./routes/users.js"
import postRoutes from "./routes/posts.js"
import cookieParser from "cookie-parser"


const app = express()
app.use(bodyParser.json())
app.use(cookieParser())
app.use(cors())

app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)
app.use("/api/posts", postRoutes)

app.listen(4444, () => {
    console.log("Backend is connected!")
})