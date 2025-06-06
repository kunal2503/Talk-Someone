import React, { useEffect, useState } from 'react';
import axiosInstance from '../utils/axiosInstance';
import { toast } from 'react-toastify';

const FriendButton = ({ targetUserId, userId }) => {
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    if (!userId || !targetUserId) return;
    fetchStatus();
  }, [targetUserId, userId]);

  const fetchStatus = async () => {
    try {
      const response = await axiosInstance.get(
        `/api/user-friends/${targetUserId}/status`,
        {
          params: { userId },
        }
      );
      setStatus(response.data.status);
    } catch (error) {
      console.error('Error fetching friend status:', error);
      toast.error(error?.response?.data?.message || 'Unable to load friend status');
    }
  };

  const handleAction = async (url, method, newStatus) => {
    if (userId === targetUserId) {
      toast.error('You cannot perform this action on yourself');
      return;
    }

    try {
      const config = { params: { userId } };
      if (method === 'post') {
        await axiosInstance.post(url, {}, config);
      } else if (method === 'delete') {
        await axiosInstance.delete(url, config);
      }
      setStatus(newStatus);
    } catch (error) {
      console.error(`Error during ${method} request:`, error);
      toast.error(error?.response?.data?.message || 'Something went wrong');
    }
  };

  const handleAdd = () =>
    handleAction(`/api/user-friends/${targetUserId}/add-friend`, 'post', 'request sent');
  const handleAccept = () =>
    handleAction(`/api/user-friends/${targetUserId}/accept-friend`, 'post', 'friends');
  const handleCancel = () =>
    handleAction(`/api/user-friends/${targetUserId}/cancel-request`, 'delete', 'not friends');
  const handleUnfriend = () =>
    handleAction(`/api/user-friends/${targetUserId}/unfriend`, 'delete', 'not friends');

  if (status === 'loading') {
    return (
      <button className="bg-gray-400 text-white px-4 py-2 rounded-lg animate-pulse">
        Loading...
      </button>
    );
  }

  return (
    <div className="space-x-2">
      {status === 'not friends' && (
        <button onClick={handleAdd} className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg">
          Add Friend
        </button>
      )}
      {status === 'request sent' && (
        <button onClick={handleCancel} className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg">
          Cancel Request
        </button>
      )}
      {status === 'request received' && (
        <button onClick={handleAccept} className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg">
          Accept Request
        </button>
      )}
      {status === 'friends' && (
        <button onClick={handleUnfriend} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg">
          Unfriend
        </button>
      )}
    </div>
  );
};

export default FriendButton;
