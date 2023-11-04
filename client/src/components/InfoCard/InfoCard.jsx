import React, { useEffect, useState } from 'react'
import './InfoCard.css'
import { UilPen } from '@iconscout/react-unicons'
import ProfileModal from '../ProfileModel/ProfileModal'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import * as UserApi from '../../api/UserRequest.js'
import { logOut } from '../../actions/AuthAction'

const InfoCard = () => {
  const [modalOpened, setModalOpened] = useState(false)

  const dispatch = useDispatch()
  const params = useParams()
  const profileUserId = params.id
  const [profileUser, setProfileUser] = useState(null) // Initialize as null
  const { user } = useSelector((state) => state.authReducer.authData)

  useEffect(() => {
    const fetchProfileUser = async () => {
      if (user && profileUserId === user._id) { // Check if 'user' is defined
        setProfileUser(user)
      } else {
        const profileUser = await UserApi.getUser(profileUserId)
        setProfileUser(profileUser)
      }
    }
    if (profileUserId) { // Ensure 'profileUserId' is defined
      fetchProfileUser()
    }
  }, [profileUserId, user]) // Add 'profileUserId' to the dependency array

  const handleLogout = () => {
    dispatch(logOut())
  }

  return (
    <div className='InfoCard'>
      <div className="infoHead">
        <h4>Profile Info</h4>
        {user && user._id === profileUserId && ( // Check if 'user' is defined
          <div>
            <UilPen width='2rem' height='1.2rem' onClick={() => {
              setModalOpened(true)
            }} />
            <ProfileModal modalOpened={modalOpened} setModalOpened={setModalOpened} data={user} />
          </div>
        )}
      </div>
      <div className="info">
        <span><b>Status </b></span>
        <span>{profileUser ? profileUser.relationShip : ''}</span>
      </div>
      <div className="info">
        <span><b>Lives in </b></span>
        <span>{profileUser ? profileUser.livesin : ''}</span>
      </div>
      <div className="info">
        <span><b>Works At </b></span>
        <span>{profileUser ? profileUser.worksAt : ''}</span>
      </div>
      <button className="button logout-button" onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default InfoCard
