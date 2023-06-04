import express from "express"
import { login, logout, register, getMe } from "../controllers/auth.js"
import { checkAuth } from "../utils/checkAuth.js"

const router = express.Router()

router.post("/register", register)
router.post("/login", login)
router.post("/logout", logout)
router.get("/me", checkAuth, getMe)

export default router