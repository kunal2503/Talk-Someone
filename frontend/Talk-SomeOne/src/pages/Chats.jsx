import React, { useEffect, useRef, useState } from "react";
import axiosInstace from "../../utils/axiosInstance";
import { toast } from "react-toastify";
import { IoSend } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const Chats = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);

  const currentUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!currentUser) {
      toast.error("Please login to access chats");
      navigate("/login");
      return;
    }
  }, [currentUser, navigate]);

  useEffect(() => {
    // Poll friends every 5 seconds (less frequent for performance)
    const interval = setInterval(() => {
      getUsers();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getUsers = async () => {
    try {
      const response = await axiosInstace.get("/api/users/friends");
      const filteredUsers = response.data.filter(
        (user) =>
          user._id !== currentUser.id && user.friends.includes(currentUser.id)
      );
      setUsers(filteredUsers);
    } catch (error) {
      toast.error("No friends found. Please add friends to chat.",error);
    }
  };

  const handleUser = (user) => {
    setSelectedUser(user);
    navigate(`/chat/selected/${user._id}`);
    // Optionally, fetch messages for selected user here
  };

  const sendMessage = () => {
    if (!newMessage.trim()) return;
    setMessages((prev) => [
      ...prev,
      {
        text: newMessage.trim(),
        sender: "me",
        timestamp: new Date(),
      },
    ]);
    setNewMessage("");
  };

  const handleOnClick = (user) => {
    navigate(`/profile/${user._id}`, { state: user });
  };

  const formatLastSeen = (isoTimestamp) => {
    if (!isoTimestamp) return "Offline";
    const diff = Date.now() - new Date(isoTimestamp).getTime();
    if (diff < 60000) return "Just now";
    if (diff < 3600000) return `${Math.floor(diff / 60000)} mins ago`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)} hrs ago`;
    return new Date(isoTimestamp).toLocaleDateString();
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sayHi = () =>{
    setNewMessage(`Hi ${selectedUser.name.split(" ")[0]}`);
  }

  if (!currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-gray-800 text-center p-8 bg-white rounded shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Please login to access TalkSomeOne</h2>
          <button
            onClick={() => navigate("/login")}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-md transition"
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <aside className="w-full md:w-1/3 bg-gray-800 p-5 overflow-y-auto">
        <h1 className="text-3xl font-extrabold mb-5 border-b border-indigo-600 pb-3">
          Chats
        </h1>

        <input
          type="search"
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-3 mb-6 text-gray-900 bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
        />

        {filteredUsers.length === 0 ? (
          <p className="text-gray-400 italic text-center">No users found.</p>
        ) : (
          filteredUsers.map((user) => (
            <div
              key={user._id}
              onClick={() => handleUser(user)}
              className={`cursor-pointer flex items-center justify-between p-4 rounded-lg transition
                ${
                  selectedUser?._id === user._id
                    ? "bg-indigo-700 scale-105 shadow-lg"
                    : "bg-gray-700 hover:bg-gray-600"
                }`}
              title={user.email}
            >
              <div className="flex items-center gap-4">
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOnClick(user);
                  }}
                  className="w-12 h-12 rounded-full overflow-hidden flex items-center justify-center bg-indigo-600 text-white font-semibold text-xl select-none cursor-pointer"
                >
                  {user.imageUrl ? (
                    <img

                      src={user.imageUrl}
                      alt={user.name.charAt(0).toUpperCase()}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    user.name.charAt(0).toUpperCase()
                    // console.log(user.name.charAt(0).toUpperCase())
                  )}
                </div>
                <div className="truncate max-w-[180px]">
                  <p className="font-semibold text-lg truncate">{user.name}</p>
                  <p className="text-sm text-indigo-300 truncate">
                    {/* Optionally, preview last message here */}
                    Say hi to {user.name.split(" ")[0]}!
                  </p>
                </div>
              </div>
              {user.status === "online" && (
                <span className="w-4 h-4 rounded-full bg-green-400 animate-pulse" title="Online"></span>
              )}
            </div>
          ))
        )}
      </aside>

      {/* Main Chat Area */}
      <main className="flex-1 bg-gray-900 flex flex-col border-t md:border-t-0 md:border-l border-indigo-700">
        {selectedUser ? (
          <>
            {/* Chat Header */}
            <div className="flex items-center gap-4 bg-gray-800 px-6 py-4 border-b border-indigo-700">
              <div
                onClick={() => handleOnClick(selectedUser)}
                className="flex items-center gap-4 cursor-pointer select-none"
                title={`View ${selectedUser.name}'s profile`}
              >
                <div className="w-12 h-12 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center text-xl">
                  {selectedUser.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h2 className="text-2xl font-semibold">{selectedUser.name}</h2>
                  {selectedUser.status === "online" ? (
                    <p className="text-green-400">Online</p>
                  ) : (
                    <p className="text-gray-400 text-sm">
                      Last seen: {formatLastSeen(selectedUser.lastSeen)}
                    </p>
                  )}
                </div>
              </div>

              <input
                type="search"
                placeholder="Search in chat..."
                className="ml-auto w-full max-w-md px-4 py-2 rounded bg-gray-700 text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              />
            </div>

            {/* Messages Area */}
            <div
              className="flex-1 overflow-y-auto p-6 space-y-3 scrollbar-thin scrollbar-thumb-indigo-600 scrollbar-track-gray-800"
              style={{ minHeight: "400px" }}
            >
              {messages.length === 0 && (
                <p className="text-center text-gray-500 italic mt-10" onClick={sayHi}>
                  No messages yet. Say hi 👋
                </p>
              )}
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`max-w-[70%] px-5 py-3 rounded-lg shadow-md
                    ${msg.sender === "me"
                      ? "bg-indigo-600 self-end ml-auto rounded-br-none"
                      : "bg-gray-700 rounded-bl-none"
                    }`}
                  style={{ animation: "fadeIn 0.3s ease forwards" }}
                >
                  <p className="whitespace-pre-wrap">{msg.text}</p>
                  <div className="text-xs text-gray-300 mt-1 text-right select-none">
                    {new Date(msg.timestamp).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="bg-gray-800 px-6 py-4 flex items-center gap-3 border-t border-indigo-700">
              <input
                type="text"
                placeholder="Type a message..."
                className="flex-1 bg-gray-700 text-white rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              />
              <button
                onClick={sendMessage}
                className="bg-indigo-600 hover:bg-indigo-700 p-3 rounded-full transition-transform active:scale-95"
                aria-label="Send Message"
              >
                <IoSend size={24} />
              </button>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center flex-1 p-10 text-center text-gray-400">
            <h2 className="text-4xl font-bold mb-4">Welcome to Chat</h2>
            <p>Select a user from the left to start chatting.</p>
          </div>
        )}
      </main>

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

export default Chats;
