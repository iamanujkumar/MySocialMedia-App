import express from 'express'
import { createComment,getCommentsByPostId } from '../Controllers/CommentController.js'

const router = express.Router()

router.post('/', createComment); // Create a new comment
router.get('/:postId', getCommentsByPostId); // Get comments for a specific post

export default router;