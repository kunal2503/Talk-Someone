import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";

const HomePage = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const currentUser = JSON.parse(localStorage.getItem("user"));
  // const currentUser = "";

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axiosInstance.get("/api/users/friends");
      const userData = response.data.filter((u) => u._id !== currentUser.id);
      setUsers(userData);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };

  const handleClick = () => {
    navigate(`/profile/${currentUser.id}`);
  };
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleUserClick = (user) => {
    navigate(`/profile/${user._id}`);
  };

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-gray-100 text-xl font-semibold text-center space-y-4">
          <p>
            Please login to access{" "}
            <span className="font-bold text-indigo-400">TalkSomeOne</span>
          </p>
          <button
            onClick={() => navigate("/login")}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition"
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-900">
      {/* Navbar */}
      <Navbar currentUser={currentUser} handleLogout={handleLogout} />
      {/* Main */}
      <main className="p-6 flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-6 text-gray-100">
          Welcome,{" "}
          <button className="underline text-indigo-400" onClick={handleClick}>
            {currentUser.name}
          </button>
        </h1>

        <div className="w-full max-w-2xl h-[80vh] scrol bg-gray-900 rounded-xl shadow-xl p-4 flex flex-col md:p-6">
          {/* Search Input */}
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 mb-4 text-sm text-white bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none placeholder-gray-400"
          />

          {/* User List */}
          {filteredUsers.length === 0 ? (
            <p className="text-center text-gray-400 flex-1 flex items-center justify-center text-sm">
              No users found for "{searchTerm}".
            </p>
          ) : (
            <div className="flex-1 overflow-y-auto space-y-3 pr-2 scroll-smooth scrollbar-thin scrollbar-thumb-indigo-600 scrollbar-track-indigo-800">
              {filteredUsers.map((u) => (
                <div
                  key={u._id}
                  onClick={() => handleUserClick(u)}
                  className="cursor-pointer flex items-center justify-between p-3 rounded-lg bg-gray-800 hover:bg-indigo-600 transition-all duration-200 border border-gray-700 hover:shadow-md group"
                >
                  <div className="flex items-center gap-3">
                    {u.imageUrl ? (
                      <img
                        src={u.imageUrl}
                        alt={u.name}
                        className="w-10 h-10 rounded-full object-cover border-2 border-indigo-500"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center text-white font-semibold text-lg">
                        {u.name[0].toUpperCase()}
                      </div>
                    )}

                    <div className="text-sm">
                      <p className="font-medium text-white">{u.name}</p>
                      <p className="text-xs text-gray-400 truncate max-w-[160px]">
                        {u.email}
                      </p>
                    </div>
                  </div>

                  {/* Status dot */}
                  {u.status === "online" && (
                    <div className="relative">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded px-1 opacity-0 group-hover:opacity-100 transition">
                        Online
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomePage;
