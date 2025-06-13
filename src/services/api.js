// src/services/api.js
// Mock API service for authentication until backend is ready

const API_BASE_URL = 'http://localhost:3001/api'; // Your future backend URL

// Mock user data for testing
const MOCK_USERS = [
  {
    id: '1',
    email: 'test@tprflow.com',
    password: 'TestPassword123', // In real app, this would be hashed
    firstName: 'John',
    lastName: 'Doe',
    role: 'admin',
    consultancyId: 'cons_1',
    consultancyName: 'Acme Payroll Services'
  },
  {
    id: '2',
    email: 'demo@tprflow.com',
    password: 'DemoPassword123',
    firstName: 'Sarah',
    lastName: 'Johnson',
    role: 'consultant',
    consultancyId: 'cons_1',
    consultancyName: 'Acme Payroll Services'
  }
];

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Mock authentication API
export const authAPI = {
  async login({ email, password, rememberMe = false }) {
    console.log('🔐 Mock Login attempt:', { email, rememberMe });
    
    // Simulate network delay
    await delay(1000);
    
    // Find user by email
    const user = MOCK_USERS.find(u => u.email.toLowerCase() === email.toLowerCase());
    
    if (!user) {
      throw new Error('User not found with this email address');
    }
    
    if (user.password !== password) {
      throw new Error('Invalid email or password');
    }
    
    // Simulate successful login
    const authData = {
      success: true,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        consultancyId: user.consultancyId,
        consultancyName: user.consultancyName
      },
      token: `mock_jwt_token_${user.id}_${Date.now()}`,
      expiresIn: rememberMe ? '30d' : '1d'
    };
    
    // Store authentication in localStorage
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('userEmail', user.email);
    localStorage.setItem('userId', user.id);
    localStorage.setItem('userRole', user.role);
    localStorage.setItem('consultancyId', user.consultancyId);
    localStorage.setItem('consultancyName', user.consultancyName);
    localStorage.setItem('authToken', authData.token);
    
    console.log('✅ Mock Login successful:', authData.user);
    return authData;
  },

  async register({ email, password, firstName, lastName, consultancyName }) {
    console.log('📝 Mock Registration attempt:', { email, firstName, lastName, consultancyName });
    
    // Simulate network delay
    await delay(1500);
    
    // Check if user already exists
    const existingUser = MOCK_USERS.find(u => u.email.toLowerCase() === email.toLowerCase());
    
    if (existingUser) {
      throw new Error('An account with this email already exists');
    }
    
    // Create new user (in real app, this would save to database)
    const newUser = {
      id: `user_${Date.now()}`,
      email,
      password, // In real app, this would be hashed
      firstName,
      lastName,
      role: 'admin', // First user of consultancy is admin
      consultancyId: `cons_${Date.now()}`,
      consultancyName
    };
    
    // Add to mock database
    MOCK_USERS.push(newUser);
    
    // Auto-login after registration
    const authData = {
      success: true,
      user: {
        id: newUser.id,
        email: newUser.email,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        role: newUser.role,
        consultancyId: newUser.consultancyId,
        consultancyName: newUser.consultancyName
      },
      token: `mock_jwt_token_${newUser.id}_${Date.now()}`,
      expiresIn: '1d'
    };
    
    // Store authentication in localStorage
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('userEmail', newUser.email);
    localStorage.setItem('userId', newUser.id);
    localStorage.setItem('userRole', newUser.role);
    localStorage.setItem('consultancyId', newUser.consultancyId);
    localStorage.setItem('consultancyName', newUser.consultancyName);
    localStorage.setItem('authToken', authData.token);
    
    console.log('✅ Mock Registration successful:', authData.user);
    return authData;
  },

  async logout() {
    console.log('🚪 Mock Logout');
    
    // Clear localStorage
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userId');
    localStorage.removeItem('userRole');
    localStorage.removeItem('consultancyId');
    localStorage.removeItem('consultancyName');
    localStorage.removeItem('authToken');
    
    return { success: true };
  },

  async getCurrentUser() {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    
    if (!isAuthenticated) {
      throw new Error('Not authenticated');
    }
    
    return {
      id: localStorage.getItem('userId'),
      email: localStorage.getItem('userEmail'),
      role: localStorage.getItem('userRole'),
      consultancyId: localStorage.getItem('consultancyId'),
      consultancyName: localStorage.getItem('consultancyName')
    };
  }
};

// Client API (using mock data for now)
export const clientAPI = {
  async getClients() {
    console.log('📋 Mock: Fetching clients...');
    await delay(500);
    
    // Return mock client data that matches your Overview.jsx component
    return {
      success: true,
      data: [
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
          documentCompletionPercentage: 80
        },
        // Add more mock clients as needed...
      ]
    };
  },

  async getDashboardStats() {
    console.log('📊 Mock: Fetching dashboard stats...');
    await delay(300);
    
    return {
      success: true,
      data: {
        totalClients: 247,
        onboardedCount: 198,
        waitingCount: 31,
        pendingCount: 18,
        dueSoonCount: 31,
        overdueCount: 18,
        totalRevenue: 89500,
        complianceRate: 80.2,
        monthlyGrowth: 2.3
      }
    };
  }
};

export default { authAPI, clientAPI };