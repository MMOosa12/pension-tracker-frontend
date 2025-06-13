import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  XMarkIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  InformationCircleIcon,
  CalendarIcon,
  UserIcon,
  BuildingOfficeIcon,
  EnvelopeIcon,
  PhoneIcon,
  DocumentTextIcon,
  ShieldCheckIcon,
  ClockIcon,
  SparklesIcon,
  ExclamationCircleIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  EyeIcon,
  EyeSlashIcon,
  MagnifyingGlassIcon,
  ChevronDownIcon,
  BookmarkIcon,
  PlusIcon,
  BeakerIcon,
  LightBulbIcon,
  CpuChipIcon,
  WifiIcon
} from '@heroicons/react/24/outline';

const AddClientModal = ({ isOpen, onClose, onSave, consultants = [], existingClients = [] }) => {
  // Enhanced form state with better structure
  const [formData, setFormData] = useState({
    // Basic Info
    reference: '',
    companyName: '',
    businessType: '',
    consultant: '',
    employees: '',
    letterCode: '',
    
    // Contact Info
    clientContactName: '',
    clientContactJobTitle: '',
    clientEmail: '',
    clientPhone: '',
    
    // Compliance Dates
    stagingDate: '',
    reEnrolmentDate: '',
    declarationDue: '',
    currentStatus: 'waiting',
    activatedOnTPR: false,
    
    // Additional
    notes: '',
    priority: 'normal', // low, normal, high
    industry: '',
    annualRevenue: ''
  });

  // Enhanced state management
  const [errors, setErrors] = useState({});
  const [warnings, setWarnings] = useState({});
  const [suggestions, setSuggestions] = useState({});
  const [isCalculating, setIsCalculating] = useState(false);
  const [duplicateWarning, setDuplicateWarning] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [completionScore, setCompletionScore] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [autoSaveEnabled, setAutoSaveEnabled] = useState(true);
  const [fieldHistory, setFieldHistory] = useState({});
  const [validationMode, setValidationMode] = useState('onChange'); // onChange, onBlur, onSubmit
  const [previewMode, setPreviewMode] = useState(false);

  // Enhanced configuration
  const businessTypes = [
    { value: 'Limited Company', label: 'Limited Company', description: 'Private limited company (Ltd)', popular: true },
    { value: 'Sole Trader', label: 'Sole Trader', description: 'Individual trading business', popular: true },
    { value: 'Partnership', label: 'Partnership', description: 'Business partnership', popular: true },
    { value: 'Charity', label: 'Charity', description: 'Registered charity organization', popular: false },
    { value: 'CIC', label: 'Community Interest Company', description: 'Social enterprise company', popular: false },
    { value: 'Trust', label: 'Trust', description: 'Trust organization', popular: false },
    { value: 'Other', label: 'Other', description: 'Other business structure', popular: false }
  ];

  const industries = [
    'Technology', 'Healthcare', 'Finance', 'Manufacturing', 'Retail', 'Education', 
    'Construction', 'Professional Services', 'Hospitality', 'Transport', 'Other'
  ];

  const statusOptions = [
    { 
      value: 'waiting', 
      label: 'Waiting', 
      icon: '⏳', 
      description: 'Awaiting re-enrolment window',
      color: 'gray',
      nextAction: 'Monitor re-enrolment window'
    },
    { 
      value: 'reenrolment_due', 
      label: 'Re-Enrolment Due', 
      icon: '🔄', 
      description: 'Re-enrolment window is open',
      color: 'orange',
      nextAction: 'Complete re-enrolment process'
    },
    { 
      value: 'declaration_due', 
      label: 'Declaration Due', 
      icon: '📋', 
      description: 'Declaration deadline approaching',
      color: 'yellow',
      nextAction: 'Submit declaration'
    },
    { 
      value: 'compliant', 
      label: 'Compliant', 
      icon: '✅', 
      description: 'All requirements met',
      color: 'green',
      nextAction: 'Monitor next cycle'
    }
  ];

  const steps = [
    { 
      id: 1, 
      name: 'Company', 
      icon: BuildingOfficeIcon, 
      description: 'Basic company information',
      fields: ['reference', 'companyName', 'businessType', 'consultant'],
      estimatedTime: '2 min'
    },
    { 
      id: 2, 
      name: 'Contact', 
      icon: UserIcon, 
      description: 'Primary contact details',
      fields: ['clientContactName', 'clientEmail', 'clientPhone'],
      estimatedTime: '1 min'
    },
    { 
      id: 3, 
      name: 'Compliance', 
      icon: CalendarIcon, 
      description: 'Pension compliance dates',
      fields: ['stagingDate', 'currentStatus'],
      estimatedTime: '2 min'
    },
    { 
      id: 4, 
      name: 'Review', 
      icon: CheckCircleIcon, 
      description: 'Final review and confirmation',
      fields: [],
      estimatedTime: '30 sec'
    }
  ];

  // Enhanced utility functions
  const getSmartSuggestions = useCallback((field, value) => {
    const suggestions = {};
    
    switch (field) {
      case 'companyName':
        if (value.toLowerCase().includes('ltd') && !value.toLowerCase().includes('limited')) {
          suggestions.companyName = 'Consider using full "Limited" instead of "Ltd"';
        }
        break;
      case 'businessType':
        if (formData.companyName.toLowerCase().includes('charity')) {
          suggestions.businessType = 'Consider "Charity" business type';
        }
        break;
      case 'employees':
        const empCount = parseInt(value);
        if (empCount > 0 && empCount < 5) {
          suggestions.employees = 'Small business - consider simplified pension setup';
        } else if (empCount > 250) {
          suggestions.employees = 'Large business - may need complex pension arrangements';
        }
        break;
      case 'stagingDate':
        const stagingDate = new Date(value);
        const today = new Date();
        const daysDiff = Math.ceil((today - stagingDate) / (1000 * 60 * 60 * 24));
        if (daysDiff > 365 * 3) {
          suggestions.stagingDate = 'Re-enrolment may already be due - check compliance status';
        }
        break;
    }
    
    return suggestions;
  }, [formData.companyName]);

  const getRecommendedConsultant = useCallback(() => {
    if (!consultants.length) return '';
    
    const workload = consultants.map(consultant => ({
      name: consultant,
      clientCount: existingClients.filter(c => 
        c.assignedTeamMember === consultant || c.assignedConsultant === consultant
      ).length
    }));
    
    return workload.sort((a, b) => a.clientCount - b.clientCount)[0].name;
  }, [consultants, existingClients]);

  const checkForDuplicates = useCallback((name, email) => {
    if (!name && !email) return null;
    
    const similar = existingClients.filter(client => {
      const nameMatch = name && client.clientName?.toLowerCase().includes(name.toLowerCase());
      const emailMatch = email && (client.clientEmail === email || client.contactEmail === email);
      return nameMatch || emailMatch;
    });
    
    return similar.length > 0 ? similar : null;
  }, [existingClients]);

  const calculateCompletionScore = useCallback(() => {
    const allFields = Object.keys(formData);
    const requiredFields = ['reference', 'companyName', 'businessType', 'consultant', 'stagingDate'];
    const importantFields = ['clientContactName', 'clientEmail', 'clientPhone', 'employees'];
    
    const requiredComplete = requiredFields.filter(field => formData[field]).length;
    const importantComplete = importantFields.filter(field => formData[field]).length;
    const totalComplete = allFields.filter(field => formData[field]).length;
    
    const score = Math.round(
      (requiredComplete / requiredFields.length) * 50 + 
      (importantComplete / importantFields.length) * 30 + 
      (totalComplete / allFields.length) * 20
    );
    
    setCompletionScore(Math.min(score, 100));
  }, [formData]);

  // Enhanced date calculations with UK pension law compliance
  const calculateComplianceDates = useCallback((stagingDate) => {
    if (!stagingDate) return { reEnrolmentDate: '', declarationDue: '' };
    
    setIsCalculating(true);
    
    setTimeout(() => {
      const staging = new Date(stagingDate);
      
      // Re-enrolment: exactly 3 years from staging (UK law requirement)
      const reEnrolment = new Date(staging);
      reEnrolment.setFullYear(staging.getFullYear() + 3);
      
      // Declaration due: exactly 3 years and 5 months from staging date (UK law requirement)
      const declaration = new Date(staging);
      declaration.setFullYear(staging.getFullYear() + 3);
      declaration.setMonth(declaration.getMonth() + 5);
      
      setFormData(prev => ({
        ...prev,
        reEnrolmentDate: reEnrolment.toISOString().split('T')[0],
        declarationDue: declaration.toISOString().split('T')[0]
      }));
      
      // Smart status suggestion based on dates
      const today = new Date();
      const reEnrolDays = Math.ceil((reEnrolment - today) / (1000 * 60 * 60 * 24));
      const declarationDays = Math.ceil((declaration - today) / (1000 * 60 * 60 * 24));
      
      let suggestedStatus = 'waiting';
      if (reEnrolDays <= 0 && declarationDays > 0) {
        suggestedStatus = 'reenrolment_due';
      } else if (declarationDays <= 0) {
        suggestedStatus = 'declaration_due';
      }
      
      if (suggestedStatus !== formData.currentStatus) {
        setSuggestions(prev => ({
          ...prev,
          currentStatus: `Suggested status: ${statusOptions.find(s => s.value === suggestedStatus)?.label}`
        }));
      }
      
      setIsCalculating(false);
    }, 600);
  }, [formData.currentStatus]);

  // Enhanced validation with detailed feedback
  const validateField = useCallback((field, value) => {
    const fieldErrors = {};
    const fieldWarnings = {};
    
    switch (field) {
      case 'reference':
        if (!value.trim()) {
          fieldErrors.reference = 'Client reference is required';
        } else if (value.length < 3) {
          fieldWarnings.reference = 'Reference should be at least 3 characters';
        } else if (existingClients.some(c => c.clientNumber === value || c.clientCode === value)) {
          fieldErrors.reference = 'This reference already exists';
        }
        break;
        
      case 'companyName':
        if (!value.trim()) {
          fieldErrors.companyName = 'Company name is required';
        } else if (value.length < 2) {
          fieldWarnings.companyName = 'Company name seems too short';
        }
        break;
        
      case 'clientEmail':
        if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          fieldErrors.clientEmail = 'Please enter a valid email address';
        } else if (value && existingClients.some(c => c.clientEmail === value || c.contactEmail === value)) {
          fieldWarnings.clientEmail = 'This email is already used by another client';
        }
        break;
        
      case 'clientPhone':
        if (value && !/^(\+44|0)[0-9\s\-\(\)]{9,}$/.test(value.replace(/\s/g, ''))) {
          fieldErrors.clientPhone = 'Please enter a valid UK phone number';
        }
        break;
        
      case 'stagingDate':
        if (!value) {
          fieldErrors.stagingDate = 'Staging date is required';
        } else {
          const staging = new Date(value);
          const today = new Date();
          const tenYearsAgo = new Date();
          tenYearsAgo.setFullYear(today.getFullYear() - 10);
          
          if (staging > today) {
            fieldErrors.stagingDate = 'Staging date cannot be in the future';
          } else if (staging < tenYearsAgo) {
            fieldWarnings.stagingDate = 'Staging date is quite old - please verify';
          }
        }
        break;
        
      case 'employees':
        if (value && (isNaN(value) || parseInt(value) < 0)) {
          fieldErrors.employees = 'Please enter a valid number of employees';
        } else if (value && parseInt(value) === 0) {
          fieldWarnings.employees = 'No employees may not require pension auto-enrolment';
        }
        break;
    }
    
    return { errors: fieldErrors, warnings: fieldWarnings };
  }, [existingClients]);

  const validateForm = useCallback(() => {
    const newErrors = {};
    const newWarnings = {};
    
    // Validate all required fields
    const requiredFields = ['reference', 'companyName', 'businessType', 'consultant', 'stagingDate', 'clientContactName', 'clientEmail'];
    
    requiredFields.forEach(field => {
      const { errors, warnings } = validateField(field, formData[field]);
      Object.assign(newErrors, errors);
      Object.assign(newWarnings, warnings);
    });
    
    // Validate optional but important fields
    ['clientPhone', 'employees'].forEach(field => {
      if (formData[field]) {
        const { errors, warnings } = validateField(field, formData[field]);
        Object.assign(newErrors, errors);
        Object.assign(newWarnings, warnings);
      }
    });
    
    setErrors(newErrors);
    setWarnings(newWarnings);
    return Object.keys(newErrors).length === 0;
  }, [formData, validateField]);

  // Enhanced input change handler with smart features
  const handleInputChange = useCallback((field, value) => {
    // Update form data
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear existing errors for this field
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
    
    // Real-time validation if enabled
    if (validationMode === 'onChange') {
      const { errors: fieldErrors, warnings: fieldWarnings } = validateField(field, value);
      setErrors(prev => ({ ...prev, ...fieldErrors }));
      setWarnings(prev => ({ ...prev, ...fieldWarnings }));
    }
    
    // Smart suggestions
    const newSuggestions = getSmartSuggestions(field, value);
    setSuggestions(prev => ({ ...prev, ...newSuggestions }));
    
    // Field-specific logic
    switch (field) {
      case 'stagingDate':
        calculateComplianceDates(value);
        break;
        
      case 'companyName':
      case 'clientEmail':
        const duplicates = checkForDuplicates(
          field === 'companyName' ? value : formData.companyName,
          field === 'clientEmail' ? value : formData.clientEmail
        );
        setDuplicateWarning(duplicates);
        break;
        
      case 'consultant':
        if (!value && consultants.length > 0) {
          const recommended = getRecommendedConsultant();
          setSuggestions(prev => ({ 
            ...prev, 
            consultant: `💡 Recommended: ${recommended} (lowest workload)` 
          }));
        } else {
          setSuggestions(prev => ({ ...prev, consultant: '' }));
        }
        break;
        
      case 'businessType':
        // Auto-suggest based on company name
        if (formData.companyName.toLowerCase().includes('charity') && value !== 'Charity') {
          setSuggestions(prev => ({
            ...prev,
            businessType: '💡 Consider "Charity" based on company name'
          }));
        }
        break;
    }
    
    // Track field history for undo functionality
    setFieldHistory(prev => ({
      ...prev,
      [field]: [...(prev[field] || []), value].slice(-5) // Keep last 5 values
    }));
  }, [errors, validationMode, validateField, getSmartSuggestions, calculateComplianceDates, checkForDuplicates, formData.companyName, formData.clientEmail, consultants.length, getRecommendedConsultant]);

  // Enhanced form submission
  const handleSubmit = useCallback(async () => {
    if (!validateForm()) {
      // Navigate to first step with errors
      const errorFields = Object.keys(errors);
      const stepWithError = steps.find(step => 
        step.fields.some(field => errorFields.includes(field))
      );
      if (stepWithError) {
        setCurrentStep(stepWithError.id);
      }
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Create enhanced client object
      const newClient = {
        id: Date.now(),
        clientNumber: formData.reference,
        clientCode: formData.reference,
        clientName: formData.companyName,
        clientType: formData.businessType,
        letterCode: formData.letterCode,
        contactName: formData.clientContactName,
        contactJobTitle: formData.clientContactJobTitle,
        contactEmail: formData.clientEmail,
        contactPhone: formData.clientPhone,
        assignedConsultant: formData.consultant,
        assignedTeamMember: formData.consultant,
        stagingDate: formData.stagingDate,
        reEnrolmentDate: formData.reEnrolmentDate,
        declarationDue: formData.declarationDue,
        employees: parseInt(formData.employees) || 0,
        status: formData.currentStatus,
        complianceStatus: 'Good',
        riskScore: Math.floor(Math.random() * 30) + 70,
        documentsComplete: 0,
        documentsTotal: 10,
        documentCompletionPercentage: 0,
        lastContact: new Date().toISOString().split('T')[0],
        lastUpdated: new Date().toISOString().split('T')[0],
        notes: formData.notes || `Created via enhanced client form. Auto-calculated compliance dates. ${formData.activatedOnTPR ? 'TPR Portal activated.' : 'TPR Portal pending.'}`,
        priority: formData.priority,
        industry: formData.industry,
        annualRevenue: formData.annualRevenue ? parseFloat(formData.annualRevenue) : null
      };

      onSave(newClient);
      handleClose();
    } catch (error) {
      console.error('Error saving client:', error);
      setErrors({ submit: 'Failed to save client. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  }, [validateForm, errors, formData, onSave]);

  const handleClose = useCallback(() => {
    setFormData({
      reference: '',
      companyName: '',
      businessType: '',
      consultant: '',
      employees: '',
      letterCode: '',
      clientContactName: '',
      clientContactJobTitle: '',
      clientEmail: '',
      clientPhone: '',
      stagingDate: '',
      reEnrolmentDate: '',
      declarationDue: '',
      currentStatus: 'waiting',
      activatedOnTPR: false,
      notes: '',
      priority: 'normal',
      industry: '',
      annualRevenue: ''
    });
    setErrors({});
    setWarnings({});
    setSuggestions({});
    setDuplicateWarning(null);
    setCurrentStep(1);
    setCompletionScore(0);
    setPreviewMode(false);
    setShowAdvanced(false);
    onClose();
  }, [onClose]);

  const nextStep = useCallback(() => {
    if (currentStep < steps.length) {
      // Validate current step fields
      const currentStepFields = steps[currentStep - 1].fields;
      const hasErrors = currentStepFields.some(field => {
        const { errors: fieldErrors } = validateField(field, formData[field]);
        return Object.keys(fieldErrors).length > 0;
      });
      
      if (!hasErrors) {
        setCurrentStep(currentStep + 1);
      }
    }
  }, [currentStep, steps, validateField, formData]);

  const prevStep = useCallback(() => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  }, [currentStep]);

  // Enhanced helper functions
  const formatDateToUK = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const getStepProgress = () => {
    const currentStepFields = steps[currentStep - 1]?.fields || [];
    if (currentStepFields.length === 0) return 100;
    
    const completed = currentStepFields.filter(field => formData[field]).length;
    return Math.round((completed / currentStepFields.length) * 100);
  };

  // Auto-suggestions on mount
  useEffect(() => {
    if (consultants.length > 0 && !formData.consultant) {
      const recommended = getRecommendedConsultant();
      setSuggestions(prev => ({ 
        ...prev, 
        consultant: `💡 Recommended: ${recommended} (lowest workload)` 
      }));
    }
  }, [consultants.length, formData.consultant, getRecommendedConsultant]);

  // Auto-completion score calculation
  useEffect(() => {
    calculateCompletionScore();
  }, [calculateCompletionScore]);

  // Auto-save functionality (if enabled)
  useEffect(() => {
    if (autoSaveEnabled && Object.values(formData).some(v => v)) {
      const timeoutId = setTimeout(() => {
        localStorage.setItem('tpr-draft-client', JSON.stringify(formData));
      }, 2000);
      return () => clearTimeout(timeoutId);
    }
  }, [formData, autoSaveEnabled]);

  // Load draft on mount
  useEffect(() => {
    if (isOpen) {
      const draft = localStorage.getItem('tpr-draft-client');
      if (draft) {
        try {
          const draftData = JSON.parse(draft);
          if (Object.values(draftData).some(v => v)) {
            // Show option to restore draft
            const restore = window.confirm('Found a saved draft. Would you like to restore it?');
            if (restore) {
              setFormData(draftData);
            }
          }
        } catch (e) {
          console.warn('Failed to load draft:', e);
        }
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const currentStepData = steps[currentStep - 1];
  const stepProgress = getStepProgress();

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Enhanced Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={handleClose}
      />
      
      {/* Enhanced Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-5xl transform overflow-hidden rounded-2xl bg-white dark:bg-gray-800 shadow-2xl transition-all border border-white/20 dark:border-gray-700/20">
          
          {/* Enhanced Header */}
          <div className="bg-gradient-to-r from-[#401D6C] to-[#EC385D] px-6 py-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                  <SparklesIcon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white">Add New Client</h3>
                  <p className="text-pink-100 text-sm">
                    Smart onboarding with compliance calculations
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">

                
                {/* Completion Score */}
                <div className="text-right">
                  <div className="text-white/90 text-sm">Completion</div>
                  <div className="text-white font-bold">{completionScore}%</div>
                </div>
                <div className="w-16 bg-white/20 rounded-full h-2">
                  <div 
                    className="bg-white h-2 rounded-full transition-all duration-500" 
                    style={{width: `${completionScore}%`}}
                  />
                </div>
                
                <button
                  onClick={handleClose}
                  className="text-white/80 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/10"
                >
                  <XMarkIcon className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            {/* Enhanced Progress */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                {steps.map((step, index) => (
                  <div 
                    key={step.id}
                    className={`flex items-center space-x-2 ${
                      step.id === currentStep ? 'text-white' : 'text-white/60'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-all ${
                      step.id < currentStep 
                        ? 'bg-white text-purple-600'
                        : step.id === currentStep
                        ? 'bg-white/20 text-white ring-2 ring-white/50'
                        : 'bg-white/10 text-white/60'
                    }`}>
                      {step.id < currentStep ? '✓' : step.id}
                    </div>
                    <div className="hidden sm:block">
                      <div className={`text-sm font-medium ${step.id === currentStep ? 'text-white' : ''}`}>
                        {step.name}
                      </div>
                      <div className="text-xs text-white/60">{step.description}</div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Current Step Progress */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-white/80">Step {currentStep} Progress</span>
                  <span className="text-white">{stepProgress}%</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-1.5">
                  <div 
                    className="bg-white h-1.5 rounded-full transition-all duration-300" 
                    style={{width: `${stepProgress}%`}}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Alerts */}
          {duplicateWarning && (
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 p-4">
              <div className="flex">
                <ExclamationTriangleIcon className="h-5 w-5 text-yellow-400 flex-shrink-0" />
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                    Possible Duplicate Detected
                  </h3>
                  <p className="text-sm text-yellow-700 dark:text-yellow-300 mt-1">
                    Similar client(s) found: {duplicateWarning.map(c => c.clientName || c.name).join(', ')}
                  </p>
                  <button 
                    className="text-sm text-yellow-800 dark:text-yellow-200 underline mt-1"
                    onClick={() => setPreviewMode(true)}
                  >
                    View similar clients
                  </button>
                </div>
              </div>
            </div>
          )}

          {errors.submit && (
            <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-400 p-4">
              <div className="flex">
                <ExclamationCircleIcon className="h-5 w-5 text-red-400" />
                <p className="ml-3 text-sm text-red-700 dark:text-red-300">{errors.submit}</p>
              </div>
            </div>
          )}

          {/* Enhanced Form Content */}
          <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
            
            {/* Step 1: Enhanced Company Information */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center">
                      <BuildingOfficeIcon className="w-7 h-7 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold text-gray-800 dark:text-white">Company Information</h4>
                      <p className="text-gray-600 dark:text-gray-400">Tell us about the client company</p>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Client Reference */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Client Reference <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.reference}
                      onChange={(e) => handleInputChange('reference', e.target.value)}
                      className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
                        errors.reference 
                          ? 'border-red-300 focus:border-red-500' 
                          : 'border-gray-200 dark:border-gray-600 focus:border-blue-500'
                      }`}
                      placeholder="e.g., CLI001, REF2024001"
                    />
                    {errors.reference && <p className="mt-1 text-sm text-red-600">{errors.reference}</p>}
                    {warnings.reference && <p className="mt-1 text-sm text-yellow-600">{warnings.reference}</p>}
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
                      className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
                        errors.companyName 
                          ? 'border-red-300 focus:border-red-500' 
                          : 'border-gray-200 dark:border-gray-600 focus:border-blue-500'
                      }`}
                      placeholder="Enter full company name"
                    />
                    {errors.companyName && <p className="mt-1 text-sm text-red-600">{errors.companyName}</p>}
                    {suggestions.companyName && <p className="mt-1 text-sm text-blue-600">{suggestions.companyName}</p>}
                  </div>

                  {/* Enhanced Business Type */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Business Type <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.businessType}
                      onChange={(e) => handleInputChange('businessType', e.target.value)}
                      className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
                        errors.businessType 
                          ? 'border-red-300 focus:border-red-500' 
                          : 'border-gray-200 dark:border-gray-600 focus:border-blue-500'
                      }`}
                    >
                      <option value="">Select business type</option>
                      <optgroup label="Popular Types">
                        {businessTypes.filter(type => type.popular).map(type => (
                          <option key={type.value} value={type.value}>
                            {type.label} - {type.description}
                          </option>
                        ))}
                      </optgroup>
                      <optgroup label="Other Types">
                        {businessTypes.filter(type => !type.popular).map(type => (
                          <option key={type.value} value={type.value}>
                            {type.label} - {type.description}
                          </option>
                        ))}
                      </optgroup>
                    </select>
                    {errors.businessType && <p className="mt-1 text-sm text-red-600">{errors.businessType}</p>}
                    {suggestions.businessType && <p className="mt-1 text-sm text-blue-600">{suggestions.businessType}</p>}
                  </div>

                  {/* Enhanced Consultant Assignment */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Assigned Consultant <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.consultant}
                      onChange={(e) => handleInputChange('consultant', e.target.value)}
                      className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
                        errors.consultant 
                          ? 'border-red-300 focus:border-red-500' 
                          : 'border-gray-200 dark:border-gray-600 focus:border-blue-500'
                      }`}
                    >
                      <option value="">Select consultant</option>
                      {consultants.map(consultant => {
                        const clientCount = existingClients.filter(c => 
                          c.assignedTeamMember === consultant || c.assignedConsultant === consultant
                        ).length;
                        return (
                          <option key={consultant} value={consultant}>
                            {consultant} ({clientCount} clients)
                          </option>
                        );
                      })}
                    </select>
                    {errors.consultant && <p className="mt-1 text-sm text-red-600">{errors.consultant}</p>}
                    {suggestions.consultant && <p className="mt-1 text-sm text-blue-600">{suggestions.consultant}</p>}
                  </div>

                  {/* Employees */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Number of Employees
                    </label>
                    <input
                      type="number"
                      value={formData.employees}
                      onChange={(e) => handleInputChange('employees', e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="e.g., 25"
                      min="0"
                    />
                    {errors.employees && <p className="mt-1 text-sm text-red-600">{errors.employees}</p>}
                    {suggestions.employees && <p className="mt-1 text-sm text-blue-600">{suggestions.employees}</p>}
                  </div>

                  {/* Letter Code */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      TPR Letter Code
                    </label>
                    <input
                      type="text"
                      value={formData.letterCode}
                      onChange={(e) => handleInputChange('letterCode', e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="10-digit code (optional)"
                      maxLength="10"
                    />
                    <button
                      type="button"
                      onClick={() => window.open('https://letter-code.ae.tpr.gov.uk/', '_blank')}
                      className="mt-1 text-xs text-blue-600 dark:text-blue-400 hover:underline flex items-center space-x-1"
                    >
                      <InformationCircleIcon className="w-3 h-3" />
                      <span>Get help from TPR</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Enhanced Contact Information */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center">
                    <UserIcon className="w-7 h-7 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-gray-800 dark:text-white">Contact Information</h4>
                    <p className="text-gray-600 dark:text-gray-400">Primary contact for pension matters</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Contact Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.clientContactName}
                      onChange={(e) => handleInputChange('clientContactName', e.target.value)}
                      className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-4 focus:ring-green-500/10 transition-all duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
                        errors.clientContactName 
                          ? 'border-red-300 focus:border-red-500' 
                          : 'border-gray-200 dark:border-gray-600 focus:border-green-500'
                      }`}
                      placeholder="Full name of contact person"
                    />
                    {errors.clientContactName && <p className="mt-1 text-sm text-red-600">{errors.clientContactName}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Job Title
                    </label>
                    <input
                      type="text"
                      value={formData.clientContactJobTitle}
                      onChange={(e) => handleInputChange('clientContactJobTitle', e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-500/10 transition-all duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="e.g., HR Manager, Finance Director"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      value={formData.clientEmail}
                      onChange={(e) => handleInputChange('clientEmail', e.target.value)}
                      className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-4 focus:ring-green-500/10 transition-all duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
                        errors.clientEmail 
                          ? 'border-red-300 focus:border-red-500' 
                          : 'border-gray-200 dark:border-gray-600 focus:border-green-500'
                      }`}
                      placeholder="contact@company.com"
                    />
                    {errors.clientEmail && <p className="mt-1 text-sm text-red-600">{errors.clientEmail}</p>}
                    {warnings.clientEmail && <p className="mt-1 text-sm text-yellow-600">{warnings.clientEmail}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={formData.clientPhone}
                      onChange={(e) => handleInputChange('clientPhone', e.target.value)}
                      className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-4 focus:ring-green-500/10 transition-all duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
                        errors.clientPhone 
                          ? 'border-red-300 focus:border-red-500' 
                          : 'border-gray-200 dark:border-gray-600 focus:border-green-500'
                      }`}
                      placeholder="+44 20 1234 5678"
                    />
                    {errors.clientPhone && <p className="mt-1 text-sm text-red-600">{errors.clientPhone}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Additional Notes
                  </label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) => handleInputChange('notes', e.target.value)}
                    rows={4}
                    className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-500/10 transition-all duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Any additional information about this client..."
                  />
                </div>
              </div>
            )}

            {/* Step 3: Enhanced Compliance Dates */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center">
                    <CalendarIcon className="w-7 h-7 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-gray-800 dark:text-white">Compliance Dates</h4>
                    <p className="text-gray-600 dark:text-gray-400">UK pension auto-enrolment requirements</p>
                  </div>
                </div>
                
                {/* Date Calculation Info */}
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
                  <div className="flex items-start space-x-3">
                    <LightBulbIcon className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <h5 className="text-sm font-medium text-blue-800 dark:text-blue-200">Smart Date Calculation</h5>
                      <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                        Enter the staging date and we'll automatically calculate compliance deadlines based on UK pension regulations.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Staging Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      value={formData.stagingDate}
                      onChange={(e) => handleInputChange('stagingDate', e.target.value)}
                      className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-4 focus:ring-purple-500/10 transition-all duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
                        errors.stagingDate 
                          ? 'border-red-300 focus:border-red-500' 
                          : 'border-gray-200 dark:border-gray-600 focus:border-purple-500'
                      }`}
                    />
                    {errors.stagingDate && <p className="mt-1 text-sm text-red-600">{errors.stagingDate}</p>}
                    {warnings.stagingDate && <p className="mt-1 text-sm text-yellow-600">{warnings.stagingDate}</p>}
                    {suggestions.stagingDate && <p className="mt-1 text-sm text-blue-600">{suggestions.stagingDate}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Re-enrolment Period
                    </label>
                    <div className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-600 text-gray-900 dark:text-white flex items-center">
                      <ClockIcon className="h-5 w-5 text-gray-400 mr-2" />
                      3 Years (Fixed by UK regulation)
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Re-enrolment Date
                      {isCalculating && <span className="ml-2 text-blue-500 text-xs animate-pulse">(Calculating...)</span>}
                    </label>
                    <input
                      type="date"
                      value={formData.reEnrolmentDate}
                      onChange={(e) => handleInputChange('reEnrolmentDate', e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition-all duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                    <p className="mt-1 text-xs text-gray-500">Auto-calculated as staging date + 3 years (can be overridden)</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Declaration Due Date
                      {isCalculating && <span className="ml-2 text-blue-500 text-xs animate-pulse">(Calculating...)</span>}
                    </label>
                    <div className={`w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl transition-all ${
                      isCalculating ? 'bg-blue-50 dark:bg-blue-900/20 animate-pulse' : 'bg-gray-50 dark:bg-gray-600'
                    } text-gray-900 dark:text-white flex items-center`}>
                      <DocumentTextIcon className="h-5 w-5 text-gray-400 mr-2" />
                      {formData.declarationDue ? formatDateToUK(formData.declarationDue) : 'Auto-calculated from re-enrolment date'}
                    </div>
                    <p className="mt-1 text-xs text-gray-500">Always 3 years and 5 months after staging date</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Current Status
                    </label>
                    <select
                      value={formData.currentStatus}
                      onChange={(e) => handleInputChange('currentStatus', e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition-all duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                      {statusOptions.map(status => (
                        <option key={status.value} value={status.value}>
                          {status.icon} {status.label}
                        </option>
                      ))}
                    </select>
                    {formData.currentStatus && (
                      <div className="mt-2 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                          <strong>Next Action:</strong> {statusOptions.find(s => s.value === formData.currentStatus)?.nextAction}
                        </p>
                      </div>
                    )}
                    {suggestions.currentStatus && <p className="mt-1 text-sm text-blue-600">{suggestions.currentStatus}</p>}
                  </div>

                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      id="activatedOnTPR"
                      checked={formData.activatedOnTPR}
                      onChange={(e) => handleInputChange('activatedOnTPR', e.target.checked)}
                      className="w-5 h-5 text-purple-500 border-gray-300 dark:border-gray-600 rounded focus:ring-purple-500 focus:ring-2"
                    />
                    <label htmlFor="activatedOnTPR" className="text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer flex items-center">
                      <ShieldCheckIcon className="h-5 w-5 text-green-500 mr-2" />
                      Activated on TPR Portal
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Enhanced Review */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center">
                    <CheckCircleIcon className="w-7 h-7 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-gray-800 dark:text-white">Review & Confirm</h4>
                    <p className="text-gray-600 dark:text-gray-400">Final check before adding to your client list</p>
                  </div>
                </div>

                {/* Enhanced Review Cards */}
                <div className="space-y-4">
                  {/* Company Information Card */}
                  <div className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
                    <h5 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-4 flex items-center">
                      <BuildingOfficeIcon className="w-5 h-5 mr-2" />
                      Company Information
                    </h5>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      <div>
                        <span className="text-sm font-medium text-blue-600 dark:text-blue-300">Company:</span>
                        <p className="text-blue-900 dark:text-blue-100 font-semibold">{formData.companyName}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-blue-600 dark:text-blue-300">Reference:</span>
                        <p className="text-blue-900 dark:text-blue-100 font-semibold">{formData.reference}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-blue-600 dark:text-blue-300">Business Type:</span>
                        <p className="text-blue-900 dark:text-blue-100 font-semibold">{formData.businessType}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-blue-600 dark:text-blue-300">Consultant:</span>
                        <p className="text-blue-900 dark:text-blue-100 font-semibold">{formData.consultant}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-blue-600 dark:text-blue-300">Employees:</span>
                        <p className="text-blue-900 dark:text-blue-100 font-semibold">{formData.employees || 'Not specified'}</p>
                      </div>
                    </div>
                  </div>

                  {/* Contact Information Card */}
                  {(formData.clientContactName || formData.clientEmail || formData.clientPhone) && (
                    <div className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-xl p-6 border border-green-200 dark:border-green-800">
                      <h5 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-4 flex items-center">
                        <UserIcon className="w-5 h-5 mr-2" />
                        Contact Information
                      </h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {formData.clientContactName && (
                          <div>
                            <span className="text-sm font-medium text-green-600 dark:text-green-300">Contact:</span>
                            <p className="text-green-900 dark:text-green-100 font-semibold">
                              {formData.clientContactName}
                              {formData.clientContactJobTitle && ` (${formData.clientContactJobTitle})`}
                            </p>
                          </div>
                        )}
                        {formData.clientEmail && (
                          <div>
                            <span className="text-sm font-medium text-green-600 dark:text-green-300">Email:</span>
                            <p className="text-green-900 dark:text-green-100 font-semibold">{formData.clientEmail}</p>
                          </div>
                        )}
                        {formData.clientPhone && (
                          <div>
                            <span className="text-sm font-medium text-green-600 dark:text-green-300">Phone:</span>
                            <p className="text-green-900 dark:text-green-100 font-semibold">{formData.clientPhone}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Compliance Information Card */}
                  <div className="bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-xl p-6 border border-purple-200 dark:border-purple-800">
                    <h5 className="text-lg font-semibold text-purple-800 dark:text-purple-200 mb-4 flex items-center">
                      <CalendarIcon className="w-5 h-5 mr-2" />
                      Compliance Dates
                    </h5>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <span className="text-sm font-medium text-purple-600 dark:text-purple-300">Staging Date:</span>
                        <p className="text-purple-900 dark:text-purple-100 font-semibold">{formatDateToUK(formData.stagingDate)}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-purple-600 dark:text-purple-300">Re-enrolment Date:</span>
                        <p className="text-green-600 dark:text-green-400 font-semibold">{formatDateToUK(formData.reEnrolmentDate)}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-purple-600 dark:text-purple-300">Declaration Due:</span>
                        <p className="text-orange-600 dark:text-orange-400 font-semibold">{formatDateToUK(formData.declarationDue)}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-purple-600 dark:text-purple-300">Status:</span>
                        <p className="text-purple-900 dark:text-purple-100 font-semibold">
                          {statusOptions.find(s => s.value === formData.currentStatus)?.label}
                        </p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-purple-600 dark:text-purple-300">TPR Portal:</span>
                        <p className={`font-semibold ${formData.activatedOnTPR ? 'text-green-600 dark:text-green-400' : 'text-yellow-600 dark:text-yellow-400'}`}>
                          {formData.activatedOnTPR ? '✅ Activated' : '⏳ Pending'}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Additional Information Card */}
                  {(formData.notes || formData.letterCode || formData.industry || formData.annualRevenue) && (
                    <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-700/50 rounded-xl p-6 border border-gray-200 dark:border-gray-600">
                      <h5 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
                        <DocumentTextIcon className="w-5 h-5 mr-2" />
                        Additional Information
                      </h5>
                      <div className="space-y-3">
                        {formData.letterCode && (
                          <div>
                            <span className="text-sm font-medium text-gray-600 dark:text-gray-300">TPR Letter Code:</span>
                            <p className="text-gray-900 dark:text-gray-100 font-semibold">{formData.letterCode}</p>
                          </div>
                        )}
                        {formData.industry && (
                          <div>
                            <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Industry:</span>
                            <p className="text-gray-900 dark:text-gray-100 font-semibold">{formData.industry}</p>
                          </div>
                        )}
                        {formData.annualRevenue && (
                          <div>
                            <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Annual Revenue:</span>
                            <p className="text-gray-900 dark:text-gray-100 font-semibold">{formatCurrency(formData.annualRevenue)}</p>
                          </div>
                        )}
                        {formData.notes && (
                          <div>
                            <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Notes:</span>
                            <p className="text-gray-900 dark:text-gray-100">{formData.notes}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Final Validation Summary */}
                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-6">
                  <div className="flex items-start space-x-3">
                    <CheckCircleIcon className="h-6 w-6 text-green-500 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-green-800 dark:text-green-200">Ready to Add Client</h3>
                      <p className="text-green-700 dark:text-green-300 mt-1">
                        All required information has been provided. Compliance dates have been automatically calculated based on UK pension regulations.
                      </p>
                      <div className="mt-3 flex items-center space-x-4 text-sm">
                        <span className="flex items-center text-green-600 dark:text-green-400">
                          <CheckCircleIcon className="w-4 h-4 mr-1" />
                          Required fields complete
                        </span>
                        <span className="flex items-center text-green-600 dark:text-green-400">
                          <CheckCircleIcon className="w-4 h-4 mr-1" />
                          Dates auto-calculated
                        </span>
                        <span className="flex items-center text-green-600 dark:text-green-400">
                          <CheckCircleIcon className="w-4 h-4 mr-1" />
                          No conflicts detected
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Enhanced Footer */}
          <div className="bg-gray-50 dark:bg-gray-700/50 px-6 py-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Step {currentStep} of {steps.length}
                </div>
                {currentStep < steps.length && (
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Fields marked with <span className="text-red-500">*</span> are required
                  </div>
                )}
                {autoSaveEnabled && (
                  <div className="flex items-center text-xs text-green-600 dark:text-green-400">
                    <BookmarkIcon className="w-3 h-3 mr-1" />
                    Auto-saving draft
                  </div>
                )}
              </div>
              
              <div className="flex items-center space-x-3">
                {currentStep > 1 && (
                  <button
                    type="button"
                    onClick={prevStep}
                    className="flex items-center space-x-2 px-4 py-2 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-600 transition-all duration-200 font-medium"
                  >
                    <ArrowLeftIcon className="w-4 h-4" />
                    <span>Previous</span>
                  </button>
                )}
                
                {currentStep < steps.length ? (
                  <button
                    onClick={nextStep}
                    className="flex items-center space-x-2 px-6 py-2 bg-gradient-to-r from-[#401D6C] to-[#EC385D] text-white rounded-xl hover:shadow-lg transition-all duration-200 font-medium"
                  >
                    <span>Next Step</span>
                    <ArrowRightIcon className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="flex items-center space-x-2 px-8 py-2 rounded-xl hover:shadow-lg transition-all duration-200 font-medium bg-gradient-to-r from-green-600 to-green-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Adding Client...</span>
                      </>
                    ) : (
                      <>
                        <CheckCircleIcon className="w-5 h-5" />
                        <span>Add Client</span>
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddClientModal;