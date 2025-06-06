import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Login from './pages/Login'
import SignUp from "./pages/SignUp"
import HomePage from './pages/HomePage';
import ForgetPassword from './pages/ForgetPassword';
import Profile from './pages/UserProfilePage';
import Chat from "./pages/Chats"
import ChatWindow from "./pages/ChatWindow";
import EditProfile from './pages/EditProfile';
// import UserCard from '../components/UserCard';

const App = () => {
  return (
    <>
   <Router>
    <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/signup" element={<SignUp/>}/>
      <Route path="/forget-password" element={<ForgetPassword/>}/>
      <Route path='/profile/:userId' element={<Profile/>}/>
      <Route path='/chat' element={<Chat/>}/>
      <Route path='/chat/selected/:userId' element={<Chat/>}/>
      <Route path='/chat/:userId' element={<ChatWindow/>}/>
      <Route path='/edit/profile/:userId' element={<EditProfile/>}></Route>
    </Routes>
   </Router>
   <ToastContainer position="top-center" />
   </>
  )
}

export default App