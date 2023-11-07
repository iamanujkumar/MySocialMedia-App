import React from 'react'
import './PostSide.css'
import PostShear from '../../PostShear/PostShear'
import Posts from '../../Posts/Posts'

const PostSide = ({location}) => {
  return (
    <div className='PostSide'>

{location === "UseProfile" ? (
        <>
          <Posts />
        </>
      ) : (
        <>
          <PostShear />
          <Posts />
        </>
      )}

    </div>
  )
}

export default PostSide
