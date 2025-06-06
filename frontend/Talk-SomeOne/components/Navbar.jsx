import React from 'react'
import { useNavigate } from 'react-router-dom'

const Navbar = ({currentUser,handleLogout}) => {
    const navigate = useNavigate();
  return (
     <nav className="bg-indigo-800 text-white flex justify-between items-center px-6 py-4 shadow-md">
        <div
          className="text-2xl font-bold cursor-pointer"
          onClick={() => navigate('/')}
        >
          TalkSomeOne
        </div>
        <div className="space-x-4">
          <button onClick={() => navigate(`/profile/${currentUser.id}`)} className="hover:underline">
            Profile
          </button>
          <button onClick={() => navigate('/chat')} className="hover:underline">
            Chat
          </button>
          <button onClick={handleLogout} className="hover:underline">
            Logout
          </button>
        </div>
      </nav>
  )
}

export default Navbar