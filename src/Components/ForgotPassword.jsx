import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

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

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [emailError, setEmailError] = useState('');

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Reset states
    setEmailError('');
    setMessage('');
    
    // Validation
    if (!email) {
      setEmailError('Email address is required');
      return;
    }
    
    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      return;
    }

    setIsLoading(true);

    try {
      // Call forgot password API
      const response = await fetch('http://localhost:3001/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() })
      });

      const data = await response.json();

      if (response.ok) {
        setIsSuccess(true);
        setMessage('✅ Password reset email sent! Check your inbox for further instructions.');
        setEmail(''); // Clear the email field
      } else {
        // Handle different error scenarios gracefully
        if (response.status === 404) {
          setMessage('📧 If an account with that email exists, you will receive a password reset link shortly.');
          setIsSuccess(true); // Show success even if email not found (security best practice)
        } else {
          setMessage(data.error?.message || 'Failed to send reset email. Please try again.');
        }
      }

    } catch (error) {
      console.error('Forgot password error:', error);
      setMessage('Network error. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToLogin = () => {
    navigate('/login');
  };

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
            Forgot Password?
          </h1>
          <p className="text-gray-600">
            Enter your email address and we'll send you a link to reset your password
          </p>
        </div>

        {/* Forgot Password Form */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 relative" style={{
          boxShadow: `0 25px 50px -12px rgba(64, 29, 108, 0.15)`,
          border: '2px solid transparent',
          backgroundImage: `linear-gradient(white, white), linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 50%, ${colors.accent} 100%)`,
          backgroundOrigin: 'border-box',
          backgroundClip: 'padding-box, border-box'
        }}>
          {isSuccess ? (
            // Success State
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 7.89a1 1 0 001.42 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Check Your Email</h2>
              <p className="text-gray-600">
                We've sent password reset instructions to your email address.
              </p>
              <div className="space-y-4 pt-4">
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg text-left">
                  <p className="text-blue-800 text-sm">
                    <strong>Next steps:</strong>
                  </p>
                  <ul className="text-blue-700 text-sm mt-2 space-y-1">
                    <li>• Check your email inbox (and spam folder)</li>
                    <li>• Click the reset link in the email</li>
                    <li>• Follow the instructions to set a new password</li>
                  </ul>
                </div>
                <button
                  onClick={() => {
                    setIsSuccess(false);
                    setMessage('');
                    setEmail('');
                  }}
                  className="w-full text-gray-600 hover:text-gray-800 font-medium py-2 transition-colors"
                >
                  Send to a different email
                </button>
              </div>
            </div>
          ) : (
            // Email Form
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-semibold mb-2 text-gray-700">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (emailError) setEmailError('');
                    if (message) setMessage('');
                  }}
                  className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 bg-white placeholder-gray-400 focus:outline-none ${
                    emailError 
                      ? 'border-red-300 focus:border-red-500' 
                      : 'border-gray-200 focus:border-purple-500'
                  }`}
                  placeholder="Enter your email address"
                  disabled={isLoading}
                  autoComplete="email"
                  autoFocus
                />
                {emailError && (
                  <p className="mt-2 text-sm text-red-600">{emailError}</p>
                )}
              </div>

              {/* General Message */}
              {message && !isSuccess && (
                <div className={`p-3 rounded-lg border ${
                  message.includes('✅') 
                    ? 'bg-green-50 border-green-200 text-green-700'
                    : 'bg-red-50 border-red-200 text-red-700'
                }`}>
                  <p className="text-sm">{message}</p>
                </div>
              )}

              {/* Send Reset Email Button */}
              <button
                type="submit"
                disabled={!email || isLoading}
                className="w-full text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 disabled:opacity-50 shadow-lg hover:shadow-xl disabled:cursor-not-allowed"
                style={{
                  background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`
                }}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Sending Reset Email...
                  </div>
                ) : (
                  'Send Reset Email'
                )}
              </button>

              {/* Additional Help */}
              <div className="text-center space-y-3 pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-600">
                  Remember your password?
                </p>
                <button
                  type="button"
                  onClick={handleBackToLogin}
                  className="inline-flex items-center space-x-2 text-purple-600 hover:text-purple-800 font-medium transition-colors text-sm"
                  disabled={isLoading}
                >
                  <ArrowLeftIcon className="w-4 h-4" />
                  <span>Back to Login</span>
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Additional Help */}
        {!isSuccess && (
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500 mb-2">
              Need help? Contact our support team
            </p>
            <a 
              href="mailto:support@tprflow.com" 
              className="text-purple-600 hover:text-purple-800 font-medium text-sm transition-colors"
            >
              support@tprflow.com
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;