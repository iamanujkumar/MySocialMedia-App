import React from 'react'
import { useSelector } from 'react-redux'
import './UserCard.css';

const UserCard = ({userData,location}) => {

    const posts = useSelector((state)=>state.postReducer.posts)

  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER

  return (    
       <div className="profileCard">
      <div className="profileImage">
        <img src={userData.coverPicture ? serverPublic + userData.coverPicture: serverPublic + "defaultCover.jpg" } alt="" />
        <img src={userData.profilePicture ? serverPublic + userData.profilePicture: serverPublic + "defaultProfile.png"} alt="" />
      </div>
      <div className="profileName">
        <span>{userData.firstname} {userData.lastname}</span>
        <span>{userData.worksAt ? userData.worksAt : "write about yourself"}</span>
      </div>

      <div className="followStatus">
        <hr/>
        <div>
        <div className="follow">
          <span>{userData.following.length}</span>
          <span>Following</span>
        </div>

        <div className="vl"></div>

        <div className="follow">
          <span>{userData.followers.length}</span>
          <span>Followers</span>
        </div>
        {location === "ProfilePage" && (
          <>
          <div className="vl"></div>
          <div className="follow">
            <span>{posts.filter((post)=>post.userId === userData._id).length}</span>
            <span>Posts</span>
          </div>
          </>
        )
          
        }
        </div>
        <hr/>
      
      </div>
    

    </div>

  )
}

export default UserCard
