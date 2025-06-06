import { useRef, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstace from "../../utils/axiosInstance";
import { IoSend } from "react-icons/io5";

const ChatWindow = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [userData, setUserData] = useState(null);

  const { userId } = useParams();
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);

  useEffect(() => {
    getUserProfileInfo(userId);
  }, [userId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getUserProfileInfo = async (userId) => {
    try {
      const response = await axiosInstace.get(`/api/users/userProfile/${userId}`);
      setUserData(response.data);
    } catch (error) {
      toast.error("Internal server error");
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
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
    if (user?._id) navigate(`/profile/${user._id}`, { state: user });
  };

  return (
    <main className="w-screen h-screen bg-gray-900 text-white flex flex-col">
  {/* Chat Header */}
  <header
    className="bg-gray-800 flex items-center gap-4 p-4 cursor-pointer hover:bg-gray-700 transition"
    onClick={() => handleOnClick(userData)}
  >
    <div className="w-12 h-12 rounded-full bg-indigo-600 flex items-center justify-center text-2xl font-bold select-none">
      {userData?.name?.charAt(0).toUpperCase() || "U"}
    </div>
    <div>
      <h1 className="font-semibold text-2xl">{userData?.name || "User"}</h1>
      <p className="text-sm text-green-400">{userData?.status || "offline"}</p>
    </div>
    <div className="ml-auto w-60 max-w-full">
      <input
        type="search"
        placeholder="Search within chat..."
        className="w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-1 text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
    </div>
  </header>

  {/* Messages Area */}
  <section
    className="flex-1 overflow-y-auto p-5 space-y-3 scrollbar-thin scrollbar-thumb-indigo-600 scrollbar-track-gray-800"
    style={{ scrollbarWidth: "thin" }}
  >
    {messages.length === 0 && (
      <p className="text-gray-400 text-center mt-10">No messages yet. Start the conversation!</p>
    )}
    {messages.map((msg, idx) => (
      <div
        key={idx}
        className={`max-w-[70%] px-5 py-3 rounded-xl shadow-md break-words ${
          msg.sender === "me"
            ? "bg-indigo-600 self-end ml-auto rounded-br-none"
            : "bg-gray-700 rounded-bl-none"
        }`}
        title={new Date(msg.timestamp).toLocaleString()}
      >
        <p>{msg.text}</p>
        <time className="block text-xs text-gray-300 mt-1 text-right">
          {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </time>
      </div>
    ))}
    <div ref={messagesEndRef} />
  </section>

  {/* Input Area */}
  <footer className="bg-gray-800 p-4 flex items-center gap-3">
    <input
      type="text"
      aria-label="Type a message"
      placeholder="Type a message..."
      className="flex-grow rounded-md bg-gray-700 px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      value={newMessage}
      onChange={(e) => setNewMessage(e.target.value)}
      onKeyDown={(e) => e.key === "Enter" && sendMessage()}
    />
    <button
      onClick={sendMessage}
      aria-label="Send message"
      className="p-2 rounded-full bg-indigo-600 hover:bg-indigo-700 active:scale-95 transition-transform text-white"
    >
      <IoSend size={24} />
    </button>
  </footer>
</main>

  );
};

export default ChatWindow;
