import React,{useState,useRef} from 'react'
import './PostShear.css'
import {UilScenery} from "@iconscout/react-unicons"
import {UilPlayCircle} from "@iconscout/react-unicons"
import {UilLocationPoint} from '@iconscout/react-unicons' 
import {UilSchedule} from "@iconscout/react-unicons"
import {UilTimes} from "@iconscout/react-unicons"
import {useDispatch, useSelector} from 'react-redux';
import { uploadImage, uploadPost } from '../../actions/uploadAction'
import { Link } from 'react-router-dom'

const PostShear = () => {
  const loading = useSelector((state)=>state.postReducer.uploading)
  const[image,setImage]=useState(null)
  const imageRef=useRef()
  const desc=useRef()
  const dispatch=useDispatch()

  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER

  const {user}= useSelector((state)=>state.authReducer.authData)
  
const onImageChange=(event)=>{
  if(event.target.files && event.target.files[0]){
    let img=event.target.files[0];
    setImage(img);
  }
}
const reset = ()=>{
  setImage(null);
  desc.current.value=""
}
const handleSubmit =(e)=>{
  e.preventDefault();
  
  const newPost={
    userId:user._id,
    desc:desc.current.value
  }
  if(image){
    const data=new FormData()
    const filename=Date.now()+image.name
    data.append("name",filename)
    data.append("file",image)
    newPost.image=filename
    try {
      dispatch(uploadImage(data))
    } catch (error) {
      console.log(error)
    }
  }
  dispatch(uploadPost(newPost))
  reset()
}

  return (
    <div className='PostShear'>
      <Link to={`/UserProfile/${user._id}`}>
  <img
    src={user.coverPicture ? serverPublic + user.profilePicture : serverPublic + "defaultProfile.png"}
    alt=""
    className="scr"
    style={{
      borderRadius: "50%",
      width: "3rem",
      height: "3rem"
    }}
  />
</Link>
        <div>

        <input ref={desc} required type='text' placeholder="What's happning "/>
        <div className="PostOption">
      <div className="Option" style={{color:'var(--photo'}}
      onClick={()=>imageRef.current.click()}
      >
        <UilScenery/>
        Photo
      </div>
      <div className="Option" style={{color:'var(--video'}}>
        <UilPlayCircle/>
        Video
      </div>
      <div className="Option" style={{color:'var(--location'}}>
        <UilLocationPoint/>
        Location
      </div>
      <div className="Option" style={{color:'var(--shedule'}}>
        <UilSchedule/>
        Shedule
      </div>
      <button className="button ps-button" onClick={handleSubmit}
      disabled={loading}
      >
       {loading? "Uploading":"Share"}

      </button>
        <div style={{display:"none"}}>
          <input type="file" name="myImage" ref={imageRef} onChange={onImageChange} />
        </div>
    </div>
    {image && (
      <div className="previewImage">
        <UilTimes onClick={()=>setImage(null)}/>
        <img src={URL.createObjectURL(image)} alt=""/>
      </div>
    )}
    </div>


    </div>
    
  )
}

export default PostShear
