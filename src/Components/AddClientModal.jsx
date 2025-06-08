import React, { useState } from 'react';

const AddClientModal = ({ isOpen, onClose, onSave, consultants }) => {
  const [formData, setFormData] = useState({
    reference: '',
    companyName: '',
    businessType: '',
    consultant: '',
    letterCode: '',
    clientContactName: '',
    clientEmail: '',
    stagingDate: '',
    reEnrolmentDate: '',
    reEnrolmentPeriod: '3', // Always 3 years
    activatedOnTPR: false,
    reminderEmailSentOn: '',
    declarationDate: '',
    currentStatus: 'waiting'
  });

  const [errors, setErrors] = useState({});

  const businessTypes = [
    'Limited Company',
    'Sole Trader', 
    'Charity',
    'CIC',
    'Partnership',
    'Trust',
    'Other'
  ];

  const statusOptions = [
    { value: 'waiting', label: 'Waiting', icon: '⏳' },
    { value: 're-enrolment', label: 'Re-Enrolment', icon: '🔄' },
    { value: 'declaration-due', label: 'Declaration Due', icon: '📋' },
    { value: 'overdue', label: 'Overdue', icon: '⚠️' }
  ];

  const reEnrolmentPeriods = [
    { value: '1', label: '1 Year' },
    { value: '2', label: '2 Years' },
    { value: '3', label: '3 Years' },
    { value: '4', label: '4 Years' },
    { value: '5', label: '5 Years' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }

    // Auto-calculate re-enrolment date when staging date changes (always 3 years)
    if (field === 'stagingDate') {
      const stagingDate = value;
      const period = '3'; // Always 3 years
      
      if (stagingDate) {
        const staging = new Date(stagingDate);
        const reEnrolment = new Date(staging);
        reEnrolment.setFullYear(staging.getFullYear() + 3); // Always add 3 years
        
        setFormData(prev => ({
          ...prev,
          reEnrolmentDate: reEnrolment.toISOString().split('T')[0]
        }));
      }
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.reference.trim()) newErrors.reference = 'Reference is required';
    if (!formData.companyName.trim()) newErrors.companyName = 'Company name is required';
    if (!formData.businessType) newErrors.businessType = 'Business type is required';
    if (!formData.consultant) newErrors.consultant = 'Consultant is required';
    if (!formData.stagingDate) newErrors.stagingDate = 'Staging date is required';
    if (!formData.reEnrolmentDate) newErrors.reEnrolmentDate = 'Re-enrolment date is required';

    // Validate email format if provided
    if (formData.clientEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.clientEmail)) {
      newErrors.clientEmail = 'Please enter a valid email address';
    }

    // Validate dates
    if (formData.stagingDate && formData.reEnrolmentDate) {
      const staging = new Date(formData.stagingDate);
      const reEnrolment = new Date(formData.reEnrolmentDate);
      if (reEnrolment <= staging) {
        newErrors.reEnrolmentDate = 'Re-enrolment date must be after staging date';
      }
    }

    if (formData.reminderEmailSentOn && formData.stagingDate) {
      const staging = new Date(formData.stagingDate);
      const reminder = new Date(formData.reminderEmailSentOn);
      if (reminder < staging) {
        newErrors.reminderEmailSentOn = 'Reminder date cannot be before staging date';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {    
    if (!validateForm()) {
      return;
    }

    // Generate a unique ID
    const newClient = {
      id: Date.now(),
      clientNumber: formData.reference,
      clientCode: formData.reference,
      clientName: formData.companyName,
      name: formData.companyName, // For compatibility
      reference: formData.reference,
      clientType: formData.businessType,
      type: formData.businessType, // For compatibility
      letterCode: formData.letterCode,
      clientContactName: formData.clientContactName,
      clientEmail: formData.clientEmail,
      consultant: formData.consultant,
      assignedTeamMember: formData.consultant, // For compatibility with Overview page
      stagingDate: formData.stagingDate,
      reEnrolDate: formData.reEnrolmentDate,
      reEnrolmentDate: formData.reEnrolmentDate, // For compatibility
      reEnrolmentPeriod: formData.reEnrolmentPeriod,
      reminderDate: formData.reminderEmailSentOn || formData.reEnrolmentDate,
      declarationDate: formData.declarationDate,
      tprPortal: formData.activatedOnTPR ? 'Onboarded' : 'Waiting', // For compatibility
      activatedOnTPR: formData.activatedOnTPR,
      status: formData.currentStatus,
      lastUpdated: new Date().toISOString().split('T')[0],
      notes: `Created via Add Client form. Re-enrolment period: 3 years.${formData.activatedOnTPR ? ' TPR Portal activated.' : ''}`
    };

    onSave(newClient);
    handleClose();
  };

  const handleClose = () => {
    setFormData({
      reference: '',
      companyName: '',
      businessType: '',
      consultant: '',
      letterCode: '',
      clientContactName: '',
      clientEmail: '',
      stagingDate: '',
      reEnrolmentDate: '',
      reEnrolmentPeriod: '3', // Always 3 years
      activatedOnTPR: false,
      reminderEmailSentOn: '',
      declarationDate: '',
      currentStatus: 'waiting'
    });
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={handleClose}
      />
      
      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white dark:bg-gray-800 shadow-2xl transition-all border border-white/20 dark:border-gray-700/20">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#401D6C] to-[#EC385D] px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white">Add New Client</h3>
                  <p className="text-pink-100 text-sm">Enter client details for pension compliance tracking</p>
                </div>
              </div>
              <button
                onClick={handleClose}
                className="text-white/80 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/10"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Form Content */}
          <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
            {/* Basic Information */}
            <div>
              <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
                <svg className="w-5 h-5 text-purple-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                Client Information
              </h4>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Reference */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Client Reference <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.reference}
                    onChange={(e) => handleInputChange('reference', e.target.value)}
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-4 focus:ring-pink-500/10 transition-all duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
                      errors.reference 
                        ? 'border-red-300 focus:border-red-500' 
                        : 'border-gray-200 dark:border-gray-600 focus:border-pink-500'
                    }`}
                    placeholder="e.g., CLI001, REF2024001"
                  />
                  {errors.reference && <p className="mt-1 text-sm text-red-600">{errors.reference}</p>}
                </div>

                {/* Company Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Company Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.companyName}
                    onChange={(e) => handleInputChange('companyName', e.target.value)}
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-4 focus:ring-pink-500/10 transition-all duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
                      errors.companyName 
                        ? 'border-red-300 focus:border-red-500' 
                        : 'border-gray-200 dark:border-gray-600 focus:border-pink-500'
                    }`}
                    placeholder="Enter company name"
                  />
                  {errors.companyName && <p className="mt-1 text-sm text-red-600">{errors.companyName}</p>}
                </div>

                {/* Letter Code */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Letter Code
                  </label>
                  <input
                    type="text"
                    value={formData.letterCode}
                    onChange={(e) => handleInputChange('letterCode', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:border-pink-500 focus:ring-4 focus:ring-pink-500/10 transition-all duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="e.g., 1234567890"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                {/* Business Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Business Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.businessType}
                    onChange={(e) => handleInputChange('businessType', e.target.value)}
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-4 focus:ring-pink-500/10 transition-all duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
                      errors.businessType 
                        ? 'border-red-300 focus:border-red-500' 
                        : 'border-gray-200 dark:border-gray-600 focus:border-pink-500'
                    }`}
                  >
                    <option value="">Select business type</option>
                    {businessTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                  {errors.businessType && <p className="mt-1 text-sm text-red-600">{errors.businessType}</p>}
                </div>

                {/* Consultant */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Consultant <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.consultant}
                    onChange={(e) => handleInputChange('consultant', e.target.value)}
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-4 focus:ring-pink-500/10 transition-all duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
                      errors.consultant 
                        ? 'border-red-300 focus:border-red-500' 
                        : 'border-gray-200 dark:border-gray-600 focus:border-pink-500'
                    }`}
                  >
                    <option value="">Select consultant</option>
                    {consultants.map(consultant => (
                      <option key={consultant} value={consultant}>{consultant}</option>
                    ))}
                  </select>
                  {errors.consultant && <p className="mt-1 text-sm text-red-600">{errors.consultant}</p>}
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
              <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
                <svg className="w-5 h-5 text-purple-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Contact Information
              </h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Client Contact Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Client Contact Name
                  </label>
                  <input
                    type="text"
                    value={formData.clientContactName}
                    onChange={(e) => handleInputChange('clientContactName', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:border-pink-500 focus:ring-4 focus:ring-pink-500/10 transition-all duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Enter contact person name"
                  />
                </div>

                {/* Client Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Client Email Address
                  </label>
                  <input
                    type="email"
                    value={formData.clientEmail}
                    onChange={(e) => handleInputChange('clientEmail', e.target.value)}
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-4 focus:ring-pink-500/10 transition-all duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
                      errors.clientEmail 
                        ? 'border-red-300 focus:border-red-500' 
                        : 'border-gray-200 dark:border-gray-600 focus:border-pink-500'
                    }`}
                    placeholder="contact@company.com"
                  />
                  {errors.clientEmail && <p className="mt-1 text-sm text-red-600">{errors.clientEmail}</p>}
                </div>
              </div>
            </div>

            {/* Dates Section */}
            <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
              <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
                <svg className="w-5 h-5 text-purple-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Important Dates
              </h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Staging Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Staging Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={formData.stagingDate}
                    onChange={(e) => handleInputChange('stagingDate', e.target.value)}
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-4 focus:ring-pink-500/10 transition-all duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
                      errors.stagingDate 
                        ? 'border-red-300 focus:border-red-500' 
                        : 'border-gray-200 dark:border-gray-600 focus:border-pink-500'
                    }`}
                  />
                  {errors.stagingDate && <p className="mt-1 text-sm text-red-600">{errors.stagingDate}</p>}
                </div>

                {/* Re-enrolment Period - Hidden field, always 3 years */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Re-enrolment Period
                  </label>
                  <div className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-600 text-gray-900 dark:text-white">
                    3 Years (Fixed)
                  </div>
                  <p className="mt-1 text-xs text-gray-500">Re-enrolment period is always set to 3 years</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                {/* Re-enrolment Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Re-enrolment Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={formData.reEnrolmentDate}
                    onChange={(e) => handleInputChange('reEnrolmentDate', e.target.value)}
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-4 focus:ring-pink-500/10 transition-all duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
                      errors.reEnrolmentDate 
                        ? 'border-red-300 focus:border-red-500' 
                        : 'border-gray-200 dark:border-gray-600 focus:border-pink-500'
                    }`}
                  />
                  {errors.reEnrolmentDate && <p className="mt-1 text-sm text-red-600">{errors.reEnrolmentDate}</p>}
                  <p className="mt-1 text-xs text-gray-500">Auto-calculated as staging date + 3 years</p>
                </div>

                {/* Reminder Email Sent On */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Reminder Email Sent On
                  </label>
                  <input
                    type="date"
                    value={formData.reminderEmailSentOn}
                    onChange={(e) => handleInputChange('reminderEmailSentOn', e.target.value)}
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-4 focus:ring-pink-500/10 transition-all duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
                      errors.reminderEmailSentOn 
                        ? 'border-red-300 focus:border-red-500' 
                        : 'border-gray-200 dark:border-gray-600 focus:border-pink-500'
                    }`}
                  />
                  {errors.reminderEmailSentOn && <p className="mt-1 text-sm text-red-600">{errors.reminderEmailSentOn}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                {/* Declaration Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Declaration of Compliance Date
                  </label>
                  <input
                    type="date"
                    value={formData.declarationDate}
                    onChange={(e) => handleInputChange('declarationDate', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:border-pink-500 focus:ring-4 focus:ring-pink-500/10 transition-all duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>

                {/* Current Status */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Current Status
                  </label>
                  <select
                    value={formData.currentStatus}
                    onChange={(e) => handleInputChange('currentStatus', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:border-pink-500 focus:ring-4 focus:ring-pink-500/10 transition-all duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    {statusOptions.map(status => (
                      <option key={status.value} value={status.value}>
                        {status.icon} {status.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* TPR Portal Section */}
            <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
              <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
                <svg className="w-5 h-5 text-purple-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                TPR Portal Information
              </h4>
              
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="activatedOnTPR"
                  checked={formData.activatedOnTPR}
                  onChange={(e) => handleInputChange('activatedOnTPR', e.target.checked)}
                  className="w-5 h-5 text-pink-500 border-gray-300 dark:border-gray-600 rounded focus:ring-pink-500 focus:ring-2"
                />
                <label htmlFor="activatedOnTPR" className="text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer">
                  Activated on TPR Portal
                </label>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 dark:bg-gray-700/50 px-6 py-4 flex items-center justify-between border-t border-gray-200 dark:border-gray-700">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Fields marked with <span className="text-red-500">*</span> are required
            </div>
            <div className="flex items-center space-x-3">
              <button
                type="button"
                onClick={handleClose}
                className="px-6 py-2 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-600 transition-all duration-200 font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-6 py-2 rounded-xl hover:shadow-lg transition-all duration-200 font-medium flex items-center space-x-2 bg-gradient-to-r from-[#401D6C] to-[#EC385D] text-white"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <span>Add Client</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddClientModal;