import React, { useState, useMemo, useEffect } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  BarChart,
  Bar,
} from 'recharts';
import AddClientModal from '../Components/AddClientModal'; // Adjust path as needed

const consultants = [
  'Minhaz Moosa',
  'Chris Jones', 
  'Gabby Fleet',
  'Samira Rahman',
  'Ellie Wright'
];

const mockClients = [
  {
    id: 1,
    name: 'Acme Ltd',
    type: 'Limited Company',
    status: 'waiting',
    stagingDate: '2023-07-01',
    reEnrolDate: '2025-07-01',
    reminderDate: '2025-08-01', // Well into future - Low Risk
    lastUpdated: '2024-12-01',
    consultant: 'Minhaz Moosa',
    notes: 'Regular client, always compliant',
  },
  {
    id: 2,
    name: 'Sunshine Trust',
    type: 'Charity',
    status: 'declaration-due',
    stagingDate: '2023-04-01',
    reEnrolDate: '2025-04-01',
    reminderDate: '2025-01-01', // Within 30 days - Medium Risk
    lastUpdated: '2024-11-15',
    consultant: 'Chris Jones',
    notes: 'Needs follow-up on documentation',
  },
  {
    id: 3,
    name: 'Solo Trader Joe',
    type: 'Sole Trader',
    status: 'overdue',
    stagingDate: '2022-01-01',
    reEnrolDate: '2024-01-01',
    reminderDate: '2024-12-01', // Overdue - High Risk
    lastUpdated: '2024-06-15',
    consultant: 'Gabby Fleet',
    notes: 'Multiple missed deadlines',
  },
  {
    id: 4,
    name: 'Peachy Payroll',
    type: 'Limited Company',
    status: 're-enrolment',
    stagingDate: '2023-09-01',
    reEnrolDate: '2025-09-01',
    reminderDate: '2024-12-20', // Within 30 days - Medium Risk
    lastUpdated: '2024-12-05',
    consultant: 'Samira Rahman',
    notes: 'In progress, on track',
  },
  {
    id: 5,
    name: 'TechStart Solutions',
    type: 'Limited Company',
    status: 'waiting',
    stagingDate: '2023-11-01',
    reEnrolDate: '2025-11-01',
    reminderDate: '2025-03-01', // Well into future - Low Risk
    lastUpdated: '2024-12-03',
    consultant: 'Ellie Wright',
    notes: 'New client, well organized',
  },
  {
    id: 6,
    name: 'Green Valley Care',
    type: 'CIC',
    status: 'declaration-due',
    stagingDate: '2023-02-15',
    reEnrolDate: '2025-02-15',
    reminderDate: '2024-12-15', // Within 7 days - High Risk
    lastUpdated: '2024-11-20',
    consultant: 'Minhaz Moosa',
    notes: 'Awaiting board approval',
  },
  {
    id: 7,
    name: 'Maya Freelancing',
    type: 'Sole Trader',
    status: 're-enrolment',
    stagingDate: '2023-12-01',
    reEnrolDate: '2025-12-01',
    reminderDate: '2025-01-15', // Within 30 days - Medium Risk
    lastUpdated: '2024-12-07',
    consultant: 'Chris Jones',
    notes: 'Proactive client',
  },
  {
    id: 8,
    name: 'Heritage Foundation',
    type: 'Charity',
    status: 'overdue',
    stagingDate: '2022-03-01',
    reEnrolDate: '2024-03-01',
    reminderDate: '2024-11-01', // Overdue - High Risk
    lastUpdated: '2024-08-12',
    consultant: 'Gabby Fleet',
    notes: 'Requires urgent attention',
  },
  {
    id: 9,
    name: 'Digital Dreams Ltd',
    type: 'Limited Company',
    status: 'waiting',
    stagingDate: '2024-01-15',
    reEnrolDate: '2026-01-15',
    reminderDate: '2025-04-15', // Well into future - Low Risk
    lastUpdated: '2024-12-08',
    consultant: 'Samira Rahman',
    notes: 'Recently onboarded',
  },
  {
    id: 10,
    name: 'Community Kitchen',
    type: 'Charity',
    status: 'declaration-due',
    stagingDate: '2023-05-01',
    reEnrolDate: '2025-05-01',
    reminderDate: '2024-12-25', // Within 30 days - Medium Risk
    lastUpdated: '2024-11-25',
    consultant: 'Ellie Wright',
    notes: 'Financial documentation pending',
  },
  {
    id: 11,
    name: 'Alex Consulting',
    type: 'Sole Trader',
    status: 're-enrolment',
    stagingDate: '2023-08-01',
    reEnrolDate: '2025-08-01',
    reminderDate: '2025-01-05', // Within 30 days - Medium Risk
    lastUpdated: '2024-12-02',
    consultant: 'Minhaz Moosa',
    notes: 'Excellent compliance record',
  },
  {
    id: 12,
    name: 'Bright Future Trust',
    type: 'Charity',
    status: 'waiting',
    stagingDate: '2024-03-01',
    reEnrolDate: '2026-03-01',
    reminderDate: '2025-05-01', // Well into future - Low Risk
    lastUpdated: '2024-12-04',
    consultant: 'Chris Jones',
    notes: 'Large organization, well managed',
  },
  {
    id: 13,
    name: 'Metro Manufacturing',
    type: 'Limited Company',
    status: 'overdue',
    stagingDate: '2022-06-01',
    reEnrolDate: '2024-06-01',
    reminderDate: '2024-10-01', // Overdue - High Risk
    lastUpdated: '2024-09-30',
    consultant: 'Gabby Fleet',
    notes: 'Contact attempts unsuccessful',
  },
  {
    id: 14,
    name: 'Sarah Design Studio',
    type: 'Sole Trader',
    status: 'declaration-due',
    stagingDate: '2023-10-01',
    reEnrolDate: '2025-10-01',
    reminderDate: '2024-12-12', // Within 7 days - High Risk
    lastUpdated: '2024-11-28',
    consultant: 'Samira Rahman',
    notes: 'First-time declaration',
  },
  {
    id: 15,
    name: 'Innovation Hub Ltd',
    type: 'Limited Company',
    status: 're-enrolment',
    stagingDate: '2023-06-15',
    reEnrolDate: '2025-06-15',
    reminderDate: '2025-01-20', // Within 30 days - Medium Risk
    lastUpdated: '2024-12-06',
    consultant: 'Ellie Wright',
    notes: 'Complex structure, needs review',
  },
  {
    id: 16,
    name: 'Coastal Wildlife Trust',
    type: 'Charity',
    status: 'waiting',
    stagingDate: '2024-02-01',
    reEnrolDate: '2026-02-01',
    reminderDate: '2025-06-01', // Well into future - Low Risk
    lastUpdated: '2024-12-01',
    consultant: 'Minhaz Moosa',
    notes: 'Seasonal business considerations',
  },
];

const statusConfig = {
  waiting: {
    bgColor: 'bg-purple/10 dark:bg-purple-400/20',
    textColor: 'text-purple dark:text-purple-300',
    borderColor: 'border-purple/20 dark:border-purple-400/30',
    icon: '⏳',
    label: 'Waiting'
  },
  're-enrolment': {
    bgColor: 'bg-pink/10 dark:bg-pink-400/20',
    textColor: 'text-pink dark:text-pink-300',
    borderColor: 'border-pink/20 dark:border-pink-400/30',
    icon: '🔄',
    label: 'Re-Enrolment'
  },
  'declaration-due': {
    bgColor: 'bg-peach/10 dark:bg-orange-400/20',
    textColor: 'text-peach dark:text-orange-300',
    borderColor: 'border-peach/20 dark:border-orange-400/30',
    icon: '📋',
    label: 'Declaration Due'
  },
  overdue: {
    bgColor: 'bg-red-50 dark:bg-red-400/20',
    textColor: 'text-red-600 dark:text-red-300',
    borderColor: 'border-red-200 dark:border-red-400/30',
    icon: '⚠️',
    label: 'Overdue'
  },
};

const riskConfig = {
  low: { color: 'text-green-600 dark:text-green-400', bg: 'bg-green-100 dark:bg-green-900/30' },
  medium: { color: 'text-yellow-600 dark:text-yellow-400', bg: 'bg-yellow-100 dark:bg-yellow-900/30' },
  high: { color: 'text-red-600 dark:text-red-400', bg: 'bg-red-100 dark:bg-red-900/30' },
};

const chartColors = {
  waiting: '#401D6C',
  're-enrolment': '#EC385D',
  'declaration-due': '#FF8073',
  overdue: '#EF4444',
};

const formatUKDate = (dateStr) => {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  }).format(date);
};

const getUrgencyLevel = (reminderDate) => {
  const today = new Date();
  const reminder = new Date(reminderDate);
  const daysUntil = Math.ceil((reminder - today) / (1000 * 60 * 60 * 24));
  
  if (daysUntil < 0) return 'overdue';
  if (daysUntil <= 7) return 'urgent';
  if (daysUntil <= 30) return 'soon';
  return 'normal';
};

// New risk calculation function based on requirements
const calculateRiskScore = (client) => {
  const today = new Date();
  const reminderDate = new Date(client.reminderDate);
  const daysUntil = Math.ceil((reminderDate - today) / (1000 * 60 * 60 * 24));
  
  // High Risk conditions
  if (client.status === 'overdue' || 
      daysUntil < 0 || 
      (daysUntil <= 7 && daysUntil >= 0) ||
      client.notes.toLowerCase().includes('multiple missed') ||
      client.notes.toLowerCase().includes('unsuccessful')) {
    return 'high';
  }
  
  // Medium Risk conditions
  if ((client.status === 're-enrolment' || client.status === 'declaration-due') &&
      daysUntil > 7 && daysUntil <= 30) {
    return 'medium';
  }
  
  // Low Risk conditions (waiting status with 60+ days out, or well into future)
  if (client.status === 'waiting' && daysUntil > 60) {
    return 'low';
  }
  
  // Default medium risk for edge cases
  return daysUntil > 30 ? 'low' : 'medium';
};

const getTimeFromNow = (dateStr) => {
  const date = new Date(dateStr);
  const now = new Date();
  const diffInDays = Math.ceil((date - now) / (1000 * 60 * 60 * 24));
  
  if (diffInDays < 0) return `${Math.abs(diffInDays)} days overdue`;
  if (diffInDays === 0) return 'Today';
  if (diffInDays === 1) return 'Tomorrow';
  if (diffInDays <= 7) return `${diffInDays} days`;
  if (diffInDays <= 30) return `${Math.ceil(diffInDays / 7)} weeks`;
  return `${Math.ceil(diffInDays / 30)} months`;
};

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilters, setStatusFilters] = useState([]);
  const [typeFilters, setTypeFilters] = useState([]);
  const [riskFilters, setRiskFilters] = useState([]);
  const [consultantFilters, setConsultantFilters] = useState([]);
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [quickFilter, setQuickFilter] = useState('all');
  const [sortConfig, setSortConfig] = useState({ key: 'reminderDate', direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedClients, setSelectedClients] = useState([]);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [viewMode, setViewMode] = useState('list'); // 'list', 'cards', 'timeline'
  
  // Modal state
  const [showAddClientModal, setShowAddClientModal] = useState(false);
  const [clients, setClients] = useState(mockClients);

  // Add calculated risk scores to clients
  const clientsWithRisk = useMemo(() => {
    return clients.map(client => ({
      ...client,
      riskScore: calculateRiskScore(client)
    }));
  }, [clients]);

  // Quick filter presets
  const quickFilters = {
    all: () => true,
    overdue: (client) => getUrgencyLevel(client.reminderDate) === 'overdue',
    'due-this-week': (client) => {
      const urgency = getUrgencyLevel(client.reminderDate);
      return urgency === 'urgent' || urgency === 'overdue';
    },
    'due-this-month': (client) => {
      const urgency = getUrgencyLevel(client.reminderDate);
      return ['urgent', 'overdue', 'soon'].includes(urgency);
    },
    'high-risk': (client) => calculateRiskScore(client) === 'high',
    'recently-updated': (client) => {
      const lastUpdate = new Date(client.lastUpdated);
      const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
      return lastUpdate >= weekAgo;
    },
  };

  // Filter and search logic
  const filteredAndSortedClients = useMemo(() => {
    let filtered = clientsWithRisk.filter((client) => {
      // Quick filter
      if (!quickFilters[quickFilter](client)) return false;

      // Search term
      if (searchTerm && !client.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
          !client.type.toLowerCase().includes(searchTerm.toLowerCase()) &&
          !client.consultant.toLowerCase().includes(searchTerm.toLowerCase()) &&
          !client.id.toString().includes(searchTerm)) {
        return false;
      }

      // Status filters
      if (statusFilters.length > 0 && !statusFilters.includes(client.status)) return false;

      // Type filters
      if (typeFilters.length > 0 && !typeFilters.includes(client.type)) return false;

      // Risk filters
      if (riskFilters.length > 0 && !riskFilters.includes(client.riskScore)) return false;

      // Consultant filters
      if (consultantFilters.length > 0 && !consultantFilters.includes(client.consultant)) return false;

      // Date range
      if (dateRange.start || dateRange.end) {
        const reminderDate = new Date(client.reminderDate);
        if (dateRange.start && reminderDate < new Date(dateRange.start)) return false;
        if (dateRange.end && reminderDate > new Date(dateRange.end)) return false;
      }

      return true;
    });

    // Sorting
    if (sortConfig.key) {
      filtered.sort((a, b) => {
        let aValue = a[sortConfig.key];
        let bValue = b[sortConfig.key];

        if (sortConfig.key.includes('Date')) {
          aValue = new Date(aValue);
          bValue = new Date(bValue);
        }

        if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return filtered;
  }, [searchTerm, statusFilters, typeFilters, riskFilters, consultantFilters, dateRange, quickFilter, sortConfig, clientsWithRisk]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedClients.length / itemsPerPage);
  const paginatedClients = filteredAndSortedClients.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Statistics
  const stats = useMemo(() => {
    const statusCounts = clientsWithRisk.reduce((acc, client) => {
      acc[client.status] = (acc[client.status] || 0) + 1;
      return acc;
    }, {});

    const urgencyStats = clientsWithRisk.reduce((acc, client) => {
      const urgency = getUrgencyLevel(client.reminderDate);
      acc[urgency] = (acc[urgency] || 0) + 1;
      return acc;
    }, {});

    const riskStats = clientsWithRisk.reduce((acc, client) => {
      acc[client.riskScore] = (acc[client.riskScore] || 0) + 1;
      return acc;
    }, {});

    return { statusCounts, urgencyStats, riskStats };
  }, [clientsWithRisk]);

  const pieData = Object.entries(stats.statusCounts).map(([status, count]) => ({
    name: statusConfig[status]?.label || status,
    value: count,
    status: status,
  }));

  // Trend data (mock) - updated with legend labels
  const trendData = [
    { month: 'Jan', 'On Time': 12, 'Missed': 4 },
    { month: 'Feb', 'On Time': 14, 'Missed': 2 },
    { month: 'Mar', 'On Time': 13, 'Missed': 3 },
    { month: 'Apr', 'On Time': 15, 'Missed': 1 },
    { month: 'May', 'On Time': 14, 'Missed': 2 },
    { month: 'Jun', 'On Time': 16, 'Missed': 0 },
  ];

  // Handle saving new client
  const handleSaveClient = (newClient) => {
    setClients(prev => [...prev, newClient]);
    // Optional: Show success notification
    console.log('New client added:', newClient);
  };

  // Sorting handler
  const handleSort = (key) => {
    setSortConfig(prevConfig => ({
      key,
      direction: prevConfig.key === key && prevConfig.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  // Filter handlers
  const toggleStatusFilter = (status) => {
    setStatusFilters(prev => 
      prev.includes(status) 
        ? prev.filter(s => s !== status)
        : [...prev, status]
    );
  };

  const toggleTypeFilter = (type) => {
    setTypeFilters(prev => 
      prev.includes(type) 
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  const toggleRiskFilter = (risk) => {
    setRiskFilters(prev => 
      prev.includes(risk) 
        ? prev.filter(r => r !== risk)
        : [...prev, risk]
    );
  };

  const toggleConsultantFilter = (consultant) => {
    setConsultantFilters(prev => 
      prev.includes(consultant) 
        ? prev.filter(c => c !== consultant)
        : [...prev, consultant]
    );
  };

  // Bulk actions
  const handleSelectAll = () => {
    if (selectedClients.length === paginatedClients.length) {
      setSelectedClients([]);
    } else {
      setSelectedClients(paginatedClients.map(client => client.id));
    }
  };

  const handleSelectClient = (clientId) => {
    setSelectedClients(prev => 
      prev.includes(clientId)
        ? prev.filter(id => id !== clientId)
        : [...prev, clientId]
    );
  };

  // Clear all filters
  const clearAllFilters = () => {
    setSearchTerm('');
    setStatusFilters([]);
    setTypeFilters([]);
    setRiskFilters([]);
    setConsultantFilters([]);
    setDateRange({ start: '', end: '' });
    setQuickFilter('all');
    setCurrentPage(1);
  };

  // Export functionality
  const exportData = (format) => {
    const data = filteredAndSortedClients.map(client => ({
      ID: client.id,
      Name: client.name,
      Type: client.type,
      Consultant: client.consultant,
      Status: statusConfig[client.status]?.label,
      'Staging Date': formatUKDate(client.stagingDate),
      'Re-Enrolment Date': formatUKDate(client.reEnrolDate),
      'Reminder Date': formatUKDate(client.reminderDate),
      'Risk Score': client.riskScore,
      'Last Updated': formatUKDate(client.lastUpdated),
    }));

    if (format === 'csv') {
      const csv = [
        Object.keys(data[0]).join(','),
        ...data.map(row => Object.values(row).join(','))
      ].join('\n');
      
      const blob = new Blob([csv], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `clients-${new Date().toISOString().split('T')[0]}.csv`;
      a.click();
    }
  };

  const uniqueTypes = [...new Set(clientsWithRisk.map(client => client.type))];
  const uniqueConsultants = [...new Set(clientsWithRisk.map(client => client.consultant))];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 px-6 py-8">
      {/* Header with Enhanced Stats */}
      <header className="mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple to-pink bg-clip-text text-transparent dark:from-purple-300 dark:to-pink-300">
              Client Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mt-2">Monitor pension compliance across all your clients</p>
          </div>
          
          {/* Action Buttons */}
          <div className="flex items-center space-x-3 mt-4 lg:mt-0">
            <button
              onClick={() => exportData('csv')}
              className="flex items-center space-x-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span className="text-sm">Export</span>
            </button>
            
            <button 
              onClick={() => setShowAddClientModal(true)}
              className="flex items-center space-x-2 bg-gradient-to-r from-purple to-pink text-white rounded-xl px-4 py-2 hover:shadow-lg transition-all"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              <span className="text-sm">Add Client</span>
            </button>
          </div>
        </div>

        {/* Enhanced Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="text-2xl font-bold text-purple dark:text-purple-300">{clientsWithRisk.length}</div>
            <div className="text-sm text-gray-600 dark:text-gray-300">Total Clients</div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="text-2xl font-bold text-red-600 dark:text-red-300">{stats.urgencyStats.overdue || 0}</div>
            <div className="text-sm text-gray-600 dark:text-gray-300">Overdue</div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="text-2xl font-bold text-orange-600 dark:text-orange-300">{stats.urgencyStats.urgent || 0}</div>
            <div className="text-sm text-gray-600 dark:text-gray-300">Due This Week</div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-300">{stats.urgencyStats.soon || 0}</div>
            <div className="text-sm text-gray-600 dark:text-gray-300">Due This Month</div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="text-2xl font-bold text-red-600 dark:text-red-300">{stats.riskStats.high || 0}</div>
            <div className="text-sm text-gray-600 dark:text-gray-300">High Risk</div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="text-2xl font-bold text-green-600 dark:text-green-300">
              {Math.round(((clientsWithRisk.length - (stats.urgencyStats.overdue || 0)) / clientsWithRisk.length) * 100)}%
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">Compliance</div>
          </div>
        </div>

        {/* Urgent Alerts */}
        {(stats.urgencyStats.overdue > 0 || stats.urgencyStats.urgent > 0) && (
          <div className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4 mb-6">
            <div className="flex items-center space-x-3">
              <svg className="w-6 h-6 text-red-600 dark:text-red-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <div>
                <h3 className="font-semibold text-red-800 dark:text-red-200">Action Required</h3>
                <p className="text-sm text-red-700 dark:text-red-300">
                  {stats.urgencyStats.overdue > 0 && `${stats.urgencyStats.overdue} client(s) overdue`}
                  {stats.urgencyStats.overdue > 0 && stats.urgencyStats.urgent > 0 && ', '}
                  {stats.urgencyStats.urgent > 0 && `${stats.urgencyStats.urgent} client(s) due this week`}
                </p>
              </div>
              <button
                onClick={() => setQuickFilter('overdue')}
                className="ml-auto bg-red-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-700 transition-colors"
              >
                View Details
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Enhanced Search and Filters */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 dark:border-gray-700/20 p-6 mb-8">
        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search clients by name, type, consultant, or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:border-pink focus:ring-4 focus:ring-pink/10 transition-all duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Quick Filters */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Quick Filters</h3>
          <div className="flex flex-wrap gap-2">
            {Object.entries({
              all: 'All Clients',
              overdue: 'Overdue',
              'due-this-week': 'Due This Week',
              'due-this-month': 'Due This Month',
              'high-risk': 'High Risk',
              'recently-updated': 'Recently Updated'
            }).map(([key, label]) => (
              <button
                key={key}
                onClick={() => {
                  setQuickFilter(key);
                  setCurrentPage(1);
                }}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  quickFilter === key
                    ? 'bg-gradient-to-r from-purple to-pink text-white shadow-md'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {label}
                {key !== 'all' && (
                  <span className="ml-2 bg-white/20 px-2 py-0.5 rounded-full text-xs">
                    {filteredAndSortedClients.filter(quickFilters[key]).length}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Advanced Filters Toggle */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
            className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 hover:text-purple dark:hover:text-purple-300 transition-colors"
          >
            <svg className={`w-4 h-4 transform transition-transform ${showAdvancedFilters ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
            <span>Advanced Filters</span>
          </button>

          {(statusFilters.length > 0 || typeFilters.length > 0 || riskFilters.length > 0 || consultantFilters.length > 0 || dateRange.start || dateRange.end || searchTerm) && (
            <button
              onClick={clearAllFilters}
              className="text-sm text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors"
            >
              Clear All Filters
            </button>
          )}
        </div>

        {/* Advanced Filters */}
        {showAdvancedFilters && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
            {/* Status Filters */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Status</label>
              <div className="space-y-2">
                {Object.entries(statusConfig).map(([status, config]) => (
                  <label key={status} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={statusFilters.includes(status)}
                      onChange={() => toggleStatusFilter(status)}
                      className="w-4 h-4 text-pink border-gray-300 dark:border-gray-600 rounded focus:ring-pink focus:ring-2"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300 flex items-center space-x-1">
                      <span>{config.icon}</span>
                      <span>{config.label}</span>
                      <span className="text-xs text-gray-500">({stats.statusCounts[status] || 0})</span>
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Type Filters */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Business Type</label>
              <div className="space-y-2">
                {uniqueTypes.map(type => (
                  <label key={type} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={typeFilters.includes(type)}
                      onChange={() => toggleTypeFilter(type)}
                      className="w-4 h-4 text-pink border-gray-300 dark:border-gray-600 rounded focus:ring-pink focus:ring-2"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      {type}
                      <span className="text-xs text-gray-500 ml-1">
                        ({clientsWithRisk.filter(c => c.type === type).length})
                      </span>
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Risk Filters */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Risk Level</label>
              <div className="space-y-2">
                {['low', 'medium', 'high'].map(risk => (
                  <label key={risk} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={riskFilters.includes(risk)}
                      onChange={() => toggleRiskFilter(risk)}
                      className="w-4 h-4 text-pink border-gray-300 dark:border-gray-600 rounded focus:ring-pink focus:ring-2"
                    />
                    <span className={`text-sm capitalize ${riskConfig[risk].color}`}>
                      {risk === 'low' && '🟩'} {risk === 'medium' && '🟧'} {risk === 'high' && '🟥'} {risk} Risk
                      <span className="text-xs text-gray-500 ml-1">
                        ({stats.riskStats[risk] || 0})
                      </span>
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Consultant Filters */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Consultant</label>
              <div className="space-y-2">
                {uniqueConsultants.map(consultant => (
                  <label key={consultant} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={consultantFilters.includes(consultant)}
                      onChange={() => toggleConsultantFilter(consultant)}
                      className="w-4 h-4 text-pink border-gray-300 dark:border-gray-600 rounded focus:ring-pink focus:ring-2"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      {consultant}
                      <span className="text-xs text-gray-500 ml-1">
                        ({clientsWithRisk.filter(c => c.consultant === consultant).length})
                      </span>
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Date Range */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Reminder Date Range</label>
              <div className="space-y-2">
                <input
                  type="date"
                  value={dateRange.start}
                  onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
                  className="w-full border-2 border-gray-200 dark:border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:border-pink focus:ring-2 focus:ring-pink/10 transition-all duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                  placeholder="Start date"
                />
                <input
                  type="date"
                  value={dateRange.end}
                  onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
                  className="w-full border-2 border-gray-200 dark:border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:border-pink focus:ring-2 focus:ring-pink/10 transition-all duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                  placeholder="End date"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Enhanced Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Status Distribution */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 dark:border-gray-700/20 p-6">
          <div className="flex items-center mb-6">
            <svg className="w-5 h-5 text-purple dark:text-purple-300 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Status Distribution</h3>
          </div>
          
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                outerRadius={70}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) =>
                  `${name}: ${(percent * 100).toFixed(0)}%`
                }
              >
                {pieData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={chartColors[entry.status]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Compliance Trend */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 dark:border-gray-700/20 p-6">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">Compliance Trend</h3>
          
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="On Time" stroke="#10B981" strokeWidth={3} name="On Time" />
              <Line type="monotone" dataKey="Missed" stroke="#EF4444" strokeWidth={3} name="Missed" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Risk Distribution */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 dark:border-gray-700/20 p-6">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">Risk Analysis</h3>
          
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={Object.entries(stats.riskStats).map(([risk, count]) => ({ risk, count }))}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="risk" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* View Mode Toggle */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">
            Client Details
            <span className="text-lg text-gray-500 dark:text-gray-400 ml-2">
              ({filteredAndSortedClients.length} of {clientsWithRisk.length})
            </span>
          </h3>
          
          {selectedClients.length > 0 && (
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {selectedClients.length} selected
              </span>
              <button className="bg-pink text-white px-3 py-1 rounded-lg text-sm hover:bg-pink/80 transition-colors">
                Send Reminders
              </button>
              <button className="bg-gray-600 text-white px-3 py-1 rounded-lg text-sm hover:bg-gray-700 transition-colors">
                Export Selected
              </button>
            </div>
          )}
        </div>

        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
            <span>Show:</span>
            <select
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="border border-gray-300 dark:border-gray-600 rounded-lg px-2 py-1 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
          </div>
          
          <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
            {['list', 'cards'].map(mode => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className={`px-3 py-1 rounded-md text-sm transition-all ${
                  viewMode === mode
                    ? 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
                }`}
              >
                {mode === 'list' ? 'List' : 'Cards'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Client List/Cards */}
      {filteredAndSortedClients.length > 0 ? (
        <>
          {viewMode === 'list' ? (
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 dark:border-gray-700/20 overflow-hidden">
              {/* Table Header */}
              <div className="bg-gradient-to-r from-purple/5 to-pink/5 dark:from-purple-400/10 dark:to-pink-400/10 px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                <div className="grid grid-cols-12 gap-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
                  <div className="col-span-1 flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedClients.length === paginatedClients.length && paginatedClients.length > 0}
                      onChange={handleSelectAll}
                      className="w-4 h-4 text-pink border-gray-300 dark:border-gray-600 rounded focus:ring-pink focus:ring-2"
                    />
                  </div>
                  <div className="col-span-4">
                    <button
                      onClick={() => handleSort('name')}
                      className="flex items-center space-x-1 hover:text-purple dark:hover:text-purple-300 transition-colors"
                    >
                      <span>Company Name</span>
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                      </svg>
                    </button>
                  </div>
                  <div className="col-span-2">
                    <button
                      onClick={() => handleSort('reminderDate')}
                      className="flex items-center space-x-1 hover:text-purple dark:hover:text-purple-300 transition-colors"
                    >
                      <span>Due Date</span>
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                      </svg>
                    </button>
                  </div>
                  <div className="col-span-2">Risk Level</div>
                  <div className="col-span-3">
                    <button
                      onClick={() => handleSort('consultant')}
                      className="flex items-center space-x-1 hover:text-purple dark:hover:text-purple-300 transition-colors"
                    >
                      <span>Consultant</span>
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              {/* Client Rows */}
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {paginatedClients.map((client, index) => {
                  const config = statusConfig[client.status];
                  const urgency = getUrgencyLevel(client.reminderDate);
                  
                  return (
                    <div 
                      key={client.id} 
                      className={`px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200 ${
                        urgency === 'overdue' ? 'bg-red-50/50 dark:bg-red-900/20' : 
                        urgency === 'urgent' ? 'bg-orange-50/50 dark:bg-orange-900/20' : ''
                      }`}
                    >
                      <div className="grid grid-cols-12 gap-4 items-center">
                        {/* Checkbox */}
                        <div className="col-span-1">
                          <input
                            type="checkbox"
                            checked={selectedClients.includes(client.id)}
                            onChange={() => handleSelectClient(client.id)}
                            className="w-4 h-4 text-pink border-gray-300 dark:border-gray-600 rounded focus:ring-pink focus:ring-2"
                          />
                        </div>

                        {/* Company Name */}
                        <div className="col-span-4">
                          <div className="flex items-center space-x-3">
                            <div className={`w-3 h-3 rounded-full flex-shrink-0 ${
                              urgency === 'overdue' ? 'bg-red-500' :
                              urgency === 'urgent' ? 'bg-orange-500' :
                              urgency === 'soon' ? 'bg-yellow-500' : 'bg-green-500'
                            }`}></div>
                            <div>
                              <h4 className="font-semibold text-gray-900 dark:text-white">{client.name}</h4>
                              <p className="text-xs text-gray-500 dark:text-gray-400">{client.type}</p>
                            </div>
                          </div>
                        </div>

                        {/* Due Date */}
                        <div className="col-span-2">
                          <div className="text-sm text-gray-900 dark:text-white font-medium">
                            {formatUKDate(client.reminderDate)}
                          </div>
                          <div className={`text-xs ${
                            urgency === 'overdue' ? 'text-red-600 dark:text-red-400' :
                            urgency === 'urgent' ? 'text-orange-600 dark:text-orange-400' :
                            urgency === 'soon' ? 'text-yellow-600 dark:text-yellow-400' : 'text-gray-500 dark:text-gray-400'
                          }`}>
                            {getTimeFromNow(client.reminderDate)}
                          </div>
                        </div>

                        {/* Risk Level */}
                        <div className="col-span-2">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium capitalize ${riskConfig[client.riskScore].bg} ${riskConfig[client.riskScore].color}`}>
                            {client.riskScore === 'low' && '🟩'} {client.riskScore === 'medium' && '🟧'} {client.riskScore === 'high' && '🟥'} {client.riskScore}
                          </span>
                        </div>

                        {/* Consultant */}
                        <div className="col-span-3">
                          <span className="text-sm text-gray-900 dark:text-white font-medium">
                            {client.consultant}
                          </span>
                        </div>
                      </div>

                      {/* Notes */}
                      {client.notes && (
                        <div className="mt-3 ml-10 p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                          <p className="text-xs text-gray-600 dark:text-gray-400">
                            <span className="font-medium">Note:</span> {client.notes}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            /* Cards View */
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {paginatedClients.map((client) => {
                const config = statusConfig[client.status];
                const urgency = getUrgencyLevel(client.reminderDate);
                
                return (
                  <div 
                    key={client.id} 
                    className={`bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 dark:border-gray-700/20 p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${
                      urgency === 'overdue' ? 'ring-2 ring-red-200 dark:ring-red-800' : 
                      urgency === 'urgent' ? 'ring-2 ring-orange-200 dark:ring-orange-800' : ''
                    }`}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          checked={selectedClients.includes(client.id)}
                          onChange={() => handleSelectClient(client.id)}
                          className="w-4 h-4 text-pink border-gray-300 dark:border-gray-600 rounded focus:ring-pink focus:ring-2"
                        />
                        <div>
                          <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-1">{client.name}</h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{client.type}</p>
                        </div>
                      </div>
                      <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-semibold ${config.bgColor} ${config.textColor} ${config.borderColor} border`}>
                        <span>{config.icon}</span>
                        <span>{config.label}</span>
                      </div>
                    </div>
                    
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <span className="text-gray-600 dark:text-gray-300">Due Date:</span>
                        <div className="text-right">
                          <div className="font-medium text-gray-900 dark:text-white">{formatUKDate(client.reminderDate)}</div>
                          <div className={`text-xs ${
                            urgency === 'overdue' ? 'text-red-600 dark:text-red-400' :
                            urgency === 'urgent' ? 'text-orange-600 dark:text-orange-400' :
                            urgency === 'soon' ? 'text-yellow-600 dark:text-yellow-400' : 'text-gray-500 dark:text-gray-400'
                          }`}>
                            {getTimeFromNow(client.reminderDate)}
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <span className="text-gray-600 dark:text-gray-300">Risk Level:</span>
                        <span className={`font-medium capitalize ${riskConfig[client.riskScore].color}`}>
                          {client.riskScore === 'low' && '🟩'} {client.riskScore === 'medium' && '🟧'} {client.riskScore === 'high' && '🟥'} {client.riskScore}
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <span className="text-gray-600 dark:text-gray-300">Consultant:</span>
                        <span className="font-medium text-gray-900 dark:text-white">{client.consultant}</span>
                      </div>
                    </div>

                    {client.notes && (
                      <div className="mt-4 p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          <span className="font-medium">Note:</span> {client.notes}
                        </p>
                      </div>
                    )}

                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <button className="text-gray-400 hover:text-purple dark:hover:text-purple-300 transition-colors duration-200">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                          </svg>
                        </button>
                        <button className="text-gray-400 hover:text-pink dark:hover:text-pink-300 transition-colors duration-200">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </button>
                        <button className="text-gray-400 hover:text-peach transition-colors duration-200">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Pagination */}
          <div className="mt-8 flex items-center justify-between">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredAndSortedClients.length)} of {filteredAndSortedClients.length} results
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <div className="flex items-center space-x-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }
                  
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        currentPage === pageNum
                          ? 'bg-gradient-to-r from-purple to-pink text-white'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>
              
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </>
      ) : (
        /* Empty State */
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-300 mb-2">No clients found</h3>
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            {searchTerm || statusFilters.length > 0 || typeFilters.length > 0 || riskFilters.length > 0 || consultantFilters.length > 0 || quickFilter !== 'all'
              ? 'Try adjusting your filters to see more results.'
              : 'Start by adding your first client to begin tracking compliance.'}
          </p>
          {(searchTerm || statusFilters.length > 0 || typeFilters.length > 0 || riskFilters.length > 0 || consultantFilters.length > 0 || quickFilter !== 'all') && (
            <button
              onClick={clearAllFilters}
              className="bg-gradient-to-r from-purple to-pink text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all"
            >
              Clear All Filters
            </button>
          )}
        </div>
      )}

      {/* Mobile-Optimized Toast Notifications */}
      <div className="fixed bottom-4 right-4 space-y-2 z-50">
        {/* This would be populated with actual notifications */}
      </div>

      {/* Keyboard Shortcuts Help */}
      <div className="fixed bottom-4 left-4 z-40">
        <button className="bg-gray-800 dark:bg-gray-700 text-white p-2 rounded-lg shadow-lg hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors group">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div className="absolute bottom-full left-0 mb-2 p-2 bg-gray-900 text-white text-xs rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Press ? for keyboard shortcuts
          </div>
        </button>
      </div>

      {/* Add Client Modal */}
      <AddClientModal
        isOpen={showAddClientModal}
        onClose={() => setShowAddClientModal(false)}
        onSave={handleSaveClient}
        consultants={consultants}
      />
    </div>
  );
};

export default Dashboard;