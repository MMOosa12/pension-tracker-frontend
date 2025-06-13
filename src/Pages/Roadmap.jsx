import React, { useState, useEffect } from 'react';
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
  StarIcon,
  FireIcon,
  BeakerIcon,
  CalendarIcon,
  ArrowRightIcon,
  ChatBubbleLeftRightIcon,
  HeartIcon,
  PlayIcon,
} from '@heroicons/react/24/solid';

const roadmapData = [
  {
    title: 'Live Now',
    subtitle: 'Available Today',
    icon: <CheckCircleIcon className="h-7 w-7 text-white" />,
    bgColor: 'bg-gradient-to-br from-green-500 via-emerald-600 to-teal-600',
    borderColor: 'border-green-400',
    textColor: 'text-green-600',
    progress: 100,
    completedDate: '2024-12-15',
    features: [
      { 
        name: 'Dashboard & Client Management', 
        description: 'Comprehensive client data management from a unified dashboard with real-time analytics',
        icon: <ChartBarIcon className="h-5 w-5" />,
        status: 'Live',
        priority: 'high',
        votes: 47,
        completedDate: '2024-12-01'
      },
      { 
        name: 'Advanced Filters & Search', 
        description: 'Dynamic filtering and search capabilities across all client data with smart suggestions',
        icon: <EyeIcon className="h-5 w-5" />,
        status: 'Live',
        priority: 'high',
        votes: 38,
        completedDate: '2024-12-15'
      },
    ],
  },
  {
    title: 'In Development',
    subtitle: 'Active Development - Q1 2025',
    icon: <WrenchScrewdriverIcon className="h-7 w-7 text-white" />,
    bgColor: 'bg-gradient-to-br from-orange-500 via-[#FF8073] to-[#EC385D]',
    borderColor: 'border-orange-400',
    textColor: 'text-orange-600',
    progress: 65,
    features: [
      { 
        name: 'Automated Client Reminders', 
        description: 'Smart automated email notifications for re-enrolment and compliance deadlines with customizable templates',
        icon: <BellIcon className="h-5 w-5" />,
        status: 'In Development',
        eta: '4 weeks',
        priority: 'critical',
        votes: 89,
        progress: 85
      },
      { 
        name: 'Team Email Reminders', 
        description: 'Internal team notifications and deadline management system with Slack integration',
        icon: <EnvelopeIcon className="h-5 w-5" />,
        status: 'In Development',
        eta: '6 weeks',
        priority: 'high',
        votes: 62,
        progress: 60
      },
      { 
        name: 'Monthly Declaration Reports', 
        description: 'Automated monthly compliance summary reports and analytics with PDF export',
        icon: <DocumentTextIcon className="h-5 w-5" />,
        status: 'Starting Soon',
        eta: '8 weeks',
        priority: 'medium',
        votes: 34,
        progress: 15
      },
    ],
  },
  {
    title: 'Coming Soon',
    subtitle: 'Q2-Q3 2025',
    icon: <RocketLaunchIcon className="h-7 w-7 text-white" />,
    bgColor: 'bg-gradient-to-br from-[#401D6C] via-[#EC385D] to-purple-600',
    borderColor: 'border-purple-400',
    textColor: 'text-purple-600',
    progress: 25,
    features: [
      { 
        name: 'Custom Email Branding', 
        description: 'White-label email templates with your company branding, logos, and custom messaging',
        icon: <CogIcon className="h-5 w-5" />,
        status: 'Q2 2025',
        priority: 'medium',
        votes: 56
      },
      { 
        name: 'Slack & Teams Integration', 
        description: 'Real-time notifications and alerts sent directly to your team channels with smart workflows',
        icon: <ChatBubbleLeftRightIcon className="h-5 w-5" />,
        status: 'Q2 2025',
        priority: 'high',
        votes: 73
      },
      { 
        name: 'Advanced Analytics & AI', 
        description: 'AI-powered insights, compliance predictions, risk analysis, and detailed reporting dashboard',
        icon: <BeakerIcon className="h-5 w-5" />,
        status: 'Q3 2025',
        priority: 'high',
        votes: 91
      },
    ],
  },
  {
    title: 'Future Vision',
    subtitle: 'Q4 2025 & Beyond',
    icon: <LightBulbIcon className="h-7 w-7 text-white" />,
    bgColor: 'bg-gradient-to-br from-[#EC385D] via-pink-500 to-[#401D6C]',
    borderColor: 'border-pink-400',
    textColor: 'text-pink-600',
    progress: 10,
    features: [
      { 
        name: 'Two-Factor Authentication', 
        description: 'Enhanced security with 2FA, biometric login, and enterprise-grade access controls',
        icon: <ShieldCheckIcon className="h-5 w-5" />,
        status: 'Research',
        priority: 'medium',
        votes: 29
      },
      { 
        name: 'Single Sign-On (SSO)', 
        description: 'SSO with Microsoft 365, Google Workspace, Okta, and other enterprise identity providers',
        icon: <UserGroupIcon className="h-5 w-5" />,
        status: 'Research',
        priority: 'high',
        votes: 67
      },
      { 
        name: 'Client Self-Service Portal', 
        description: 'Dedicated client portal for viewing compliance status, documents, and direct communication',
        icon: <EyeIcon className="h-5 w-5" />,
        status: 'Planned',
        priority: 'high',
        votes: 84
      },
      { 
        name: 'TPR Direct Integration', 
        description: 'Real-time integration with The Pensions Regulator systems and automated compliance reporting',
        icon: <CpuChipIcon className="h-5 w-5" />,
        status: 'Research',
        priority: 'critical',
        votes: 128
      },
      { 
        name: 'API & Webhook Platform', 
        description: 'RESTful API, webhooks, and integrations with existing business tools and payroll systems',
        icon: <CogIcon className="h-5 w-5" />,
        status: 'Planned',
        priority: 'medium',
        votes: 45
      },
    ],
  },
];

const RoadmapPage = () => {
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [votedFeatures, setVotedFeatures] = useState(new Set());
  const [filter, setFilter] = useState('all');
  const [showVoteAnimation, setShowVoteAnimation] = useState(null);

  // Load voted features from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('roadmap-votes');
    if (saved) {
      setVotedFeatures(new Set(JSON.parse(saved)));
    }
  }, []);

  // Save votes to localStorage
  const saveVotes = (newVotes) => {
    localStorage.setItem('roadmap-votes', JSON.stringify([...newVotes]));
  };

  const handleVote = (featureName) => {
    const newVotes = new Set(votedFeatures);
    if (newVotes.has(featureName)) {
      newVotes.delete(featureName);
    } else {
      newVotes.add(featureName);
      setShowVoteAnimation(featureName);
      setTimeout(() => setShowVoteAnimation(null), 1000);
    }
    setVotedFeatures(newVotes);
    saveVotes(newVotes);
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'critical':
        return <FireIcon className="h-4 w-4 text-red-500" />;
      case 'high':
        return <ArrowRightIcon className="h-4 w-4 text-orange-500" />;
      case 'medium':
        return <ClockIcon className="h-4 w-4 text-yellow-500" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status, eta, progress) => {
    const baseClasses = "inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold transition-all duration-200 hover:scale-105";
    
    if (status === 'Live') {
      return <span className={`${baseClasses} bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 shadow-sm`}>✓ Live</span>;
    }
    if (status === 'In Development') {
      return (
        <div className="flex items-center gap-2">
          <span className={`${baseClasses} bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200`}>
            ⚡ {eta || 'In Progress'}
          </span>
          {progress && (
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <div className="w-12 bg-gray-200 rounded-full h-1.5">
                <div 
                  className="bg-orange-500 h-1.5 rounded-full transition-all duration-500" 
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span>{progress}%</span>
            </div>
          )}
        </div>
      );
    }
    if (status === 'Starting Soon') {
      return <span className={`${baseClasses} bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200`}>🚀 Starting Soon</span>;
    }
    if (status.includes('Q')) {
      return <span className={`${baseClasses} bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200`}>📅 {status}</span>;
    }
    if (status === 'Research') {
      return <span className={`${baseClasses} bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200`}>🔬 Research</span>;
    }
    if (status === 'Planned') {
      return <span className={`${baseClasses} bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200`}>📋 Planned</span>;
    }
    return <span className={`${baseClasses} bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200`}>{status}</span>;
  };

  const filteredData = roadmapData.map(phase => ({
    ...phase,
    features: phase.features.filter(feature => {
      if (filter === 'all') return true;
      if (filter === 'high-priority') return ['critical', 'high'].includes(feature.priority);
      if (filter === 'popular') return feature.votes > 50;
      return true;
    })
  })).filter(phase => phase.features.length > 0);

  const totalFeatures = roadmapData.reduce((acc, phase) => acc + phase.features.length, 0);
  const liveFeatures = roadmapData[0].features.length;
  const inDevFeatures = roadmapData[1].features.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-200 to-cyan-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
      </div>

      <div className="relative px-4 py-12">
        {/* Enhanced Header */}
        <div className="max-w-6xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#401D6C] to-[#EC385D] text-white px-4 py-2 rounded-full text-sm font-medium mb-6 shadow-lg">
            <RocketLaunchIcon className="h-4 w-4" />
            <span>Product Roadmap 2025</span>
          </div>
          
          <h1 className="text-6xl font-bold bg-gradient-to-r from-[#401D6C] via-[#EC385D] to-[#FF8073] bg-clip-text text-transparent mb-6 tracking-tight">
            Product Roadmap
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            See what's live, what's coming next, and our exciting vision for the future of pension compliance management. 
            <span className="font-semibold text-[#401D6C] dark:text-[#EC385D]"> Vote on features you want most!</span>
          </p>
          
          {/* Enhanced Stats Bar */}
          <div className="flex justify-center gap-8 mt-10">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 min-w-[120px]">
              <div className="text-3xl font-bold text-green-600 mb-1">{liveFeatures}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Features Live</div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 min-w-[120px]">
              <div className="text-3xl font-bold text-orange-600 mb-1">{inDevFeatures}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">In Development</div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 min-w-[120px]">
              <div className="text-3xl font-bold text-purple-600 mb-1">{totalFeatures}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Total Features</div>
            </div>
          </div>

          {/* Filter Buttons */}
          <div className="flex justify-center gap-4 mt-8">
            {[
              { key: 'all', label: 'All Features', icon: <EyeIcon className="h-4 w-4" /> },
              { key: 'high-priority', label: 'High Priority', icon: <FireIcon className="h-4 w-4" /> },
              { key: 'popular', label: 'Most Voted', icon: <StarIcon className="h-4 w-4" /> }
            ].map(filterOption => (
              <button
                key={filterOption.key}
                onClick={() => setFilter(filterOption.key)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  filter === filterOption.key
                    ? 'bg-[#401D6C] text-white shadow-lg'
                    : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
                }`}
              >
                {filterOption.icon}
                {filterOption.label}
              </button>
            ))}
          </div>
        </div>

        {/* Enhanced Roadmap Sections */}
        <div className="max-w-6xl mx-auto space-y-8">
          {filteredData.map((phase, idx) => (
            <div
              key={idx}
              className={`rounded-3xl border-2 ${phase.borderColor} bg-white dark:bg-gray-800 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-1`}
            >
              {/* Enhanced Section Header */}
              <div className={`${phase.bgColor} p-8 text-white relative overflow-hidden`}>
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute inset-0" style={{
                    backgroundImage: 'radial-gradient(circle at 25% 25%, white 2px, transparent 2px)',
                    backgroundSize: '30px 30px'
                  }}></div>
                </div>
                
                <div className="relative flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm shadow-lg">
                      {phase.icon}
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold mb-1">{phase.title}</h2>
                      <p className="text-white/90 text-lg">{phase.subtitle}</p>
                      {phase.completedDate && (
                        <div className="flex items-center gap-2 mt-2 text-sm text-white/80">
                          <CalendarIcon className="h-4 w-4" />
                          <span>Completed {new Date(phase.completedDate).toLocaleDateString()}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-4xl font-bold">{phase.features.length}</div>
                    <div className="text-lg text-white/80">Features</div>
                  </div>
                </div>
                
                {/* Enhanced Progress Bar */}
                <div className="mt-6 relative">
                  <div className="flex justify-between text-sm mb-3">
                    <span className="font-medium">Overall Progress</span>
                    <span className="font-bold">{phase.progress}%</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-3 shadow-inner">
                    <div 
                      className="bg-white h-3 rounded-full transition-all duration-1000 shadow-sm relative overflow-hidden" 
                      style={{ width: `${phase.progress}%` }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 animate-pulse"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Enhanced Features List */}
              <div className="p-8">
                <div className="space-y-4">
                  {phase.features.map((feature, i) => (
                    <div 
                      key={i} 
                      className={`group relative p-6 rounded-2xl bg-gradient-to-r from-gray-50 to-white dark:from-gray-700 dark:to-gray-800 hover:from-gray-100 hover:to-gray-50 dark:hover:from-gray-600 dark:hover:to-gray-700 transition-all duration-300 border border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 hover:shadow-lg cursor-pointer ${
                        selectedFeature === feature.name ? 'ring-2 ring-[#401D6C] border-[#401D6C]' : ''
                      }`}
                      onClick={() => setSelectedFeature(selectedFeature === feature.name ? null : feature.name)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-6 flex-1">
                          {/* Feature Icon */}
                          <div className={`p-3 ${phase.textColor === 'text-green-600' ? 'bg-green-100 dark:bg-green-900/30' : 
                                         phase.textColor === 'text-orange-600' ? 'bg-orange-100 dark:bg-orange-900/30' :
                                         phase.textColor === 'text-purple-600' ? 'bg-purple-100 dark:bg-purple-900/30' :
                                         'bg-pink-100 dark:bg-pink-900/30'} rounded-xl shadow-sm group-hover:shadow-md transition-all duration-200`}>
                            <div className={phase.textColor}>
                              {feature.icon}
                            </div>
                          </div>
                          
                          {/* Feature Content */}
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="font-bold text-lg text-gray-900 dark:text-white group-hover:text-[#401D6C] dark:group-hover:text-white transition-colors">
                                {feature.name}
                              </h3>
                              {getPriorityIcon(feature.priority)}
                              {getStatusBadge(feature.status, feature.eta, feature.progress)}
                            </div>
                            
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-3">
                              {feature.description}
                            </p>
                            
                            {/* Feature Meta */}
                            <div className="flex items-center gap-4 text-sm">
                              {feature.eta && (
                                <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                                  <ClockIcon className="h-4 w-4" />
                                  <span>ETA: {feature.eta}</span>
                                </div>
                              )}
                              {feature.completedDate && (
                                <div className="flex items-center gap-2 text-green-600">
                                  <CheckCircleIcon className="h-4 w-4" />
                                  <span>Completed {new Date(feature.completedDate).toLocaleDateString()}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                        
                        {/* Vote Button */}
                        <div className="ml-4">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleVote(feature.name);
                            }}
                            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-200 transform hover:scale-105 ${
                              votedFeatures.has(feature.name)
                                ? 'bg-gradient-to-r from-[#401D6C] to-[#EC385D] text-white shadow-lg'
                                : 'bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:border-[#401D6C] hover:text-[#401D6C] dark:hover:text-white'
                            } ${showVoteAnimation === feature.name ? 'animate-pulse' : ''}`}
                          >
                            <HeartIcon className={`h-4 w-4 ${votedFeatures.has(feature.name) ? 'text-white' : 'text-red-500'}`} />
                            <span>{feature.votes + (votedFeatures.has(feature.name) ? 1 : 0)}</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced Feature Request CTA */}
        <div className="max-w-4xl mx-auto mt-20">
          <div className="relative bg-gradient-to-r from-[#401D6C] via-[#EC385D] to-[#FF8073] p-10 rounded-3xl text-white shadow-2xl overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: 'radial-gradient(circle at 25% 25%, white 3px, transparent 3px)',
                backgroundSize: '40px 40px'
              }}></div>
            </div>
            
            <div className="relative text-center">
              <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-2 text-sm font-medium mb-6">
                <LightBulbIcon className="h-4 w-4" />
                <span>Have Ideas?</span>
              </div>
              
              <h3 className="text-3xl font-bold mb-4">Shape the Future of TPRFlow</h3>
              <p className="text-white/90 mb-8 max-w-2xl mx-auto text-lg leading-relaxed">
                Your feedback drives our development. Share your ideas and help us build the features that matter most to your business.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-white text-[#401D6C] px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center gap-2">
                  <ChatBubbleLeftRightIcon className="h-5 w-5" />
                  Submit Feature Request
                </button>
                <button className="bg-white/20 backdrop-blur-sm border border-white/30 text-white px-8 py-4 rounded-xl font-bold hover:bg-white/30 transition-all duration-200 flex items-center gap-2">
                  <PlayIcon className="h-5 w-5" />
                  Watch Demo
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Trust Indicators */}
        <div className="max-w-6xl mx-auto mt-16">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: <ShieldCheckIcon className="h-8 w-8 text-green-600" />, title: 'SOC 2 Compliant', desc: 'Enterprise security standards' },
              { icon: <CheckCircleIcon className="h-8 w-8 text-green-600" />, title: '99.9% Uptime SLA', desc: 'Reliable service guarantee' },
              { icon: <CpuChipIcon className="h-8 w-8 text-green-600" />, title: 'Enterprise Ready', desc: 'Scalable infrastructure' }
            ].map((item, idx) => (
              <div key={idx} className="text-center p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-2xl mb-4">
                  {item.icon}
                </div>
                <h4 className="font-bold text-gray-900 dark:text-white mb-2">{item.title}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoadmapPage;