import React, { useState, useEffect } from 'react';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

const colors = {
  primary: '#401D6C',
  secondary: '#EC385D',
  accent: '#FF8073',
  light: '#F8F4FF',
  error: '#EF4444',
  success: '#22C55E',
  gray: {
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827'
  }
};

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [token, setToken] = useState('');

  // Extract token from URL
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const resetToken = urlParams.get('token');
    if (resetToken) {
      setToken(resetToken);
      console.log('Reset token found:', resetToken.substring(0, 10) + '...');
    } else {
      setMessage('Invalid reset link. Please request a new password reset.');
    }
  }, []);

  const validatePassword = (password) => {
    return password.length >= 8;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!token) {
      setMessage('Invalid reset token. Please request a new password reset.');
      return;
    }

    if (!newPassword || !confirmPassword) {
      setMessage('Please fill in all fields.');
      return;
    }

    if (!validatePassword(newPassword)) {
      setMessage('Password must be at least 8 characters long.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage('Passwords do not match.');
      return;
    }

    setIsLoading(true);
    setMessage('');

    try {
      const response = await fetch('http://localhost:3001/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token: token,
          newPassword: newPassword
        })
      });

      const data = await response.json();

      if (response.ok) {
        setIsSuccess(true);
        setMessage('✅ Password reset successfully! You can now log in with your new password.');
        
        // Optional: Auto-redirect to login after 3 seconds
        setTimeout(() => {
          window.location.href = '/login';
        }, 3000);
        
      } else {
        setMessage(data.error?.message || 'Failed to reset password. Please try again.');
      }

    } catch (error) {
      console.error('Reset password error:', error);
      setMessage('Failed to reset password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!token && !message) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4" style={{
        background: `linear-gradient(135deg, ${colors.light} 0%, #ffffff 30%, ${colors.light} 100%)`
      }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{
      background: `linear-gradient(135deg, ${colors.light} 0%, #ffffff 30%, ${colors.light} 100%)`
    }}>
      <div className="w-full max-w-md">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <div className="mx-auto w-48 h-48 flex items-center justify-center mb-6">
            <img 
              src="/tprflow-logo.png" 
              alt="TPRFlow Logo" 
              className="w-full h-full object-contain"
            />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Reset Your Password
          </h1>
          <p className="text-gray-600">
            Enter your new password below
          </p>
        </div>

        {/* Reset Form */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 relative" style={{
          boxShadow: `0 25px 50px -12px rgba(64, 29, 108, 0.15)`,
          border: '2px solid transparent',
          backgroundImage: `linear-gradient(white, white), linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 50%, ${colors.accent} 100%)`,
          backgroundOrigin: 'border-box',
          backgroundClip: 'padding-box, border-box'
        }}>
          {isSuccess ? (
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Password Reset Successful!</h2>
              <p className="text-gray-600">You can now log in with your new password.</p>
              <p className="text-sm text-gray-500">Redirecting to login page in 3 seconds...</p>
              <button
                onClick={() => window.location.href = '/login'}
                className="mt-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-3 px-6 rounded-xl hover:shadow-lg transition-all duration-200"
              >
                Go to Login
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* New Password Field */}
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700">
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={showNewPassword ? 'text' : 'password'}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-4 py-3 pr-12 rounded-xl border-2 border-gray-200 focus:outline-none focus:border-purple-500 transition-all duration-200"
                    placeholder="Enter new password"
                    disabled={isLoading}
                    minLength={8}
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    disabled={isLoading}
                  >
                    {showNewPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              {/* Confirm Password Field */}
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700">
                  Confirm New Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-4 py-3 pr-12 rounded-xl border-2 border-gray-200 focus:outline-none focus:border-purple-500 transition-all duration-200"
                    placeholder="Confirm new password"
                    disabled={isLoading}
                    minLength={8}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    disabled={isLoading}
                  >
                    {showConfirmPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              {/* Password Requirements */}
              <div className="text-sm text-gray-600">
                <p>Password must be at least 8 characters long</p>
              </div>

              {/* Error/Success Message */}
              {message && (
                <div className={`p-3 rounded-lg border ${
                  message.includes('✅') 
                    ? 'bg-green-50 border-green-200 text-green-700'
                    : 'bg-red-50 border-red-200 text-red-700'
                }`}>
                  <p className="text-sm">{message}</p>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={!newPassword || !confirmPassword || isLoading}
                className="w-full text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 disabled:opacity-50 shadow-lg hover:shadow-xl"
                style={{
                  background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`
                }}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Resetting Password...
                  </div>
                ) : (
                  'Reset Password'
                )}
              </button>
            </form>
          )}
        </div>

        {/* Back to Login Link */}
        {!isSuccess && (
          <div className="mt-8 text-center">
            <button 
              onClick={() => window.location.href = '/login'}
              className="text-purple-600 hover:text-pink-600 font-medium transition-colors"
            >
              ← Back to Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;