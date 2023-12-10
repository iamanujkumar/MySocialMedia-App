import React, { useEffect, useState } from 'react';
import './CommentBox.css';
import { createComment, getComments } from '../../api/CommentRequest';
import { format } from 'timeago.js';
import { useSelector } from 'react-redux';
import { getUser } from '../../api/UserRequest';

const CommentBox = ({ postId, userId }) => {
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState([]);
  const [commentUsers, setCommentUsers] = useState({});
  const { user } = useSelector((state) => state.authReducer.authData);

  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;

  const handleCommentChange = (e) => {
    setCommentText(e.target.value);
  };

  const handleSubmit = () => {
    createComment({ postId, userId, text: commentText })
      .then((response) => {
        const newComment = response.data;
        setComments([newComment, ...comments]);
        setCommentText(''); // Clear the comment input
      })
      .catch((error) => {
        console.error('Error creating comment:', error);
      });
  };

  useEffect(() => {
    // Fetch comments from the database when the component mounts
    const fetchComments = async () => {
      try {
        const response = await getComments(postId);
        const fetchedComments = response.data;

        const commentsWithUserData = [];
        const commentUsersData = {};

        // Fetch user data for all comment authors in parallel
        const userPromises = fetchedComments.map((comment) =>
          getUser(comment.userId)
            .then((userResponse) => {
              const commentUser = userResponse.data;
              commentUsersData[comment.userId] = commentUser;
              return commentUser;
            })
            .catch((error) => {
              console.error('Error fetching user data:', error);
            })
        );

        const userResponses = await Promise.all(userPromises);

        // Create a map of comment users for faster access
        userResponses.forEach((user, index) => {
          commentUsersData[fetchedComments[index].userId] = user;
        });

        // Create comments with user data
        fetchedComments.forEach((comment) => {
          commentsWithUserData.push({
            ...comment,
            user: commentUsersData[comment.userId],
          });
        });

        setComments(commentsWithUserData.reverse());
        setCommentUsers(commentUsersData);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchComments();
  }, [postId]);

  return (
    <div className="Comment-Box">
      <div className="Comment">
        <img
          src={user.profilePicture ? serverPublic + user.profilePicture : serverPublic + 'defaultProfile.png'}
          alt=""
        />
        <input
          type="text"
          placeholder="Add a comment..."
          value={commentText}
          onChange={handleCommentChange}
          style={{ width: '80%', height: '35px', borderRadius: '20px', fontSize: '1rem', gap: '1rem', marginLeft: '1rem' }}
        />
        <button className="button fc-button" style={{ height: '40px', marginLeft: '1rem' }} onClick={handleSubmit}>
          Send
        </button>
      </div>

      <div className="UserComments" style={{ maxHeight: '400px', overflowY: 'auto' }}>
        {comments.map((comment) => (
          <div key={comment._id} style={{ display: 'flex', alignItems: 'center' }}>
          {commentUsers[comment.userId] && (
            <>
              <img
                src={
                  commentUsers[comment.userId].profilePicture
                    ? serverPublic + commentUsers[comment.userId].profilePicture
                    : serverPublic + 'defaultProfile.png'
                }
                alt=""
                style={{ width: '40px', height: '40px', borderRadius: '50%', marginRight: '0.4rem' }}
              />
            </>
          )}
          
          <div style={{ boxShadow: 'var(--profileShadow)', margin: '1rem', padding: '1rem', borderRadius: '1rem', display:'flex', flexDirection:'column' }}>
            <span style={{fontWeight:'600', fontSize:'13px'}}>{commentUsers[comment.userId]?.firstname}</span>
            {comment.text}
          </div>
          <span style={{fontSize:'10px'}}>{format(comment.createdAt)}</span>
        </div>
        
        
        ))}
      </div>
    </div>
  );
};

export default CommentBox;
