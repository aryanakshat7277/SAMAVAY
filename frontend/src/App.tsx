import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';

// Layout Components
import { TopGovBanner } from './components/layout/TopGovBanner';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { AdminLayout } from './components/layout/AdminLayout';
import { PersonaSwitcher } from './components/common/PersonaSwitcher';
import { CitizenAssistant } from './components/common/CitizenAssistant';

// Public & Citizen Pages
import { LandingPage } from './pages/public/LandingPage';
import { LoginPage } from './pages/public/LoginPage';
import { RegisterPage } from './pages/public/RegisterPage';
import { HowItWorksPage } from './pages/public/HowItWorksPage';
import { HelpPage } from './pages/public/HelpPage';
import { HowSamavayWorksPage } from './pages/public/HowSamavayWorksPage';

import { CitizenDashboard } from './pages/citizen/CitizenDashboard';
import { ServicesDirectoryPage } from './pages/citizen/ServicesDirectoryPage';
import { ServiceDetailPage } from './pages/citizen/ServiceDetailPage';
import { DepartmentsDirectoryPage } from './pages/citizen/DepartmentsDirectoryPage';
import { MyApplicationsPage } from './pages/citizen/MyApplicationsPage';
import { NotificationsPage } from './pages/citizen/NotificationsPage';
import { MyDataPermissionsPage } from './pages/citizen/MyDataPermissionsPage';

// Admin Portal Pages (Phase 2 & Phase 3)
import { AdminPlatformRegistryPage } from './pages/admin/AdminPlatformRegistryPage';
import { PlatformDetailPage } from './pages/admin/PlatformDetailPage';
import { ServiceMappingPage } from './pages/admin/ServiceMappingPage';
import { IntegrationHubPage } from './pages/admin/IntegrationHubPage';
import { DataRequirementsPage } from './pages/admin/DataRequirementsPage';
import { ConsentManagementPage } from './pages/admin/ConsentManagementPage';
import { InteroperabilityMonitoringPage } from './pages/admin/InteroperabilityMonitoringPage';
import { AuditLogsPage } from './pages/admin/AuditLogsPage';
import { AdminDepartmentsPage } from './pages/admin/AdminDepartmentsPage';
import { AdminSettingsPage } from './pages/admin/AdminSettingsPage';

// Phase 3 Orchestration Pages
import { AdminOrchestrationPage } from './pages/admin/AdminOrchestrationPage';
import { AdminExecutionDetailPage } from './pages/admin/AdminExecutionDetailPage';
import { InteroperabilityRulesPage } from './pages/admin/InteroperabilityRulesPage';
import { DataSourcesPage } from './pages/admin/DataSourcesPage';

// Phase 4 Operational & Governance Pages
import { DataExchangePage } from './pages/admin/DataExchangePage';
import { PlatformStatusPage } from './pages/admin/PlatformStatusPage';
import { AccessPoliciesPage } from './pages/admin/AccessPoliciesPage';
import { AdminAlertsPage } from './pages/admin/AdminAlertsPage';
import { AdminAnalyticsPage } from './pages/admin/AdminAnalyticsPage';

// Phase 5 Control Center, Demo Mode & Insights
import { AdminControlCenterPage } from './pages/admin/AdminControlCenterPage';
import { AdminDemoModePage } from './pages/admin/AdminDemoModePage';
import { AdminInsightsPage } from './pages/admin/AdminInsightsPage';

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <NotificationProvider>
        <Router>
          <PersonaSwitcher />
          <CitizenAssistant />
          <Routes>
            {/* Government Administration Portal Routes (/admin/*) */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminControlCenterPage />} />
              <Route path="control-center" element={<AdminControlCenterPage />} />
              <Route path="overview" element={<AdminControlCenterPage />} />
              <Route path="demo" element={<AdminDemoModePage />} />
              <Route path="insights" element={<AdminInsightsPage />} />
              <Route path="analytics" element={<AdminAnalyticsPage />} />
              <Route path="orchestration" element={<AdminOrchestrationPage />} />
              <Route path="orchestration/:id" element={<AdminExecutionDetailPage />} />
              <Route path="platform-status" element={<PlatformStatusPage />} />
              <Route path="platform-status/:id" element={<PlatformStatusPage />} />
              <Route path="data-exchange" element={<DataExchangePage />} />
              <Route path="access-policies" element={<AccessPoliciesPage />} />
              <Route path="alerts" element={<AdminAlertsPage />} />
              <Route path="rules" element={<InteroperabilityRulesPage />} />
              <Route path="data-sources" element={<DataSourcesPage />} />
              <Route path="departments" element={<AdminDepartmentsPage />} />
              <Route path="platforms" element={<AdminPlatformRegistryPage />} />
              <Route path="platforms/new" element={<AdminPlatformRegistryPage />} />
              <Route path="platforms/:id" element={<PlatformDetailPage />} />
              <Route path="service-mapping" element={<ServiceMappingPage />} />
              <Route path="integrations" element={<IntegrationHubPage />} />
              <Route path="integrations/new" element={<IntegrationHubPage />} />
              <Route path="data-requirements" element={<DataRequirementsPage />} />
              <Route path="consents" element={<ConsentManagementPage />} />
              <Route path="monitoring" element={<InteroperabilityMonitoringPage />} />
              <Route path="audit-logs" element={<AuditLogsPage />} />
              <Route path="settings" element={<AdminSettingsPage />} />
            </Route>

            {/* Public & Citizen Portal Routes (with Sovereign Header & Footer) */}
            <Route
              path="/*"
              element={
                <div className="min-h-screen flex flex-col bg-sandstone-100">
                  <TopGovBanner />
                  <Header />
                  <main className="flex-1">
                    <Routes>
                      {/* Public Discovery */}
                      <Route path="/" element={<LandingPage />} />
                      <Route path="/login" element={<LoginPage />} />
                      <Route path="/register" element={<RegisterPage />} />
                      <Route path="/how-it-works" element={<HowItWorksPage />} />
                      <Route path="/how-samavay-works" element={<HowSamavayWorksPage />} />
                      <Route path="/help" element={<HelpPage />} />

                      {/* Services & Departments */}
                      <Route path="/services" element={<ServicesDirectoryPage />} />
                      <Route path="/services/:id" element={<ServiceDetailPage />} />
                      <Route path="/departments" element={<DepartmentsDirectoryPage />} />

                      {/* Authenticated Citizen Experience */}
                      <Route path="/dashboard" element={<CitizenDashboard />} />
                      <Route path="/applications" element={<MyApplicationsPage />} />
                      <Route path="/notifications" element={<NotificationsPage />} />
                      <Route path="/dashboard/permissions" element={<MyDataPermissionsPage />} />
                      <Route path="/permissions" element={<MyDataPermissionsPage />} />

                      {/* Legacy shortcut */}
                      <Route path="/interoperability" element={<AdminControlCenterPage />} />

                      {/* Catch-all */}
                      <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                  </main>
                  <Footer />
                </div>
              }
            />
          </Routes>
        </Router>
      </NotificationProvider>
    </AuthProvider>
  );
};

export default App;
