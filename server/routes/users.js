import express from "express"
import { checkAuth } from "../utils/checkAuth.js"
import { getUserPosts, newUserAvatar } from "../controllers/user.js"

const router = express.Router()

router.get("/", checkAuth, getUserPosts)
router.put("/avatar", checkAuth, newUserAvatar)

export default router