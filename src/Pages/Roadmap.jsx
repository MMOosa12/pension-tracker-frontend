import React from 'react';
import {
  CheckCircleIcon,
  WrenchScrewdriverIcon,
  RocketLaunchIcon,
  LightBulbIcon,
  ClockIcon,
  EnvelopeIcon,
  ChartBarIcon,
  BellIcon,
  CpuChipIcon,
  ShieldCheckIcon,
  UserGroupIcon,
  DocumentTextIcon,
  CogIcon,
  EyeIcon,
} from '@heroicons/react/24/solid';

const roadmapData = [
  {
    title: 'Live Now',
    subtitle: 'Available Today',
    icon: <CheckCircleIcon className="h-7 w-7 text-white" />,
    bgColor: 'bg-gradient-to-br from-green-500 to-emerald-600',
    borderColor: 'border-green-500',
    progress: 100,
    features: [
      { 
        name: 'Dashboard & Client Management', 
        description: 'Comprehensive client data management from a unified dashboard',
        icon: <ChartBarIcon className="h-5 w-5 text-green-600" />,
        status: 'Live'
      },
      { 
        name: 'Advanced Filters & Search', 
        description: 'Dynamic filtering and search capabilities across all client data',
        icon: <EyeIcon className="h-5 w-5 text-green-600" />,
        status: 'Live'
      },
    ],
  },
  {
    title: 'In Development',
    subtitle: 'Target Q3 2025',
    icon: <WrenchScrewdriverIcon className="h-7 w-7 text-white" />,
    bgColor: 'bg-gradient-to-br from-[#FF8073] to-[#EC385D]',
    borderColor: 'border-orange-500',
    progress: 65,
    features: [
      { 
        name: 'Automated Client Reminders', 
        description: 'Smart automated email notifications for re-enrolment and compliance deadlines',
        icon: <BellIcon className="h-5 w-5 text-orange-600" />,
        status: 'ETA 4 weeks',
        eta: '4 weeks'
      },
      { 
        name: 'Team Email Reminders', 
        description: 'Internal team notifications and deadline management system',
        icon: <EnvelopeIcon className="h-5 w-5 text-orange-600" />,
        status: 'In Progress',
        eta: '6 weeks'
      },
      { 
        name: 'Monthly Declaration Reports', 
        description: 'Automated monthly compliance summary reports and analytics',
        icon: <DocumentTextIcon className="h-5 w-5 text-orange-600" />,
        status: 'ETA 12 weeks',
        eta: '12 weeks'
      },
    ],
  },
  {
    title: 'Coming Soon',
    subtitle: 'Before End of 2025 (Q4)',
    icon: <RocketLaunchIcon className="h-7 w-7 text-white" />,
    bgColor: 'bg-gradient-to-br from-[#401D6C] to-[#EC385D]',
    borderColor: 'border-purple-500',
    progress: 25,
    features: [
      { 
        name: 'Custom Email Branding', 
        description: 'White-label email templates with your company branding and messaging',
        icon: <CogIcon className="h-5 w-5 text-purple-600" />,
        status: 'Q4 2025'
      },
      { 
        name: 'Slack & Teams Integration', 
        description: 'Real-time notifications and alerts sent directly to your team channels',
        icon: <UserGroupIcon className="h-5 w-5 text-purple-600" />,
        status: 'Q4 2025'
      },
      { 
        name: 'Advanced Analytics & AI', 
        description: 'AI-powered insights, compliance predictions, and detailed reporting dashboard',
        icon: <ChartBarIcon className="h-5 w-5 text-purple-600" />,
        status: 'Q4 2025'
      },
    ],
  },
  {
    title: 'Future Vision',
    subtitle: '2026 & Beyond',
    icon: <LightBulbIcon className="h-7 w-7 text-white" />,
    bgColor: 'bg-gradient-to-br from-[#EC385D] to-[#401D6C]',
    borderColor: 'border-pink-500',
    progress: 10,
    features: [
      { 
        name: '2FA Security', 
        description: 'Two-factor authentication for enhanced account security',
        icon: <ShieldCheckIcon className="h-5 w-5 text-pink-600" />,
        status: 'Research'
      },
      { 
        name: 'SSO Login', 
        description: 'Single Sign-On with Microsoft 365, Google Workspace, and other providers',
        icon: <UserGroupIcon className="h-5 w-5 text-pink-600" />,
        status: 'Research'
      },
      { 
        name: 'Client Self-Service Portal', 
        description: 'Dedicated client portal for viewing compliance status and documents',
        icon: <EyeIcon className="h-5 w-5 text-pink-600" />,
        status: 'Planned'
      },
      { 
        name: 'TPR Integration', 
        description: 'Direct integration with The Pensions Regulator systems and databases',
        icon: <CpuChipIcon className="h-5 w-5 text-pink-600" />,
        status: 'Research'
      },
      { 
        name: 'API & Integrations', 
        description: 'RESTful API and webhook integrations with existing business tools',
        icon: <CogIcon className="h-5 w-5 text-pink-600" />,
        status: 'Planned'
      },
    ],
  },
];

const RoadmapPage = () => {

  const getStatusBadge = (status, eta) => {
    const baseClasses = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium";
    
    if (status === 'Live') {
      return <span className={`${baseClasses} bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200`}>✓ Live</span>;
    }
    if (status === 'In Progress' || eta) {
      return <span className={`${baseClasses} bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200`}>⚡ {eta || status}</span>;
    }
    if (status === 'Q4 2025') {
      return <span className={`${baseClasses} bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200`}>🚀 Q4 2025</span>;
    }
    if (status === 'Research') {
      return <span className={`${baseClasses} bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200`}>🔬 Research</span>;
    }
    if (status === 'Planned') {
      return <span className={`${baseClasses} bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200`}>📋 Planned</span>;
    }
    return <span className={`${baseClasses} bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200`}>{status}</span>;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 px-4 py-12">
      {/* Header */}
      <div className="max-w-6xl mx-auto text-center mb-16">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-[#401D6C] via-[#EC385D] to-[#FF8073] bg-clip-text text-transparent mb-4">
          Product Roadmap
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          See what's live, what's coming next, and our exciting vision for the future of pension compliance management.
        </p>
        
        {/* Stats Bar */}
        <div className="flex justify-center gap-8 mt-8 text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span>2 Features Live</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-orange-500"></div>
            <span>3 In Development</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-purple-500"></div>
            <span>8 Planned</span>
          </div>
        </div>
      </div>

      {/* Roadmap Sections */}
      <div className="max-w-6xl mx-auto space-y-8">
        {roadmapData.map((phase, idx) => (
          <div
            key={idx}
            className={`rounded-2xl border-2 ${phase.borderColor} bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden`}
          >
            {/* Section Header */}
            <div className={`${phase.bgColor} p-6 text-white`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                    {phase.icon}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">{phase.title}</h2>
                    <p className="text-white/90 text-sm">{phase.subtitle}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold">{phase.features.length}</div>
                  <div className="text-sm text-white/80">Features</div>
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="mt-4">
                <div className="flex justify-between text-sm mb-2">
                  <span>Progress</span>
                  <span>{phase.progress}%</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-2">
                  <div 
                    className="bg-white h-2 rounded-full transition-all duration-500" 
                    style={{ width: `${phase.progress}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Features List */}
            <div className="p-6">
              <div className="space-y-3">
                {phase.features.map((feature, i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-all duration-200 border border-gray-200 dark:border-gray-600 group">
                    <div className="flex items-center gap-4 flex-1">
                      <div className="p-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm group-hover:shadow-md transition-shadow">
                        {feature.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-[#401D6C] dark:group-hover:text-white transition-colors">
                            {feature.name}
                          </h3>
                          {getStatusBadge(feature.status, feature.eta)}
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          {feature.description}
                        </p>
                        {feature.eta && (
                          <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mt-2">
                            <ClockIcon className="h-3 w-3" />
                            <span>ETA: {feature.eta}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Feature Request CTA */}
      <div className="max-w-4xl mx-auto mt-16 text-center">
        <div className="bg-gradient-to-r from-[#401D6C] via-[#EC385D] to-[#FF8073] p-8 rounded-2xl text-white shadow-2xl">
          <h3 className="text-2xl font-bold mb-4">Have a Feature Request?</h3>
          <p className="text-white/90 mb-6 max-w-2xl mx-auto">
            We're always looking to improve our platform. Share your ideas and help shape the future of pension compliance management.
          </p>
          <button className="bg-white text-[#401D6C] px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-200 shadow-lg">
            Submit Feature Request
          </button>
        </div>
      </div>

      {/* Trust Indicators */}
      <div className="max-w-6xl mx-auto mt-12 text-center">
        <div className="grid md:grid-cols-3 gap-6 text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center justify-center gap-2">
            <ShieldCheckIcon className="h-5 w-5 text-green-600" />
            <span>SOC 2 Compliant</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <CheckCircleIcon className="h-5 w-5 text-green-600" />
            <span>99.9% Uptime SLA</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <CpuChipIcon className="h-5 w-5 text-green-600" />
            <span>Enterprise Ready</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoadmapPage;
