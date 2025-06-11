import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react'; // using lucide-react for the clear icon

const ChatNavbar = ({
  handleOnClick,
  selectedUser,
  formatLastSeen,
  searchTerm,
  setSearchTerm,
}) => {
  const navigate = useNavigate();
  const [debouncedTerm, setDebouncedTerm] = useState(searchTerm);

  // Optional: Debounced search logic
  useEffect(() => {
    const delay = setTimeout(() => {
      setSearchTerm(debouncedTerm);
    }, 300); // 300ms delay

    return () => clearTimeout(delay);
  }, [debouncedTerm]);

  return (
    <div className="flex items-center gap-4 bg-gray-800 px-6 py-4 border-b border-indigo-700">
      <div
        onClick={() => handleOnClick(selectedUser)}
        className="flex items-center gap-4 cursor-pointer select-none"
        title={`View ${selectedUser.name}'s profile`}
      >
        {selectedUser.imageUrl ? (
          <img
            src={selectedUser.imageUrl}
            alt={selectedUser.name}
            className="rounded-full w-12 h-12 object-cover"
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center text-xl">
            {selectedUser.name?.charAt(0).toUpperCase()}
          </div>
        )}
        <div>
          <h2 className="text-2xl font-semibold">{selectedUser.name}</h2>
          {selectedUser.status === 'online' ? (
            <p className="text-green-400">Online</p>
          ) : (
            <p className="text-gray-400 text-sm">
              Last seen: {formatLastSeen(selectedUser.lastSeen)}
            </p>
          )}
        </div>
      </div>

      <div className="ml-auto w-full max-w-md relative">
        <input
          type="search"
          placeholder="Search in chat..."
          value={debouncedTerm}
          onChange={(e) => setDebouncedTerm(e.target.value)}
          className="w-full px-4 py-2 rounded bg-gray-700 text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 pr-10"
        />
        {debouncedTerm && (
          <button
            onClick={() => {
              setDebouncedTerm('');
              setSearchTerm('');
            }}
            className="absolute right-2 top-2 text-gray-400 hover:text-white"
          >
            <X size={18} />
          </button>
        )}
      </div>
    </div>
  );
};

export default ChatNavbar;
