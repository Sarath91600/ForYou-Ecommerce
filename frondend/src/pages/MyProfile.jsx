import React from 'react';
import { User, Mail, Wallet } from 'lucide-react';

const MyProfile = () => {
  const userName = localStorage.getItem('userName');
  const userEmail = localStorage.getItem('userEmail');

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">😎 My Profile</h2>
        <div className="space-y-4">
          <div className="flex items-center gap-3 text-gray-700">
            <User className="w-5 h-5 text-blue-500" />
            <span><strong>Name:</strong> {userName}</span>
          </div>
          <div className="flex items-center gap-3 text-gray-700">
            <Mail className="w-5 h-5 text-green-500" />
            <span><strong>Email:</strong> {userEmail}</span>
          </div>
          <div className="flex items-center gap-3 text-gray-700">
            <Wallet className="w-5 h-5 text-purple-500" />
            <span><strong>Wallet:</strong> ₹00.00</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;

