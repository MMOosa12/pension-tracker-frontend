

import React, { useState, useMemo } from 'react';
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { MagnifyingGlassIcon, ArrowTrendingUpIcon, ExclamationTriangleIcon, ChartBarIcon, ClockIcon, CheckCircleIcon, ArrowUpIcon, ArrowDownIcon, FunnelIcon, CalendarIcon } from '@heroicons/react/24/outline';


// TPRFlow Brand Colors - Original Design
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

// Enhanced analytics data with trends
const stats = {
  totalClients: 247,
  totalClientsTrend: { value: 5.2, direction: 'up' },
  compliant: 198,
  complianceTrend: { value: 2.3, direction: 'up' },
  dueSoon: 31,
  dueSoonTrend: { value: 1.8, direction: 'down' },
  overdue: 18,
  overdueTrend: { value: 3.1, direction: 'up' },
  complianceRate: 80.2,
  monthlyGrowth: 2.3
};

const statusData = [
  { name: 'Compliant', value: 198, color: colors.success },
  { name: 'Due Soon', value: 31, color: colors.warning },
  { name: 'Overdue', value: 18, color: colors.error }
];

const complianceTrend = [
  { month: 'Jan', rate: 85, onTime: 210, missed: 37 },
  { month: 'Feb', rate: 88, onTime: 218, missed: 29 },
  { month: 'Mar', rate: 92, onTime: 227, missed: 20 },
  { month: 'Apr', rate: 87, onTime: 215, missed: 32 },
  { month: 'May', rate: 94, onTime: 232, missed: 15 },
  { month: 'Jun', rate: 80, onTime: 198, missed: 49 }
];

const consultantPerformance = [
  { name: 'Sarah Johnson', clients: 68, compliance: 94 },
  { name: 'Michael Chen', clients: 52, compliance: 87 },
  { name: 'David Wilson', clients: 61, compliance: 91 },
  { name: 'Emma Thompson', clients: 66, compliance: 76 }
];

const riskDistribution = [
  { level: 'Low', count: 156, color: colors.success },
  { level: 'Medium', count: 73, color: colors.warning },
  { level: 'High', count: 18, color: colors.error }
];

// Enhanced Recent Activity with proper timestamps and usernames
const recentActivity = [
  {
    id: 'ACT001',
    client: 'Acme Corporation Ltd',
    action: 'Auto-enrolment assessment completed',
    description: 'Pension compliance review completed successfully',
    timestamp: '2025-06-09T19:17:00Z',
    userName: 'you',
    status: 'success',
    severity: 'low'
  },
  {
    id: 'ACT002', 
    client: 'TechStart Industries',
    action: 'Declaration overdue',
    description: 'Monthly pension declaration missed deadline',
    timestamp: '2025-06-09T14:30:00Z',
    userName: 'System',
    status: 'error',
    severity: 'high'
  },
  {
    id: 'ACT003',
    client: 'Global Manufacturing Co',
    action: 'Employee pension eligibility review',
    description: 'Auto-enrolment status updated for 15 employees',
    timestamp: '2025-06-09T11:45:00Z',
    userName: 'Sarah Johnson',
    status: 'success',
    severity: 'low'
  },
  {
    id: 'ACT004',
    client: 'Community Health Trust', 
    action: 'Re-enrollment window opening soon',
    description: '3-year re-enrollment period starts in 2 weeks',
    timestamp: '2025-06-08T16:22:00Z',
    userName: 'Michael Chen',
    status: 'warning',
    severity: 'medium'
  },
  {
    id: 'ACT005',
    client: 'Regional Retail Group',
    action: 'Pension opt-out request processed',
    description: 'Employee opt-out request approved and documented',
    timestamp: '2025-06-08T09:15:00Z',
    userName: 'Emma Thompson',
    status: 'success',
    severity: 'low'
  },
  {
    id: 'ACT006',
    client: 'Innovation Labs Ltd',
    action: 'Contribution calculations updated',
    description: 'Monthly pension contributions processed',
    timestamp: '2025-06-07T15:20:00Z',
    userName: 'David Wilson',
    status: 'success',
    severity: 'low'
  }
];

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTimeRange, setSelectedTimeRange] = useState('30D');
  const [activityFilter, setActivityFilter] = useState('All');
  const [selectedChartSegment, setSelectedChartSegment] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const urgentCount = stats.overdue + stats.dueSoon;

  // Time range options
  const timeRanges = ['7D', '30D', '90D', '1Y'];

  // Activity filter options
  const activityFilters = ['All', 'High Priority', 'My Actions', 'System', 'Overdue'];

  // Quick filter chips
  const quickFilters = [
    { label: 'High Risk', count: 18, color: colors.error },
    { label: 'Due This Week', count: 12, color: colors.warning },
    { label: 'My Clients', count: 45, color: colors.primary },
    { label: 'Recently Updated', count: 8, color: colors.success }
  ];

  // Enhanced filtering logic
  const filteredActivity = useMemo(() => {
    let filtered = recentActivity;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(activity =>
        activity.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
        activity.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
        activity.userName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply activity filter
    if (activityFilter !== 'All') {
      filtered = filtered.filter(activity => {
        switch (activityFilter) {
          case 'High Priority':
            return activity.severity === 'high';
          case 'My Actions':
            return activity.userName === 'you';
          case 'System':
            return activity.userName === 'System';
          case 'Overdue':
            return activity.status === 'error';
          default:
            return true;
        }
      });
    }

    // Apply chart segment filter
    if (selectedChartSegment) {
      filtered = filtered.filter(activity => {
        switch (selectedChartSegment) {
          case 'Compliant':
            return activity.status === 'success';
          case 'Due Soon':
            return activity.status === 'warning';
          case 'Overdue':
            return activity.status === 'error';
          default:
            return true;
        }
      });
    }

    return filtered;
  }, [searchTerm, activityFilter, selectedChartSegment]);

  // Format timestamp to UK format with relative time
  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);
    
    // Relative time for recent items
    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
    
    // Full date for older items
    return date.toLocaleString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  };

  const getFullDateTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-GB', {
      weekday: 'long',
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  };

  // Enhanced chart click handlers
  const handlePieChartClick = (data, index) => {
    if (selectedChartSegment === data.name) {
      setSelectedChartSegment(null);
    } else {
      setSelectedChartSegment(data.name);
    }
  };

  const handleConsultantClick = (data, index) => {
    console.log('Consultant clicked:', data.name);
    // Could filter to show only this consultant's clients
  };

  // Render trend indicator with comparison
  const renderTrendIndicator = (trend) => {
    const TrendIcon = trend.direction === 'up' ? ArrowUpIcon : ArrowDownIcon;
    const colorClass = trend.direction === 'up' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400';
    
    return (
      <div className={`flex items-center space-x-1 text-xs ${colorClass}`}>
        <TrendIcon className="w-3 h-3" />
        <span>{trend.value}% vs last month</span>
      </div>
    );
  };

  // Enhanced status dot with severity
  const getStatusDot = (status, severity) => {
    let baseColor = 'bg-gray-500';
    let pulseClass = '';
    
    switch (status) {
      case 'success':
        baseColor = 'bg-green-500';
        break;
      case 'warning':
        baseColor = 'bg-yellow-500';
        pulseClass = severity === 'high' ? 'animate-pulse' : '';
        break;
      case 'error':
        baseColor = 'bg-red-500';
        pulseClass = 'animate-pulse';
        break;
    }
    
    return <div className={`w-2 h-2 rounded-full ${baseColor} ${pulseClass}`} />;
  };

  // Simulate loading states
  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header with Fixed Title Visibility */}
      <div className="border-b border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                Analytics Dashboard
              </h1>
              <p className="text-gray-600 dark:text-gray-300">Monitor pension compliance across all your clients</p>
            </div>
            <div className="flex items-center space-x-4">
              {/* Time Range Selector */}
              <div className="flex items-center space-x-2">
                <CalendarIcon className="w-4 h-4 text-gray-500" />
                <div className="flex bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-1">
                  {timeRanges.map(range => (
                    <button
                      key={range}
                      onClick={() => setSelectedTimeRange(range)}
                      className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${
                        selectedTimeRange === range
                          ? 'bg-gray-800 text-white dark:bg-gray-600 dark:text-white shadow-sm'
                          : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600'
                      }`}
                    >
                      {range}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Refresh Button */}
              <button
                onClick={handleRefresh}
                disabled={isLoading}
                className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
              >
                <div className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`}>
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </div>
                <span>Refresh</span>
              </button>
              
              {/* Growth Indicator */}
              <div className="flex items-center space-x-2 text-sm">
                <ArrowTrendingUpIcon className="w-4 h-4 text-green-600 dark:text-green-400" />
                <span className="text-gray-600 dark:text-gray-300">Compliance</span>
                <span className="font-medium text-green-600 dark:text-green-400">+{stats.monthlyGrowth}%</span>
                <span className="text-gray-400 dark:text-gray-500">vs last month</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        
        {/* Enhanced Stats Grid with Consolidated Trends */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow cursor-pointer group">
            <div className="flex items-center justify-between mb-2">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-300">{stats.totalClients}</div>
              {renderTrendIndicator(stats.totalClientsTrend)}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">Total Clients</div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow cursor-pointer group">
            <div className="flex items-center justify-between mb-2">
              <div className="text-2xl font-bold text-green-600 dark:text-green-300">{stats.complianceRate}%</div>
              {renderTrendIndicator(stats.complianceTrend)}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">Compliance Rate</div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow cursor-pointer group">
            <div className="flex items-center justify-between mb-2">
              <div className="text-2xl font-bold text-orange-600 dark:text-orange-300">{stats.dueSoon}</div>
              {renderTrendIndicator(stats.dueSoonTrend)}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">Due Soon</div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow cursor-pointer group">
            <div className="flex items-center justify-between mb-2">
              <div className="text-2xl font-bold text-red-600 dark:text-red-300">{stats.overdue}</div>
              {renderTrendIndicator(stats.overdueTrend)}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">Overdue</div>
          </div>
        </div>

        {/* Quick Filter Chips */}
        <div className="flex flex-wrap gap-2 mb-6">
          <div className="flex items-center space-x-1 text-sm text-gray-600 dark:text-gray-400">
            <FunnelIcon className="w-4 h-4" />
            <span>Quick filters:</span>
          </div>
          {quickFilters.map((filter, index) => (
            <button
              key={index}
              className="flex items-center space-x-2 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 transition-colors bg-white dark:bg-gray-800 text-sm"
              onClick={() => {
                // Implement filter logic
                console.log('Filter clicked:', filter.label);
              }}
            >
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: filter.color }}></div>
              <span className="text-gray-700 dark:text-gray-300">{filter.label}</span>
              <span className="text-xs px-1.5 py-0.5 bg-gray-100 dark:bg-gray-700 rounded-full text-gray-600 dark:text-gray-400">
                {filter.count}
              </span>
            </button>
          ))}
        </div>

        {/* Streamlined Prominent Alert Banner */}
        {urgentCount > 0 && (
          <div className="relative mb-8 rounded-2xl overflow-hidden shadow-2xl" style={{
            background: `linear-gradient(135deg, ${colors.error} 0%, #dc2626 100%)`
          }}>
            {/* Animated background pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: 'radial-gradient(circle at 25% 25%, white 2px, transparent 2px)',
                backgroundSize: '30px 30px',
                animation: 'pulse 2s infinite'
              }}></div>
            </div>
            
            {/* Glowing border effect */}
            <div className="absolute inset-0 rounded-2xl" style={{
              boxShadow: `0 0 40px ${colors.error}60, inset 0 1px 0 rgba(255, 255, 255, 0.2)`
            }}></div>
            
            <div className="relative flex items-center space-x-6 p-4">
              <div className="flex-shrink-0 w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <ExclamationTriangleIcon className="w-6 h-6 text-white animate-pulse" />
              </div>
              
              <div className="flex-1">
                <div className="text-xl font-bold text-white mb-1 tracking-tight">
                  Urgent Action Required
                </div>
                <div className="text-white/95 text-base font-medium">
                  <span className="bg-white/20 px-3 py-1 rounded-lg mr-2">{stats.overdue} clients overdue</span>
                  <span className="bg-white/20 px-3 py-1 rounded-lg mr-2">{stats.dueSoon} due soon</span>
                </div>
              </div>
              
              <div className="flex flex-col space-y-2">
                <button className="bg-white text-red-600 px-6 py-2 rounded-xl font-bold text-base hover:bg-red-50 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105">
                  Review Now →
                </button>
                <button className="bg-white/20 hover:bg-white/30 text-white px-4 py-1.5 rounded-lg font-medium transition-all duration-200 border border-white/30 text-sm">
                  Generate Report
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Enhanced Charts Grid with Interactivity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          
          {/* Interactive Status Distribution */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Status Distribution</h3>
              </div>
              {selectedChartSegment && (
                <button
                  onClick={() => setSelectedChartSegment(null)}
                  className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  Clear filter
                </button>
              )}
            </div>
            
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  outerRadius={70}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                  onClick={handlePieChartClick}
                  className="cursor-pointer"
                >
                  {statusData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.color}
                      stroke={selectedChartSegment === entry.name ? '#374151' : 'none'}
                      strokeWidth={selectedChartSegment === entry.name ? 2 : 0}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            {selectedChartSegment && (
              <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Filtering activity by: <span className="font-medium text-gray-900 dark:text-white">{selectedChartSegment}</span>
                </p>
              </div>
            )}
          </div>

          {/* Compliance Trend with Time Range */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">
              Compliance Trend ({selectedTimeRange})
            </h3>
            
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={complianceTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="rate" stroke={colors.primary} strokeWidth={3} name="Compliance Rate" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          
          {/* Interactive Team Performance */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">Team Performance</h3>
            
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={consultantPerformance}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="name" 
                  tick={{ fontSize: 11 }}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                  interval={0}
                />
                <YAxis />
                <Tooltip />
                <Bar 
                  dataKey="compliance" 
                  fill={colors.secondary} 
                  onClick={handleConsultantClick}
                  className="cursor-pointer"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Risk Analysis */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">Risk Analysis</h3>
            
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={riskDistribution}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="level" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill={colors.accent} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Enhanced Recent Activity */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700">
                <svg className="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                Recent Activity
                {filteredActivity.length !== recentActivity.length && (
                  <span className="ml-2 text-sm font-normal text-gray-500 dark:text-gray-400">
                    ({filteredActivity.length} of {recentActivity.length})
                  </span>
                )}
              </h3>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Activity Filter Dropdown */}
              <select
                value={activityFilter}
                onChange={(e) => setActivityFilter(e.target.value)}
                className="text-sm border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-1.5 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:border-gray-400 dark:focus:border-gray-500"
              >
                {activityFilters.map(filter => (
                  <option key={filter} value={filter}>{filter}</option>
                ))}
              </select>
              
              {/* Enhanced Search */}
              <div className="relative max-w-xs">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500" />
                <input
                  type="text"
                  placeholder="Search activity..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:border-gray-400 dark:focus:border-gray-500 transition-all duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          </div>
          
          {/* Enhanced Activity List */}
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {filteredActivity.length > 0 ? (
              filteredActivity.map((activity) => (
                <div key={activity.id} className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            {getStatusDot(activity.status, activity.severity)}
                            <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                              {activity.action}
                            </h4>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                            {activity.description}
                          </p>
                          <div className="flex items-center space-x-2 mt-2">
                            <span className="text-xs font-medium text-gray-900 dark:text-white">
                              {activity.client}
                            </span>
                          </div>
                        </div>
                        <div className="text-right ml-4 flex-shrink-0">
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {formatDateTime(activity.timestamp)}
                          </p>
                          <p className="text-xs text-gray-400 dark:text-gray-500 mt-1" title={getFullDateTime(activity.timestamp)}>
                            {getFullDateTime(activity.timestamp).split(' at ')[0]}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            By {activity.userName}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-12 text-center">
                <div className="text-4xl mb-4">🔍</div>
                <h3 className="text-lg font-medium text-gray-600 dark:text-gray-300 mb-2">No activities found</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  {searchTerm || activityFilter !== 'All' || selectedChartSegment
                    ? 'Try adjusting your filters to see more results.'
                    : 'No activity to display at the moment.'}
                </p>
                {(searchTerm || activityFilter !== 'All' || selectedChartSegment) && (
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      setActivityFilter('All');
                      setSelectedChartSegment(null);
                    }}
                    className="mt-4 px-4 py-2 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    Clear all filters
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;