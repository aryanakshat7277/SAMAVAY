# SAMAVAY (समवाय) — One Connected Government. Simpler Services for Every Citizen.

> **Smart India Hackathon 2026 — Problem Statement ID: SIH26129**  
> **Theme:** System integration and interoperability among government digital platforms, resulting in fragmented service delivery.  
> 
> 🔗 **Live GitHub Repository**: [https://github.com/aryanakshat7277/SAMAVAY](https://github.com/aryanakshat7277/SAMAVAY)  
> 🌐 **Live Deployed Web Application**: [https://aryanakshat7277.github.io/SAMAVAY/](https://aryanakshat7277.github.io/SAMAVAY/)  
> 📑 **Interactive SIH Presentation Deck**: [https://aryanakshat7277.github.io/SAMAVAY/presentation.html](https://aryanakshat7277.github.io/SAMAVAY/presentation.html)  

---

## 🏛️ Project Overview

**SAMAVAY** is a sovereign, citizen-first Government Digital Services and Interoperability Ecosystem. Rather than requiring citizens to visit multiple disconnected department portals and repeatedly type identical personal information, SAMAVAY establishes a unified digital service and interoperability mesh connecting **Municipal, Transport, Revenue, Health, Education, and Social Welfare** systems.

### Core Philosophy
* **For Citizens**: "Simple Experience for Citizens" — unified discovery, 4-step application with **Citizen Data Reuse & Consent Review**, and end-to-end transparent service tracking without technical jargon.
* **For Government Administrators**: "Connected Systems for Government" — a dedicated **Government Administration Portal (`/admin`)** providing Platform Registry, Visual Service-to-Platform Mapping, Integration Hub (with 4-step wizard & 8-stage lifecycle), Data Requirements Mapping, Service Workflows, Audit Logs, and Real-Time Interoperability Monitoring.

---

## 🌟 Key Features & Architecture (Orchestration & Interoperability)

### 1. Service Readiness Checker (`GET /api/services/{id}/readiness`)
- Dynamic 4-step preparation animation:
  - `✓ Service identified and parameters loaded`
  - `✓ Required information identified`
  - `✓ Connected government platforms checked`
  - `✓ Reviewing available information`
- Analyzes connected registries and citizen profile to classify requirements into:
  - **Available Records** (auto-retrieved with citizen permission).
  - **Information Needed From Citizen** (only truly missing fields).

### 2. Dynamic Form Engine (`GET /api/services/{id}/dynamic-form`)
- Dynamically hides inputs for data that is already available via sovereign registries.
- Displays pre-verified records in a clean badge box (*"Auto-Reused Information: No Manual Upload Needed"*).
- Only prompts citizens for truly missing departmental inputs.

### 3. Workflow Execution & Live Journey (`/api/service-requests/{id}/journey`)
- Autonomous multi-stage execution across departments and registries.
- Dual-perspective translation: Reassuring, simple phrasing for citizens (*"Waiting for Department Review"*, *"Cross-Registry Verification Complete"*) and detailed technical telemetry for admins (`mTLS PKI_X509 Verified: RoR matched in 38ms`).

### 4. Citizen Action & Guidance Engine (`GET /api/service-requests/{id}/next-action`)
- Displays contextual **Action Required** banners on the Citizen Dashboard when consent or additional input is needed.
- In-flight **Continue Your Services** cards to directly resume submissions.

### 5. Admin Orchestration Console (`/admin/orchestration`)
- Telemetry dashboard with Active Executions, Waiting Consent, Waiting Dept, Completed Today, Fallbacks Triggered, and Latencies.
- Detailed step execution telemetry page (`/admin/orchestration/:id`).

### 6. Interoperability Rule Engine (`/admin/rules`)
- Configurable condition-driven rules (e.g. `IF Service = Property Tax AND Bhoomi = Connected THEN Reuse Deed`).

### 7. Authoritative Data Sources Catalog (`/admin/data-sources`)
- Catalog of all data fields, categories, authoritative departments, registered platforms, and routing priorities (`PRIMARY`, `SECONDARY`, `FALLBACK`).

---

## 🛡️ Phase 4 Key Features & Architecture (Secure Operational & Governance Layer)

### 1. Central Interoperability Gateway (`InteroperabilityGatewayService`)
- Controlled communication layer connecting Service Orchestrator to Platform Connectors.
- Validates Access Policies and enforces active DPDP consent tokens before every exchange.
- Employs fallback strategies (controlled retries up to 2 times, then switches to secondary replica).
- Logs metadata audit records with zero raw PII exposure.

### 2. Platform Connector Framework (`org.sih.samavay.connector.*`)
- Implementations for Revenue, Transport, Municipal, and Citizen Profile platforms.
- Supports simulation modes: `NORMAL`, `SLOW`, `UNAVAILABLE`, `CONSENT_REQUIRED`, `FAILURE`.

### 3. Data Exchange Activity Governance (`/admin/data-exchange`)
- Audits cross-platform transactions: Request ID, Source, Destination, Data Category, Status, Latency (ms), Fallback Used.
- Interactive slide-over audit drawer verifying mTLS PKI_X509, DPDP consent tokens, and security standards with no sensitive citizen data displayed.

### 4. Platform Status & Service Impact Analysis (`/admin/platform-status`)
- Real-time platform health cards with latencies, uptime, and active connection counts.
- **Service Impact Analysis Panel**: Selecting any platform instantly computes which downstream citizen services are affected and whether an automatic fallback is engaged.

### 5. API Access Policies (`/admin/access-policies`)
- Platform-to-platform permissions table by data category.
- Enables administrators to enforce or relax consent requirements and toggle communication permissions.

### 6. Admin Alert Center (`/admin/alerts`)
- Prioritized incident management (`LOW`, `MEDIUM`, `HIGH`, `CRITICAL`) with review and resolution actions.

### 7. Public Infrastructure Analytics (`/admin/analytics`)
- **62% Information Reuse Rate Hero Card**: 620 out of 1,000 required fields auto-populated from sovereign registries.
- **One Unified Citizen Journey**: Fragmentation reduction indicator showing previous 4 departmental portals reduced to 1 single citizen touchpoint.
- 98.4% Integration Success Rate across 1.66M+ transactions.

---

## 🛠️ Technology Stack

### Frontend
- **React 18 + TypeScript**
- **Vite**
- **Tailwind CSS** (Government color palette `#0284c7`, `#082f49`, `#F8FAFC`)
- **React Router v6**
- **Lucide Icons**
- **Axios** (With modular API client services & automatic fallback)

### Backend
- **Java 21 / 25 + Spring Boot 3.4.3**
- **Spring Web (REST APIs)**
- **Spring Data JPA**
- **Spring Security & JWT Authentication**
- **H2 In-Memory DB & PostgreSQL Drivers**
- **Layered Architecture**: Controller ➔ Service ➔ Repository ➔ Entity

---

## 📂 Project Structure

```text
GOVSYNC/
├── backend/                         # Spring Boot 3.4.3 Backend
│   ├── pom.xml
│   └── src/main/java/org/sih/samavay/
│       ├── SamavayApplication.java
│       ├── config/                  # SecurityConfig, JwtService, DataInitializer
│       ├── controller/              # AdminPlatformController, AdminIntegrationController,
│       │                            # DataRequirementController, ConsentController,
│       │                            # WorkflowController, MonitoringController, AdminAuditLogController
│       ├── entity/                  # GovernmentPlatform, IntegrationConnection, DataRequirement,
│       │                            # DataConsent, ServiceWorkflow, WorkflowStep, AuditLog, User, Service
│       ├── repository/              # Spring Data JPA Repositories
│       └── service/                 # Core interoperability & workflow services
└── frontend/                        # React 18 + Vite + TypeScript Frontend
    ├── package.json
    ├── tailwind.config.js
    └── src/
        ├── components/
        │   ├── layout/              # TopGovBanner, Header, Footer, AdminLayout
        │   ├── common/              # StatusBadge, SearchBar, StatCard
        │   ├── services/            # ServiceCard, DepartmentCard, ServiceApplyModal (with Data Reuse)
        │   └── dashboard/           # ApplicationTracker (5-Stage Journey), ConnectedPlatformsWidget
        ├── pages/
        │   ├── public/              # LandingPage, LoginPage, RegisterPage, HowItWorksPage, HelpPage
        │   ├── citizen/             # CitizenDashboard, ServicesDirectoryPage, ServiceDetailPage,
        │   │                        # DepartmentsDirectoryPage, MyApplicationsPage, NotificationsPage,
        │   │                        # MyDataPermissionsPage (/dashboard/permissions)
        │   └── admin/               # AdminOverviewPage, AdminPlatformRegistryPage, PlatformDetailPage,
        │                            # ServiceMappingPage, IntegrationHubPage, DataRequirementsPage,
        │                            # ConsentManagementPage, InteroperabilityMonitoringPage, AuditLogsPage
        ├── services/
        │   ├── api/                 # Modular API layer (platformApi, integrationApi, consentApi, etc.)
        │   ├── api.ts               # Main REST client + resilient fallback
        │   └── mockData.ts          # Seed data mirror
        ├── context/                 # AuthContext, NotificationContext
        └── types/                   # TypeScript domain models
```

---

## 🚀 Quick Start Guide

### 1. Run the Spring Boot Backend
```bash
cd backend
mvn spring-boot:run
```
- **Backend API**: `http://localhost:8080`
- **H2 Database Console**: `http://localhost:8080/h2-console` (JDBC URL: `jdbc:h2:mem:samavaydb`)

### 2. Run the Frontend Dev Server
```bash
cd frontend
npm install
npm run dev
```
- **Citizen & Admin Portal**: `http://localhost:5173`

---

## 🔑 Demo Access Credentials

| Role | Email / Username | Password | Access Portals |
| :--- | :--- | :--- | :--- |
| **Demo Citizen** | `citizen.demo@samavay.gov.in` | `DemoPass@2026` | Citizen Dashboard, Services, Data Permissions (`/dashboard/permissions`) |
| **Department Officer / Admin** | `officer.admin@samavay.gov.in` | `OfficerPass@2026` | Administration Portal (`/admin`), Platform Registry, Integration Hub, Monitoring |
| **Super Admin** | `super.admin@samavay.gov.in` | `AdminPass@2026` | Full platform access & configuration |

---

## 📡 Key REST API Endpoints

### Citizen & Public APIs
- `POST /api/auth/demo-login` — Instant citizen demo authentication
- `GET /api/departments` — List of connected government departments
- `GET /api/services` — Full government services catalog
- `POST /api/service-requests` — Submit a citizen service request
- `GET /api/service-requests/user/{userId}` — Citizen application history
- `GET /api/services/{id}/data-requirements` — Required fields & sources for a service
- `GET /api/consents/user/{userId}` — Citizen active/revoked data consents
- `POST /api/consents` — Grant citizen data reuse consent
- `PUT /api/consents/{id}/revoke` — Revoke citizen data consent

### Administration, Governance & SIH Demo APIs
- `GET /api/admin/control-center/summary` — Master administration overview telemetry
- `POST /api/admin/demo/scenario/{scenarioId}` — Execute 5 SIH demonstration scenarios
- `PUT /api/admin/demo/platform-mode` — Configure connector simulation mode (`NORMAL`, `SLOW`, `UNAVAILABLE`, `FAILURE`, `CONSENT_REQUIRED`)
- `GET /api/admin/insights` — System-generated smart insights & optimization opportunities
- `POST /api/gateway/request` — Interoperability gateway cross-platform request dispatch
- `GET /api/admin/platform-status` — Real-time platform health monitoring
- `GET /api/admin/platforms/{id}/impact` — Downstream citizen service impact analysis
- `GET /api/admin/data-exchange` — Metadata exchange logs with zero PII exposure
- `GET /api/admin/access-policies` — Platform-to-platform access control rules
- `GET /api/admin/alerts` — Operational alert incident management
- `GET /api/admin/analytics/summary` — Platform analytics, 62% information reuse rate & fragmentation reduction
- `GET /api/admin/events` — Real-time system events stream
- `GET /api/admin/platforms` — Registry of connected government platforms
- `GET /api/admin/integrations` — All cross-department integration connections
- `GET /api/admin/rules` — Interoperability rules engine
- `GET /api/admin/data-sources` — Authoritative data sources catalog
- `GET /swagger-ui.html` / `GET /v3/api-docs` — Interactive OpenAPI / Swagger Documentation

