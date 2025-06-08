import React, { useState } from 'react';
import AddClientModal from '../Components/AddClientModal';
import {
  MagnifyingGlassIcon,
  PlusIcon,
  FunnelIcon,
  ArrowDownTrayIcon,
  UserGroupIcon,
  CalendarIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ClockIcon,
} from '@heroicons/react/24/outline';

const Overview = () => {
  const initialRows = [
    {
      id: 1,
      clientNumber: '001',
      clientCode: 'ACME123',
      clientName: 'Acme Ltd',
      clientType: 'Limited Company',
      letterCode: '1234567890',
      tprPortal: 'Onboarded',
      stagingDate: '2023-01-01',
      reEnrolmentDate: '2025-01-01',
      reminderDate: '2024-12-01',
      reEnrolmentPeriod: '01/01/2025 - 01/06/2025',
      assignedTeamMember: 'John Doe',
      clientContactName: 'Sarah Smith',
      clientEmail: 'sarah@acme.com',
    },
    {
      id: 2,
      clientNumber: '002',
      clientCode: 'SUN456',
      clientName: 'Sunshine Trust',
      clientType: 'Charity',
      letterCode: '9876543210',
      tprPortal: 'Waiting',
      stagingDate: '2023-03-15',
      reEnrolmentDate: '2025-03-15',
      reminderDate: '2024-09-15',
      reEnrolmentPeriod: '15/03/2025 - 15/08/2025',
      assignedTeamMember: 'Jane Smith',
      clientContactName: 'Peter Johnson',
      clientEmail: 'peter@sunshine.org',
    },
    {
      id: 3,
      clientNumber: '003',
      clientCode: 'TECH789',
      clientName: 'TechStart Solutions',
      clientType: 'Limited Company',
      letterCode: '5555666677',
      tprPortal: 'Onboarded',
      stagingDate: '2023-06-01',
      reEnrolmentDate: '2025-06-01',
      reminderDate: '2025-05-01',
      reEnrolmentPeriod: '01/06/2025 - 01/11/2025',
      assignedTeamMember: 'Mike Wilson',
      clientContactName: 'Emma Davis',
      clientEmail: 'emma@techstart.com',
    },
  ];

  const [rows, setRows] = useState(initialRows);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [editingRow, setEditingRow] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const clientTypes = ['All', 'Limited Company', 'Charity', 'Partnership', 'Sole Trader'];
  const tprStatuses = ['Onboarded', 'Waiting', 'Pending'];
  const consultants = ['John Doe', 'Jane Smith', 'Mike Wilson', 'Sarah Johnson'];

  const handleAddClient = () => {
    setShowAddModal(true);
  };

  const handleSaveNewClient = (newClient) => {
    setRows([...rows, newClient]);
  };

  const handleEditRow = (id) => {
    setEditingRow(id);
  };

  const handleSaveRow = (updatedRow) => {
    setRows(rows.map(row => row.id === updatedRow.id ? updatedRow : row));
    setEditingRow(null);
  };

  const handleDeleteRow = (id) => {
    setRows(rows.filter(row => row.id !== id));
  };

  const getStatusBadge = (status) => {
    const baseClasses = "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium";
    switch (status) {
      case 'Onboarded':
        return <span className={`${baseClasses} bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200`}>
          <CheckCircleIcon className="w-3 h-3 mr-1" />
          Onboarded
        </span>;
      case 'Waiting':
        return <span className={`${baseClasses} bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200`}>
          <ClockIcon className="w-3 h-3 mr-1" />
          Waiting
        </span>;
      case 'Pending':
        return <span className={`${baseClasses} bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200`}>
          <ExclamationTriangleIcon className="w-3 h-3 mr-1" />
          Pending
        </span>;
      default:
        return <span className={`${baseClasses} bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200`}>{status}</span>;
    }
  };

  const filteredRows = rows.filter((row) => {
    const matchesSearch = Object.values(row).some((val) =>
      String(val).toLowerCase().includes(searchTerm.toLowerCase())
    );
    const matchesFilter = filterType === 'All' || row.clientType === filterType;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 px-4 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Client Overview</h1>
              <p className="text-gray-600 dark:text-gray-400">
                Manage all your client information and compliance status
              </p>
            </div>
            
            <div className="flex gap-3">
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <ArrowDownTrayIcon className="h-4 w-4" />
                Export
              </button>
              <button
                onClick={handleAddClient}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#401D6C] to-[#EC385D] text-white rounded-lg hover:shadow-lg transition-all duration-200"
              >
                <PlusIcon className="h-4 w-4" />
                Add Client
              </button>
            </div>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                  <UserGroupIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">{rows.length}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Total Clients</div>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                  <CheckCircleIcon className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {rows.filter(r => r.tprPortal === 'Onboarded').length}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Onboarded</div>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
                  <ClockIcon className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {rows.filter(r => r.tprPortal === 'Waiting').length}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Waiting</div>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                  <CalendarIcon className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {rows.filter(r => new Date(r.reEnrolmentDate) <= new Date(Date.now() + 90*24*60*60*1000)).length}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Due Soon</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search clients by name, code, or contact..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#401D6C] focus:border-transparent dark:bg-gray-700 dark:text-white"
              />
            </div>
            
            <div className="flex items-center gap-2">
              <FunnelIcon className="h-4 w-4 text-gray-400" />
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#401D6C] focus:border-transparent dark:bg-gray-700 dark:text-white"
              >
                {clientTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Client</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">TPR Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Staging Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Re-Enrolment</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Team Member</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Contact</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {filteredRows.map((row) => (
                  <tr key={row.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {row.clientName}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {row.clientCode}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {row.clientType}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(row.tprPortal)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {row.stagingDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {row.reEnrolmentDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {row.assignedTeamMember}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm text-gray-900 dark:text-white">{row.clientContactName}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">{row.clientEmail}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleEditRow(row.id)}
                        className="text-[#401D6C] hover:text-[#EC385D] dark:text-purple-400 dark:hover:text-pink-400 mr-3"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteRow(row.id)}
                        className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {filteredRows.length === 0 && (
              <div className="text-center py-12">
                <UserGroupIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No clients found</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {searchTerm ? 'Try adjusting your search terms' : 'Get started by adding your first client'}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add Client Modal */}
      <AddClientModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSave={handleSaveNewClient}
        consultants={consultants}
      />
    </div>
  );
};

export default Overview;
