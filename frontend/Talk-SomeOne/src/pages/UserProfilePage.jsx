import React, { useState, useEffect } from "react";
import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { toast } from "react-toastify";
import FriendButton from "../../components/FriendButton";

const UserProfilePage = () => {
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();
  const { userId } = useParams();
  const currentUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    getUserProfileInfo(userId);
  }, [userId]);

  const getUserProfileInfo = async (userId) => {
    try {
      const response = await axiosInstance.get(`/api/users/userProfile/${userId}`);
      setUserData(response.data);
    } catch (error) {
      toast.error("Internal server error",error);
    }
  };

  const handleEdit = () => {
    navigate(`/edit/profile/${userData._id}`);
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-6">
      <div className="bg-gray-800 rounded-lg shadow-lg w-full max-w-md border border-gray-700">
        
        {/* Header with dark gradient */}
        <div className="h-32 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 rounded-t-lg" />

        {/* Avatar */}
        <div className="flex justify-center -mt-16">
          <img
            src={userData.imageUrl}
            alt={userData.name}
            className="w-32 h-32 rounded-full border-4 border-gray-900 shadow-md object-cover"
          />
        </div>

        {/* User Info */}
        <div className="text-center px-6 py-4">
          <h1 className="text-3xl font-bold text-gray-100">{userData.name}</h1>
          <p
            className={`text-sm font-semibold mt-1 ${
              userData.status === "online"
                ? "text-green-400"
                : "text-gray-500"
            }`}
          >
            {userData.status}
          </p>

          <div className="flex justify-around items-center mt-5 space-x-4">
            {userData._id !== currentUser.id ? (
              <>
                <div className="text-center">
                  <p className="text-sm text-gray-400">Friends</p>
                  <p className="font-semibold text-lg text-indigo-400">{userData?.friends?.length || 0}</p>
                </div>

                <button
                  onClick={() => navigate(`/chat/${userData._id}`)}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg shadow transition"
                >
                  Message
                </button>

                <FriendButton targetUserId={userId} userId={currentUser.id} />
              </>
            ) : (
              <button
                onClick={handleEdit}
                className="bg-gray-600 hover:bg-gray-700 text-gray-100 font-semibold px-5 py-2 rounded-lg shadow"
              >
                Edit Profile
              </button>
            )}
          </div>

          <p className="text-gray-300 mt-4 text-sm">{userData.bio || "No bio provided."}</p>
        </div>

        {/* Contact Info */}
        <div className="border-t border-gray-700 px-6 py-5">
          <h2 className="text-lg font-semibold text-indigo-400 mb-3">Contact Information</h2>

          <div className="flex items-center text-gray-300 mb-3">
            <FiMail className="mr-3 text-indigo-400" />
            <span>{userData.email || "Not provided"}</span>
          </div>

          <div className="flex items-center text-gray-300 mb-3">
            <FiPhone className="mr-3 text-indigo-400" />
            <span>{userData.phone || "Not provided"}</span>
          </div>

          <div className="flex items-center text-gray-300">
            <FiMapPin className="mr-3 text-indigo-400" />
            <span>{userData.location || "Not provided"}</span>
          </div>
        </div>
      </div>
       <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }

          /* Scrollbar styles for Firefox */
          * {
            scrollbar-width: thin;
            scrollbar-color: #6366f1 #1f2937;
          }

          /* Scrollbar styles for Webkit */
          *::-webkit-scrollbar {
            width: 8px;
          }
          *::-webkit-scrollbar-track {
            background: #1f2937;
          }
          *::-webkit-scrollbar-thumb {
            background-color: #6366f1;
            border-radius: 20px;
            border: 3px solid #1f2937;
          }
        `}
      </style>
    </div>
  );
};

export default UserProfilePage;
