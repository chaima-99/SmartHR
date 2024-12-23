import React, { useState } from 'react';
import { FaUser, FaEnvelope, FaLock, FaPhone, FaPaperclip, FaHome, FaCalendarAlt } from 'react-icons/fa';

const UserForm = () => {
  const [formData, setFormData] = useState({
    familyName: '',
    name: '',
    username: '',
    mailAddress: '',
    birthDate: '',
    newPassword: '',
    phoneNumber: '',
    profilePicture: null,
    role: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'profilePicture') {
      setFormData({ ...formData, profilePicture: e.target.files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleRoleSelect = (role) => {
    setFormData({ ...formData, role });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-[#12395D] p-8 rounded-3xl shadow-lg w-full max-w-2xl">
        <form className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-white text-lg">Family name</label>
            <div className="relative">
              <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                name="familyName"
                value={formData.familyName}
                onChange={handleChange}
                className="w-full p-3 pl-10 rounded-md bg-white border-0"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-white text-lg">Home Address</label>
            <div className="relative">
              <FaHome className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                name="homeAddress"
                value={formData.homeAddress}
                onChange={handleChange}
                className="w-full p-3 pl-10 rounded-md bg-white border-0"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-white text-lg">Name</label>
            <div className="relative">
              <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 pl-10 rounded-md bg-white border-0"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-white text-lg">DD/MM/YYYY</label>
            <div className="relative">
              <FaCalendarAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="date"
                name="birthDate"
                value={formData.birthDate}
                onChange={handleChange}
                className="w-full p-3 pl-10 rounded-md bg-white border-0"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-white text-lg">Username</label>
            <div className="relative">
              <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full p-3 pl-10 rounded-md bg-white border-0"
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => handleRoleSelect('HR')}
                className={`flex-1 p-2 rounded-md ${
                  formData.role === 'HR' ? 'bg-[#5C9BCE] text-white' : 'bg-white text-black'
                }`}
              >
                HR
              </button>
              <button
                type="button"
                onClick={() => handleRoleSelect('Employee')}
                className={`flex-1 p-2 rounded-md ${
                  formData.role === 'Employee' ? 'bg-[#5C9BCE] text-white' : 'bg-white text-black'
                }`}
              >
                Employee
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-white text-lg">Mail address</label>
            <div className="relative">
              <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                name="mailAddress"
                value={formData.mailAddress}
                onChange={handleChange}
                className="w-full p-3 pl-10 rounded-md bg-gray-300 border-0"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-white text-lg">Profile picture</label>
            <div className="relative">
              <input
                type="text"
                readOnly
                className="w-full p-3 rounded-md bg-white border-0"
                placeholder="Choose file"
                value={formData.profilePicture ? formData.profilePicture.name : ''}
              />
              <label className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer">
                <FaPaperclip className="text-gray-400" />
                <input
                  type="file"
                  name="profilePicture"
                  onChange={handleChange}
                  className="hidden"
                  accept="image/*"
                />
              </label>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-white text-lg">New password</label>
            <div className="relative">
              <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                className="w-full p-3 pl-10 rounded-md bg-white border-0"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-white text-lg">Phone number</label>
            <div className="relative">
              <FaPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="w-full p-3 pl-10 rounded-md bg-white border-0"
              />
            </div>
          </div>

          <div className="col-span-2 mt-4">
            <button
              type="submit"
              className="w-full bg-[#12395D] text-white py-3 rounded-md border-2 border-[#5C9BCE] hover:bg-[#1D5C96] transition duration-300"
            >
              confirm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserForm;