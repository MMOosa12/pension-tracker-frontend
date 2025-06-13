import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { authAPI } from '../services/api';

// TPRFlow Brand Colors - Updated palette
const colors = {
  primary: '#401D6C',      // Deep Purple
  secondary: '#EC385D',    // Vibrant Pink  
  accent: '#FF8073',       // Warm Peach
  light: '#F8F4FF',        // Very Light Purple
  dark: '#2A1A4A',         // Darker Purple
  success: '#22C55E',      // Green
  warning: '#F59E0B',      // Amber
  error: '#EF4444',        // Red
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

const LoginPage = () => {
  const navigate = useNavigate(); // Add this hook for navigation
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [emailTyping, setEmailTyping] = useState(false);
  const [passwordTyping, setPasswordTyping] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setEmailTyping(value.length > 0);
    if (emailError && validateEmail(value)) {
      setEmailError('');
    }
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setPasswordTyping(value.length > 0);
    if (passwordError && value.length >= 8) {
      setPasswordError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Reset errors
    setEmailError('');
    setPasswordError('');
    
    // Validation
    let hasErrors = false;
    
    if (!email) {
      setEmailError('Email is required');
      hasErrors = true;
    } else if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      hasErrors = true;
    }
    
    if (!password) {
      setPasswordError('Password is required');
      hasErrors = true;
    } else if (password.length < 8) {
      setPasswordError('Password must be at least 8 characters');
      hasErrors = true;
    }
    
    if (hasErrors) return;
    
    setIsLoading(true);
    
    try {
      // Call real API
      const result = await authAPI.login({
        email: email.trim(),
        password,
        rememberMe
      });
      
      console.log('✅ Login successful:', result.user);
      
      // Show success state briefly
      setLoginSuccess(true);
      
      // Store additional user info if needed
      localStorage.setItem('userRole', result.user.role);
      localStorage.setItem('consultancyId', result.user.consultancyId);
      localStorage.setItem('consultancyName', result.user.consultancyName);
      
      // Simulate brief success display, then redirect
      setTimeout(() => {
        // Navigate to dashboard using React Router
        navigate('/dashboard');
      }, 1000);
      
    } catch (error) {
      console.error('❌ Login error:', error);
      
      // Handle specific error types
      if (error.message.includes('Invalid email or password')) {
        setPasswordError('Invalid email or password. Please check your credentials.');
      } else if (error.message.includes('User not found')) {
        setEmailError('No account found with this email address.');
      } else if (error.message.includes('Account locked')) {
        setPasswordError('Account temporarily locked. Please try again later.');
      } else {
        setPasswordError(error.message || 'Login failed. Please try again.');
      }
      
      // Clear success state if there was an error
      setLoginSuccess(false);
      
    } finally {
      setIsLoading(false);
    }
  };

  const handleOAuthLogin = (provider) => {
    console.log(`${provider} OAuth login initiated`);
    // OAuth implementation would go here
    alert(`${provider} OAuth is not yet implemented. Use email/password for now.`);
  };

  // Handle forgot password navigation
  const handleForgotPassword = () => {
    navigate('/forgot-password');
  };

  // Handle sign up navigation
  const handleSignUp = () => {
    navigate('/register');
  };

  // Quick fill for testing (remove in production)
  const handleQuickFill = () => {
    setEmail('test@tprflow.com');
    setPassword('TestPassword123');
    setEmailTyping(true);
    setPasswordTyping(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{
      background: `linear-gradient(135deg, ${colors.light} 0%, #ffffff 30%, ${colors.light} 100%)`
    }}>
      <div className="w-full max-w-md">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <div className="mx-auto w-64 h-64 flex items-center justify-center mb-6">
            <img 
              src="/tprflow-logo.png" 
              alt="TPRFlow Logo" 
              className="w-full h-full object-contain"
            />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Welcome back
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Sign in to your TPRFlow account
          </p>
          
          {/* Quick test credentials button (remove in production) */}
          <button
            type="button"
            onClick={handleQuickFill}
            className="mt-2 text-sm text-blue-600 hover:text-blue-800 underline"
          >
            Fill test credentials
          </button>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 relative" style={{
          boxShadow: `0 25px 50px -12px rgba(64, 29, 108, 0.15)`,
          border: '2px solid transparent',
          backgroundImage: `linear-gradient(white, white), linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 50%, ${colors.accent} 100%)`,
          backgroundOrigin: 'border-box',
          backgroundClip: 'padding-box, border-box'
        }}>
          
          {/* Success indicator */}
          {loginSuccess && (
            <div className="absolute top-4 right-4">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold mb-2" style={{ color: colors.gray[700] }}>
                Email address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={handleEmailChange}
                data-testid="email-input"
                className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 
                  ${emailError 
                    ? `border-red-300 focus:border-red-500` 
                    : `border-gray-200 focus:outline-none`
                  } 
                  bg-white placeholder-gray-400`}
                style={{
                  borderColor: emailError ? colors.error : colors.gray[200],
                  color: emailTyping ? colors.secondary : colors.gray[900]
                }}
                onFocus={(e) => {
                  if (!emailError) {
                    e.target.style.borderColor = colors.primary;
                    e.target.style.boxShadow = `0 0 0 3px ${colors.primary}20`;
                  }
                }}
                onBlur={(e) => {
                  if (!emailError) {
                    e.target.style.borderColor = colors.gray[200];
                    e.target.style.boxShadow = 'none';
                  }
                }}
                placeholder="Enter your email"
                disabled={isLoading}
                autoComplete="email"
              />
              {emailError && (
                <p className="mt-2 text-sm" style={{ color: colors.error }}>{emailError}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-semibold mb-2" style={{ color: colors.gray[700] }}>
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={handlePasswordChange}
                  data-testid="password-input"
                  className={`w-full px-4 py-3 pr-12 rounded-xl border-2 transition-all duration-200 
                    ${passwordError 
                      ? `border-red-300 focus:border-red-500` 
                      : `border-gray-200 focus:outline-none`
                    } 
                    bg-white placeholder-gray-400`}
                  style={{
                    borderColor: passwordError ? colors.error : colors.gray[200],
                    color: passwordTyping || showPassword ? colors.secondary : colors.gray[900]
                  }}
                  onFocus={(e) => {
                    if (!passwordError) {
                      e.target.style.borderColor = colors.primary;
                      e.target.style.boxShadow = `0 0 0 3px ${colors.primary}20`;
                    }
                  }}
                  onBlur={(e) => {
                    if (!passwordError) {
                      e.target.style.borderColor = colors.gray[200];
                      e.target.style.boxShadow = 'none';
                    }
                  }}
                  placeholder="Enter your password"
                  disabled={isLoading}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 transition-colors duration-200 focus:outline-none"
                  style={{
                    color: colors.gray[400]
                  }}
                  onFocus={(e) => {
                    e.target.style.color = colors.primary;
                  }}
                  onBlur={(e) => {
                    e.target.style.color = colors.gray[400];
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.color = colors.gray[600];
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = colors.gray[400];
                  }}
                  disabled={isLoading}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <EyeSlashIcon className="h-5 w-5" />
                  ) : (
                    <EyeIcon className="h-5 w-5" />
                  )}
                </button>
              </div>
              {passwordError && (
                <p className="mt-2 text-sm" style={{ color: colors.error }}>{passwordError}</p>
              )}
            </div>

            {/* Remember Me and Forgot Password Row */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 rounded transition-colors duration-200 focus:outline-none"
                  style={{
                    accentColor: colors.primary,
                    borderColor: colors.gray[300]
                  }}
                  disabled={isLoading}
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm select-none cursor-pointer" style={{ color: colors.gray[600] }}>
                  Remember me
                </label>
              </div>
              <div>
                <button
                  type="button"
                  className="text-sm font-medium transition-colors duration-200 focus:outline-none focus:underline"
                  style={{ color: colors.primary }}
                  onMouseEnter={(e) => {
                    e.target.style.color = colors.secondary;
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = colors.primary;
                  }}
                  disabled={isLoading}
                  onClick={handleForgotPassword}
                >
                  Forgot password?
                </button>
              </div>
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              data-testid="login-button"
              disabled={isLoading || loginSuccess}
              className="w-full text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] 
                focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed 
                disabled:transform-none shadow-lg hover:shadow-xl"
              style={{
                background: loginSuccess 
                  ? `linear-gradient(135deg, ${colors.success} 0%, #16a34a 100%)`
                  : `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
                boxShadow: `0 10px 25px -5px ${loginSuccess ? colors.success : colors.primary}40`
              }}
              onMouseEnter={(e) => {
                if (!isLoading && !loginSuccess) {
                  e.target.style.background = `linear-gradient(135deg, ${colors.dark} 0%, ${colors.secondary} 100%)`;
                  e.target.style.boxShadow = `0 15px 35px -5px ${colors.primary}50`;
                }
              }}
              onMouseLeave={(e) => {
                if (!isLoading && !loginSuccess) {
                  e.target.style.background = `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`;
                  e.target.style.boxShadow = `0 10px 25px -5px ${colors.primary}40`;
                }
              }}
              onFocus={(e) => {
                e.target.style.boxShadow = `0 0 0 3px ${colors.primary}40, 0 15px 35px -5px ${colors.primary}50`;
              }}
              onBlur={(e) => {
                e.target.style.boxShadow = `0 10px 25px -5px ${colors.primary}40`;
              }}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Signing in...
                </div>
              ) : loginSuccess ? (
                <div className="flex items-center justify-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Success! Redirecting...
                </div>
              ) : (
                'Sign in'
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="mt-8 mb-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t" style={{ borderColor: colors.gray[200] }}></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white" style={{ color: colors.gray[500] }}>
                  Or continue with
                </span>
              </div>
            </div>
          </div>

          {/* OAuth Buttons */}
          <div className="space-y-3">
            <button
              type="button"
              onClick={() => handleOAuthLogin('Google')}
              disabled={isLoading}
              className="w-full flex items-center justify-center px-4 py-3 border-2 rounded-xl font-medium transition-all duration-200 focus:outline-none opacity-60 cursor-not-allowed"
              style={{
                borderColor: colors.gray[200],
                backgroundColor: colors.gray[50],
                color: colors.gray[500]
              }}
            >
              <svg className="w-5 h-5 mr-3 opacity-50" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google (Coming soon)
            </button>
            
            <button
              type="button"
              onClick={() => handleOAuthLogin('Microsoft')}
              disabled={isLoading}
              className="w-full flex items-center justify-center px-4 py-3 border-2 rounded-xl font-medium transition-all duration-200 focus:outline-none opacity-60 cursor-not-allowed"
              style={{
                borderColor: colors.gray[200],
                backgroundColor: colors.gray[50],
                color: colors.gray[500]
              }}
            >
              <svg className="w-5 h-5 mr-3 opacity-50" viewBox="0 0 24 24">
                <path fill="#F25022" d="M1 1h10v10H1z"/>
                <path fill="#00A4EF" d="M13 1h10v10H13z"/>
                <path fill="#7FBA00" d="M1 13h10v10H1z"/>
                <path fill="#FFB900" d="M13 13h10v10H13z"/>
              </svg>
              Continue with Microsoft (Coming soon)
            </button>
          </div>
        </div>

        {/* Sign Up Link */}
        <div className="mt-8 text-center">
          <p style={{ color: colors.gray[600] }}>
            Don't have an account?{' '}
            <button 
              className="font-semibold transition-colors duration-200 focus:outline-none focus:underline" 
              style={{ color: colors.primary }}
              onMouseEnter={(e) => {
                e.target.style.color = colors.secondary;
              }}
              onMouseLeave={(e) => {
                e.target.style.color = colors.primary;
              }}
              onClick={handleSignUp}
              disabled={isLoading}
            >
              Sign up
            </button>
          </p>
        </div>

        {/* Connection Status Indicator */}
        <div className="mt-6 text-center">
          <div className="flex items-center justify-center space-x-2 text-xs text-gray-500">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span>Connected to TPRFlow API</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;