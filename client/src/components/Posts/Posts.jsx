import React, { useEffect } from 'react'
import './Posts.css'
import { useSelector , useDispatch } from 'react-redux';
// import { PostsData } from '../Data/PostData'
import Post from '../Post/Post'
import { useParams } from 'react-router-dom';
import { getTimelinePost } from '../../actions/postAction';


const Posts = () => {
  const dispatch= useDispatch()
  const {user}= useSelector((state)=>state.authReducer.authData);
  let { posts, loading } = useSelector((state) => state.postReducer);
  const params= useParams()
  useEffect(()=>{
    dispatch(getTimelinePost(user._id))
  },[])

  if(!posts) return "No Posts"

  if(params.id) posts= posts.filter((post)=>post.userId===params.id)
  return (
    <div className='Posts'>
      {
      loading?"Fetching Posts...":
      posts.map((post,id)=>{
        return <Post data={post} key={id}/>
        
      })}
    </div>
  )
}

export default Posts
