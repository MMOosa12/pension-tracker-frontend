import React, { useState, useRef } from 'react';
import {
  UserIcon,
  BellIcon,
  ShieldCheckIcon,
  CogIcon,
  CreditCardIcon,
  UserGroupIcon,
  EnvelopeIcon,
  ChartBarIcon,
  DocumentTextIcon,
  KeyIcon,
  GlobeAltIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  PencilIcon,
  TrashIcon,
  PlusIcon,
  EyeIcon,
  EyeSlashIcon,
  CloudArrowUpIcon,
  DevicePhoneMobileIcon,
  ComputerDesktopIcon,
  MapPinIcon,
  CalendarIcon,
  ClockIcon,
  PhotoIcon,
  LinkIcon,
  ArrowDownTrayIcon,
  DocumentDuplicateIcon,
  SparklesIcon,
  HeartIcon,
  CameraIcon,
  QuestionMarkCircleIcon,
  InformationCircleIcon,
  ExclamationCircleIcon,
  CheckIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [showApiKey, setShowApiKey] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [savedState, setSavedState] = useState({});
  const [showToast, setShowToast] = useState(null);
  const fileInputRef = useRef(null);
  
  const [notifications, setNotifications] = useState({
    emailReminders: true,
    clientDeadlines: true,
    systemUpdates: false,
    marketingEmails: false,
    weeklyReports: true,
    complianceAlerts: true,
    desktopNotifications: true,
    smsNotifications: false,
  });

  const [profileData, setProfileData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@company.com',
    jobTitle: 'Senior Pension Consultant',
    phone: '+44 20 7123 4567',
    timezone: 'Europe/London',
    language: 'en-GB',
  });

  const settingsTabs = [
    { id: 'profile', name: 'Profile', icon: UserIcon, description: 'Personal information' },
    { id: 'notifications', name: 'Notifications', icon: BellIcon, description: 'Alert preferences' },
    { id: 'security', name: 'Security', icon: ShieldCheckIcon, description: 'Password & access' },
    { id: 'billing', name: 'Billing', icon: CreditCardIcon, description: 'Plans & payments' },
    { id: 'team', name: 'Team', icon: UserGroupIcon, description: 'Manage members' },
    { id: 'integrations', name: 'Integrations', icon: CogIcon, description: 'Third-party apps' },
    { id: 'compliance', name: 'Compliance', icon: DocumentTextIcon, description: 'Audit & reports' },
    { id: 'api', name: 'API Access', icon: KeyIcon, description: 'Developer tools' },
  ];

  const showToastMessage = (type, message) => {
    setShowToast({ type, message });
    setTimeout(() => setShowToast(null), 3000);
  };

  const handleNotificationChange = (key) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
    showToastMessage('success', 'Notification settings updated');
  };

  const handleSave = (section) => {
    setSavedState(prev => ({ ...prev, [section]: true }));
    showToastMessage('success', 'Settings saved successfully');
    setTimeout(() => {
      setSavedState(prev => ({ ...prev, [section]: false }));
    }, 2000);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadingImage(true);
      // Simulate upload
      setTimeout(() => {
        setUploadingImage(false);
        showToastMessage('success', 'Profile picture updated');
      }, 2000);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    showToastMessage('success', 'Copied to clipboard');
  };

  const renderProfile = () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Profile Settings</h2>
        <p className="text-gray-600 dark:text-gray-400 text-lg">Manage your personal information and preferences.</p>
      </div>

      {/* Profile Picture Section */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-8 shadow-sm">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Profile Picture</h3>
        <div className="flex items-start gap-8">
          <div className="relative">
            <div className="w-32 h-32 bg-gradient-to-br from-[#401D6C] to-[#EC385D] rounded-2xl flex items-center justify-center text-white text-4xl font-bold shadow-lg">
              {uploadingImage ? (
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
              ) : (
                'JD'
              )}
            </div>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="absolute -bottom-3 -right-3 bg-white dark:bg-gray-700 p-3 rounded-xl border-2 border-gray-200 dark:border-gray-600 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
            >
              <CameraIcon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
          </div>
          <div className="flex-1">
            <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">John Doe</h4>
            <p className="text-gray-600 dark:text-gray-400 mb-1">Senior Pension Consultant</p>
            <p className="text-sm text-gray-500 dark:text-gray-500 mb-4">john.doe@company.com</p>
            <div className="flex gap-3">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                <PhotoIcon className="h-4 w-4" />
                Change Photo
              </button>
              <button className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors">
                <TrashIcon className="h-4 w-4" />
                Remove
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Personal Information */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-8 shadow-sm">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Personal Information</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">First Name</label>
            <input
              type="text"
              value={profileData.firstName}
              onChange={(e) => setProfileData(prev => ({ ...prev, firstName: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-[#401D6C] focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Last Name</label>
            <input
              type="text"
              value={profileData.lastName}
              onChange={(e) => setProfileData(prev => ({ ...prev, lastName: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-[#401D6C] focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Email Address</label>
            <input
              type="email"
              value={profileData.email}
              onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-[#401D6C] focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Phone Number</label>
            <input
              type="tel"
              value={profileData.phone}
              onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-[#401D6C] focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Job Title</label>
            <input
              type="text"
              value={profileData.jobTitle}
              onChange={(e) => setProfileData(prev => ({ ...prev, jobTitle: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-[#401D6C] focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Timezone</label>
            <select
              value={profileData.timezone}
              onChange={(e) => setProfileData(prev => ({ ...prev, timezone: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-[#401D6C] focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200"
            >
              <option value="Europe/London">London (GMT)</option>
              <option value="Europe/Paris">Paris (CET)</option>
              <option value="America/New_York">New York (EST)</option>
            </select>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 flex gap-3">
          <button
            onClick={() => handleSave('profile')}
            disabled={savedState.profile}
            className="flex items-center gap-2 bg-gradient-to-r from-[#401D6C] to-[#EC385D] text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-200 disabled:opacity-50"
          >
            {savedState.profile ? (
              <>
                <CheckIcon className="h-4 w-4" />
                Saved
              </>
            ) : (
              <>
                <CloudArrowUpIcon className="h-4 w-4" />
                Save Changes
              </>
            )}
          </button>
          <button className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );

  const renderNotifications = () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Notification Preferences</h2>
        <p className="text-gray-600 dark:text-gray-400 text-lg">Choose how you want to be notified about important updates.</p>
      </div>

      {/* Email Notifications */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
            <EnvelopeIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Email Notifications</h3>
        </div>
        <div className="space-y-4">
          {[
            { key: 'emailReminders', label: 'Email Reminders', description: 'Get notified about upcoming client deadlines', priority: 'high' },
            { key: 'clientDeadlines', label: 'Client Deadline Alerts', description: 'Urgent notifications for compliance deadlines', priority: 'critical' },
            { key: 'complianceAlerts', label: 'Compliance Alerts', description: 'Important regulatory updates and changes', priority: 'high' },
            { key: 'weeklyReports', label: 'Weekly Reports', description: 'Summary of client activities and pending tasks', priority: 'medium' },
            { key: 'systemUpdates', label: 'System Updates', description: 'Product updates and new feature announcements', priority: 'low' },
            { key: 'marketingEmails', label: 'Marketing Communications', description: 'Tips, best practices, and industry insights', priority: 'low' },
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between p-6 rounded-xl bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h4 className="font-semibold text-gray-900 dark:text-white">{item.label}</h4>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    item.priority === 'critical' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' :
                    item.priority === 'high' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400' :
                    item.priority === 'medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' :
                    'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400'
                  }`}>
                    {item.priority}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">{item.description}</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer ml-6">
                <input
                  type="checkbox"
                  checked={notifications[item.key]}
                  onChange={() => handleNotificationChange(item.key)}
                  className="sr-only peer"
                />
                <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#401D6C]/20 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-[#401D6C] peer-checked:to-[#EC385D] shadow-sm"></div>
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Push Notifications */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
            <BellIcon className="h-5 w-5 text-purple-600 dark:text-purple-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Push Notifications</h3>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-6 rounded-xl bg-gray-50 dark:bg-gray-700">
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Desktop Notifications</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Receive notifications on your desktop</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={notifications.desktopNotifications}
                onChange={() => handleNotificationChange('desktopNotifications')}
                className="sr-only peer"
              />
              <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#401D6C]/20 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-[#401D6C] peer-checked:to-[#EC385D] shadow-sm"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSecurity = () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Security Settings</h2>
        <p className="text-gray-600 dark:text-gray-400 text-lg">Manage your account security and access controls.</p>
      </div>

      {/* Password Section */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
            <ShieldCheckIcon className="h-5 w-5 text-green-600 dark:text-green-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Password & Authentication</h3>
        </div>
        
        <div className="space-y-6">
          <div className="p-6 rounded-xl bg-gray-50 dark:bg-gray-700">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">Password</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Last changed 3 months ago</p>
              </div>
              <button
                onClick={() => setShowPasswordForm(!showPasswordForm)}
                className="flex items-center gap-2 px-4 py-2 bg-[#401D6C] text-white rounded-lg hover:bg-[#351759] transition-colors"
              >
                <PencilIcon className="h-4 w-4" />
                Change Password
              </button>
            </div>
            
            {showPasswordForm && (
              <div className="space-y-4 pt-4 border-t border-gray-200 dark:border-gray-600">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Current Password</label>
                  <input
                    type="password"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#401D6C] focus:border-transparent dark:bg-gray-600 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">New Password</label>
                  <input
                    type="password"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#401D6C] focus:border-transparent dark:bg-gray-600 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Confirm New Password</label>
                  <input
                    type="password"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#401D6C] focus:border-transparent dark:bg-gray-600 dark:text-white"
                  />
                </div>
                <div className="flex gap-3 pt-2">
                  <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                    Update Password
                  </button>
                  <button
                    onClick={() => setShowPasswordForm(false)}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
          
          {/* 2FA Coming Soon */}
          <div className="p-6 rounded-xl bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border border-yellow-200 dark:border-yellow-800">
            <div className="flex items-start gap-4">
              <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
                <SparklesIcon className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">Two-Factor Authentication</h4>
                <p className="text-sm text-yellow-700 dark:text-yellow-300 mb-4">
                  Enhanced security for your account is coming soon. You'll be able to enable 2FA with authenticator apps, SMS, or biometric login.
                </p>
                <div className="flex items-center gap-2 text-sm text-yellow-600 dark:text-yellow-400">
                  <ClockIcon className="h-4 w-4" />
                  <span>Expected Q2 2025</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Active Sessions */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-8 shadow-sm">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Active Sessions</h3>
        <div className="space-y-4">
          {[
            { device: 'Chrome on macOS', location: 'London, UK', current: true, lastActive: '2 minutes ago', icon: ComputerDesktopIcon },
            { device: 'Safari on iPhone', location: 'London, UK', current: false, lastActive: '1 hour ago', icon: DevicePhoneMobileIcon },
            { device: 'Edge on Windows', location: 'Manchester, UK', current: false, lastActive: '2 days ago', icon: ComputerDesktopIcon },
          ].map((session, index) => {
            const Icon = session.icon;
            return (
              <div key={index} className="flex items-center justify-between p-6 rounded-xl bg-gray-50 dark:bg-gray-700">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-lg ${session.current ? 'bg-green-100 dark:bg-green-900/30' : 'bg-gray-100 dark:bg-gray-600'}`}>
                    <Icon className={`h-5 w-5 ${session.current ? 'text-green-600 dark:text-green-400' : 'text-gray-600 dark:text-gray-400'}`} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">{session.device}</h4>
                    <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex items-center gap-1">
                        <MapPinIcon className="h-3 w-3" />
                        <span>{session.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <ClockIcon className="h-3 w-3" />
                        <span>{session.lastActive}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {session.current ? (
                    <span className="px-3 py-1 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200 text-xs font-medium rounded-full">
                      Current Session
                    </span>
                  ) : (
                    <button className="px-3 py-1 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 text-sm font-medium rounded-lg transition-colors">
                      Revoke
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  const renderBilling = () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Billing & Subscription</h2>
        <p className="text-gray-600 dark:text-gray-400 text-lg">Manage your subscription and billing information.</p>
      </div>

      {/* Current Plan */}
      <div className="bg-gradient-to-br from-[#401D6C] to-[#EC385D] rounded-2xl p-8 text-white shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-2xl font-bold mb-2">Professional Plan</h3>
            <p className="text-white/80">Perfect for growing businesses</p>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold">£49</div>
            <div className="text-white/80">per month</div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
            <div className="text-2xl font-bold mb-1">150</div>
            <div className="text-sm text-white/80">Clients</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
            <div className="text-2xl font-bold mb-1">∞</div>
            <div className="text-sm text-white/80">Email Reminders</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
            <div className="text-2xl font-bold mb-1">24/7</div>
            <div className="text-sm text-white/80">Support</div>
          </div>
        </div>

        <div className="flex gap-3">
          <button className="bg-white text-[#401D6C] px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-200 shadow-lg">
            Upgrade Plan
          </button>
          <button className="bg-white/20 backdrop-blur-sm border border-white/30 text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/30 transition-all duration-200">
            View Billing History
          </button>
        </div>
      </div>

      {/* Payment Method */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-8 shadow-sm">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Payment Method</h3>
        <div className="flex items-center justify-between p-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
          <div className="flex items-center gap-4">
            <div className="w-12 h-8 bg-blue-600 rounded-lg text-white text-sm flex items-center justify-center font-bold">
              VISA
            </div>
            <div>
              <div className="font-semibold text-gray-900 dark:text-white">•••• •••• •••• 4242</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Expires 12/26</div>
            </div>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-[#401D6C] dark:text-white rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
            <PencilIcon className="h-4 w-4" />
            Update
          </button>
        </div>
      </div>

      {/* Usage & Billing */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-8 shadow-sm">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Usage This Month</h3>
        <div className="space-y-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 dark:text-gray-400">Clients</span>
              <span className="font-semibold text-gray-900 dark:text-white">87 / 150</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div className="bg-gradient-to-r from-[#401D6C] to-[#EC385D] h-2 rounded-full" style={{width: '58%'}}></div>
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 dark:text-gray-400">API Calls</span>
              <span className="font-semibold text-gray-900 dark:text-white">2,847 / 10,000</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full" style={{width: '28%'}}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAPI = () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">API Access</h2>
        <p className="text-gray-600 dark:text-gray-400 text-lg">Manage your API keys and integrations.</p>
      </div>

      {/* API Keys */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-8 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">API Keys</h3>
          <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#401D6C] to-[#EC385D] text-white rounded-lg hover:shadow-lg transition-all duration-200">
            <PlusIcon className="h-4 w-4" />
            Generate New Key
          </button>
        </div>
        
        <div className="space-y-4">
          <div className="p-6 bg-gray-50 dark:bg-gray-700 rounded-xl">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Production API Key</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Full access to all endpoints</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowApiKey(!showApiKey)}
                  className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                >
                  {showApiKey ? <EyeSlashIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
                </button>
                <button
                  onClick={() => copyToClipboard('pk_live_1234567890abcdefghijklmnop')}
                  className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                >
                  <DocumentDuplicateIcon className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="font-mono text-sm text-gray-600 dark:text-gray-400 bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-600 break-all">
              {showApiKey ? 'pk_live_1234567890abcdefghijklmnop' : '••••••••••••••••••••••••••••••'}
            </div>
            <div className="flex items-center justify-between mt-4 text-sm">
              <span className="text-gray-500 dark:text-gray-400">Last used 2 hours ago</span>
              <button className="text-red-600 hover:underline">Revoke</button>
            </div>
          </div>
        </div>
      </div>

      {/* API Documentation */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-800 rounded-2xl p-8">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
            <DocumentTextIcon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="flex-1">
            <h4 className="text-xl font-semibold text-blue-900 dark:text-blue-200 mb-2">API Documentation</h4>
            <p className="text-blue-800 dark:text-blue-300 mb-6">
              Our comprehensive REST API is coming soon. You'll be able to integrate with your existing systems and automate compliance workflows.
            </p>
            <div className="flex gap-3">
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <DocumentTextIcon className="h-4 w-4" />
                View Docs
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-700 border border-blue-200 dark:border-blue-600 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-600 transition-colors">
                <ArrowDownTrayIcon className="h-4 w-4" />
                Download SDK
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile': return renderProfile();
      case 'notifications': return renderNotifications();
      case 'security': return renderSecurity();
      case 'billing': return renderBilling();
      case 'api': return renderAPI();
      case 'team': 
      case 'integrations':
      case 'compliance':
      default: return (
        <div className="text-center py-16">
          <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <CogIcon className="h-10 w-10 text-gray-400" />
          </div>
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">{settingsTabs.find(t => t.id === activeTab)?.name} Settings</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">This section is coming soon with exciting new features.</p>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#401D6C] to-[#EC385D] text-white rounded-lg">
            <ClockIcon className="h-4 w-4" />
            <span>Expected Q2 2025</span>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Toast Notifications */}
      {showToast && (
        <div className="fixed top-4 right-4 z-50 flex items-center gap-3 px-6 py-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg animate-in slide-in-from-top-5">
          <div className={`w-2 h-2 rounded-full ${
            showToast.type === 'success' ? 'bg-green-500' : 
            showToast.type === 'error' ? 'bg-red-500' : 'bg-blue-500'
          }`}></div>
          <span className="text-sm font-medium text-gray-900 dark:text-white">{showToast.message}</span>
          <button
            onClick={() => setShowToast(null)}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <XMarkIcon className="h-4 w-4" />
          </button>
        </div>
      )}

      <div className="px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 text-center">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-[#401D6C] via-[#EC385D] to-[#FF8073] bg-clip-text text-transparent mb-4">
              Settings
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Manage your account preferences and configuration to optimize your TPRFlow experience.
            </p>
          </div>

          <div className="flex flex-col xl:flex-row gap-8">
            {/* Enhanced Sidebar */}
            <div className="xl:w-80 xl:flex-shrink-0">
              <nav className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-4 shadow-sm sticky top-8">
                <div className="space-y-2">
                  {settingsTabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex items-center gap-4 px-4 py-4 rounded-xl text-left transition-all duration-200 group ${
                          activeTab === tab.id
                            ? 'bg-gradient-to-r from-[#401D6C] to-[#EC385D] text-white shadow-lg transform scale-[1.02]'
                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:scale-[1.01]'
                        }`}
                      >
                        <div className={`p-2 rounded-lg transition-colors ${
                          activeTab === tab.id 
                            ? 'bg-white/20' 
                            : 'bg-gray-100 dark:bg-gray-700 group-hover:bg-gray-200 dark:group-hover:bg-gray-600'
                        }`}>
                          <Icon className={`h-5 w-5 ${activeTab === tab.id ? 'text-white' : 'text-gray-600 dark:text-gray-400'}`} />
                        </div>
                        <div className="flex-1">
                          <div className={`font-semibold ${activeTab === tab.id ? 'text-white' : 'text-gray-900 dark:text-white'}`}>
                            {tab.name}
                          </div>
                          <div className={`text-xs ${activeTab === tab.id ? 'text-white/80' : 'text-gray-500 dark:text-gray-400'}`}>
                            {tab.description}
                          </div>
                        </div>
                        {activeTab === tab.id && (
                          <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 min-w-0">
              {renderTabContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;