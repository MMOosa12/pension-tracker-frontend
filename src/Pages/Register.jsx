import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EyeIcon, EyeSlashIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';
import { authAPI } from '../services/api';

// TPRFlow Brand Colors - Matching Login page
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

const RegisterPage = () => {
  const navigate = useNavigate();
  
  // Form state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    consultancyName: '',
    jobTitle: '',
    companySize: '',
    industry: ''
  });

  // UI state
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1); // Multi-step form
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [acceptMarketing, setAcceptMarketing] = useState(false);

  // Error state
  const [errors, setErrors] = useState({});
  const [fieldTouched, setFieldTouched] = useState({});

  // Validation functions
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    // Password requirements: 8+ chars, uppercase, lowercase, number
    const minLength = password.length >= 8;
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    
    return {
      isValid: minLength && hasUpper && hasLower && hasNumber,
      requirements: {
        minLength,
        hasUpper,
        hasLower,
        hasNumber
      }
    };
  };

  const validateField = (name, value) => {
    switch (name) {
      case 'firstName':
        return value.trim().length < 2 ? 'First name must be at least 2 characters' : '';
      case 'lastName':
        return value.trim().length < 2 ? 'Last name must be at least 2 characters' : '';
      case 'email':
        if (!value) return 'Email is required';
        return !validateEmail(value) ? 'Please enter a valid email address' : '';
      case 'password':
        if (!value) return 'Password is required';
        const passwordCheck = validatePassword(value);
        return !passwordCheck.isValid ? 'Password must meet all requirements below' : '';
      case 'confirmPassword':
        if (!value) return 'Please confirm your password';
        return value !== formData.password ? 'Passwords do not match' : '';
      case 'consultancyName':
        return value.trim().length < 2 ? 'Company name must be at least 2 characters' : '';
      case 'jobTitle':
        return value.trim().length < 2 ? 'Job title is required' : '';
      default:
        return '';
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setFieldTouched(prev => ({ ...prev, [name]: true }));
    
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const validateStep = (step) => {
    const newErrors = {};
    
    if (step === 1) {
      // Personal information validation
      ['firstName', 'lastName', 'email', 'password', 'confirmPassword'].forEach(field => {
        const error = validateField(field, formData[field]);
        if (error) newErrors[field] = error;
      });
    } else if (step === 2) {
      // Business information validation
      ['consultancyName', 'jobTitle'].forEach(field => {
        const error = validateField(field, formData[field]);
        if (error) newErrors[field] = error;
      });
      
      if (!acceptTerms) {
        newErrors.terms = 'You must accept the Terms of Service';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(2);
    }
  };

  const handlePrevStep = () => {
    setCurrentStep(1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateStep(2)) return;
    
    setIsLoading(true);
    
    try {
      // Call the registration API
      const result = await authAPI.register({
        email: formData.email.trim(),
        password: formData.password,
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        consultancyName: formData.consultancyName.trim()
      });
      
      console.log('✅ Registration successful:', result.user);
      
      // Show success message and redirect
      alert('Registration successful! Welcome to TPRFlow!');
      navigate('/dashboard');
      
    } catch (error) {
      console.error('❌ Registration error:', error);
      setErrors({ submit: error.message || 'Registration failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleOAuthRegister = (provider) => {
    console.log(`${provider} OAuth registration initiated`);
    // OAuth implementation would go here
    alert(`${provider} OAuth registration will be available soon!`);
  };

  const handleSignIn = () => {
    navigate('/login');
  };

  const companySizeOptions = [
    { value: '1-10', label: '1-10 employees' },
    { value: '11-50', label: '11-50 employees' },
    { value: '51-200', label: '51-200 employees' },
    { value: '201-1000', label: '201-1000 employees' },
    { value: '1000+', label: '1000+ employees' }
  ];

  const industryOptions = [
    { value: 'accounting', label: 'Accounting & Finance' },
    { value: 'consulting', label: 'Business Consulting' },
    { value: 'hr', label: 'Human Resources' },
    { value: 'payroll', label: 'Payroll Services' },
    { value: 'legal', label: 'Legal Services' },
    { value: 'other', label: 'Other' }
  ];

  const passwordValidation = validatePassword(formData.password);

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{
      background: `linear-gradient(135deg, ${colors.light} 0%, #ffffff 30%, ${colors.light} 100%)`
    }}>
      <div className="w-full max-w-lg">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <div className="mx-auto w-48 h-48 flex items-center justify-center mb-6">
            <img 
              src="/tprflow-logo.png" 
              alt="TPRFlow Logo" 
              className="w-full h-full object-contain"
            />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Create your account
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Start managing pension compliance with TPRFlow
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4">
            <div className={`flex items-center justify-center w-8 h-8 rounded-full transition-all duration-200 ${
              currentStep >= 1 
                ? `text-white shadow-lg`
                : 'bg-gray-200 text-gray-500'
            }`} style={{
              background: currentStep >= 1 ? `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)` : undefined
            }}>
              {currentStep > 1 ? <CheckCircleIcon className="w-5 h-5" /> : '1'}
            </div>
            <div className={`h-1 w-16 rounded-full transition-all duration-300 ${
              currentStep >= 2 ? 'bg-gradient-to-r' : 'bg-gray-200'
            }`} style={{
              background: currentStep >= 2 ? `linear-gradient(to right, ${colors.primary}, ${colors.secondary})` : undefined
            }}></div>
            <div className={`flex items-center justify-center w-8 h-8 rounded-full transition-all duration-200 ${
              currentStep >= 2 
                ? `text-white shadow-lg`
                : 'bg-gray-200 text-gray-500'
            }`} style={{
              background: currentStep >= 2 ? `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)` : undefined
            }}>
              2
            </div>
          </div>
          <div className="flex justify-between mt-2 text-sm text-gray-600">
            <span>Personal Info</span>
            <span>Business Setup</span>
          </div>
        </div>

        {/* Registration Form */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 relative" style={{
          boxShadow: `0 25px 50px -12px rgba(64, 29, 108, 0.15)`,
          border: '2px solid transparent',
          backgroundImage: `linear-gradient(white, white), linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 50%, ${colors.accent} 100%)`,
          backgroundOrigin: 'border-box',
          backgroundClip: 'padding-box, border-box'
        }}>
          <form onSubmit={handleSubmit}>
            {/* Step 1: Personal Information */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Personal Information</h2>
                
                {/* Name Fields */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-semibold mb-2" style={{ color: colors.gray[700] }}>
                      First Name
                    </label>
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 bg-white placeholder-gray-400 ${
                        errors.firstName ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:outline-none'
                      }`}
                      style={{
                        borderColor: errors.firstName ? colors.error : colors.gray[200],
                        color: formData.firstName ? colors.secondary : colors.gray[900]
                      }}
                      onFocus={(e) => {
                        if (!errors.firstName) {
                          e.target.style.borderColor = colors.primary;
                          e.target.style.boxShadow = `0 0 0 3px ${colors.primary}20`;
                        }
                      }}
                      onBlur={(e) => {
                        handleBlur(e);
                        if (!errors.firstName) {
                          e.target.style.borderColor = colors.gray[200];
                          e.target.style.boxShadow = 'none';
                        }
                      }}
                      placeholder="John"
                      disabled={isLoading}
                    />
                    {errors.firstName && (
                      <p className="mt-2 text-sm" style={{ color: colors.error }}>{errors.firstName}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="lastName" className="block text-sm font-semibold mb-2" style={{ color: colors.gray[700] }}>
                      Last Name
                    </label>
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 bg-white placeholder-gray-400 ${
                        errors.lastName ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:outline-none'
                      }`}
                      style={{
                        borderColor: errors.lastName ? colors.error : colors.gray[200],
                        color: formData.lastName ? colors.secondary : colors.gray[900]
                      }}
                      onFocus={(e) => {
                        if (!errors.lastName) {
                          e.target.style.borderColor = colors.primary;
                          e.target.style.boxShadow = `0 0 0 3px ${colors.primary}20`;
                        }
                      }}
                      onBlur={(e) => {
                        handleBlur(e);
                        if (!errors.lastName) {
                          e.target.style.borderColor = colors.gray[200];
                          e.target.style.boxShadow = 'none';
                        }
                      }}
                      placeholder="Smith"
                      disabled={isLoading}
                    />
                    {errors.lastName && (
                      <p className="mt-2 text-sm" style={{ color: colors.error }}>{errors.lastName}</p>
                    )}
                  </div>
                </div>

                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold mb-2" style={{ color: colors.gray[700] }}>
                    Email Address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 bg-white placeholder-gray-400 ${
                      errors.email ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:outline-none'
                    }`}
                    style={{
                      borderColor: errors.email ? colors.error : colors.gray[200],
                      color: formData.email ? colors.secondary : colors.gray[900]
                    }}
                    onFocus={(e) => {
                      if (!errors.email) {
                        e.target.style.borderColor = colors.primary;
                        e.target.style.boxShadow = `0 0 0 3px ${colors.primary}20`;
                      }
                    }}
                    onBlur={(e) => {
                      handleBlur(e);
                      if (!errors.email) {
                        e.target.style.borderColor = colors.gray[200];
                        e.target.style.boxShadow = 'none';
                      }
                    }}
                    placeholder="john@company.com"
                    disabled={isLoading}
                  />
                  {errors.email && (
                    <p className="mt-2 text-sm" style={{ color: colors.error }}>{errors.email}</p>
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
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      className={`w-full px-4 py-3 pr-12 rounded-xl border-2 transition-all duration-200 bg-white placeholder-gray-400 ${
                        errors.password ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:outline-none'
                      }`}
                      style={{
                        borderColor: errors.password ? colors.error : colors.gray[200],
                        color: formData.password ? colors.secondary : colors.gray[900]
                      }}
                      onFocus={(e) => {
                        if (!errors.password) {
                          e.target.style.borderColor = colors.primary;
                          e.target.style.boxShadow = `0 0 0 3px ${colors.primary}20`;
                        }
                      }}
                      onBlur={(e) => {
                        handleBlur(e);
                        if (!errors.password) {
                          e.target.style.borderColor = colors.gray[200];
                          e.target.style.boxShadow = 'none';
                        }
                      }}
                      placeholder="Create a strong password"
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 transition-colors duration-200 focus:outline-none"
                      style={{ color: colors.gray[400] }}
                      disabled={isLoading}
                    >
                      {showPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                    </button>
                  </div>
                  
                  {/* Password Requirements */}
                  {formData.password && (
                    <div className="mt-3 space-y-2">
                      <p className="text-sm font-medium" style={{ color: colors.gray[700] }}>Password requirements:</p>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        {[
                          { key: 'minLength', text: '8+ characters' },
                          { key: 'hasUpper', text: 'Uppercase letter' },
                          { key: 'hasLower', text: 'Lowercase letter' },
                          { key: 'hasNumber', text: 'Number' }
                        ].map(req => (
                          <div key={req.key} className="flex items-center space-x-2">
                            {passwordValidation.requirements[req.key] ? (
                              <CheckCircleIcon className="w-4 h-4" style={{ color: colors.success }} />
                            ) : (
                              <XCircleIcon className="w-4 h-4" style={{ color: colors.gray[400] }} />
                            )}
                            <span style={{ 
                              color: passwordValidation.requirements[req.key] ? colors.success : colors.gray[500] 
                            }}>
                              {req.text}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {errors.password && (
                    <p className="mt-2 text-sm" style={{ color: colors.error }}>{errors.password}</p>
                  )}
                </div>

                {/* Confirm Password Field */}
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-semibold mb-2" style={{ color: colors.gray[700] }}>
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      className={`w-full px-4 py-3 pr-12 rounded-xl border-2 transition-all duration-200 bg-white placeholder-gray-400 ${
                        errors.confirmPassword ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:outline-none'
                      }`}
                      style={{
                        borderColor: errors.confirmPassword ? colors.error : colors.gray[200],
                        color: formData.confirmPassword ? colors.secondary : colors.gray[900]
                      }}
                      onFocus={(e) => {
                        if (!errors.confirmPassword) {
                          e.target.style.borderColor = colors.primary;
                          e.target.style.boxShadow = `0 0 0 3px ${colors.primary}20`;
                        }
                      }}
                      onBlur={(e) => {
                        handleBlur(e);
                        if (!errors.confirmPassword) {
                          e.target.style.borderColor = colors.gray[200];
                          e.target.style.boxShadow = 'none';
                        }
                      }}
                      placeholder="Confirm your password"
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 transition-colors duration-200 focus:outline-none"
                      style={{ color: colors.gray[400] }}
                      disabled={isLoading}
                    >
                      {showConfirmPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="mt-2 text-sm" style={{ color: colors.error }}>{errors.confirmPassword}</p>
                  )}
                </div>

                {/* Next Button */}
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="w-full text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] focus:outline-none shadow-lg hover:shadow-xl"
                  style={{
                    background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
                    boxShadow: `0 10px 25px -5px ${colors.primary}40`
                  }}
                >
                  Continue to Business Info →
                </button>
              </div>
            )}

            {/* Step 2: Business Information */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Business Information</h2>
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    className="text-sm font-medium transition-colors duration-200"
                    style={{ color: colors.primary }}
                  >
                    ← Back
                  </button>
                </div>

                {/* Company Name */}
                <div>
                  <label htmlFor="consultancyName" className="block text-sm font-semibold mb-2" style={{ color: colors.gray[700] }}>
                    Company/Consultancy Name
                  </label>
                  <input
                    id="consultancyName"
                    name="consultancyName"
                    type="text"
                    value={formData.consultancyName}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 bg-white placeholder-gray-400 ${
                      errors.consultancyName ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:outline-none'
                    }`}
                    style={{
                      borderColor: errors.consultancyName ? colors.error : colors.gray[200],
                      color: formData.consultancyName ? colors.secondary : colors.gray[900]
                    }}
                    placeholder="Acme Payroll Services Ltd"
                    disabled={isLoading}
                  />
                  {errors.consultancyName && (
                    <p className="mt-2 text-sm" style={{ color: colors.error }}>{errors.consultancyName}</p>
                  )}
                </div>

                {/* Job Title */}
                <div>
                  <label htmlFor="jobTitle" className="block text-sm font-semibold mb-2" style={{ color: colors.gray[700] }}>
                    Your Job Title
                  </label>
                  <input
                    id="jobTitle"
                    name="jobTitle"
                    type="text"
                    value={formData.jobTitle}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 bg-white placeholder-gray-400 ${
                      errors.jobTitle ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:outline-none'
                    }`}
                    style={{
                      borderColor: errors.jobTitle ? colors.error : colors.gray[200],
                      color: formData.jobTitle ? colors.secondary : colors.gray[900]
                    }}
                    placeholder="Payroll Director"
                    disabled={isLoading}
                  />
                  {errors.jobTitle && (
                    <p className="mt-2 text-sm" style={{ color: colors.error }}>{errors.jobTitle}</p>
                  )}
                </div>

                {/* Company Size & Industry */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="companySize" className="block text-sm font-semibold mb-2" style={{ color: colors.gray[700] }}>
                      Company Size
                    </label>
                    <select
                      id="companySize"
                      name="companySize"
                      value={formData.companySize}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:outline-none bg-white"
                      style={{ color: formData.companySize ? colors.secondary : colors.gray[500] }}
                      disabled={isLoading}
                    >
                      <option value="">Select size</option>
                      {companySizeOptions.map(option => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="industry" className="block text-sm font-semibold mb-2" style={{ color: colors.gray[700] }}>
                      Industry <span className="text-gray-400">(Optional)</span>
                    </label>
                    <select
                      id="industry"
                      name="industry"
                      value={formData.industry}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:outline-none bg-white"
                      style={{ color: formData.industry ? colors.secondary : colors.gray[500] }}
                      disabled={isLoading}
                    >
                      <option value="">Select industry</option>
                      {industryOptions.map(option => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Terms and Conditions */}
                <div className="space-y-4 pt-4 border-t border-gray-200">
                  <div className="flex items-start space-x-3">
                    <input
                      id="acceptTerms"
                      type="checkbox"
                      checked={acceptTerms}
                      onChange={(e) => setAcceptTerms(e.target.checked)}
                      className="mt-1 h-4 w-4 rounded transition-colors duration-200 focus:outline-none"
                      style={{ accentColor: colors.primary }}
                      disabled={isLoading}
                    />
                    <label htmlFor="acceptTerms" className="text-sm" style={{ color: colors.gray[600] }}>
                      I agree to the{' '}
                      <a href="/terms" className="font-medium underline" style={{ color: colors.primary }}>
                        Terms of Service
                      </a>{' '}
                      and{' '}
                      <a href="/privacy" className="font-medium underline" style={{ color: colors.primary }}>
                        Privacy Policy
                      </a>
                    </label>
                  </div>
                  {errors.terms && (
                    <p className="text-sm" style={{ color: colors.error }}>{errors.terms}</p>
                  )}

                  <div className="flex items-start space-x-3">
                    <input
                      id="acceptMarketing"
                      type="checkbox"
                      checked={acceptMarketing}
                      onChange={(e) => setAcceptMarketing(e.target.checked)}
                      className="mt-1 h-4 w-4 rounded transition-colors duration-200 focus:outline-none"
                      style={{ accentColor: colors.primary }}
                      disabled={isLoading}
                    />
                    <label htmlFor="acceptMarketing" className="text-sm" style={{ color: colors.gray[600] }}>
                      Send me product updates and compliance tips via email (optional)
                    </label>
                  </div>
                </div>

                {errors.submit && (
                  <div className="p-4 rounded-lg bg-red-50 border border-red-200">
                    <p className="text-sm" style={{ color: colors.error }}>{errors.submit}</p>
                  </div>
                )}

                {/* Create Account Button */}
                <button
                  type="submit"
                  disabled={isLoading || !acceptTerms}
                  className="w-full text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg hover:shadow-xl"
                  style={{
                    background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
                    boxShadow: `0 10px 25px -5px ${colors.primary}40`
                  }}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Creating your account...
                    </div>
                  ) : (
                    'Create Account'
                  )}
                </button>
              </div>
            )}
          </form>

          {/* OAuth Options (only show on step 1) */}
          {currentStep === 1 && (
            <>
              {/* Divider */}
              <div className="mt-8 mb-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t" style={{ borderColor: colors.gray[200] }}></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white" style={{ color: colors.gray[500] }}>
                      Or sign up with
                    </span>
                  </div>
                </div>
              </div>

              {/* OAuth Buttons */}
              <div className="space-y-3">
                <button
                  type="button"
                  onClick={() => handleOAuthRegister('Google')}
                  disabled={true}
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
                  onClick={() => handleOAuthRegister('Microsoft')}
                  disabled={true}
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
            </>
          )}
        </div>

        {/* Sign In Link */}
        <div className="mt-8 text-center">
          <p style={{ color: colors.gray[600] }}>
            Already have an account?{' '}
            <button 
              onClick={handleSignIn}
              className="font-semibold transition-colors duration-200 focus:outline-none focus:underline" 
              style={{ color: colors.primary }}
              onMouseEnter={(e) => {
                e.target.style.color = colors.secondary;
              }}
              onMouseLeave={(e) => {
                e.target.style.color = colors.primary;
              }}
              disabled={isLoading}
            >
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;