import Comment from "../Models/Comment.js";

export const createComment = async (req, res) => {
    const { postId, userId, text } = req.body;
  
    try {
      const newComment = new Comment({ postId, userId, text });
      const savedComment = await newComment.save();
  
      res.status(201).json(savedComment);
    } catch (error) {
      res.status(500).json(error);
    }
  };
//get comment
  export const getCommentsByPostId = async (req, res) => {
    const postId = req.params.postId;
  
    try {
      const comments = await Comment.find({ postId }).exec();
  
      res.status(200).json(comments);
    } catch (error) {
      res.status(500).json(error);
    }
  };