import React, { useContext, useState, useRef, useEffect } from 'react';
import { UserContext } from '../../Dashboard/Dashboard';
import axios from 'axios';

function ProfileSettings() {
  const userData = useContext(UserContext);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    mobile: '',
  });
  const [profileFile, setProfileFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [saving, setSaving] = useState(false);
  const fileInputRef = useRef(null);

  // Initialize fields once userData is available
  useEffect(() => {
    if (userData) {
      setFormData({
        firstname: userData.firstname || '',
        lastname: userData.lastname || '',
        mobile: userData.mobile || '',
      });
      setPreviewUrl(normalizeUrl(userData.profile));
    }
  }, [userData]);

  const normalizeUrl = (url) => {
    if (!url) return '/default-avatar.png';
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url;
    }
    const clean = url.startsWith('/') ? url.slice(1) : url;
    return `https://movie-flix-product-backend.onrender.com/${clean}`;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageClick = () => {
    if (isEditing && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    if (userData) {
      setFormData({
        firstname: userData.firstname || '',
        lastname: userData.lastname || '',
        mobile: userData.mobile || '',
      });
      setPreviewUrl(normalizeUrl(userData.profile));
      setProfileFile(null);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      const token = localStorage.getItem('token');
      const dataToSend = new FormData();
      dataToSend.append('firstname', formData.firstname);
      dataToSend.append('lastname', formData.lastname);
      dataToSend.append('mobile', formData.mobile);
      if (profileFile) {
        dataToSend.append('profile', profileFile);
      }

      const response = await axios.post(
        'https://movie-flix-product-backend.onrender.com/movieflix/update-profile',
        dataToSend,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        alert('Profile updated successfully!');
        setIsEditing(false);
        setProfileFile(null);
        // Force refresh to update the parent Dashboard's UserContext
        window.location.reload();
      }
    } catch (error) {
      console.error('Save profile error:', error);
      alert(error.response?.data?.message || 'Failed to save changes');
    } finally {
      setSaving(false);
    }
  };

  if (!userData) {
    return (
      <div className="flex justify-center items-center h-screen text-white bg-slate-900">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white flex justify-center items-center p-6">
      <div className="bg-slate-800 rounded-2xl shadow-xl p-8 w-full max-w-md border border-slate-700/50">

        {/* Profile Image & Avatar Trigger */}
        <div className="flex flex-col items-center mb-6 relative">
          <div
            className={`w-28 h-28 rounded-full overflow-hidden border-4 border-blue-500 shadow-md relative group select-none ${isEditing ? 'cursor-pointer' : ''
              }`}
            onClick={handleImageClick}
          >
            <img
              src={previewUrl}
              alt="profile"
              className="w-full h-full object-cover"
              onError={(e) => (e.target.src = '/default-avatar.png')}
            />
            {isEditing && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-xs font-semibold text-white uppercase tracking-wider">Change</span>
              </div>
            )}
          </div>
          {isEditing && (
            <span className="text-[11px] text-gray-400 mt-2">Click photo to upload new</span>
          )}
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
          />
        </div>

        {/* Form Fields */}
        <div className="space-y-5">
          {/* First Name */}
          <div>
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide">First Name</label>
            <input
              type="text"
              name="firstname"
              value={formData.firstname}
              onChange={handleInputChange}
              readOnly={!isEditing}
              className={`w-full bg-slate-700 px-4 py-3 rounded-xl mt-1.5 outline-none border transition-all text-sm
                ${isEditing ? 'border-blue-500 focus:border-blue-400 bg-slate-750' : 'border-transparent'}`}
            />
          </div>

          {/* Last Name */}
          <div>
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Last Name</label>
            <input
              type="text"
              name="lastname"
              value={formData.lastname}
              onChange={handleInputChange}
              readOnly={!isEditing}
              className={`w-full bg-slate-700 px-4 py-3 rounded-xl mt-1.5 outline-none border transition-all text-sm
                ${isEditing ? 'border-blue-500 focus:border-blue-400 bg-slate-750' : 'border-transparent'}`}
            />
          </div>

          {/* Email (Read Only always) */}
          <div>
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Email Address</label>
            <input
              type="email"
              value={userData.email}
              readOnly
              className="w-full bg-slate-700/50 text-gray-400 px-4 py-3 rounded-xl mt-1.5 border border-transparent text-sm cursor-not-allowed"
            />
          </div>

          {/* Mobile */}
          <div>
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Mobile Number</label>
            <input
              type="text"
              name="mobile"
              value={formData.mobile}
              onChange={handleInputChange}
              readOnly={!isEditing}
              className={`w-full bg-slate-700 px-4 py-3 rounded-xl mt-1.5 outline-none border transition-all text-sm
                ${isEditing ? 'border-blue-500 focus:border-blue-400 bg-slate-750' : 'border-transparent'}`}
            />
          </div>

          {/* Role */}
          <div>
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide">System Role</label>
            <input
              type="text"
              value="Admin"
              readOnly
              className="w-full bg-slate-700/50 text-gray-400 px-4 py-3 rounded-xl mt-1.5 border border-transparent text-sm cursor-not-allowed"
            />
          </div>

          {/* Action Buttons */}
          <div className="pt-4 flex gap-3">
            {isEditing ? (
              <>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 active:scale-95 transition-all text-white font-semibold rounded-xl text-sm cursor-pointer disabled:opacity-50"
                >
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
                <button
                  onClick={handleCancel}
                  disabled={saving}
                  className="flex-1 py-3 bg-slate-750 hover:bg-slate-700 active:scale-95 transition-all text-gray-300 font-semibold rounded-xl text-sm border border-slate-600 cursor-pointer disabled:opacity-50"
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 active:scale-95 transition-all text-white font-semibold rounded-xl text-sm cursor-pointer shadow-lg shadow-blue-500/10"
              >
                Edit Profile
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

export default ProfileSettings;