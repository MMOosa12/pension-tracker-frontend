import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ setUserId }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [capsLock, setCapsLock] = useState(false);

  const handleLogin = async () => {
    try {
      const res = await axios.post('http://localhost:3001/api/auth/login', {
        email,
        password,
      });
      setUserId(res.data.userId);
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  const handleCapsLock = (e) => {
    setCapsLock(e.getModifierState('CapsLock'));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple via-pink to-peach px-4">
      <div className="bg-white shadow-xl rounded-2xl px-6 py-8 w-full max-w-md space-y-6">
        <div className="flex flex-col items-center -mt-4">
          <img
            src="/tprflow-logo-purple.png"
            alt="TPRFlow Logo"
            className="w-48 h-48 mb-1"
          />
        </div>

        {error && (
          <div className="text-red-500 text-sm text-center">{error}</div>
        )}

        <div className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              aria-label="Email address"
              className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-pink"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm text-gray-700">
              Password
            </label>
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              aria-label="Password"
              onKeyUp={handleCapsLock}
              className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-pink"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
            {capsLock && (
              <p className="text-xs text-orange-500 mt-1">Caps Lock is ON</p>
            )}
            <div className="mt-1 flex justify-between items-center">
              <label className="text-xs text-gray-600">
                <input
                  type="checkbox"
                  className="mr-1"
                  onChange={() => setShowPassword(!showPassword)}
                />
                Show password
              </label>
              <p className="text-sm text-pink hover:underline cursor-pointer">
                Forgot password?
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleLogin}
            className="w-full bg-pink text-white font-semibold py-2 rounded-md hover:bg-peach transition"
          >
            Log in
          </button>

          <div className="text-center text-gray-600 text-xs">or</div>

          {/* Google Login */}
          <button
            type="button"
            className="w-full bg-white border border-gray-300 text-gray-700 py-2 rounded-md flex items-center justify-center gap-2 hover:border-pink transition"
          >
            <img src="/google-icon.svg" alt="Google" className="w-5 h-5" />
            Log in with Google
          </button>

          {/* Microsoft Login */}
          <button
            type="button"
            className="w-full bg-white border border-gray-300 text-gray-700 py-2 rounded-md flex items-center justify-center gap-2 hover:border-pink transition"
          >
            <img src="/microsoft-icon.svg" alt="Microsoft" className="w-5 h-5" />
            Log in with Microsoft
          </button>
        </div>

        <p className="text-center text-sm text-gray-600 mt-4">
          Don’t have an account?{' '}
          <span className="text-pink font-semibold hover:underline cursor-pointer">
            Sign up
          </span>
        </p>

        <p className="text-center text-xs text-gray-400 mt-4">Powered by the IP team</p>
      </div>
    </div>
  );
};

export default Login;

