import React from 'react'
import './PostSide.css'
import PostShear from '../../PostShear/PostShear'
import Posts from '../../Posts/Posts'

const PostSide = () => {
  return (
    <div className='PostSide'>
        <PostShear/>
        <Posts/>
    </div>
  )
}

export default PostSide
