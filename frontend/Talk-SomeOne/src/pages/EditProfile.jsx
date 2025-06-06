import React, { useState, useEffect } from "react";
import axiosInstace from "../../utils/axiosInstance";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaMapMarkerAlt, FaPhone, FaImage, FaInfoCircle } from "react-icons/fa";

const EditProfile = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    bio: "",
    location: "",
    phone: "",
    imageUrl: "",
  });

  const [imagePreview, setImagePreview] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user.id;

  useEffect(() => {
    getUserProfileInfo();
  }, []);

  const getUserProfileInfo = async () => {
    try {
      const response = await axiosInstace.get(`/api/users/userProfile/${userId}`);
      setForm({
        name: response.data.name || "",
        email: response.data.email || "",
        bio: response.data.bio || "",
        location: response.data.location || "",
        phone: response.data.phone || "",
        imageUrl: response.data.imageUrl || "",
      });
      setImagePreview(response.data.imageUrl || "");
    } catch (error) {
      toast.error("Internal server error",error);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstace.post(`/api/users/edit/profile/${userId}`, form);
      setForm(response.data);
      toast.success("Profile updated successfully!");
      navigate(`/profile/${userId}`);
    } catch (error) {
      toast.error("Something went wrong",error);
    }
  };

  const handleChanges = (e) => {
    const { name, value, files } = e.target;
    if (name === "imageUrl" && files.length > 0) {
      const file = files[0];
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
      setForm({ ...form, imageUrl: imageUrl }); // Consider uploading image separately if needed
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-gray-100 to-gray-300 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-xl rounded-2xl shadow-2xl p-8">
        <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">
          Edit Your Profile
        </h2>

        {/* Image Preview */}
        {imagePreview && (
          <div className="flex justify-center mb-4">
            <img
              src={imagePreview}
              alt="Profile Preview"
              className="w-28 h-28 rounded-full object-cover border-2 border-blue-400 shadow-md"
            />
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-4">
          {/* Name */}
          <div className="flex items-center border border-gray-300 rounded-xl px-3 py-2 focus-within:ring-2 focus-within:ring-blue-400">
            <FaUser className="mr-2 text-gray-500" />
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChanges}
              placeholder="Full Name"
              required
              className="w-full outline-none"
            />
          </div>

          {/* Email */}
          <div className="flex items-center border border-gray-300 rounded-xl px-3 py-2 focus-within:ring-2 focus-within:ring-blue-400">
            <FaEnvelope className="mr-2 text-gray-500" />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChanges}
              placeholder="Email Address"
              required
              className="w-full outline-none"
            />
          </div>

          {/* Image Upload */}
          <div className="flex items-center border border-gray-300 rounded-xl px-3 py-2 focus-within:ring-2 focus-within:ring-blue-400">
            <FaImage className="mr-2 text-gray-500" />
            <input
              type="file"
              name="imageUrl"
              onChange={handleChanges}
              className="w-full text-sm outline-none"
            />
          </div>

          {/* Bio */}
          <div className="flex flex-col">
            <div className="flex items-center border border-gray-300 rounded-xl px-3 py-2 focus-within:ring-2 focus-within:ring-blue-400">
              <FaInfoCircle className="mr-2 text-gray-500" />
              <textarea
                name="bio"
                value={form.bio}
                onChange={handleChanges}
                placeholder="Bio (max 100 characters)"
                className="w-full outline-none resize-none"
                maxLength={100}
              ></textarea>
            </div>
            <div className="text-right text-xs text-gray-500">{form.bio.length}/100</div>
          </div>

          {/* Location */}
          <div className="flex items-center border border-gray-300 rounded-xl px-3 py-2 focus-within:ring-2 focus-within:ring-blue-400">
            <FaMapMarkerAlt className="mr-2 text-gray-500" />
            <input
              type="text"
              name="location"
              value={form.location}
              onChange={handleChanges}
              placeholder="Location"
              className="w-full outline-none"
            />
          </div>

          {/* Phone */}
          <div className="flex items-center border border-gray-300 rounded-xl px-3 py-2 focus-within:ring-2 focus-within:ring-blue-400">
            <FaPhone className="mr-2 text-gray-500" />
            <input
              type="number"
              name="phone"
              value={form.phone}
              onChange={handleChanges}
              placeholder="Phone Number"
              className="w-full outline-none"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 transition-all duration-200 text-white font-semibold py-3 rounded-full"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
