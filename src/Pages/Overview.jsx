import React, { useState, useMemo, useEffect, useCallback } from 'react';
import {
  MagnifyingGlassIcon,
  PlusIcon,
  ArrowDownTrayIcon,
  UserGroupIcon,
  CalendarIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ClockIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  XMarkIcon,
  ChevronUpDownIcon,
  ChevronUpIcon,
  ChevronDownIcon,
  ArrowPathIcon,
  FireIcon,
  DocumentTextIcon,
  EnvelopeIcon,
  PhoneIcon,
  BuildingOfficeIcon,
  BookmarkIcon,
  FunnelIcon,
  Squares2X2Icon,
  PrinterIcon,
  DocumentArrowDownIcon,
  AdjustmentsHorizontalIcon,
  ViewColumnsIcon,
  TableCellsIcon,
  EllipsisVerticalIcon,
  StarIcon,
  BellIcon,
  DocumentDuplicateIcon,
  ArchiveBoxIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  InformationCircleIcon,
} from '@heroicons/react/24/outline';
import { CheckCircleIcon as CheckCircleSolid, StarIcon as StarSolid } from '@heroicons/react/24/solid';

const Overview = () => {
  // Enhanced mock data with more realistic dates and risk indicators
  const initialClients = [
    {
      id: 1,
      clientName: 'Acme Corporation Ltd',
      clientType: 'Limited Company',
      status: 'compliant',
      complianceStatus: 'Good',
      assignedConsultant: 'Sarah Johnson',
      reEnrolmentDate: '2025-01-15',
      declarationDue: '2025-06-15',
      stagingDate: '2023-01-15',
      contactName: 'Michael Brown',
      contactEmail: 'michael.brown@acme.com',
      contactPhone: '+44 20 7123 4567',
      employees: 245,
      riskScore: 85,
      documentsComplete: 8,
      documentsTotal: 10,
      letterCode: '1234567890',
      revenue: 45000,
      lastContact: '2024-11-20',
      lastUpdated: '2024-12-01',
      notes: 'Regular client with good compliance record',
      documentCompletionPercentage: 80,
      priority: 'medium',
      tags: ['established', 'low-risk'],
      industry: 'Manufacturing',
      nextAction: 'Schedule annual review',
      isStarred: false
    },
    {
      id: 2,
      clientName: 'TechStart Solutions',
      clientType: 'Limited Company', 
      status: 'reenrolment_due',
      complianceStatus: 'Warning',
      assignedConsultant: 'James Wilson',
      reEnrolmentDate: '2025-01-05',
      declarationDue: '2025-01-20',
      stagingDate: '2023-02-20',
      contactName: 'Emma Davis',
      contactEmail: 'emma.davis@techstart.com',
      contactPhone: '+44 161 234 5678',
      employees: 87,
      riskScore: 70,
      documentsComplete: 6,
      documentsTotal: 8,
      letterCode: '2345678901',
      revenue: 32000,
      lastContact: '2024-11-18',
      lastUpdated: '2024-11-25',
      notes: 'Fast-growing startup, needs attention',
      documentCompletionPercentage: 75,
      priority: 'high',
      tags: ['startup', 'growing'],
      industry: 'Technology',
      nextAction: 'Complete re-enrolment process',
      isStarred: true
    },
    {
      id: 3,
      clientName: 'GreenTech Industries',
      clientType: 'Limited Company',
      status: 'overdue',
      complianceStatus: 'Critical',
      assignedConsultant: 'Robert Taylor',
      reEnrolmentDate: '2024-04-05',
      declarationDue: '2024-12-01',
      stagingDate: '2023-04-05',
      contactName: 'Sophie Miller',
      contactEmail: 'sophie.miller@greentech.com',
      contactPhone: '+44 141 456 7890',
      employees: 312,
      riskScore: 45,
      documentsComplete: 3,
      documentsTotal: 12,
      letterCode: '4567890123',
      revenue: 67000,
      lastContact: '2024-11-15',
      lastUpdated: '2024-11-16',
      notes: 'URGENT: Multiple compliance issues need immediate attention',
      documentCompletionPercentage: 25,
      priority: 'critical',
      tags: ['urgent', 'compliance-issues'],
      industry: 'Clean Energy',
      nextAction: 'Immediate compliance review required',
      isStarred: false
    },
    {
      id: 4,
      clientName: 'Blue Ocean Consulting',
      clientType: 'Partnership',
      status: 'compliant',
      complianceStatus: 'Good',
      assignedConsultant: 'Maria Rodriguez',
      reEnrolmentDate: '2025-05-12',
      declarationDue: '2025-10-12',
      stagingDate: '2023-05-12',
      contactName: 'Thomas Anderson',
      contactEmail: 'thomas.anderson@blueocean.com',
      contactPhone: '+44 29 2567 8901',
      employees: 78,
      riskScore: 75,
      documentsComplete: 7,
      documentsTotal: 9,
      letterCode: '5678901234',
      revenue: 23000,
      lastContact: '2024-11-19',
      lastUpdated: '2024-11-30',
      notes: 'Partnership structure, annual review scheduled',
      documentCompletionPercentage: 78,
      priority: 'low',
      tags: ['partnership', 'stable'],
      industry: 'Consulting',
      nextAction: 'Quarterly check-in',
      isStarred: false
    },
    {
      id: 5,
      clientName: 'Nova Healthcare Group',
      clientType: 'Limited Company',
      status: 'compliant',
      complianceStatus: 'Excellent',
      assignedConsultant: 'Jennifer Lee',
      reEnrolmentDate: '2025-07-25',
      declarationDue: '2025-12-25',
      stagingDate: '2023-07-25',
      contactName: 'Mark Johnson',
      contactEmail: 'mark.johnson@novahealthcare.com',
      contactPhone: '+44 121 789 0123',
      employees: 467,
      riskScore: 95,
      documentsComplete: 12,
      documentsTotal: 12,
      letterCode: '7890123456',
      revenue: 89000,
      lastContact: '2024-11-17',
      lastUpdated: '2024-12-05',
      notes: 'Exemplary client, all compliance up to date',
      documentCompletionPercentage: 100,
      priority: 'low',
      tags: ['exemplary', 'healthcare'],
      industry: 'Healthcare',
      nextAction: 'Continue monitoring',
      isStarred: true
    },
    {
      id: 6,
      clientName: 'Fresh Food Distributors',
      clientType: 'Limited Company',
      status: 'declaration_due',
      complianceStatus: 'Critical',
      assignedConsultant: 'Steven Garcia',
      reEnrolmentDate: '2025-12-05',
      declarationDue: '2025-01-10',
      stagingDate: '2023-12-05',
      contactName: 'Amy Roberts',
      contactEmail: 'amy.roberts@freshfood.com',
      contactPhone: '+44 1865 123 456',
      employees: 278,
      riskScore: 55,
      documentsComplete: 4,
      documentsTotal: 11,
      letterCode: '2468013579',
      revenue: 58000,
      lastContact: '2024-11-12',
      lastUpdated: '2024-11-20',
      notes: 'Declaration deadline approaching, missing key documents',
      documentCompletionPercentage: 36,
      priority: 'high',
      tags: ['deadline-approaching', 'food-industry'],
      industry: 'Food & Beverage',
      nextAction: 'Submit declaration immediately',
      isStarred: false
    }
  ];

  const [clients, setClients] = useState(initialClients);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchHistory, setSearchHistory] = useState([]);
  const [selectedRows, setSelectedRows] = useState(new Set());
  const [sortField, setSortField] = useState('clientName');
  const [sortDirection, setSortDirection] = useState('asc');
  const [editingClient, setEditingClient] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [savedFilters, setSavedFilters] = useState([
    { id: 1, name: 'Urgent Actions', filters: { status: 'overdue', urgent: true } },
    { id: 2, name: 'Due This Month', filters: { dueThisMonth: true } },
    { id: 3, name: 'My Clients', filters: { consultant: 'Sarah Johnson' } }
  ]);
  const [activeFilter, setActiveFilter] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(() => 
    parseInt(localStorage.getItem('tpr-items-per-page') || '25')
  );
  
  // New state for enhanced features
  const [viewMode, setViewMode] = useState('table'); // 'table' or 'cards'
  const [showColumnCustomizer, setShowColumnCustomizer] = useState(false);
  const [visibleColumns, setVisibleColumns] = useState(new Set([
    'clientName', 'status', 'assignedConsultant', 'reEnrolmentDate', 'declarationDue', 'actions'
  ]));
  const [showBulkActions, setShowBulkActions] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [industryFilter, setIndustryFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');

  // Available consultants for the AddClientModal
  const consultants = ['Sarah Johnson', 'James Wilson', 'Robert Taylor', 'Maria Rodriguez', 'Jennifer Lee', 'Steven Garcia'];
  const industries = ['Manufacturing', 'Technology', 'Clean Energy', 'Consulting', 'Healthcare', 'Food & Beverage'];
  const priorities = ['critical', 'high', 'medium', 'low'];

  // Enhanced table columns configuration
  const allColumns = [
    { id: 'clientName', label: 'Client', sortable: true, width: '300px' },
    { id: 'status', label: 'Status', sortable: true, width: '150px' },
    { id: 'assignedConsultant', label: 'Consultant', sortable: true, width: '180px' },
    { id: 'reEnrolmentDate', label: 'Re-enrolment', sortable: true, width: '150px' },
    { id: 'declarationDue', label: 'Declaration Due', sortable: true, width: '150px' },
    { id: 'priority', label: 'Priority', sortable: true, width: '120px' },
    { id: 'riskScore', label: 'Risk Score', sortable: true, width: '120px' },
    { id: 'employees', label: 'Employees', sortable: true, width: '100px' },
    { id: 'revenue', label: 'Revenue', sortable: true, width: '120px' },
    { id: 'lastContact', label: 'Last Contact', sortable: true, width: '140px' },
    { id: 'actions', label: 'Actions', sortable: false, width: '120px' }
  ];

  // Utility functions
  const formatRelativeDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = date - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
      return `${Math.abs(diffDays)} days overdue`;
    } else if (diffDays === 0) {
      return 'Due today';
    } else if (diffDays === 1) {
      return 'Due tomorrow';
    } else if (diffDays <= 7) {
      return `Due in ${diffDays} days`;
    } else if (diffDays <= 30) {
      return `Due in ${Math.ceil(diffDays / 7)} weeks`;
    } else {
      return `Due in ${Math.ceil(diffDays / 30)} months`;
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getDaysUntilDeadline = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    return Math.ceil((date - now) / (1000 * 60 * 60 * 24));
  };

  const getUrgencyIndicator = (client) => {
    const reEnrolDays = getDaysUntilDeadline(client.reEnrolmentDate);
    const declarationDays = getDaysUntilDeadline(client.declarationDue);
    const minDays = Math.min(reEnrolDays, declarationDays);

    if (minDays < 0) {
      return { color: 'bg-red-500', pulse: true, tooltip: 'Overdue!' };
    } else if (minDays <= 7) {
      return { color: 'bg-red-400', pulse: true, tooltip: 'Due within 7 days' };
    } else if (minDays <= 30) {
      return { color: 'bg-yellow-400', pulse: false, tooltip: 'Due within 30 days' };
    }
    return null;
  };

  const getRiskColor = (score) => {
    if (score >= 85) return 'bg-green-400';
    if (score >= 70) return 'bg-blue-400';
    if (score >= 55) return 'bg-yellow-400';
    return 'bg-red-400';
  };

  const getPriorityBadge = (priority) => {
    const badges = {
      critical: { color: 'bg-red-100 text-red-700 border-red-200', icon: FireIcon },
      high: { color: 'bg-orange-100 text-orange-700 border-orange-200', icon: ExclamationTriangleIcon },
      medium: { color: 'bg-yellow-100 text-yellow-700 border-yellow-200', icon: ClockIcon },
      low: { color: 'bg-green-100 text-green-700 border-green-200', icon: CheckCircleIcon }
    };
    
    const badge = badges[priority] || badges.medium;
    const Icon = badge.icon;
    
    return (
      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium border ${badge.color}`}>
        <Icon className="h-3 w-3" />
        {priority.charAt(0).toUpperCase() + priority.slice(1)}
      </span>
    );
  };

  // Enhanced notification system
  const showNotification = useCallback((type, message, duration = 4000) => {
    const notification = { id: Date.now(), type, message, timestamp: new Date() };
    setNotifications(prev => [...prev, notification].slice(-3));
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== notification.id));
    }, duration);
  }, []);

  // Auto-save preferences
  useEffect(() => {
    localStorage.setItem('tpr-items-per-page', itemsPerPage.toString());
    localStorage.setItem('tpr-visible-columns', JSON.stringify([...visibleColumns]));
    localStorage.setItem('tpr-view-mode', viewMode);
  }, [itemsPerPage, visibleColumns, viewMode]);

  // Load saved preferences
  useEffect(() => {
    const savedColumns = localStorage.getItem('tpr-visible-columns');
    const savedViewMode = localStorage.getItem('tpr-view-mode');
    
    if (savedColumns) {
      setVisibleColumns(new Set(JSON.parse(savedColumns)));
    }
    if (savedViewMode) {
      setViewMode(savedViewMode);
    }
  }, []);

  // Real-time updates simulation
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate status changes
      if (Math.random() > 0.95) {
        setClients(prev => prev.map(client => ({
          ...client,
          lastUpdated: new Date().toISOString().split('T')[0]
        })));
        showNotification('info', 'Client data updated', 2000);
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [showNotification]);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getSortIcon = (field) => {
    if (sortField !== field) return <ChevronUpDownIcon className="h-4 w-4 text-gray-400" />;
    return sortDirection === 'asc' ? <ChevronUpIcon className="h-4 w-4 text-gray-600" /> : <ChevronDownIcon className="h-4 w-4 text-gray-600" />;
  };

  // Enhanced search with history
  const handleSearch = (value) => {
    setSearchTerm(value);
    setCurrentPage(1); // Reset to first page on search
    if (value && !searchHistory.includes(value)) {
      setSearchHistory(prev => [value, ...prev.slice(0, 4)]);
    }
  };

  // Smart filtering
  const applySmartFilter = (filterType) => {
    setActiveFilter(activeFilter === filterType ? null : filterType);
    setCurrentPage(1);
  };

  // Enhanced filtering logic
  const filteredClients = useMemo(() => {
    let filtered = clients.filter((client) => {
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch = !searchTerm || [
        client.clientName,
        client.contactName,
        client.contactEmail,
        client.contactPhone,
        client.assignedConsultant,
        client.notes,
        client.clientType,
        client.letterCode,
        client.industry,
        client.nextAction,
        ...client.tags
      ].some(field => field?.toLowerCase().includes(searchLower));

      // Apply active filters
      if (activeFilter) {
        const reEnrolDays = getDaysUntilDeadline(client.reEnrolmentDate);
        const declarationDays = getDaysUntilDeadline(client.declarationDue);
        
        switch (activeFilter) {
          case 'urgent':
            return matchesSearch && (reEnrolDays < 0 || declarationDays < 0 || Math.min(reEnrolDays, declarationDays) <= 7);
          case 'due-month':
            return matchesSearch && (reEnrolDays <= 30 || declarationDays <= 30);
          case 'my-clients':
            return matchesSearch && client.assignedConsultant === 'Sarah Johnson'; // Current user
          case 'high-risk':
            return matchesSearch && client.riskScore < 60;
          case 'incomplete-docs':
            return matchesSearch && client.documentCompletionPercentage < 100;
          case 'starred':
            return matchesSearch && client.isStarred;
          default:
            return matchesSearch;
        }
      }

      // Apply advanced filters
      if (industryFilter && client.industry !== industryFilter) return false;
      if (priorityFilter && client.priority !== priorityFilter) return false;
      
      // Date range filter
      if (dateRange.start || dateRange.end) {
        const clientDate = new Date(client.lastContact);
        if (dateRange.start && clientDate < new Date(dateRange.start)) return false;
        if (dateRange.end && clientDate > new Date(dateRange.end)) return false;
      }

      return matchesSearch;
    });

    // Apply sorting
    filtered.sort((a, b) => {
      let aVal = a[sortField];
      let bVal = b[sortField];
      
      if (typeof aVal === 'string') {
        aVal = aVal.toLowerCase();
        bVal = bVal.toLowerCase();
      }
      
      if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [clients, searchTerm, activeFilter, sortField, sortDirection, industryFilter, priorityFilter, dateRange]);

  // Quick action counts - moved AFTER filteredClients
  const urgentCount = clients.filter(c => {
    const days = Math.min(getDaysUntilDeadline(c.reEnrolmentDate), getDaysUntilDeadline(c.declarationDue));
    return days < 0 || c.status === 'overdue';
  }).length;

  const dueSoonCount = clients.filter(c => {
    const days = Math.min(getDaysUntilDeadline(c.reEnrolmentDate), getDaysUntilDeadline(c.declarationDue));
    return days > 0 && days <= 30;
  }).length;

  const highRiskCount = clients.filter(c => c.riskScore < 60).length;
  const incompleteDocsCount = clients.filter(c => c.documentCompletionPercentage < 100).length;
  const starredCount = clients.filter(c => c.isStarred).length;

  // Pagination logic
  const totalPages = Math.ceil(filteredClients.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedClients = filteredClients.slice(startIndex, startIndex + itemsPerPage);

  // Keyboard shortcuts - moved after filteredClients
  useEffect(() => {
    const handleKeyboard = (e) => {
      if (e.metaKey || e.ctrlKey) {
        switch (e.key) {
          case 'k':
            e.preventDefault();
            document.querySelector('input[type="text"]')?.focus();
            break;
          case 'n':
            e.preventDefault();
            setShowAddModal(true);
            break;
          case 'f':
            e.preventDefault();
            setShowAdvancedFilters(!showAdvancedFilters);
            break;
          case 'a':
            e.preventDefault();
            if (selectedRows.size === filteredClients.length) {
              setSelectedRows(new Set());
            } else {
              setSelectedRows(new Set(filteredClients.map(c => c.id)));
            }
            break;
        }
      }
      if (e.key === 'Escape') {
        setSelectedClient(null);
        setShowColumnCustomizer(false);
        setShowAdvancedFilters(false);
      }
    };

    document.addEventListener('keydown', handleKeyboard);
    return () => document.removeEventListener('keydown', handleKeyboard);
  }, [showAdvancedFilters, filteredClients, selectedRows]);

  const getStatusBadge = (status) => {
    const badges = {
      compliant: { color: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400', label: 'Compliant' },
      reenrolment_due: { color: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400', label: 'Re-enrolment Due' },
      declaration_due: { color: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400', label: 'Declaration Due' },
      overdue: { color: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400', label: 'Overdue' },
      waiting: { color: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300', label: 'Waiting' }
    };

    const badge = badges[status] || badges.waiting;
    return (
      <span className={`inline-flex items-center px-3 py-2 rounded-md text-sm font-medium ${badge.color}`}>
        {badge.label}
      </span>
    );
  };

  const handleStarToggle = (clientId) => {
    setClients(prev => prev.map(client => 
      client.id === clientId ? { ...client, isStarred: !client.isStarred } : client
    ));
    showNotification('success', 'Client starred status updated');
  };

  const handleEditClient = (client) => {
    setEditingClient({...client});
  };

  const handleSaveClient = () => {
    setClients(clients.map(c => c.id === editingClient.id ? {
      ...editingClient,
      lastUpdated: new Date().toISOString().split('T')[0]
    } : c));
    setEditingClient(null);
    showNotification('success', `${editingClient.clientName} updated successfully`);
  };

  const handleSaveNewClient = (newClient) => {
    const clientWithMeta = {
      ...newClient,
      lastUpdated: new Date().toISOString().split('T')[0],
      documentCompletionPercentage: Math.floor(Math.random() * 50) + 50 // Random completion
    };
    setClients([...clients, clientWithMeta]);
    showNotification('success', `${newClient.clientName} added successfully`);
  };

  const handleDeleteClient = (client) => {
    if (window.confirm(`Delete "${client.clientName}"?`)) {
      setClients(clients.filter(c => c.id !== client.id));
      showNotification('success', `${client.clientName} deleted`);
    }
  };

  const handleBulkExport = () => {
    const data = selectedRows.size > 0 
      ? clients.filter(c => selectedRows.has(c.id))
      : filteredClients;
    
    console.log('Exporting:', data);
    showNotification('success', `Exported ${data.length} clients`);
  };

  const handleBulkAction = (action) => {
    const selectedClients = clients.filter(c => selectedRows.has(c.id));
    
    switch (action) {
      case 'delete':
        if (window.confirm(`Delete ${selectedClients.length} selected clients?`)) {
          setClients(prev => prev.filter(c => !selectedRows.has(c.id)));
          setSelectedRows(new Set());
          showNotification('success', `${selectedClients.length} clients deleted`);
        }
        break;
      case 'archive':
        showNotification('info', `${selectedClients.length} clients archived`);
        setSelectedRows(new Set());
        break;
      case 'assign':
        showNotification('info', 'Bulk assignment feature coming soon');
        break;
      case 'star':
        setClients(prev => prev.map(client => 
          selectedRows.has(client.id) ? { ...client, isStarred: true } : client
        ));
        setSelectedRows(new Set());
        showNotification('success', `${selectedClients.length} clients starred`);
        break;
    }
    setShowBulkActions(false);
  };

  const handleEmailContact = (email) => {
    window.location.href = `mailto:${email}`;
    showNotification('info', 'Opening email client...');
  };

  const handleCopyPhone = (phone) => {
    navigator.clipboard.writeText(phone);
    showNotification('success', 'Phone number copied to clipboard');
  };

  // Card view component
  const ClientCard = ({ client }) => {
    const urgencyIndicator = getUrgencyIndicator(client);
    const isSelected = selectedRows.has(client.id);
    
    return (
      <div 
        className={`bg-white dark:bg-gray-800 rounded-xl border-2 transition-all duration-200 hover:shadow-lg cursor-pointer ${
          isSelected ? 'border-[#401D6C] shadow-lg' : 'border-gray-200 dark:border-gray-700'
        } ${client.status === 'overdue' ? 'border-l-4 border-l-red-500' : ''}`}
        onClick={() => setSelectedClient(client)}
      >
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={isSelected}
                onChange={(e) => {
                  e.stopPropagation();
                  const newSelected = new Set(selectedRows);
                  if (newSelected.has(client.id)) {
                    newSelected.delete(client.id);
                  } else {
                    newSelected.add(client.id);
                  }
                  setSelectedRows(newSelected);
                }}
                className="rounded border-gray-300 text-[#401D6C] focus:ring-[#401D6C]"
              />
              <div>
                <h3 className="font-semibold text-lg text-gray-900 dark:text-white">{client.clientName}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{client.clientType} • {client.industry}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              {urgencyIndicator && (
                <div 
                  className={`w-3 h-3 rounded-full ${urgencyIndicator.color} ${urgencyIndicator.pulse ? 'animate-pulse' : ''}`}
                  title={urgencyIndicator.tooltip}
                />
              )}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleStarToggle(client.id);
                }}
                className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
              >
                {client.isStarred ? (
                  <StarSolid className="h-5 w-5 text-yellow-400" />
                ) : (
                  <StarIcon className="h-5 w-5 text-gray-400" />
                )}
              </button>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">Status</span>
              {getStatusBadge(client.status)}
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">Priority</span>
              {getPriorityBadge(client.priority)}
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">Risk Score</span>
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${getRiskColor(client.riskScore)}`} />
                <span className="text-sm font-medium">{client.riskScore}/100</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">Next Action</span>
              <span className="text-sm text-gray-900 dark:text-white max-w-32 truncate" title={client.nextAction}>
                {client.nextAction}
              </span>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Assigned to {client.assignedConsultant}</span>
              <span className="text-gray-500 dark:text-gray-500">{client.employees} employees</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <div className="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                Client Management
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                Manage and track all your clients in one place
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              {selectedRows.size > 0 && (
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {selectedRows.size} selected
                  </span>
                  <div className="relative">
                    <button
                      onClick={() => setShowBulkActions(!showBulkActions)}
                      className="flex items-center space-x-2 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm"
                    >
                      <EllipsisVerticalIcon className="h-4 w-4" />
                      <span>Actions</span>
                    </button>
                    
                    {showBulkActions && (
                      <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-700 rounded-lg shadow-lg border border-gray-200 dark:border-gray-600 z-50">
                        <div className="py-1">
                          <button
                            onClick={() => handleBulkAction('star')}
                            className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 flex items-center gap-2"
                          >
                            <StarIcon className="h-4 w-4" />
                            Add to Starred
                          </button>
                          <button
                            onClick={() => handleBulkAction('assign')}
                            className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 flex items-center gap-2"
                          >
                            <UserGroupIcon className="h-4 w-4" />
                            Assign Consultant
                          </button>
                          <button
                            onClick={() => handleBulkExport()}
                            className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 flex items-center gap-2"
                          >
                            <DocumentArrowDownIcon className="h-4 w-4" />
                            Export
                          </button>
                          <hr className="my-1 border-gray-200 dark:border-gray-600" />
                          <button
                            onClick={() => handleBulkAction('archive')}
                            className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 flex items-center gap-2"
                          >
                            <ArchiveBoxIcon className="h-4 w-4" />
                            Archive
                          </button>
                          <button
                            onClick={() => handleBulkAction('delete')}
                            className="w-full px-4 py-2 text-left text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-2"
                          >
                            <TrashIcon className="h-4 w-4" />
                            Delete
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
              
              <button
                onClick={() => setIsLoading(!isLoading)}
                className="flex items-center space-x-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm"
              >
                <ArrowPathIcon className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
                <span>Refresh</span>
              </button>
              
              <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg">
                <button
                  onClick={() => setViewMode('table')}
                  className={`p-2 ${viewMode === 'table' ? 'bg-gray-100 dark:bg-gray-700' : ''} rounded-l-lg transition-colors`}
                  title="Table View"
                >
                  <TableCellsIcon className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode('cards')}
                  className={`p-2 ${viewMode === 'cards' ? 'bg-gray-100 dark:bg-gray-700' : ''} rounded-r-lg transition-colors`}
                  title="Card View"
                >
                  <Squares2X2Icon className="h-4 w-4" />
                </button>
              </div>
              
              <button
                onClick={() => {
                  showNotification('info', 'Add Client feature will be available when the backend is ready');
                }}
                className="flex items-center space-x-2 bg-gradient-to-r from-[#401D6C] to-[#EC385D] text-white px-6 py-2 rounded-xl hover:shadow-lg transition-all duration-200 font-medium"
              >
                <PlusIcon className="h-4 w-4" />
                <span>Add Client</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Notifications */}
        <div className="fixed top-4 right-4 z-50 space-y-2">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg backdrop-blur-sm transition-all duration-300 transform ${
                notification.type === 'success' 
                  ? 'bg-green-50 border border-green-200 text-green-800 dark:bg-green-900/20 dark:border-green-800 dark:text-green-200'
                  : notification.type === 'error'
                  ? 'bg-red-50 border border-red-200 text-red-800 dark:bg-red-900/20 dark:border-red-800 dark:text-red-200'
                  : 'bg-blue-50 border border-blue-200 text-blue-800 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-200'
              } animate-in slide-in-from-right-5`}
            >
              <CheckCircleSolid className="h-5 w-5 flex-shrink-0" />
              <span className="text-sm font-medium">{notification.message}</span>
              <button
                onClick={() => setNotifications(prev => prev.filter(n => n.id !== notification.id))}
                className="text-gray-400 hover:text-gray-600 ml-2"
              >
                <XMarkIcon className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>

        {/* Enhanced Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg mr-4">
                <UserGroupIcon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="flex-1">
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{clients.length}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Clients</p>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1 mt-2">
                  <div className="bg-blue-500 h-1 rounded-full" style={{width: '100%'}}></div>
                </div>
              </div>
            </div>
          </div>

          <div 
            className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => applySmartFilter('urgent')}
          >
            <div className="flex items-center">
              <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-lg mr-4">
                <ExclamationTriangleIcon className="h-6 w-6 text-red-600 dark:text-red-400" />
              </div>
              <div className="flex-1">
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {urgentCount}
                  {urgentCount > 0 && <span className="ml-2 w-2 h-2 bg-red-400 rounded-full animate-pulse inline-block"></span>}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Urgent Actions</p>
              </div>
            </div>
          </div>

          <div 
            className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => applySmartFilter('due-month')}
          >
            <div className="flex items-center">
              <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-lg mr-4">
                <CalendarIcon className="h-6 w-6 text-orange-600 dark:text-orange-400" />
              </div>
              <div className="flex-1">
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{dueSoonCount}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Due This Month</p>
              </div>
            </div>
          </div>

          <div 
            className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => applySmartFilter('starred')}
          >
            <div className="flex items-center">
              <div className="p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg mr-4">
                <StarIcon className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
              </div>
              <div className="flex-1">
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{starredCount}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Starred</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg mr-4">
                <CheckCircleIcon className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <div className="flex-1">
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {clients.filter(c => c.status === 'compliant').length}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Compliant</p>
                <div className="text-xs text-green-600 dark:text-green-400 mt-1">
                  {Math.round((clients.filter(c => c.status === 'compliant').length / clients.length) * 100)}% compliance rate
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Search and Controls */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4 flex-1">
              <div className="relative flex-1 max-w-md">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search clients, contacts, notes... (Ctrl+K)"
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#401D6C] focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <XMarkIcon className="h-4 w-4" />
                  </button>
                )}
                
                {/* Search suggestions */}
                {searchHistory.length > 0 && !searchTerm && (
                  <div className="absolute top-full left-0 right-0 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg mt-1 shadow-lg z-10">
                    <div className="p-2 text-xs text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-600">Recent searches</div>
                    {searchHistory.map((term, index) => (
                      <button
                        key={index}
                        onClick={() => setSearchTerm(term)}
                        className="w-full text-left px-3 py-2 hover:bg-gray-50 dark:hover:bg-gray-600 text-sm"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Status Filter Dropdown */}
              <div className="relative">
                <select
                  value={activeFilter || ''}
                  onChange={(e) => applySmartFilter(e.target.value || null)}
                  className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#401D6C] focus:border-transparent dark:bg-gray-700 dark:text-white appearance-none pr-10 min-w-[140px]"
                >
                  <option value="">All Clients</option>
                  <option value="urgent">Urgent ({urgentCount})</option>
                  <option value="due-month">Due This Month ({dueSoonCount})</option>
                  <option value="my-clients">My Clients</option>
                  <option value="high-risk">High Risk ({highRiskCount})</option>
                  <option value="incomplete-docs">Incomplete Docs ({incompleteDocsCount})</option>
                  <option value="starred">Starred ({starredCount})</option>
                </select>
                <FunnelIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
              </div>
            </div>
            
            <div className="flex items-center space-x-3 ml-4">
              <button
                onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors text-sm ${
                  showAdvancedFilters || industryFilter || priorityFilter || dateRange.start || dateRange.end
                    ? 'bg-[#401D6C] text-white'
                    : 'border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                <AdjustmentsHorizontalIcon className="h-4 w-4" />
                <span>Advanced</span>
              </button>
              
              {viewMode === 'table' && (
                <button
                  onClick={() => setShowColumnCustomizer(!showColumnCustomizer)}
                  className="flex items-center space-x-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm"
                >
                  <ViewColumnsIcon className="h-4 w-4" />
                  <span>Columns</span>
                </button>
              )}
              
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {filteredClients.length} client{filteredClients.length !== 1 ? 's' : ''}
                {activeFilter && ' (filtered)'}
              </span>
              
              <button 
                onClick={handleBulkExport}
                className="flex items-center space-x-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm"
              >
                <ArrowDownTrayIcon className="h-4 w-4" />
                <span>Export</span>
              </button>
            </div>
          </div>

          {/* Advanced Filters */}
          {showAdvancedFilters && (
            <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Industry
                  </label>
                  <select
                    value={industryFilter}
                    onChange={(e) => setIndustryFilter(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#401D6C] focus:border-transparent dark:bg-gray-700 dark:text-white"
                  >
                    <option value="">All Industries</option>
                    {industries.map(industry => (
                      <option key={industry} value={industry}>{industry}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Priority
                  </label>
                  <select
                    value={priorityFilter}
                    onChange={(e) => setPriorityFilter(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#401D6C] focus:border-transparent dark:bg-gray-700 dark:text-white"
                  >
                    <option value="">All Priorities</option>
                    {priorities.map(priority => (
                      <option key={priority} value={priority}>
                        {priority.charAt(0).toUpperCase() + priority.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Last Contact From
                  </label>
                  <input
                    type="date"
                    value={dateRange.start}
                    onChange={(e) => setDateRange(prev => ({...prev, start: e.target.value}))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#401D6C] focus:border-transparent dark:bg-gray-700 dark:text-white"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Last Contact To
                  </label>
                  <input
                    type="date"
                    value={dateRange.end}
                    onChange={(e) => setDateRange(prev => ({...prev, end: e.target.value}))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#401D6C] focus:border-transparent dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>
              
              <div className="mt-4 flex items-center justify-between">
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Keyboard shortcuts: Ctrl+K (search), Ctrl+F (filters), Ctrl+A (select all)
                </div>
                <button
                  onClick={() => {
                    setIndustryFilter('');
                    setPriorityFilter('');
                    setDateRange({start: '', end: ''});
                    setShowAdvancedFilters(false);
                  }}
                  className="text-sm text-[#401D6C] dark:text-[#EC385D] hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            </div>
          )}

          {/* Active filters indicator */}
          {(activeFilter || industryFilter || priorityFilter || dateRange.start || dateRange.end) && (
            <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg mt-4">
              <div className="flex items-center space-x-2 flex-wrap gap-2">
                <FunnelIcon className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                <span className="text-sm font-medium text-blue-700 dark:text-blue-400">Active filters:</span>
                {activeFilter && (
                  <span className="px-2 py-1 bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-300 rounded text-xs">
                    {activeFilter.replace('-', ' ')}
                  </span>
                )}
                {industryFilter && (
                  <span className="px-2 py-1 bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-300 rounded text-xs">
                    {industryFilter}
                  </span>
                )}
                {priorityFilter && (
                  <span className="px-2 py-1 bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-300 rounded text-xs">
                    {priorityFilter} priority
                  </span>
                )}
                {(dateRange.start || dateRange.end) && (
                  <span className="px-2 py-1 bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-300 rounded text-xs">
                    Date range
                  </span>
                )}
              </div>
              <button
                onClick={() => {
                  setActiveFilter(null);
                  setIndustryFilter('');
                  setPriorityFilter('');
                  setDateRange({start: '', end: ''});
                }}
                className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200"
              >
                <XMarkIcon className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>

        {/* Column Customizer */}
        {showColumnCustomizer && viewMode === 'table' && (
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Customize Columns</h3>
              <button
                onClick={() => setShowColumnCustomizer(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {allColumns.map(column => (
                <label key={column.id} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={visibleColumns.has(column.id)}
                    onChange={(e) => {
                      const newVisible = new Set(visibleColumns);
                      if (e.target.checked) {
                        newVisible.add(column.id);
                      } else {
                        newVisible.delete(column.id);
                      }
                      setVisibleColumns(newVisible);
                    }}
                    className="rounded border-gray-300 text-[#401D6C] focus:ring-[#401D6C]"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">{column.label}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Main Content - Table or Cards */}
        {viewMode === 'table' ? (
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-4 text-left w-16">
                      <input
                        type="checkbox"
                        checked={selectedRows.size === paginatedClients.length && paginatedClients.length > 0}
                        onChange={() => {
                          if (selectedRows.size === paginatedClients.length) {
                            setSelectedRows(new Set());
                          } else {
                            setSelectedRows(new Set(paginatedClients.map(c => c.id)));
                          }
                        }}
                        className="rounded border-gray-300 text-[#401D6C] focus:ring-[#401D6C]"
                      />
                    </th>
                    
                    {allColumns.filter(col => visibleColumns.has(col.id)).map(column => (
                      <th 
                        key={column.id}
                        className={`px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider ${
                          column.sortable ? 'cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors' : ''
                        }`}
                        onClick={() => column.sortable && handleSort(column.id)}
                        style={{ width: column.width }}
                      >
                        <div className="flex items-center gap-2">
                          {column.label}
                          {column.sortable && getSortIcon(column.id)}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {paginatedClients.map((client) => {
                    const urgencyIndicator = getUrgencyIndicator(client);
                    const isSelected = selectedRows.has(client.id);
                    
                    return (
                      <tr 
                        key={client.id} 
                        className={`group hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors ${
                          isSelected ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                        } ${client.status === 'overdue' ? 'border-l-4 border-red-400' : ''}`}
                      >
                        <td className="px-6 py-4">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => {
                              const newSelected = new Set(selectedRows);
                              if (newSelected.has(client.id)) {
                                newSelected.delete(client.id);
                              } else {
                                newSelected.add(client.id);
                              }
                              setSelectedRows(newSelected);
                            }}
                            className="rounded border-gray-300 text-[#401D6C] focus:ring-[#401D6C]"
                          />
                        </td>
                        
                        {/* Client Name Column */}
                        {visibleColumns.has('clientName') && (
                          <td className="px-6 py-4">
                            <div className="flex items-center group relative">
                              <div className="flex-1">
                                <div className="flex items-center">
                                  <button
                                    onClick={() => handleStarToggle(client.id)}
                                    className="mr-2 p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                                  >
                                    {client.isStarred ? (
                                      <StarSolid className="h-4 w-4 text-yellow-400" />
                                    ) : (
                                      <StarIcon className="h-4 w-4 text-gray-400" />
                                    )}
                                  </button>
                                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                                    {client.clientName}
                                  </div>
                                  {urgencyIndicator && (
                                    <div 
                                      className={`ml-2 w-2 h-2 rounded-full ${urgencyIndicator.color} ${urgencyIndicator.pulse ? 'animate-pulse' : ''}`}
                                      title={urgencyIndicator.tooltip}
                                    />
                                  )}
                                  <div className={`ml-2 w-2 h-2 rounded-full ${getRiskColor(client.riskScore)}`} title={`Risk Score: ${client.riskScore}`} />
                                </div>
                                <div className="text-sm text-gray-500 dark:text-gray-400">
                                  {client.clientType} • {client.employees} employees
                                </div>
                                <div className="flex items-center mt-1">
                                  <div className="w-16 bg-gray-200 dark:bg-gray-700 rounded-full h-1">
                                    <div 
                                      className="bg-blue-500 h-1 rounded-full transition-all duration-300" 
                                      style={{width: `${client.documentCompletionPercentage}%`}}
                                    />
                                  </div>
                                  <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">
                                    {client.documentCompletionPercentage}% docs
                                  </span>
                                </div>
                                
                                {/* Tags */}
                                <div className="flex flex-wrap gap-1 mt-2">
                                  {client.tags.slice(0, 2).map(tag => (
                                    <span key={tag} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                                      {tag}
                                    </span>
                                  ))}
                                  {client.tags.length > 2 && (
                                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                                      +{client.tags.length - 2}
                                    </span>
                                  )}
                                </div>
                              </div>
                              
                              {/* Enhanced hover tooltip */}
                              <div className="hidden group-hover:block absolute z-10 bg-gray-900 text-white text-xs rounded-lg p-4 shadow-lg -mt-16 ml-64 min-w-72">
                                <div className="font-medium text-yellow-200">{client.clientName}</div>
                                <div className="text-gray-300 mt-2 space-y-1">
                                  <div><strong>Contact:</strong> {client.contactName}</div>
                                  <div><strong>Email:</strong> {client.contactEmail}</div>
                                  <div><strong>Phone:</strong> {client.contactPhone}</div>
                                  <div><strong>Industry:</strong> {client.industry}</div>
                                  <div><strong>Revenue:</strong> {formatCurrency(client.revenue)}</div>
                                  <div><strong>Next Action:</strong> {client.nextAction}</div>
                                  <div><strong>Last updated:</strong> {client.lastUpdated}</div>
                                </div>
                                <div className="absolute -bottom-1 left-4 w-2 h-2 bg-gray-900 rotate-45"></div>
                              </div>
                            </div>
                          </td>
                        )}
                        
                        {/* Status Column */}
                        {visibleColumns.has('status') && (
                          <td className="px-6 py-4">
                            {getStatusBadge(client.status)}
                          </td>
                        )}
                        
                        {/* Consultant Column */}
                        {visibleColumns.has('assignedConsultant') && (
                          <td className="px-6 py-4">
                            <div className="flex items-center">
                              <div className="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mr-3">
                                <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
                                  {client.assignedConsultant.split(' ').map(n => n[0]).join('')}
                                </span>
                              </div>
                              <span className="text-sm text-gray-900 dark:text-white">{client.assignedConsultant}</span>
                            </div>
                          </td>
                        )}
                        
                        {/* Re-enrolment Date Column */}
                        {visibleColumns.has('reEnrolmentDate') && (
                          <td className="px-6 py-4">
                            <div className="text-sm">
                              <div className={`font-medium ${
                                client.status === 'reenrolment_due' 
                                  ? 'text-orange-600 dark:text-orange-400' 
                                  : 'text-gray-900 dark:text-white'
                              }`}>
                                {formatRelativeDate(client.reEnrolmentDate)}
                              </div>
                              <div className="text-xs text-gray-500 dark:text-gray-400">
                                {client.reEnrolmentDate}
                              </div>
                            </div>
                          </td>
                        )}

                        {/* Declaration Due Column */}
                        {visibleColumns.has('declarationDue') && (
                          <td className="px-6 py-4">
                            <div className="text-sm">
                              <div className={`font-medium ${
                                client.status === 'declaration_due' || getDaysUntilDeadline(client.declarationDue) < 0
                                  ? 'text-red-600 dark:text-red-400' 
                                  : getDaysUntilDeadline(client.declarationDue) <= 30
                                  ? 'text-yellow-600 dark:text-yellow-400'
                                  : 'text-gray-900 dark:text-white'
                              }`}>
                                {formatRelativeDate(client.declarationDue)}
                              </div>
                              <div className="text-xs text-gray-500 dark:text-gray-400">
                                {client.declarationDue}
                              </div>
                            </div>
                          </td>
                        )}
                        
                        {/* Priority Column */}
                        {visibleColumns.has('priority') && (
                          <td className="px-6 py-4">
                            {getPriorityBadge(client.priority)}
                          </td>
                        )}
                        
                        {/* Risk Score Column */}
                        {visibleColumns.has('riskScore') && (
                          <td className="px-6 py-4">
                            <div className="flex items-center">
                              <div className={`w-3 h-3 rounded-full ${getRiskColor(client.riskScore)} mr-2`} />
                              <span className="text-sm font-medium text-gray-900 dark:text-white">{client.riskScore}</span>
                            </div>
                          </td>
                        )}
                        
                        {/* Employees Column */}
                        {visibleColumns.has('employees') && (
                          <td className="px-6 py-4">
                            <span className="text-sm text-gray-900 dark:text-white">{client.employees}</span>
                          </td>
                        )}
                        
                        {/* Revenue Column */}
                        {visibleColumns.has('revenue') && (
                          <td className="px-6 py-4">
                            <span className="text-sm font-medium text-gray-900 dark:text-white">{formatCurrency(client.revenue)}</span>
                          </td>
                        )}
                        
                        {/* Last Contact Column */}
                        {visibleColumns.has('lastContact') && (
                          <td className="px-6 py-4">
                            <span className="text-sm text-gray-900 dark:text-white">{client.lastContact}</span>
                          </td>
                        )}
                        
                        {/* Actions Column */}
                        {visibleColumns.has('actions') && (
                          <td className="px-6 py-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => handleEmailContact(client.contactEmail)}
                                className="p-2 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                title="Email Contact"
                              >
                                <EnvelopeIcon className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => handleCopyPhone(client.contactPhone)}
                                className="p-2 text-gray-400 hover:text-green-600 dark:hover:text-green-400 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                title="Copy Phone"
                              >
                                <PhoneIcon className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => handleEditClient(client)}
                                className="p-2 text-gray-400 hover:text-[#401D6C] dark:hover:text-[#EC385D] rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                title="Edit Client"
                              >
                                <PencilIcon className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteClient(client)}
                                className="p-2 text-gray-400 hover:text-red-600 dark:hover:text-red-400 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                title="Delete Client"
                              >
                                <TrashIcon className="h-4 w-4" />
                              </button>
                            </div>
                          </td>
                        )}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            
            {paginatedClients.length === 0 && (
              <div className="text-center py-16">
                <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <UserGroupIcon className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No clients found</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  {searchTerm || activeFilter ? 'Try adjusting your search terms or filters' : 'Get started by adding your first client'}
                </p>
                {!searchTerm && !activeFilter && (
                  <button
                    onClick={() => {
                      showNotification('info', 'Add Client feature will be available when the backend is ready');
                    }}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#401D6C] to-[#EC385D] text-white rounded-lg hover:shadow-lg transition-all duration-200 font-medium"
                  >
                    <PlusIcon className="h-4 w-4" />
                    Add Your First Client
                  </button>
                )}
                {(searchTerm || activeFilter) && (
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      setActiveFilter(null);
                    }}
                    className="text-sm text-[#401D6C] dark:text-[#EC385D] hover:underline"
                  >
                    Clear filters
                  </button>
                )}
              </div>
            )}
          </div>
        ) : (
          /* Cards View */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {paginatedClients.map((client) => (
              <ClientCard key={client.id} client={client} />
            ))}
            
            {paginatedClients.length === 0 && (
              <div className="col-span-full text-center py-16">
                <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <UserGroupIcon className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No clients found</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  {searchTerm || activeFilter ? 'Try adjusting your search terms or filters' : 'Get started by adding your first client'}
                </p>
                {!searchTerm && !activeFilter && (
                  <button
                    onClick={() => {
                      showNotification('info', 'Add Client feature will be available when the backend is ready');
                    }}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#401D6C] to-[#EC385D] text-white rounded-lg hover:shadow-lg transition-all duration-200 font-medium"
                  >
                    <PlusIcon className="h-4 w-4" />
                    Add Your First Client
                  </button>
                )}
              </div>
            )}
          </div>
        )}

        {/* Enhanced Pagination */}
        {filteredClients.length > itemsPerPage && (
          <div className="mt-6 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredClients.length)} of {filteredClients.length} clients
              </span>
              {selectedRows.size > 0 && (
                <span className="text-[#401D6C] dark:text-[#EC385D] font-medium text-sm">
                  {selectedRows.size} selected
                </span>
              )}
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">Show:</span>
                <select
                  value={itemsPerPage}
                  onChange={(e) => {
                    setItemsPerPage(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                  className="px-2 py-1 border border-gray-300 dark:border-gray-600 rounded text-sm dark:bg-gray-700 dark:text-white"
                >
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                </select>
              </div>
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="p-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeftIcon className="h-4 w-4" />
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
                        className={`px-3 py-1 text-sm rounded-lg transition-colors ${
                          currentPage === pageNum
                            ? 'bg-[#401D6C] text-white'
                            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>
                
                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="p-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronRightIcon className="h-4 w-4" />
                </button>
              </div>
              
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Page {currentPage} of {totalPages}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Client Detail Sidebar */}
      {selectedClient && (
        <div className="fixed inset-y-0 right-0 w-96 bg-white dark:bg-gray-800 shadow-xl border-l border-gray-200 dark:border-gray-700 z-50 overflow-y-auto">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Client Details</h2>
              <button
                onClick={() => setSelectedClient(null)}
                className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>
            
            <div className="space-y-6">
              {/* Client Header */}
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{selectedClient.clientName}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{selectedClient.clientType} • {selectedClient.industry}</p>
                </div>
                <button
                  onClick={() => handleStarToggle(selectedClient.id)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                >
                  {selectedClient.isStarred ? (
                    <StarSolid className="h-6 w-6 text-yellow-400" />
                  ) : (
                    <StarIcon className="h-6 w-6 text-gray-400" />
                  )}
                </button>
              </div>
              
              {/* Status and Priority */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Status</label>
                  {getStatusBadge(selectedClient.status)}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Priority</label>
                  {getPriorityBadge(selectedClient.priority)}
                </div>
              </div>
              
              {/* Contact Information */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Contact Information</h4>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs text-gray-500 dark:text-gray-400">Contact Person</label>
                    <p className="text-sm text-gray-900 dark:text-white">{selectedClient.contactName}</p>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 dark:text-gray-400">Email</label>
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-900 dark:text-white">{selectedClient.contactEmail}</p>
                      <button
                        onClick={() => handleEmailContact(selectedClient.contactEmail)}
                        className="p-1 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                      >
                        <EnvelopeIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 dark:text-gray-400">Phone</label>
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-900 dark:text-white">{selectedClient.contactPhone}</p>
                      <button
                        onClick={() => handleCopyPhone(selectedClient.contactPhone)}
                        className="p-1 text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300"
                      >
                        <PhoneIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Business Details */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Business Details</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <label className="block text-xs text-gray-500 dark:text-gray-400">Employees</label>
                    <p className="text-gray-900 dark:text-white">{selectedClient.employees}</p>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 dark:text-gray-400">Revenue</label>
                    <p className="text-gray-900 dark:text-white">{formatCurrency(selectedClient.revenue)}</p>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 dark:text-gray-400">Risk Score</label>
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${getRiskColor(selectedClient.riskScore)}`} />
                      <span className="text-gray-900 dark:text-white">{selectedClient.riskScore}/100</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 dark:text-gray-400">Documents</label>
                    <p className="text-gray-900 dark:text-white">{selectedClient.documentsComplete}/{selectedClient.documentsTotal}</p>
                  </div>
                </div>
              </div>
              
              {/* Important Dates */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Important Dates</h4>
                <div className="space-y-3 text-sm">
                  <div>
                    <label className="block text-xs text-gray-500 dark:text-gray-400">Staging Date</label>
                    <p className="text-gray-900 dark:text-white">{selectedClient.stagingDate}</p>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 dark:text-gray-400">Re-enrolment Due</label>
                    <p className="text-gray-900 dark:text-white">{formatRelativeDate(selectedClient.reEnrolmentDate)}</p>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 dark:text-gray-400">Declaration Due</label>
                    <p className="text-gray-900 dark:text-white">{formatRelativeDate(selectedClient.declarationDue)}</p>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 dark:text-gray-400">Last Contact</label>
                    <p className="text-gray-900 dark:text-white">{selectedClient.lastContact}</p>
                  </div>
                </div>
              </div>
              
              {/* Next Action */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Next Action</h4>
                <p className="text-sm text-gray-900 dark:text-white bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-lg">
                  {selectedClient.nextAction}
                </p>
              </div>
              
              {/* Tags */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Tags</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedClient.tags.map(tag => (
                    <span key={tag} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Notes */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Notes</h4>
                <p className="text-sm text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                  {selectedClient.notes}
                </p>
              </div>
              
              {/* Actions */}
              <div className="flex gap-2 pt-4 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={() => handleEditClient(selectedClient)}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-[#401D6C] text-white rounded-lg hover:bg-[#351759] transition-colors"
                >
                  <PencilIcon className="h-4 w-4" />
                  Edit
                </button>
                <button
                  onClick={() => handleEmailContact(selectedClient.contactEmail)}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <EnvelopeIcon className="h-4 w-4" />
                  Email
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Edit Modal */}
      {editingClient && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4 rounded-t-xl">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Edit Client</h2>
                <button
                  onClick={() => setEditingClient(null)}
                  className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <XMarkIcon className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">Basic Information</h3>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Client Name
                    </label>
                    <input
                      type="text"
                      value={editingClient.clientName}
                      onChange={(e) => setEditingClient({...editingClient, clientName: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#401D6C] focus:border-transparent dark:bg-gray-700 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Client Type
                    </label>
                    <select
                      value={editingClient.clientType}
                      onChange={(e) => setEditingClient({...editingClient, clientType: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#401D6C] focus:border-transparent dark:bg-gray-700 dark:text-white"
                    >
                      <option value="Limited Company">Limited Company</option>
                      <option value="Partnership">Partnership</option>
                      <option value="Sole Trader">Sole Trader</option>
                      <option value="Charity">Charity</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Industry
                    </label>
                    <select
                      value={editingClient.industry}
                      onChange={(e) => setEditingClient({...editingClient, industry: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#401D6C] focus:border-transparent dark:bg-gray-700 dark:text-white"
                    >
                      {industries.map(industry => (
                        <option key={industry} value={industry}>{industry}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Priority
                    </label>
                    <select
                      value={editingClient.priority}
                      onChange={(e) => setEditingClient({...editingClient, priority: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#401D6C] focus:border-transparent dark:bg-gray-700 dark:text-white"
                    >
                      {priorities.map(priority => (
                        <option key={priority} value={priority}>
                          {priority.charAt(0).toUpperCase() + priority.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Assigned Consultant
                    </label>
                    <select
                      value={editingClient.assignedConsultant}
                      onChange={(e) => setEditingClient({...editingClient, assignedConsultant: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#401D6C] focus:border-transparent dark:bg-gray-700 dark:text-white"
                    >
                      {consultants.map(consultant => (
                        <option key={consultant} value={consultant}>{consultant}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Employees
                    </label>
                    <input
                      type="number"
                      value={editingClient.employees}
                      onChange={(e) => setEditingClient({...editingClient, employees: parseInt(e.target.value)})}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#401D6C] focus:border-transparent dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">Contact Information</h3>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Contact Name
                    </label>
                    <input
                      type="text"
                      value={editingClient.contactName}
                      onChange={(e) => setEditingClient({...editingClient, contactName: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#401D6C] focus:border-transparent dark:bg-gray-700 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={editingClient.contactEmail}
                      onChange={(e) => setEditingClient({...editingClient, contactEmail: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#401D6C] focus:border-transparent dark:bg-gray-700 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={editingClient.contactPhone}
                      onChange={(e) => setEditingClient({...editingClient, contactPhone: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#401D6C] focus:border-transparent dark:bg-gray-700 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Revenue
                    </label>
                    <input
                      type="number"
                      value={editingClient.revenue}
                      onChange={(e) => setEditingClient({...editingClient, revenue: parseInt(e.target.value)})}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#401D6C] focus:border-transparent dark:bg-gray-700 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Next Action
                    </label>
                    <input
                      type="text"
                      value={editingClient.nextAction}
                      onChange={(e) => setEditingClient({...editingClient, nextAction: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#401D6C] focus:border-transparent dark:bg-gray-700 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Notes
                    </label>
                    <textarea
                      value={editingClient.notes}
                      onChange={(e) => setEditingClient({...editingClient, notes: e.target.value})}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#401D6C] focus:border-transparent dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Compliance & Dates</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Staging Date
                    </label>
                    <input
                      type="date"
                      value={editingClient.stagingDate}
                      onChange={(e) => setEditingClient({...editingClient, stagingDate: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#401D6C] focus:border-transparent dark:bg-gray-700 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Re-enrolment Date
                    </label>
                    <input
                      type="date"
                      value={editingClient.reEnrolmentDate}
                      onChange={(e) => setEditingClient({...editingClient, reEnrolmentDate: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#401D6C] focus:border-transparent dark:bg-gray-700 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Declaration Due
                    </label>
                    <input
                      type="date"
                      value={editingClient.declarationDue}
                      onChange={(e) => setEditingClient({...editingClient, declarationDue: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#401D6C] focus:border-transparent dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="sticky bottom-0 bg-gray-50 dark:bg-gray-700 px-6 py-4 border-t border-gray-200 dark:border-gray-600 rounded-b-xl">
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setEditingClient(null)}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveClient}
                  className="px-6 py-2 bg-gradient-to-r from-[#401D6C] to-[#EC385D] text-white rounded-lg hover:shadow-lg transition-all duration-200 font-medium"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Overview;