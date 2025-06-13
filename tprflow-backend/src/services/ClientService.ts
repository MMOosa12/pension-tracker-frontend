// Fallback ClientService without Prisma - for testing and development

export interface CreateClientData {
  clientName: string;
  clientType: 'Limited_Company' | 'Sole_Trader' | 'Charity' | 'CIC' | 'Partnership' | 'Trust' | 'Other';
  stagingDate: string; // YYYY-MM-DD format
  assignedConsultantId: string;
  letterCode?: string;
  clientContactName?: string;
  clientContactEmail?: string;
  clientPhone?: string;
  employeeCount?: number;
  annualRevenue?: number;
  notes?: string;
}

export interface ClientFilters {
  status?: string[];
  clientType?: string[];
  complianceStatus?: string[];
  assignedConsultantId?: string;
  search?: string;
}

// In-memory storage for testing (replaces database)
const mockClients: any[] = [];

export class ClientService {
  /**
   * Calculate compliance dates based on staging date (LEGALLY REQUIRED)
   * Re-enrolment: Exactly 3 years from staging date
   * Declaration Due: 5 months after 3-year anniversary
   */
  static calculateComplianceDates(stagingDate: Date) {
    const threeYearsLater = new Date(stagingDate);
    threeYearsLater.setFullYear(stagingDate.getFullYear() + 3);
    
    const declarationDue = new Date(threeYearsLater);
    declarationDue.setMonth(declarationDue.getMonth() + 5);
    
    return {
      reEnrolmentDate: threeYearsLater,
      currentDeclarationDue: declarationDue
    };
  }

  /**
   * Determine client status based on dates and completion
   */
  static getClientStatus(
    stagingDate: Date, 
    reEnrolmentDate: Date, 
    declarationDue: Date, 
    declarationCompleted?: Date
  ): 'waiting' | 'reenrolment_due' | 'declaration_due' | 'compliant' | 'overdue' {
    const now = new Date();
    
    // If declaration is completed, client is compliant
    if (declarationCompleted) {
      return 'compliant';
    }
    
    // If past declaration deadline, client is overdue
    if (now > declarationDue) {
      return 'overdue';
    }
    
    // If past re-enrolment date, declaration is due
    if (now > reEnrolmentDate) {
      return 'declaration_due';
    }
    
    // If within 3 months of re-enrolment date, re-enrolment is due
    const threeMonthsBefore = new Date(reEnrolmentDate);
    threeMonthsBefore.setMonth(threeMonthsBefore.getMonth() - 3);
    
    if (now >= threeMonthsBefore) {
      return 'reenrolment_due';
    }
    
    // Otherwise, client is waiting
    return 'waiting';
  }

  /**
   * Generate unique client number and code
   */
  static async generateClientNumber(consultancyId: string): Promise<{ clientNumber: string; clientCode: string }> {
    const consultancyClients = mockClients.filter(c => c.consultancyId === consultancyId);
    const nextNumber = consultancyClients.length + 1;
    const clientNumber = `CL${String(nextNumber).padStart(4, '0')}`;
    const clientCode = `${consultancyId.substring(0, 3).toUpperCase()}-${clientNumber}`;
    return { clientNumber, clientCode };
  }

  /**
   * Create a new client with auto-calculated compliance dates
   */
  static async createClient(data: CreateClientData, consultancyId: string) {
    try {
      console.log('📝 Creating client using in-memory storage (Prisma fallback)');
      
      // Generate client number and code
      const { clientNumber, clientCode } = await ClientService.generateClientNumber(consultancyId);
      
      // Parse staging date and calculate compliance dates
      const stagingDate = new Date(data.stagingDate);
      const { reEnrolmentDate, currentDeclarationDue } = ClientService.calculateComplianceDates(stagingDate);
      
      // Determine initial status
      const status = ClientService.getClientStatus(stagingDate, reEnrolmentDate, currentDeclarationDue);
      
      // Create mock client
      const client = {
        id: 'client_' + Date.now() + '_' + Math.random().toString(36).substring(2, 9),
        consultancyId,
        clientNumber,
        clientCode,
        clientName: data.clientName,
        clientType: data.clientType,
        stagingDate: stagingDate.toISOString(),
        reEnrolmentDate: reEnrolmentDate.toISOString(),
        currentDeclarationDue: currentDeclarationDue.toISOString(),
        assignedConsultantId: data.assignedConsultantId,
        letterCode: data.letterCode || null,
        clientContactName: data.clientContactName || null,
        clientContactEmail: data.clientContactEmail || null,
        clientPhone: data.clientPhone || null,
        employeeCount: data.employeeCount || null,
        annualRevenue: data.annualRevenue || null,
        notes: data.notes || null,
        status,
        riskScore: 85,
        documentsComplete: 0,
        documentsTotal: 10,
        complianceStatus: 'Good',
        tprPortalStatus: 'Waiting',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        assignedConsultant: {
          id: data.assignedConsultantId,
          firstName: 'Test',
          lastName: 'User',
          email: 'test@example.com'
        }
      };

      mockClients.push(client);
      
      console.log(`✅ Client created: ${client.clientName} (${client.clientCode})`);
      console.log(`📊 Total clients in memory: ${mockClients.length}`);
      
      return client;

    } catch (error) {
      console.error('❌ Error creating client:', error);
      throw error;
    }
  }

  /**
   * Get all clients for a consultancy with filtering
   */
  static async getClients(consultancyId: string, filters: ClientFilters = {}) {
    try {
      console.log('📋 Fetching clients using in-memory storage (Prisma fallback)');
      
      let clients = mockClients.filter(client => client.consultancyId === consultancyId);
      
      // Apply filters
      if (filters.status && filters.status.length > 0) {
        clients = clients.filter(client => filters.status!.includes(client.status));
      }
      
      if (filters.clientType && filters.clientType.length > 0) {
        clients = clients.filter(client => filters.clientType!.includes(client.clientType));
      }
      
      if (filters.complianceStatus && filters.complianceStatus.length > 0) {
        clients = clients.filter(client => filters.complianceStatus!.includes(client.complianceStatus));
      }
      
      if (filters.assignedConsultantId) {
        clients = clients.filter(client => client.assignedConsultantId === filters.assignedConsultantId);
      }
      
      if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        clients = clients.filter(client => 
          client.clientName.toLowerCase().includes(searchTerm) ||
          (client.clientContactName && client.clientContactName.toLowerCase().includes(searchTerm)) ||
          (client.clientContactEmail && client.clientContactEmail.toLowerCase().includes(searchTerm)) ||
          (client.notes && client.notes.toLowerCase().includes(searchTerm))
        );
      }
      
      // Sort by creation date (newest first)
      clients.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      
      console.log(`📊 Retrieved ${clients.length} clients for consultancy ${consultancyId}`);
      return clients;

    } catch (error) {
      console.error('❌ Error fetching clients:', error);
      throw error;
    }
  }

  /**
   * Get dashboard statistics for a consultancy
   */
  static async getDashboardStats(consultancyId: string) {
    try {
      console.log('📈 Calculating dashboard stats using in-memory storage (Prisma fallback)');
      
      const consultancyClients = mockClients.filter(c => c.consultancyId === consultancyId);
      const totalClients = consultancyClients.length;
      
      // Count by status
      const statusCounts = {
        waiting: 0,
        reenrolment_due: 0,
        declaration_due: 0,
        compliant: 0,
        overdue: 0
      };
      
      const tprStatusCounts = {
        Waiting: 0,
        Onboarded: 0,
        Pending: 0
      };
      
      consultancyClients.forEach(client => {
        statusCounts[client.status] = (statusCounts[client.status] || 0) + 1;
        tprStatusCounts[client.tprPortalStatus] = (tprStatusCounts[client.tprPortalStatus] || 0) + 1;
      });
      
      // Calculate compliance rate
      const compliantCount = statusCounts.compliant || 0;
      const complianceRate = totalClients > 0 ? Math.round((compliantCount / totalClients) * 100) : 0;
      
      const stats = {
        totalClients,
        onboardedCount: tprStatusCounts.Onboarded,
        waitingCount: tprStatusCounts.Waiting,
        pendingCount: tprStatusCounts.Pending,
        dueSoonCount: statusCounts.reenrolment_due,
        overdueCount: statusCounts.overdue,
        complianceRate,
        statusBreakdown: Object.entries(statusCounts).map(([status, count]) => ({
          status,
          _count: { status: count }
        })),
        complianceBreakdown: []
      };
      
      console.log(`📊 Dashboard stats calculated: ${totalClients} total clients, ${complianceRate}% compliance rate`);
      return stats;

    } catch (error) {
      console.error('❌ Error fetching dashboard stats:', error);
      throw error;
    }
  }

  /**
   * Get client by ID
   */
  static async getClientById(clientId: string, consultancyId: string) {
    try {
      const client = mockClients.find(c => c.id === clientId && c.consultancyId === consultancyId);
      
      if (!client) {
        throw new Error('Client not found');
      }
      
      console.log(`🔍 Retrieved client: ${client.clientName}`);
      return client;

    } catch (error) {
      console.error('❌ Error fetching client:', error);
      throw error;
    }
  }

  /**
   * Update client
   */
  static async updateClient(clientId: string, consultancyId: string, data: Partial<CreateClientData>) {
    try {
      const clientIndex = mockClients.findIndex(c => c.id === clientId && c.consultancyId === consultancyId);
      
      if (clientIndex === -1) {
        throw new Error('Client not found');
      }

      const existingClient = mockClients[clientIndex];
      
      // If staging date is updated, recalculate compliance dates
      if (data.stagingDate) {
        const stagingDate = new Date(data.stagingDate);
        const { reEnrolmentDate, currentDeclarationDue } = ClientService.calculateComplianceDates(stagingDate);
        
        data.stagingDate = stagingDate.toISOString();
        (data as any).reEnrolmentDate = reEnrolmentDate.toISOString();
        (data as any).currentDeclarationDue = currentDeclarationDue.toISOString();
        
        // Recalculate status
        (data as any).status = ClientService.getClientStatus(
          stagingDate, 
          reEnrolmentDate, 
          currentDeclarationDue, 
          existingClient.declarationCompletedDate ? new Date(existingClient.declarationCompletedDate) : undefined
        );
      }

      // Update client
      Object.assign(mockClients[clientIndex], data, {
        updatedAt: new Date().toISOString()
      });
      
      console.log(`✅ Client updated: ${mockClients[clientIndex].clientName}`);
      return mockClients[clientIndex];

    } catch (error) {
      console.error('❌ Error updating client:', error);
      throw error;
    }
  }

  /**
   * Delete client
   */
  static async deleteClient(clientId: string, consultancyId: string) {
    try {
      const clientIndex = mockClients.findIndex(c => c.id === clientId && c.consultancyId === consultancyId);
      
      if (clientIndex === -1) {
        throw new Error('Client not found');
      }

      const client = mockClients[clientIndex];
      mockClients.splice(clientIndex, 1);
      
      console.log(`✅ Client deleted: ${client.clientName}`);
      console.log(`📊 Total clients in memory: ${mockClients.length}`);
      
      return { success: true, message: 'Client deleted successfully' };

    } catch (error) {
      console.error('❌ Error deleting client:', error);
      throw error;
    }
  }
}