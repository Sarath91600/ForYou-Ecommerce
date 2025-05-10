import React, { useState, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { ShopContext } from '../context/ShopContext';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const { setToken, backendUrl } = useContext(ShopContext);

  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [isPasswordSet, setIsPasswordSet] = useState(false);

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(`${backendUrl}/api/user/check-email`, { email });
      if (response.data.success) {
        setIsEmailVerified(true);
        toast.success('Email verified! Please enter the OTP.');
      } else {
        toast.error('User Not Found!');
      }
    } catch (error) {
      toast.error('Failed to check email.');
    }
    setIsLoading(false);
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(`${backendUrl}/api/user/verify-otp`, { email, otp });
      if (response.data.success) {
        setIsOtpVerified(true);
        toast.success('OTP verified! Please set a new password.');
      } else {
        toast.error('Invalid OTP!');
      }
    } catch (error) {
      toast.error('Failed to verify OTP.');
    }
    setIsLoading(false);
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match!');
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post(`${backendUrl}/api/user/reset-password`, {
        email,
        newPassword,
      });

      console.log("Reset Password Response:", response.data); // Debugging line

      if (response.data.success) {
        const { token, user } = response.data;
        setIsPasswordSet(true);
        setToken(token);
        localStorage.setItem('token', token);
        localStorage.setItem('userName', user.name);
        localStorage.setItem('userEmail', user.email);
        toast.success('Password reset successfully!');
        navigate('/');
      } else {
        toast.error("please enter a strong password(9 number)");
      }
    } catch (error) {
      toast.error('Failed to reset password.');
    }

    setIsLoading(false);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-center mb-4">Forgot Password</h2>

      {/* Email Input Section */}
      {!isEmailVerified && !isOtpVerified && !isPasswordSet && (
        <form onSubmit={handleEmailSubmit}>
          <div className="mb-4">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="text-center">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
            >
              {isLoading ? 'Checking...' : 'Get OTP'}
            </button>
          </div>
        </form>
      )}

      {/* OTP Verification Section */}
      {isEmailVerified && !isOtpVerified && !isPasswordSet && (
        <form onSubmit={handleOtpSubmit}>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="text-center">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
            >
              {isLoading ? 'Verifying...' : 'Verify OTP'}
            </button>
          </div>
        </form>
      )}

      {/* New Password Section */}
      {isOtpVerified && !isPasswordSet && (
        <form onSubmit={handlePasswordSubmit}>
          <div className="mb-4">
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="text-center">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
            >
              {isLoading ? 'Saving...' : 'Save New Password'}
            </button>
          </div>
        </form>
      )}

      {/* Success Message */}
      {isPasswordSet && (
        <div className="text-center mt-4">
          <p className="text-green-600">Your password has been successfully reset!</p>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;



