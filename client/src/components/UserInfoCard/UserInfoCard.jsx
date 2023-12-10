import React from 'react'
import './UserInfoCard.css'


const UserInfoCard = ({userData}) => {
  return (
    <div className="userInfo">
        <div className='User-infoCard'>
        <div className="info">
        <span><b>Status </b></span>
        <span>{userData ? userData.relationShip : ''}</span>
      </div>
      <div className="info">
        <span><b>Lives in </b></span>
        <span>{userData ? userData.livesin : ''}</span>
      </div>
      <div className="info">
        <span><b>Works At </b></span>
        <span>{userData ? userData.worksAt : ''}</span>
      </div>
    </div>
    </div>
  )
}

export default UserInfoCard
