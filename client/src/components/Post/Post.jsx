import React, { useState } from 'react'
import './Post.css'
import Comment from '../../img/comment.png'
import Shear from '../../img/share.png'
import Heart from '../../img/like.png'
import NotLike from '../../img/notlike.png'
import { useSelector } from 'react-redux'
import { likePost } from '../../api/PostRequest'
import {format} from 'timeago.js'

const Post = ({data}) => {
  const {user} = useSelector((state)=>state.authReducer.authData)

  console.log(data)
  // data.likes.includes(user._id)
  const [liked, setLiked] = useState(false)
  const [likes,setLikes] = useState(data.likes)

  const handleLike = ()=>{
      
      // likePost(data._id, user._id);
      // setLiked((prev) => !prev);
      // liked? setLikes((prev)=>prev-1): setLikes((prev)=>prev+1)

      setLikes(liked? likes-1:likes+1)
      setLiked(!liked)

  }
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER

  return (
    <div className="Post">
      <div className="postTop">
        <div className="topLeft">
        <div className="profileImg">
        <img src={data.profilePicture?`${serverPublic}/${data.profilePicture}`:"http://localhost:5000/images/defaultProfile.png"} alt="" />
        </div>
        </div>
        <div className="topRight">
        <span className='postUsername'>{data.firstname} {data.lastname}</span>
       <span className='postDate'>{format(data.updatedAt)}</span>
        </div>       
      </div>
      <div className="postBottom">
      <span> {data.desc}</span>
      <img src={data.image?process.env.REACT_APP_PUBLIC_FOLDER + data.image :"" } alt="" />
     
      </div>
      
      <div className="postReact">
        <img src={liked?Heart:NotLike} alt="" style={{cursor: "pointer"}} onClick={handleLike} />
        <img src={Comment} alt="" />
        <img src={Shear} alt="" />
       </div>
       

       <span style={{color:"var(--gray)", fontSize:'13px'}}>{likes}Likes</span>
       <div className="detail">
       <span><b>{data.name}</b></span>
       

       </div>
       
    </div>
   
  )
}

export default Post
