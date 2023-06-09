import express from "express"
import { createPost, deletePost, getPostById, getPosts, updatePost } from "../controllers/post.js"
import { checkAuth } from "../utils/checkAuth.js"

const router = express.Router()

router.get("/", getPosts)
router.get("/:id", checkAuth, getPostById)
router.post("/", checkAuth, createPost)
router.delete("/:id", checkAuth, deletePost)
router.put("/:id", checkAuth, updatePost)

export default router