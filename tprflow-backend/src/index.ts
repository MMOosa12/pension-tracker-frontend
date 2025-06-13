import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { ClientService } from './services/ClientService';

// Load environment variables
dotenv.config();

// Create Express app
const app = express();
const PORT = process.env.PORT || 3001;

// CORS configuration
app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:3002',
    'http://localhost:5173',
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());

// In-memory storage for now (will replace with database)
const users: any[] = [];
const consultancies: any[] = [];
const resetTokens: any[] = [];

// Interfaces
interface AuthenticatedRequest extends express.Request {
  user?: {
    userId: string;
    consultancyId: string;
    email: string;
    role: string;
  };
}

// Helper functions
function generateId() {
  return 'usr_' + Math.random().toString(36).substr(2, 15);
}

function generateToken(user: any) {
  return jwt.sign(
    {
      userId: user.id,
      email: user.email,
      consultancyId: user.consultancyId,
      role: user.role
    },
    process.env.JWT_SECRET || 'fallback-secret-key',
    { expiresIn: '1h' }
  );
}

function generateResetToken() {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

// JWT verification middleware
const authenticateToken = (req: AuthenticatedRequest, res: express.Response, next: express.NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({
      success: false,
      error: { code: 'NO_TOKEN', message: 'Access token required' }
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret-key') as any;
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({
      success: false,
      error: { code: 'INVALID_TOKEN', message: 'Invalid or expired token' }
    });
  }
};

// Health check
app.get('/health', (req, res) => {
  res.json({
    success: true,
    data: {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      database: 'in-memory (temporary)',
      usersCount: users.length,
      consultanciesCount: consultancies.length,
      resetTokensCount: resetTokens.length
    }
  });
});

// Test endpoint
app.get('/api/test', (req, res) => {
  res.json({
    success: true,
    message: 'TPRFlow API working with in-memory storage!',
    timestamp: new Date().toISOString()
  });
});

// REAL USER REGISTRATION (in-memory)
app.post('/api/auth/register', async (req, res) => {
  try {
    const { email, password, firstName, lastName, consultancyName } = req.body;
    
    // Validation
    if (!email || !password || !firstName || !lastName || !consultancyName) {
      return res.status(400).json({
        success: false,
        error: { code: 'VALIDATION_ERROR', message: 'All fields are required' }
      });
    }
    
    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        error: { code: 'VALIDATION_ERROR', message: 'Password must be at least 8 characters' }
      });
    }
    
    // Check if user exists
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
      return res.status(409).json({
        success: false,
        error: { code: 'USER_EXISTS', message: 'Account with this email already exists' }
      });
    }
    
    // Hash password
    const passwordHash = await bcrypt.hash(password, 12);
    
    // Create consultancy
    const consultancyId = generateId();
    const consultancy = {
      id: consultancyId,
      name: consultancyName,
      subscriptionPlan: 'free',
      maxClients: 25,
      createdAt: new Date()
    };
    consultancies.push(consultancy);
    
    // Create user
    const userId = generateId();
    const user = {
      id: userId,
      email,
      passwordHash,
      firstName,
      lastName,
      role: 'admin',
      consultancyId,
      isDeleted: false,
      createdAt: new Date()
    };
    users.push(user);
    
    // Generate token
    const accessToken = generateToken(user);
    
    console.log(`✅ New user registered: ${firstName} ${lastName} (${email})`);
    
    res.status(201).json({
      success: true,
      data: {
        user: {
          id: userId,
          email,
          firstName,
          lastName,
          role: 'admin',
          consultancyId,
          consultancyName,
          subscriptionPlan: 'free'
        },
        tokens: {
          accessToken,
          refreshToken: 'mock-refresh-token',
          expiresIn: 3600
        },
        permissions: ['clients:read', 'clients:create', 'clients:update', 'users:manage']
      },
      message: 'Registration successful - welcome to TPRFlow!'
    });
    
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      error: { code: 'REGISTRATION_FAILED', message: 'Registration failed. Please try again.' }
    });
  }
});

// REAL USER LOGIN (in-memory)
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password, rememberMe } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: { code: 'VALIDATION_ERROR', message: 'Email and password are required' }
      });
    }
    
    // Find user
    const user = users.find(u => u.email === email && !u.isDeleted);
    if (!user) {
      return res.status(401).json({
        success: false,
        error: { code: 'AUTHENTICATION_FAILED', message: 'Invalid email or password' }
      });
    }
    
    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.passwordHash);
    if (!isValidPassword) {
      return res.status(401).json({
        success: false,
        error: { code: 'AUTHENTICATION_FAILED', message: 'Invalid email or password' }
      });
    }
    
    // Find consultancy
    const consultancy = consultancies.find(c => c.id === user.consultancyId);
    
    // Generate token
    const accessToken = generateToken(user);
    
    console.log(`✅ User logged in: ${user.firstName} ${user.lastName} (${user.email})`);
    
    res.json({
      success: true,
      data: {
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
          consultancyId: user.consultancyId,
          consultancyName: consultancy?.name,
          subscriptionPlan: consultancy?.subscriptionPlan || 'free'
        },
        tokens: {
          accessToken,
          refreshToken: 'mock-refresh-token',
          expiresIn: rememberMe ? 2592000 : 3600
        },
        permissions: user.role === 'admin' 
          ? ['clients:read', 'clients:create', 'clients:update', 'users:manage']
          : ['clients:read', 'clients:create']
      },
      message: 'Login successful'
    });
    
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      error: { code: 'LOGIN_FAILED', message: 'Login failed. Please try again.' }
    });
  }
});

// FORGOT PASSWORD - Send reset email
app.post('/api/auth/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;

    console.log('🔍 Forgot password request for:', email);

    if (!email) {
      return res.status(400).json({
        success: false,
        error: { code: 'VALIDATION_ERROR', message: 'Email is required' }
      });
    }

    // Check if user exists
    const user = users.find(u => u.email === email && !u.isDeleted);
    if (!user) {
      console.log('❌ User not found:', email);
      return res.status(404).json({
        success: false,
        error: { code: 'USER_NOT_FOUND', message: 'No account found with that email address' }
      });
    }

    // Generate reset token
    const resetToken = generateResetToken();
    const expiresAt = new Date(Date.now() + 3600000); // 1 hour from now

    // Store reset token
    resetTokens.push({
      token: resetToken,
      email: email,
      expiresAt: expiresAt,
      used: false,
      createdAt: new Date()
    });

    console.log('✅ Reset token generated for:', email);

    // Simulate sending email (in production, use real email service)
    console.log('\n🔐 PASSWORD RESET EMAIL (Simulated)');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`To: ${email}`);
    console.log(`Subject: Reset Your TPRFlow Password`);
    console.log('');
    console.log(`Reset Link: http://localhost:3000/reset-password?token=${resetToken}`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    res.json({
      success: true,
      data: { message: 'Reset link sent successfully' }
    });

  } catch (error) {
    console.error('❌ Forgot password error:', error);
    res.status(500).json({
      success: false,
      error: { code: 'FORGOT_PASSWORD_FAILED', message: 'Failed to send reset email. Please try again.' }
    });
  }
});

// RESET PASSWORD - Process password reset
app.post('/api/auth/reset-password', async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    console.log('🔍 Reset password request with token:', token?.substring(0, 10) + '...');

    if (!token || !newPassword) {
      return res.status(400).json({
        success: false,
        error: { code: 'VALIDATION_ERROR', message: 'Token and new password are required' }
      });
    }

    if (newPassword.length < 8) {
      return res.status(400).json({
        success: false,
        error: { code: 'VALIDATION_ERROR', message: 'Password must be at least 8 characters long' }
      });
    }

    // Find reset token
    const resetTokenData = resetTokens.find(t => t.token === token && !t.used);
    if (!resetTokenData) {
      console.log('❌ Invalid or expired token:', token?.substring(0, 10) + '...');
      return res.status(400).json({
        success: false,
        error: { code: 'INVALID_TOKEN', message: 'Invalid or expired reset token' }
      });
    }

    // Check if token is expired
    if (new Date() > resetTokenData.expiresAt) {
      console.log('❌ Token expired:', token?.substring(0, 10) + '...');
      return res.status(400).json({
        success: false,
        error: { code: 'TOKEN_EXPIRED', message: 'Reset token has expired' }
      });
    }

    // Find user and update password
    const user = users.find(u => u.email === resetTokenData.email && !u.isDeleted);
    if (!user) {
      return res.status(404).json({
        success: false,
        error: { code: 'USER_NOT_FOUND', message: 'User not found' }
      });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 12);
    user.passwordHash = hashedPassword;

    // Mark token as used
    resetTokenData.used = true;
    resetTokenData.usedAt = new Date();

    console.log('✅ Password reset successful for:', user.email);

    res.json({
      success: true,
      data: { message: 'Password reset successfully' }
    });

  } catch (error) {
    console.error('❌ Reset password error:', error);
    res.status(500).json({
      success: false,
      error: { code: 'RESET_PASSWORD_FAILED', message: 'Failed to reset password. Please try again.' }
    });
  }
});

// =====================================
// CLIENT MANAGEMENT API ENDPOINTS
// =====================================

// GET /api/clients - List all clients for the consultancy
app.get('/api/clients', authenticateToken, async (req: AuthenticatedRequest, res) => {
  try {
    const consultancyId = req.user!.consultancyId;
    const filters = {
      status: req.query.status as string[],
      clientType: req.query.clientType as string[],
      complianceStatus: req.query.complianceStatus as string[],
      assignedConsultantId: req.query.assignedConsultantId as string,
      search: req.query.search as string
    };

    const clients = await ClientService.getClients(consultancyId, filters);

    console.log(`✅ Retrieved ${clients.length} clients for consultancy ${consultancyId}`);

    res.json({
      success: true,
      data: clients,
      meta: {
        timestamp: new Date().toISOString(),
        count: clients.length
      }
    });

  } catch (error) {
    console.error('❌ Error fetching clients:', error);
    res.status(500).json({
      success: false,
      error: { code: 'FETCH_CLIENTS_FAILED', message: 'Failed to fetch clients' }
    });
  }
});

// POST /api/clients - Create a new client
app.post('/api/clients', authenticateToken, async (req: AuthenticatedRequest, res) => {
  try {
    const consultancyId = req.user!.consultancyId;
    const clientData = req.body;

    // Basic validation
    if (!clientData.clientName || !clientData.clientType || !clientData.stagingDate || !clientData.assignedConsultantId) {
      return res.status(400).json({
        success: false,
        error: { code: 'VALIDATION_ERROR', message: 'Client name, type, staging date, and assigned consultant are required' }
      });
    }

    const client = await ClientService.createClient(clientData, consultancyId);

    console.log(`✅ Client created: ${client.clientName} (${client.clientCode})`);

    res.status(201).json({
      success: true,
      data: client,
      message: 'Client created successfully'
    });

  } catch (error) {
    console.error('❌ Error creating client:', error);
    
    if (error.message.includes('consultant not found')) {
      return res.status(400).json({
        success: false,
        error: { code: 'INVALID_CONSULTANT', message: error.message }
      });
    }

    res.status(500).json({
      success: false,
      error: { code: 'CREATE_CLIENT_FAILED', message: 'Failed to create client' }
    });
  }
});

// GET /api/clients/:id - Get a specific client
app.get('/api/clients/:id', authenticateToken, async (req: AuthenticatedRequest, res) => {
  try {
    const consultancyId = req.user!.consultancyId;
    const clientId = req.params.id;

    const client = await ClientService.getClientById(clientId, consultancyId);

    res.json({
      success: true,
      data: client
    });

  } catch (error) {
    console.error('❌ Error fetching client:', error);
    
    if (error.message === 'Client not found') {
      return res.status(404).json({
        success: false,
        error: { code: 'CLIENT_NOT_FOUND', message: 'Client not found' }
      });
    }

    res.status(500).json({
      success: false,
      error: { code: 'FETCH_CLIENT_FAILED', message: 'Failed to fetch client' }
    });
  }
});

// PUT /api/clients/:id - Update a client
app.put('/api/clients/:id', authenticateToken, async (req: AuthenticatedRequest, res) => {
  try {
    const consultancyId = req.user!.consultancyId;
    const clientId = req.params.id;
    const updateData = req.body;

    const client = await ClientService.updateClient(clientId, consultancyId, updateData);

    res.json({
      success: true,
      data: client,
      message: 'Client updated successfully'
    });

  } catch (error) {
    console.error('❌ Error updating client:', error);
    
    if (error.message === 'Client not found') {
      return res.status(404).json({
        success: false,
        error: { code: 'CLIENT_NOT_FOUND', message: 'Client not found' }
      });
    }

    res.status(500).json({
      success: false,
      error: { code: 'UPDATE_CLIENT_FAILED', message: 'Failed to update client' }
    });
  }
});

// DELETE /api/clients/:id - Delete a client
app.delete('/api/clients/:id', authenticateToken, async (req: AuthenticatedRequest, res) => {
  try {
    const consultancyId = req.user!.consultancyId;
    const clientId = req.params.id;

    await ClientService.deleteClient(clientId, consultancyId);

    res.json({
      success: true,
      message: 'Client deleted successfully'
    });

  } catch (error) {
    console.error('❌ Error deleting client:', error);
    
    if (error.message === 'Client not found') {
      return res.status(404).json({
        success: false,
        error: { code: 'CLIENT_NOT_FOUND', message: 'Client not found' }
      });
    }

    res.status(500).json({
      success: false,
      error: { code: 'DELETE_CLIENT_FAILED', message: 'Failed to delete client' }
    });
  }
});

// GET /api/dashboard/stats - Get dashboard statistics
app.get('/api/dashboard/stats', authenticateToken, async (req: AuthenticatedRequest, res) => {
  try {
    const consultancyId = req.user!.consultancyId;

    const stats = await ClientService.getDashboardStats(consultancyId);

    res.json({
      success: true,
      data: stats
    });

  } catch (error) {
    console.error('❌ Error fetching dashboard stats:', error);
    res.status(500).json({
      success: false,
      error: { code: 'FETCH_STATS_FAILED', message: 'Failed to fetch dashboard statistics' }
    });
  }
});

// GET /api/consultants - Get list of consultants for dropdowns
app.get('/api/consultants', authenticateToken, async (req: AuthenticatedRequest, res) => {
  try {
    const consultancyId = req.user!.consultancyId;

    // For now, we'll use the in-memory users array
    // Later we'll switch to Prisma when we migrate auth
    const consultants = users
      .filter(user => user.consultancyId === consultancyId && !user.isDeleted)
      .map(user => ({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        fullName: `${user.firstName} ${user.lastName}`
      }));

    res.json({
      success: true,
      data: consultants
    });

  } catch (error) {
    console.error('❌ Error fetching consultants:', error);
    res.status(500).json({
      success: false,
      error: { code: 'FETCH_CONSULTANTS_FAILED', message: 'Failed to fetch consultants' }
    });
  }
});

// Debug endpoints
app.get('/api/debug/users', (req, res) => {
  res.json({
    success: true,
    data: {
      users: users.map(u => ({
        id: u.id,
        email: u.email,
        firstName: u.firstName,
        lastName: u.lastName,
        role: u.role,
        consultancyId: u.consultancyId,
        createdAt: u.createdAt
      })),
      consultancies
    }
  });
});

app.get('/api/debug/reset-tokens', (req, res) => {
  res.json({
    success: true,
    data: { 
      resetTokens: resetTokens.map(token => ({
        email: token.email,
        token: token.token.substring(0, 10) + '...',
        expiresAt: token.expiresAt,
        used: token.used,
        createdAt: token.createdAt,
        usedAt: token.usedAt
      }))
    }
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 TPRFlow API server running on port ${PORT}`);
  console.log(`🔗 Health check: http://localhost:${PORT}/health`);
  console.log(`📊 Debug users: http://localhost:${PORT}/api/debug/users`);
  console.log(`🔑 Debug reset tokens: http://localhost:${PORT}/api/debug/reset-tokens`);
  console.log(`👥 Consultants: http://localhost:${PORT}/api/consultants`);
  console.log(`📈 Dashboard stats: http://localhost:${PORT}/api/dashboard/stats`);
  console.log(`👤 Clients: http://localhost:${PORT}/api/clients`);
  console.log(`🗄️ Database: SQLite (dev.db)`);
  console.log(`✨ Ready for client management!`);
});