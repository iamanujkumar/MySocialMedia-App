import React, { useState } from "react";
import "./Auth.css";
import Logo from "../../img/logo.png";
import { useDispatch, useSelector } from 'react-redux'
import { logIn, signUp } from "../../actions/AuthAction";


const Auth = () => {
  const dispatch = useDispatch()
  const [isSignUp, setIsSignUp] = useState(true)
  const loading = useSelector((state)=>state.authReducer.loading)

  const [data,setData] = useState({firstname:"",lastname:"",password:"",confirmpass:"",username:""})
  console.log(loading);

  const [confirmpass,setConfirmPass]=useState(true)

  const handleChange=(e)=>{
    setData({...data,[e.target.name]: e.target.value})
  }

  const handleSubmit= (e)=>{
    e.preventDefault()
    if(isSignUp){
      data.password===data.confirmpass ? dispatch(signUp(data)):setConfirmPass(false)
    }
    else{
      dispatch(logIn(data))
    }
  }
  const resetForm=()=>{
    setConfirmPass(true)
    setData({
      firstname:"",lastname:"",password:"",confirmpass:"",username:""

    })
  }

  return (
    <div className="Auth">
      <div className="a-left">
        <img src={Logo} alt="" />
        <div className="Webname">
          <h1>new</h1>
          <h6>Explore the ideas throughout the world</h6>
        </div>
      </div>

    {/* right side */}
      <div className="a-right">
      <form className="infoForm authForm" onSubmit={handleSubmit}>
        <h3>{isSignUp?"Sign Up":"Log in"}</h3>

       {isSignUp &&  <div>
          <input
            type="text"
            placeholder="First Name"
            className="infoInput"
            name="firstname"
            onChange={handleChange}
            value={data.firstname}
          />
          <input
            type="text"
            placeholder="Last Name"
            className="infoInput"
            name="lastname"
            onChange={handleChange}
            value={data.lastname}
          />
        </div>}

        <div>
          <input
            type="text"
            className="infoInput"
            name="username"
            placeholder="Usernames"
            onChange={handleChange}
            value={data.username}
          />
        </div>

        <div>
          <input
            type="password"
            className="infoInput"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            value={data.password}
          />
          {isSignUp && <input
            type="password"
            className="infoInput"
            name="confirmpass"
            placeholder="Confirm Password"
            onChange={handleChange}
            value={data.confirmpass}
          />}
        </div>
        <span style={{display:confirmpass?"none":"block", color:"red", alignSelf:"flex-end", fontSize:"12px", marginRight:"5px"}}>*Password does not match</span>

        <div>
            <span style={{fontSize: '12px' , cursor:"pointer"}} onClick={()=>{setIsSignUp((prev)=>!prev);resetForm()}}>{isSignUp ? "Already have an account. Login!":"Don't have an account. Sign Up!"}</span>
        </div>
        <button className="button infoButton" disabled={loading} type="submit">{loading?"Loading":isSignUp ? "Sign Up": "Log in"}</button>
      </form>
    </div>


    </div>
  );
};


export default Auth;