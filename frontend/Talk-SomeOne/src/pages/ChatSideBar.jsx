import React from 'react';
import { X } from 'lucide-react';

const ChatSideBar = ({
  searchTerm,
  filteredUsers,
  setSearchTerm,
  handleUser,
  selectedUser,
  handleOnClick,
}) => {
  return (
    <aside className="w-full md:w-1/3 bg-gray-800 p-5 overflow-y-auto border-r border-indigo-600">
      <h1 className="text-3xl font-extrabold mb-5 pb-3 border-b border-indigo-600">
        Chats
      </h1>

      <div className="relative mb-6">
        <input
          type="search"
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-3 pr-10 text-gray-900 bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm('')}
            className="absolute top-2.5 right-3 text-gray-500 hover:text-gray-800"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {filteredUsers.length === 0 ? (
        <p className="text-gray-400 italic text-center">No users found.</p>
      ) : (
        filteredUsers.map((user) => (
          <div
            key={user._id}
            onClick={() => handleUser(user)}
            className={`cursor-pointer flex items-center justify-between p-4 rounded-lg mb-2 transition flex-1 overflow-y-auto  scroll-smooth scrollbar-thin scrollbar-thumb-indigo-600 scrollbar-track-indigo-800
              ${
                selectedUser?._id === user._id
                  ? 'bg-indigo-700 shadow-lg'
                  : 'bg-gray-700 hover:bg-gray-600'
              }`}
            title={user.email}
          >
            <div className="flex items-center gap-4">
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  handleOnClick(user);
                }}
                className="w-12 h-12 rounded-full overflow-hidden flex items-center justify-center bg-indigo-600 text-white font-semibold text-xl select-none"
              >
                {user.imageUrl ? (
                  <img
                    src={user.imageUrl}
                    alt={user.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  user.name?.charAt(0).toUpperCase()
                )}
              </div>

              <div className="truncate max-w-[180px]">
                <p className="font-semibold text-lg truncate">{user.name}</p>
                <p className="text-sm text-indigo-300 truncate">
                  Say hi to {user.name?.split(' ')[0]}!
                </p>
              </div>
            </div>

            {user.status === 'online' && (
              <span
                className="w-4 h-4 rounded-full bg-green-400 animate-pulse"
                title="Online"
              ></span>
            )}
          </div>
        ))
      )}
    </aside>
  );
};

export default ChatSideBar;
