import React from 'react'
import { IoSend } from "react-icons/io5";

const MessageInput = ({input, setInput,sendMessage}) => {
  return (
     <div className="bg-gray-800 px-6 py-4 flex items-center gap-3 border-t border-indigo-700">
              <input
                type="text"
                placeholder="Type a message..."
                className="flex-1 bg-gray-700 text-white rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                value={input}
                onChange={(e) => setInput(e.target.value)}
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
  )
}

export default MessageInput