-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('admin', 'consultant', 'viewer');

-- CreateEnum
CREATE TYPE "SubscriptionPlan" AS ENUM ('free', 'basic', 'premium');

-- CreateEnum
CREATE TYPE "ClientType" AS ENUM ('Limited_Company', 'Sole_Trader', 'Charity', 'CIC', 'Partnership', 'Trust', 'Other');

-- CreateEnum
CREATE TYPE "TPRPortalStatus" AS ENUM ('Onboarded', 'Waiting', 'Pending');

-- CreateEnum
CREATE TYPE "ComplianceStatus" AS ENUM ('Excellent', 'Good', 'Warning', 'Critical');

-- CreateEnum
CREATE TYPE "ClientStatus" AS ENUM ('waiting', 'reenrolment_due', 'declaration_due', 'compliant', 'overdue');

-- CreateEnum
CREATE TYPE "ActionType" AS ENUM ('client_created', 'client_updated', 'reminder_sent', 'declaration_completed', 'user_login', 'report_generated', 'user_registered', 'user_invited');

-- CreateEnum
CREATE TYPE "TemplateType" AS ENUM ('reenrolment_reminder', 'declaration_reminder', 'declaration_urgent', 'monthly_report', 'welcome');

-- CreateEnum
CREATE TYPE "ReminderType" AS ENUM ('reenrolment_available', 'reenrolment_window_open', 'declaration_available', 'declaration_warning', 'declaration_urgent', 'declaration_completed');

-- CreateEnum
CREATE TYPE "RecipientType" AS ENUM ('client', 'consultant');

-- CreateEnum
CREATE TYPE "EmailStatus" AS ENUM ('queued', 'sent', 'delivered', 'failed', 'bounced', 'spam', 'opened', 'clicked');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('pending', 'paid', 'failed', 'refunded');

-- CreateTable
CREATE TABLE "consultancies" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "subscriptionPlan" "SubscriptionPlan" NOT NULL DEFAULT 'free',
    "billingEmail" TEXT,
    "stripeCustomerId" TEXT,
    "maxClients" INTEGER NOT NULL DEFAULT 25,
    "companyLogoUrl" TEXT,
    "brandedEmails" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "consultancies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "jobTitle" TEXT,
    "role" "UserRole" NOT NULL DEFAULT 'consultant',
    "consultancyId" TEXT NOT NULL,
    "auth0Id" TEXT,
    "profileImageUrl" TEXT,
    "lastLogin" TIMESTAMP(3),
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "clients" (
    "id" TEXT NOT NULL,
    "consultancyId" TEXT NOT NULL,
    "clientNumber" TEXT NOT NULL,
    "clientCode" TEXT NOT NULL,
    "clientName" TEXT NOT NULL,
    "clientType" "ClientType" NOT NULL,
    "letterCode" VARCHAR(10),
    "tprPortalStatus" "TPRPortalStatus" NOT NULL DEFAULT 'Waiting',
    "stagingDate" TIMESTAMP(3) NOT NULL,
    "reEnrolmentDate" TIMESTAMP(3) NOT NULL,
    "reEnrolmentPeriod" TEXT NOT NULL DEFAULT '3 years',
    "chosenReenrolmentDate" TIMESTAMP(3),
    "currentDeclarationDue" TIMESTAMP(3),
    "declarationCompletedDate" TIMESTAMP(3),
    "reminderEmailSentOn" TIMESTAMP(3),
    "assignedConsultantId" TEXT NOT NULL,
    "clientContactName" TEXT,
    "clientContactEmail" TEXT,
    "clientPhone" TEXT,
    "employeeCount" INTEGER,
    "lastContactDate" TIMESTAMP(3),
    "annualRevenue" DECIMAL(10,2),
    "riskScore" INTEGER NOT NULL DEFAULT 100,
    "documentsComplete" INTEGER NOT NULL DEFAULT 0,
    "documentsTotal" INTEGER NOT NULL DEFAULT 10,
    "complianceStatus" "ComplianceStatus" NOT NULL DEFAULT 'Good',
    "status" "ClientStatus" NOT NULL DEFAULT 'waiting',
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "clients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "activity_logs" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "consultancyId" TEXT NOT NULL,
    "clientId" TEXT,
    "actionType" "ActionType" NOT NULL,
    "actionDescription" TEXT NOT NULL,
    "metadata" JSONB,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "activity_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "email_templates" (
    "id" TEXT NOT NULL,
    "consultancyId" TEXT NOT NULL,
    "templateType" "TemplateType" NOT NULL,
    "subjectTemplate" TEXT NOT NULL,
    "bodyTemplate" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdBy" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "email_templates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reminder_logs" (
    "id" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "templateId" TEXT,
    "reminderType" "ReminderType" NOT NULL,
    "recipientEmail" TEXT NOT NULL,
    "recipientType" "RecipientType" NOT NULL DEFAULT 'client',
    "emailProviderId" TEXT,
    "sentAt" TIMESTAMP(3),
    "deliveredAt" TIMESTAMP(3),
    "openedAt" TIMESTAMP(3),
    "clickedAt" TIMESTAMP(3),
    "emailStatus" "EmailStatus" NOT NULL DEFAULT 'queued',
    "failureReason" TEXT,
    "retryCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "reminder_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "billing_records" (
    "id" TEXT NOT NULL,
    "consultancyId" TEXT NOT NULL,
    "billingPeriodStart" TIMESTAMP(3) NOT NULL,
    "billingPeriodEnd" TIMESTAMP(3) NOT NULL,
    "clientCount" INTEGER NOT NULL,
    "peakClientCount" INTEGER NOT NULL,
    "planType" "SubscriptionPlan" NOT NULL,
    "baseAmount" DECIMAL(10,2) NOT NULL,
    "usageAmount" DECIMAL(10,2) NOT NULL,
    "totalAmount" DECIMAL(10,2) NOT NULL,
    "currency" VARCHAR(3) NOT NULL DEFAULT 'GBP',
    "stripeInvoiceId" TEXT,
    "stripePaymentIntentId" TEXT,
    "paymentStatus" "PaymentStatus" NOT NULL DEFAULT 'pending',
    "paidAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "billing_records_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "daily_usage_snapshots" (
    "id" TEXT NOT NULL,
    "consultancyId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "clientCount" INTEGER NOT NULL,
    "planType" "SubscriptionPlan" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "daily_usage_snapshots_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "consultancies_stripeCustomerId_key" ON "consultancies"("stripeCustomerId");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_auth0Id_key" ON "users"("auth0Id");

-- CreateIndex
CREATE INDEX "users_consultancyId_idx" ON "users"("consultancyId");

-- CreateIndex
CREATE INDEX "users_email_idx" ON "users"("email");

-- CreateIndex
CREATE INDEX "clients_consultancyId_idx" ON "clients"("consultancyId");

-- CreateIndex
CREATE INDEX "clients_status_idx" ON "clients"("status");

-- CreateIndex
CREATE INDEX "clients_stagingDate_idx" ON "clients"("stagingDate");

-- CreateIndex
CREATE INDEX "clients_reEnrolmentDate_idx" ON "clients"("reEnrolmentDate");

-- CreateIndex
CREATE INDEX "clients_assignedConsultantId_idx" ON "clients"("assignedConsultantId");

-- CreateIndex
CREATE INDEX "activity_logs_consultancyId_createdAt_idx" ON "activity_logs"("consultancyId", "createdAt");

-- CreateIndex
CREATE INDEX "activity_logs_userId_idx" ON "activity_logs"("userId");

-- CreateIndex
CREATE INDEX "activity_logs_clientId_idx" ON "activity_logs"("clientId");

-- CreateIndex
CREATE INDEX "reminder_logs_clientId_idx" ON "reminder_logs"("clientId");

-- CreateIndex
CREATE INDEX "reminder_logs_sentAt_idx" ON "reminder_logs"("sentAt");

-- CreateIndex
CREATE INDEX "billing_records_consultancyId_idx" ON "billing_records"("consultancyId");

-- CreateIndex
CREATE INDEX "daily_usage_snapshots_consultancyId_date_idx" ON "daily_usage_snapshots"("consultancyId", "date");

-- CreateIndex
CREATE UNIQUE INDEX "daily_usage_snapshots_consultancyId_date_key" ON "daily_usage_snapshots"("consultancyId", "date");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_consultancyId_fkey" FOREIGN KEY ("consultancyId") REFERENCES "consultancies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "clients" ADD CONSTRAINT "clients_consultancyId_fkey" FOREIGN KEY ("consultancyId") REFERENCES "consultancies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "clients" ADD CONSTRAINT "clients_assignedConsultantId_fkey" FOREIGN KEY ("assignedConsultantId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activity_logs" ADD CONSTRAINT "activity_logs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activity_logs" ADD CONSTRAINT "activity_logs_consultancyId_fkey" FOREIGN KEY ("consultancyId") REFERENCES "consultancies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activity_logs" ADD CONSTRAINT "activity_logs_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "clients"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "email_templates" ADD CONSTRAINT "email_templates_consultancyId_fkey" FOREIGN KEY ("consultancyId") REFERENCES "consultancies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "email_templates" ADD CONSTRAINT "email_templates_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reminder_logs" ADD CONSTRAINT "reminder_logs_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "clients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reminder_logs" ADD CONSTRAINT "reminder_logs_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "email_templates"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "billing_records" ADD CONSTRAINT "billing_records_consultancyId_fkey" FOREIGN KEY ("consultancyId") REFERENCES "consultancies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "daily_usage_snapshots" ADD CONSTRAINT "daily_usage_snapshots_consultancyId_fkey" FOREIGN KEY ("consultancyId") REFERENCES "consultancies"("id") ON DELETE CASCADE ON UPDATE CASCADE;
