import React, { useEffect, useMemo, useRef, useState } from "react";
import axiosInstace from "../../utils/axiosInstance";
import { toast } from "react-toastify";
import { socket } from "../../socket";
import { useNavigate } from "react-router-dom";
import ChatSideBar from "./ChatSideBar";
import MessageInput from "./MessageInput";
import ChatNavbar from "./ChatNavbar";

const Chats = () => {
  const [users, setUsers] = useState([]);
  const [searchTermUsers, setSearchTermUsers] = useState("");
  const [searchTermMessage, setSearchTermMessage] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const navigate = useNavigate();
  const messagesEndRef = useRef(null);
  // const [currentUser, setCurrentUser] = useState(null);

  
    const currentUser = JSON.parse(localStorage.getItem("user"));
    // console.log()
      // setCurrentUser(user); 


  useEffect(() => {
    const handleIncomingMessage = (message) => {
      setMessages((prev) => [...prev, message]);
    };

    const handleSeenMessage = (messageId) => {
      setMessages((prev) =>
        prev.map((message) =>
          message._id === messageId ? { ...message, seen: true } : message
        )
      );
    };

    socket.on("receive-message", handleIncomingMessage);
    socket.on("message-seen", handleSeenMessage);

    return () => {
      socket.off("receive-message", handleIncomingMessage);
      socket.off("message-seen", handleSeenMessage);
    };
  }, []);

  useEffect(() => {
    getUsers();
    const interval = setInterval(getUsers, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    const element = messagesEndRef.current;
    if (element) {
      const isAtBottom =
        element.parentElement.scrollTop +
          element.parentElement.clientHeight >=
        element.parentElement.scrollHeight - 100;
      if (isAtBottom) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const getUsers = async () => {
    try {
      const response = await axiosInstace.get("/api/users/friends");
      const filtered = response.data.filter(
        (user) =>
          // console.log(user)
          user._id !== currentUser?.id &&
          user.friends.includes(currentUser?.id)
      );
      setUsers(filtered);
      // console.log("id",currentUser)
    } catch (error) {
      // console.error(error);
      toast.error("Failed to load friends",error);
    }
  };

  const handleUser = async (user) => {
    setSelectedUser(user);
    navigate(`/chat/selected/${user._id}`);
    try {
      const res = await axiosInstace.get(
        `/api/messages/${currentUser.id}/${user._id}`
      );
      setMessages(res.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load messages");
    }
  };

  const sendMessage = () => {
    const trimmed = input.trim();
    if (!trimmed || !selectedUser) return;

    const tempMessage = {
      _id: Date.now().toString(),
      sender: currentUser.id,
      receiver: selectedUser._id,
      message: trimmed,
      seen: false,
      createdAt: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, tempMessage]);

    socket.emit("send-message", {
      senderId: currentUser.id,
      receiverId: selectedUser._id,
      message: trimmed,
    });

    setInput("");
  };

  const handleOnClick = (user) => {
    navigate(`/profile/${user._id}`, { state: user });
  };

  const formatLastSeen = (iso) => {
    if (!iso) return "Offline";
    const secondsAgo = Math.floor((Date.now() - new Date(iso)) / 1000);
    if (secondsAgo < 60) return "Just now";
    if (secondsAgo < 3600) return `${Math.floor(secondsAgo / 60)} min ago`;
    if (secondsAgo < 86400) return `${Math.floor(secondsAgo / 3600)} hrs ago`;
    return new Date(iso).toLocaleDateString();
  };

  const filteredUsers = 
      users.filter(
        (user) =>
          user.name.toLowerCase().includes(searchTermUsers.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTermUsers.toLowerCase())
      
    );
    // console.log(users)

  const searchMessage = useMemo(
    () =>
      messages.filter((msg) =>
        msg.message.toLowerCase().includes(searchTermMessage.toLowerCase())
      ),
    [messages, searchTermMessage]
  );

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-900 text-white">
      <ChatSideBar
        filteredUsers={filteredUsers}
        selectedUser={selectedUser}
        searchTerm={searchTermUsers}
        setSearchTerm={setSearchTermUsers}
        handleUser={handleUser}
        handleOnClick={handleOnClick}
        searchMessage={searchMessage}
      />

      <main className="flex-1 bg-gray-900 flex flex-col border-t md:border-t-0 md:border-l border-indigo-700">
        {selectedUser ? (
          <>
            <ChatNavbar
              selectedUser={selectedUser}
              currentUser={currentUser}
              setSelectedUser={setSelectedUser}
              formatLastSeen={formatLastSeen}
              handleOnClick={handleOnClick}
              searchTerm={searchTermMessage}
              setSearchTerm={setSearchTermMessage}
            />

            <div className="flex-1 overflow-y-auto space-y-3 pr-2 scroll-smooth scrollbar-thin scrollbar-thumb-indigo-600 scrollbar-track-indigo-800">
              {searchMessage.length > 0 ? (
                searchMessage.map((msg) => (
                  <div
                    key={msg._id}
                    className={`max-w-[70%] px-4 py-2 rounded-2xl shadow-md break-words overflow-hidden ${
                      msg.sender === currentUser.id
                        ? "bg-indigo-600 ml-auto"
                        : "bg-gray-700 mr-auto"
                    }`}
                  >
                    <p className="whitespace-pre-wrap break-words text-sm sm:text-base">
                      {msg.message}
                    </p>
                    <div className="flex justify-between items-center mt-1 text-xs text-gray-300">
                      <span className="select-none">
                        {new Date(msg.createdAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                      <span>
                        {msg.seen ? (
                          <span className="text-blue-300">✓✓</span>
                        ) : (
                          <span className="text-gray-400">✓✓</span>
                        )}
                      </span>
                    </div>
                  </div>
                ))
              ) : messages.length > 0 && searchTermMessage ? (
                <p className="text-center text-gray-500 italic mt-10">
                  No matches found.
                </p>
              ) : (
                <p className="text-center text-gray-500 italic mt-10">
                  No messages yet. Say hi 👋
                </p>
              )}
              <div ref={messagesEndRef} />
            </div>

            <MessageInput
              input={input}
              setInput={setInput}
              sendMessage={sendMessage}
            />
          </>
        ) : (
          <div className="flex flex-col items-center justify-center flex-1 p-10 text-center text-gray-400">
            <h2 className="text-4xl font-bold mb-4">Welcome to Chat</h2>
            <p>Select a user from the left to start chatting.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Chats;