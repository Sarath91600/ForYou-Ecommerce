import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import {useGoogleLogin} from '@react-oauth/google'

const Login = () => {
  const [currentState, setCurrentState] = useState('Login');
  const { token, setToken, backendUrl } = useContext(ShopContext);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(60);
  const [isLoading, setIsLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    let timer;
    if (isWaiting && secondsLeft > 0) {
      timer = setTimeout(() => setSecondsLeft((prev) => prev - 1), 1000);
    } else if (secondsLeft === 0) {
      setIsWaiting(false);
    }
    return () => clearTimeout(timer);
  }, [isWaiting, secondsLeft]);

  useEffect(() => {
    if (isOtpSent) {
      setButtonDisabled(false); // ✅ Enable button after OTP is sent
    }
  }, [isOtpSent]);

  const startOtpTimer = () => {
    setIsWaiting(true);
    setSecondsLeft(60);
  };

  const sendOtp = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(`${backendUrl}/api/user/send-otp`, { email });
      if (response.data.success) {
        setIsOtpSent(true);
        startOtpTimer();
        toast.success('OTP sent to your email.');
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error('Failed to send OTP.');
    }
    setIsLoading(false);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setButtonDisabled(true);
    try {
      if (currentState === 'Sign Up') {
        if (!isOtpSent) {
          const res = await axios.post(`${backendUrl}/api/user/register`, { name, email, password });
          if (res.data.success) {
            await sendOtp();
            setButtonDisabled(false); // ✅ Re-enable button after sending OTP
          } else {
            toast.error(res.data.message);
            setButtonDisabled(false);
          }
        } else {
          const verify = await axios.post(`${backendUrl}/api/user/verify-otp`, { email, otp });
          if (verify.data.success) {
            setToken(verify.data.token);
            localStorage.setItem('token', verify.data.token);
            localStorage.setItem('userName', verify.data.user.name);
            localStorage.setItem('userEmail', verify.data.user.email);
            toast.success('OTP verified. Welcome!');
            navigate('/');
          } else {
            toast.error(verify.data.message);
            setButtonDisabled(false);
          }
        }
      } else {
        const response = await axios.post(`${backendUrl}/api/user/login`, { email, password });
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('userName', response.data.user.name);
          localStorage.setItem('userEmail', response.data.user.email);
          toast.success('Welcome back!');
          navigate('/');

        } else {
          toast.error(response.data.message);
          setButtonDisabled(false);
        }
      }
    } catch (err) {
      toast.error(err.message);
      setButtonDisabled(false);
    }
  }
  


 const handleForgotPasswordClick = () => {
    navigate('/forgot-password'); // Navigate to the Forgot Password page
  };

    
  
    const handleGoogleLogin = () => {
  window.open(backendUrl+"/api/user/auth/google", "_self");
};

 //  useEffect(() => {
  //   if (token) navigate('/');
  // }, [token]);

  useEffect(() => {
  const storedToken = localStorage.getItem('token');
  if (storedToken) {
    navigate('/');
  }
}, []);

const toggleFormState = (state) => {
    setCurrentState(state);
    setIsOtpSent(false);
    setOtp('');
    setIsWaiting(false);
    setSecondsLeft(60);
    setName('');
    setEmail('');
    setPassword('');
    setIsLoading(false);
    setButtonDisabled(false);
  };


  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100 px-4'>
      <form onSubmit={onSubmitHandler} className='w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-5'>
        <div className='mb-6'>
          <h2 className='text-3xl font-semibold text-gray-800 mb-1'>{currentState}</h2>
          <div className='h-[2px] w-10 bg-gray-800'></div>
        </div>

        {currentState === 'Login' ? null : (
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            type='text'
            className='w-full px-4 py-3 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-600'
            placeholder='Name'
            required
          />
        )}

        <input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          type='email'
          className='w-full px-4 py-3 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-600'
          placeholder='Email'
          required
        />

        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type='password'
          className='w-full px-4 py-3 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-600'
          placeholder='Password'
          required
        />

        {currentState === 'Sign Up' && (
          <>
            {isLoading && (
              <p className='text-center text-sm text-green-500'>Sending OTP, please wait...</p>
            )}

            {isOtpSent && !isLoading && (
              <div className='space-y-3'>
                <input
                  onChange={(e) => setOtp(e.target.value)}
                  value={otp}
                  type='text'
                  className='w-full px-4 py-3 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-600'
                  placeholder='Enter OTP'
                  required
                />
                <button
                  type='button'
                  onClick={sendOtp}
                  disabled={isWaiting}
                  className={`w-full text-sm font-medium py-2 rounded-lg transition duration-300 ${
                    isWaiting
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }`}
                >
                  {isWaiting ? `Resend OTP in ${secondsLeft}s` : 'Resend OTP'}
                </button>
              </div>
            )}
          </>
        )}

        <div className='w-full flex justify-between text-sm text-gray-600'>
          <p   className='cursor-pointer hover:underline'><button onClick={handleForgotPasswordClick}>Forgot Password</button></p>
        
          {currentState === 'Login' ? (
          <div>
              <p className='cursor-pointer text-blue-600 hover:underline' onClick={() => toggleFormState('Sign Up')}>Create account</p>
          </div>
          ) : (
            <div>
              <p className='cursor-pointer text-blue-600 hover:underline'onClick={() => toggleFormState('Login')}> Login here</p>
            
              
            </div>
           )}
        </div>

        <button
          type='submit'
          disabled={buttonDisabled || isLoading}
          className={`w-full text-white text-sm font-medium py-3 rounded-lg transition duration-300 ${
            buttonDisabled || isLoading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-gray-800 hover:bg-gray-900'
          }`}
        >
          {currentState === 'Login' ? 'Sign In' : isOtpSent ? 'Verify & Sign Up' : 'Sign Up'}
        </button>
        <button onClick={handleGoogleLogin} className="mt-4 w-full flex items-center justify-center gap-3 border border-gray-300 py-2 px-4 rounded-lg shadow-sm bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white transition-all duration-200"
              ><img src="https://www.svgrepo.com/show/475656/google-color.svg"alt="Google" className="w-5 h-5"/><span className="text-sm font-medium">Continue with Google</span></button>
  
   </form>
    </div>
  );
};




export default Login




