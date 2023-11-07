import React from 'react'
import './profile.css'
import ProfileLeft from '../../components/ProfileLeft/ProfileLeft'
import ProfileCard from '../../components/ProfileCard/ProfileCard'
import PostSide from '../../components/profileSide/PostSide/PostSide'
import RightSide from '../../components/RightSide/RightSide'

const Profile = () => {
  return (
    <div className='profile'>
      <ProfileLeft/>
      <div className="Profile-center">
        <ProfileCard location="ProfilePage"/>
        <PostSide location="ProfilePage"/>
      </div>
      <RightSide/>
    </div>
  )
}

export default Profile
