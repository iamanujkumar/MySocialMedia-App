import express from 'express'
import { creatPost, deletePost, getPost, getTimelinePost, likePost, updatePost } from '../Controllers/PostController.js'

const router=express.Router()

router.post('/',creatPost)
router.get('/:id',getPost)
router.put('/:id',updatePost)
router.delete('/:id',deletePost)
router.put('/:id/like',likePost)
router.get('/:id/timeline',getTimelinePost)
export default router
