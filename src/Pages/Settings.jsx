import React, { useState } from 'react';
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
} from '@heroicons/react/24/outline';

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [showApiKey, setShowApiKey] = useState(false);
  const [notifications, setNotifications] = useState({
    emailReminders: true,
    clientDeadlines: true,
    systemUpdates: false,
    marketingEmails: false,
    weeklyReports: true,
    complianceAlerts: true,
  });

  const settingsTabs = [
    { id: 'profile', name: 'Profile', icon: UserIcon },
    { id: 'notifications', name: 'Notifications', icon: BellIcon },
    { id: 'security', name: 'Security', icon: ShieldCheckIcon },
    { id: 'billing', name: 'Billing', icon: CreditCardIcon },
    { id: 'team', name: 'Team', icon: UserGroupIcon },
    { id: 'integrations', name: 'Integrations', icon: CogIcon },
    { id: 'compliance', name: 'Compliance', icon: DocumentTextIcon },
    { id: 'api', name: 'API Access', icon: KeyIcon },
  ];

  const handleNotificationChange = (key) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const renderProfile = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Profile Settings</h2>
        <p className="text-gray-600 dark:text-gray-400">Manage your personal information and preferences.</p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center gap-6 mb-6">
          <div className="relative">
            <div className="w-20 h-20 bg-gradient-to-br from-[#401D6C] to-[#EC385D] rounded-full flex items-center justify-center text-white text-2xl font-bold">
              JD
            </div>
            <button className="absolute -bottom-1 -right-1 bg-white dark:bg-gray-700 p-2 rounded-full border border-gray-200 dark:border-gray-600 shadow-sm">
              <PencilIcon className="h-4 w-4 text-gray-600 dark:text-gray-300" />
            </button>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">John Doe</h3>
            <p className="text-gray-600 dark:text-gray-400">Senior Pension Consultant</p>
            <p className="text-sm text-gray-500 dark:text-gray-500">john.doe@company.com</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">First Name</label>
            <input
              type="text"
              defaultValue="John"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#401D6C] focus:border-transparent dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Last Name</label>
            <input
              type="text"
              defaultValue="Doe"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#401D6C] focus:border-transparent dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
            <input
              type="email"
              defaultValue="john.doe@company.com"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#401D6C] focus:border-transparent dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Job Title</label>
            <input
              type="text"
              defaultValue="Senior Pension Consultant"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#401D6C] focus:border-transparent dark:bg-gray-700 dark:text-white"
            />
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <button className="bg-gradient-to-r from-[#401D6C] to-[#EC385D] text-white px-6 py-2 rounded-lg hover:shadow-lg transition-all duration-200">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );

  const renderNotifications = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Notification Preferences</h2>
        <p className="text-gray-600 dark:text-gray-400">Choose how you want to be notified about important updates.</p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Email Notifications</h3>
        <div className="space-y-4">
          {[
            { key: 'emailReminders', label: 'Email Reminders', description: 'Get notified about upcoming client deadlines' },
            { key: 'clientDeadlines', label: 'Client Deadline Alerts', description: 'Urgent notifications for compliance deadlines' },
            { key: 'complianceAlerts', label: 'Compliance Alerts', description: 'Important regulatory updates and changes' },
            { key: 'weeklyReports', label: 'Weekly Reports', description: 'Summary of client activities and pending tasks' },
            { key: 'systemUpdates', label: 'System Updates', description: 'Product updates and new feature announcements' },
            { key: 'marketingEmails', label: 'Marketing Communications', description: 'Tips, best practices, and industry insights' },
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-700">
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">{item.label}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">{item.description}</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifications[item.key]}
                  onChange={() => handleNotificationChange(item.key)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#401D6C]/20 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-[#401D6C] peer-checked:to-[#EC385D]"></div>
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderSecurity = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Security Settings</h2>
        <p className="text-gray-600 dark:text-gray-400">Manage your account security and access controls.</p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Password & Authentication</h3>
        <div className="space-y-4">
          <div>
            <button className="w-full text-left p-4 rounded-lg bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">Change Password</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Last changed 3 months ago</p>
                </div>
                <PencilIcon className="h-5 w-5 text-gray-400" />
              </div>
            </button>
          </div>
          
          <div className="p-4 rounded-lg bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800">
            <div className="flex items-center gap-3">
              <ExclamationTriangleIcon className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
              <div>
                <h4 className="font-medium text-yellow-800 dark:text-yellow-200">Two-Factor Authentication</h4>
                <p className="text-sm text-yellow-700 dark:text-yellow-300">Coming soon - Enhanced security for your account</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Active Sessions</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-700">
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">Current Session</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Chrome on macOS • London, UK</p>
            </div>
            <span className="px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 text-xs rounded-full">Active</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderBilling = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Billing & Subscription</h2>
        <p className="text-gray-600 dark:text-gray-400">Manage your subscription and billing information.</p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Current Plan</h3>
            <p className="text-gray-600 dark:text-gray-400">Professional Plan</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-gray-900 dark:text-white">£49</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">per month</div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="text-2xl font-bold text-[#401D6C] dark:text-white">150</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Clients</div>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="text-2xl font-bold text-[#401D6C] dark:text-white">Unlimited</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Email Reminders</div>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="text-2xl font-bold text-[#401D6C] dark:text-white">24/7</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Support</div>
          </div>
        </div>

        <div className="flex gap-3">
          <button className="px-4 py-2 bg-gradient-to-r from-[#401D6C] to-[#EC385D] text-white rounded-lg hover:shadow-lg transition-all duration-200">
            Upgrade Plan
          </button>
          <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            View Billing History
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Payment Method</h3>
        <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div className="flex items-center gap-3">
            <div className="w-10 h-6 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">VISA</div>
            <div>
              <div className="font-medium text-gray-900 dark:text-white">•••• •••• •••• 4242</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Expires 12/26</div>
            </div>
          </div>
          <button className="text-[#401D6C] dark:text-white hover:underline">
            Update
          </button>
        </div>
      </div>
    </div>
  );

  const renderTeam = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Team Management</h2>
          <p className="text-gray-600 dark:text-gray-400">Manage team members and their permissions.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#401D6C] to-[#EC385D] text-white rounded-lg hover:shadow-lg transition-all duration-200">
          <PlusIcon className="h-4 w-4" />
          Invite Member
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <div className="space-y-4">
          {[
            { name: 'John Doe', email: 'john.doe@company.com', role: 'Admin', status: 'Active' },
            { name: 'Sarah Wilson', email: 'sarah.w@company.com', role: 'Consultant', status: 'Active' },
            { name: 'Mike Johnson', email: 'mike.j@company.com', role: 'Viewer', status: 'Pending' },
          ].map((member, index) => (
            <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-700">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gradient-to-br from-[#401D6C] to-[#EC385D] rounded-full flex items-center justify-center text-white font-semibold">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">{member.name}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{member.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 text-xs rounded-full">
                  {member.role}
                </span>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  member.status === 'Active' 
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                    : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                }`}>
                  {member.status}
                </span>
                <button className="text-gray-400 hover:text-red-600">
                  <TrashIcon className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderAPI = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">API Access</h2>
        <p className="text-gray-600 dark:text-gray-400">Manage your API keys and integrations.</p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">API Keys</h3>
        <div className="space-y-4">
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-gray-900 dark:text-white">Production API Key</h4>
              <button
                onClick={() => setShowApiKey(!showApiKey)}
                className="text-gray-400 hover:text-gray-600"
              >
                {showApiKey ? <EyeSlashIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
              </button>
            </div>
            <div className="font-mono text-sm text-gray-600 dark:text-gray-400 bg-white dark:bg-gray-800 p-2 rounded border">
              {showApiKey ? 'pk_live_1234567890abcdefghijklmnop' : '••••••••••••••••••••••••••••••'}
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">Last used 2 hours ago</p>
          </div>
          
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <PlusIcon className="h-4 w-4" />
            Generate New Key
          </button>
        </div>
      </div>

      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6">
        <div className="flex items-start gap-3">
          <ExclamationTriangleIcon className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
          <div>
            <h4 className="font-medium text-blue-800 dark:text-blue-200">API Documentation</h4>
            <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
              Our comprehensive API is coming soon. You'll be able to integrate with your existing systems and automate compliance workflows.
            </p>
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
      case 'team': return renderTeam();
      case 'api': return renderAPI();
      default: return (
        <div className="text-center py-12">
          <CogIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">{activeTab} Settings</h3>
          <p className="text-gray-600 dark:text-gray-400">Coming soon...</p>
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Settings</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage your account preferences and configuration.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64 lg:flex-shrink-0">
            <nav className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-2">
              {settingsTabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-[#401D6C] to-[#EC385D] text-white shadow-md'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="font-medium">{tab.name}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;