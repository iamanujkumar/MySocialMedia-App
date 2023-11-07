import { useSelector } from "react-redux";
import "./App.css"
import Auth from "./page/Auth/Auth";
import Profile from "./page/Profile/Profile";
import Home from "./page/home/Home";
import { Routes, Route, Navigate } from "react-router-dom";
import Chat from "./page/Chat/Chat";
import UserProfile from "./page/UserProfile/UserProfile";

function App() {
  const user = useSelector((state)=>state.authReducer.authData)
  return (
    <div className="App">
        <div className="blur" style={{top:'-18%',right:'0'} }></div>      
        <div className="blur" style={{top:'36%',left:'-8rem'} }></div>

        <Routes>
          <Route path='/' element={ user? <Navigate to="home"/> : <Navigate to="auth"/>}/>
          <Route path='/home' element={ user ? <Home/> : <Navigate to ="../auth"/> } />
          <Route path='/auth' element ={ user ? <Navigate to ="../home"/>: <Auth/>}/>

          <Route path='/profile/:id' element={user? <Profile/> : <Navigate to ="../auth"/> } />
          
          <Route path='/UserProfile/:id' element={user? <UserProfile/> : <Navigate to ="../auth"/> } />
          <Route path="/chat" element={user?<Chat/> : <Navigate to="../auth"/>}/>
          <Route path="/chat/:id" element={user?<Chat /> : <Navigate to="../auth"/>}/>
        </Routes>

        {/* <Home/> */}
        {/* <Profile/> */}
    </div>
  );
}

export default App;
