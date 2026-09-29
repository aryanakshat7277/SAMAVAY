package org.sih.samavay.config;

import org.sih.samavay.entity.*;
import org.sih.samavay.repository.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;

@Component
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final DepartmentRepository departmentRepository;
    private final GovernmentServiceRepository serviceRepository;
    private final GovernmentPlatformRepository platformRepository;
    private final IntegrationConnectionRepository connectionRepository;
    private final ServiceRequestRepository serviceRequestRepository;
    private final NotificationRepository notificationRepository;
    private final AuditLogRepository auditLogRepository;
    private final DataRequirementRepository dataRequirementRepository;
    private final DataConsentRepository dataConsentRepository;
    private final ServiceWorkflowRepository serviceWorkflowRepository;
    private final WorkflowStepRepository workflowStepRepository;
    private final DataSourceMappingRepository dataSourceMappingRepository;
    private final DynamicFormConfigurationRepository dynamicFormConfigurationRepository;
    private final FormFieldRepository formFieldRepository;
    private final WorkflowExecutionRepository workflowExecutionRepository;
    private final WorkflowExecutionStepRepository workflowExecutionStepRepository;
    private final ServiceActionRepository serviceActionRepository;
    private final InteroperabilityRuleRepository interoperabilityRuleRepository;
    private final GatewayRequestLogRepository gatewayRequestLogRepository;
    private final SystemEventRepository systemEventRepository;
    private final AccessPolicyRepository accessPolicyRepository;
    private final SystemAlertRepository systemAlertRepository;
    private final InteroperabilityInsightRepository interoperabilityInsightRepository;
    private final PasswordEncoder passwordEncoder;

    public DataInitializer(UserRepository userRepository,
                           DepartmentRepository departmentRepository,
                           GovernmentServiceRepository serviceRepository,
                           GovernmentPlatformRepository platformRepository,
                           IntegrationConnectionRepository connectionRepository,
                           ServiceRequestRepository serviceRequestRepository,
                           NotificationRepository notificationRepository,
                           AuditLogRepository auditLogRepository,
                           DataRequirementRepository dataRequirementRepository,
                           DataConsentRepository dataConsentRepository,
                           ServiceWorkflowRepository serviceWorkflowRepository,
                           WorkflowStepRepository workflowStepRepository,
                           DataSourceMappingRepository dataSourceMappingRepository,
                           DynamicFormConfigurationRepository dynamicFormConfigurationRepository,
                           FormFieldRepository formFieldRepository,
                           WorkflowExecutionRepository workflowExecutionRepository,
                           WorkflowExecutionStepRepository workflowExecutionStepRepository,
                           ServiceActionRepository serviceActionRepository,
                           InteroperabilityRuleRepository interoperabilityRuleRepository,
                           GatewayRequestLogRepository gatewayRequestLogRepository,
                           SystemEventRepository systemEventRepository,
                           AccessPolicyRepository accessPolicyRepository,
                           SystemAlertRepository systemAlertRepository,
                           InteroperabilityInsightRepository interoperabilityInsightRepository,
                           PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.departmentRepository = departmentRepository;
        this.serviceRepository = serviceRepository;
        this.platformRepository = platformRepository;
        this.connectionRepository = connectionRepository;
        this.serviceRequestRepository = serviceRequestRepository;
        this.notificationRepository = notificationRepository;
        this.auditLogRepository = auditLogRepository;
        this.dataRequirementRepository = dataRequirementRepository;
        this.dataConsentRepository = dataConsentRepository;
        this.serviceWorkflowRepository = serviceWorkflowRepository;
        this.workflowStepRepository = workflowStepRepository;
        this.dataSourceMappingRepository = dataSourceMappingRepository;
        this.dynamicFormConfigurationRepository = dynamicFormConfigurationRepository;
        this.formFieldRepository = formFieldRepository;
        this.workflowExecutionRepository = workflowExecutionRepository;
        this.workflowExecutionStepRepository = workflowExecutionStepRepository;
        this.serviceActionRepository = serviceActionRepository;
        this.interoperabilityRuleRepository = interoperabilityRuleRepository;
        this.gatewayRequestLogRepository = gatewayRequestLogRepository;
        this.systemEventRepository = systemEventRepository;
        this.accessPolicyRepository = accessPolicyRepository;
        this.systemAlertRepository = systemAlertRepository;
        this.interoperabilityInsightRepository = interoperabilityInsightRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) throws Exception {
        if (departmentRepository.count() > 0) {
            return; // Data already initialized
        }

        // 1. Create Users
        User demoCitizen = new User("Aarav Sharma", "citizen.demo@samavay.gov.in", "9876543210",
                passwordEncoder.encode("DemoPass@2026"), Role.CITIZEN);
        demoCitizen = userRepository.save(demoCitizen);

        User officer = new User("Rajesh Varma", "officer.admin@samavay.gov.in", "9876543211",
                passwordEncoder.encode("OfficerPass@2026"), Role.DEPARTMENT_ADMIN);
        userRepository.save(officer);

        User superAdmin = new User("Suresh Patel", "super.admin@samavay.gov.in", "9876543212",
                passwordEncoder.encode("AdminPass@2026"), Role.SUPER_ADMIN);
        userRepository.save(superAdmin);

        // 2. Create Departments
        Department municipal = departmentRepository.save(new Department(
                "Municipal Corporation", "MUNICIPAL",
                "Local urban governance, property tax assessments, birth & death registrations, trade licensing, and civic utilities.",
                "Building2", 6
        ));

        Department transport = departmentRepository.save(new Department(
                "Transport Department", "TRANSPORT",
                "Vehicle registration, driving license issuance, road permits, fitness certifications, and road safety regulations.",
                "Car", 5
        ));

        Department revenue = departmentRepository.save(new Department(
                "Revenue & Land Records", "REVENUE",
                "Land ownership records, title mutation, property encumbrance certificates, caste & income certifications, and agricultural land assessments.",
                "Landmark", 5
        ));

        Department health = departmentRepository.save(new Department(
                "Health & Family Welfare", "HEALTH",
                "Public healthcare schemes, health insurance registries, hospital bed allocations, and universal immunization records.",
                "HeartPulse", 4
        ));

        Department education = departmentRepository.save(new Department(
                "School & Higher Education", "EDUCATION",
                "Academic scholarship disbursements, school admissions, certificate verifications, and higher education assistance.",
                "GraduationCap", 4
        ));

        Department welfare = departmentRepository.save(new Department(
                "Social Welfare Department", "WELFARE",
                "Senior citizen welfare programs, pension assistance, disability support schemes, and financial aid for underserved communities.",
                "HandHeart", 4
        ));

        // 3. Create Services
        GovernmentService propTax = serviceRepository.save(new GovernmentService(
                "Property Tax Assessment & Receipt", "MUN-001",
                "Calculate, view assessment details, pay outstanding property tax dues, and download digitally signed municipal tax receipts.",
                municipal.getId(), municipal.getName(), "MUNICIPAL",
                "Property owners or registered leaseholders in the municipal jurisdiction.",
                "Previous Tax Receipt / Property ID, Registered Sale Deed, Electricity Bill.",
                3, "Free Assessment / Tax as Applicable", true
        ));

        GovernmentService birthCert = serviceRepository.save(new GovernmentService(
                "Birth Certificate Issuance", "MUN-002",
                "Apply for an official, digitally verifiable birth certificate from the Municipal Registrar of Births and Deaths.",
                municipal.getId(), municipal.getName(), "MUNICIPAL",
                "Parents or legal guardians of individuals born within municipal limits.",
                "Hospital Discharge Summary, Identity Proof of Parents, Address Proof.",
                5, "₹ 20", true
        ));

        GovernmentService tradeLicense = serviceRepository.save(new GovernmentService(
                "Trade & Business Operating License", "MUN-003",
                "Apply for new commercial trade license or renew existing trade permits within municipal urban jurisdiction.",
                municipal.getId(), municipal.getName(), "MUNICIPAL",
                "Proprietors, partners, or registered companies operating a commercial establishment.",
                "Premises Rent Agreement/Ownership Deed, Business Plan, Fire Safety NOC.",
                7, "₹ 250", false
        ));

        GovernmentService dlRenewal = serviceRepository.save(new GovernmentService(
                "Driving Licence Renewal", "TRN-001",
                "Renew expired or expiring Driving Licence with contactless biometric and address verification.",
                transport.getId(), transport.getName(), "TRANSPORT",
                "Holders of valid Indian Driving Licences within 1 year before or after expiration date.",
                "Existing Driving Licence copy, Medical Certificate (Form 1A if age > 40), Passport photo.",
                4, "₹ 200", true
        ));

        GovernmentService vehTransfer = serviceRepository.save(new GovernmentService(
                "Vehicle Ownership Transfer (RC)", "TRN-002",
                "Transfer vehicle registration certificate ownership following a sale, inheritance, or auction.",
                transport.getId(), transport.getName(), "TRANSPORT",
                "Buyer and seller of a motor vehicle registered in the state.",
                "Form 29 & 30 signed, Original RC Book, Valid Insurance & PUC, Sale Receipt.",
                10, "₹ 350", true
        ));

        GovernmentService landMutation = serviceRepository.save(new GovernmentService(
                "Land Mutation (Namantaran / Record of Rights)", "REV-001",
                "Update ownership details in the official state land revenue register following property purchase or inheritance.",
                revenue.getId(), revenue.getName(), "REVENUE",
                "Legal owners with registered title deed or court succession certificate.",
                "Registered Sale Deed, Previous Khata/Patta copy, Encumbrance Certificate.",
                14, "₹ 150", true
        ));

        GovernmentService incomeCert = serviceRepository.save(new GovernmentService(
                "Income & Asset Certificate", "REV-002",
                "Obtain official revenue certified income certificate for educational scholarships, reservations, and welfare subsidies.",
                revenue.getId(), revenue.getName(), "REVENUE",
                "Permanent state residents requiring income verification for institutional schemes.",
                "Salary Slip / Form 16 / ITR, Bank Statement (6 months), Local Patwari Verification.",
                6, "₹ 30", true
        ));

        GovernmentService ayushmanCard = serviceRepository.save(new GovernmentService(
                "Ayushman Bharat PM-JAY Golden Card", "HLT-001",
                "Generate and download Ayushman Bharat digital health card for cashless secondary and tertiary hospitalization.",
                health.getId(), health.getName(), "HEALTH",
                "Eligible households under SECC 2011 registry and state health protection criteria.",
                "Aadhaar Card, Ration Card / State Family ID, Mobile Number.",
                1, "Free of Cost", true
        ));

        GovernmentService preMatricScholarship = serviceRepository.save(new GovernmentService(
                "National & State Post-Matric Scholarship", "EDU-001",
                "Financial scholarship assistance for higher secondary, undergraduate, and technical education students.",
                education.getId(), education.getName(), "EDUCATION",
                "Regular students enrolled in recognized state/central institutions with family annual income < ₹ 2.5 Lakhs.",
                "Previous Year Marks Sheet, College Bonafide Certificate, Income Certificate, Bank Passbook.",
                15, "Free of Cost", true
        ));

        GovernmentService seniorPension = serviceRepository.save(new GovernmentService(
                "Old Age & Senior Citizen Pension Scheme", "WEL-001",
                "Monthly financial pension support for senior citizens living without organized pension benefits.",
                welfare.getId(), welfare.getName(), "WELFARE",
                "Senior citizens aged 60 years and above belonging to BPL or low-income threshold.",
                "Age Proof (Birth Certificate/Voter ID), BPL Card, Bank Account Details (Aadhaar linked).",
                12, "Free of Cost", true
        ));

        // 4. Create Government Platforms
        GovernmentPlatform epalika = platformRepository.save(new GovernmentPlatform(
                "e-NagarPalika Municipal Core", "EPALIKA-CORE", municipal.getId(), municipal.getName(),
                "Central municipal administration and civic tax assessment microservice cluster.",
                "GOVERNMENT_DATABASE", "PRODUCTION", "CONNECTED", "https://epalika.gov.in/api/v2", "OAUTH2_MGS"
        ));

        GovernmentPlatform vahan = platformRepository.save(new GovernmentPlatform(
                "VAHAN 4.0 Vehicle Registry", "VAHAN-REG-4", transport.getId(), transport.getName(),
                "National vehicle registry, ownership records, and state border taxation engine.",
                "API_PLATFORM", "PRODUCTION", "CONNECTED", "https://vahan.parivahan.gov.in/api/v4", "PKI_X509"
        ));

        GovernmentPlatform sarathi = platformRepository.save(new GovernmentPlatform(
                "SARATHI 4.0 Driving License System", "SARATHI-DL-4", transport.getId(), transport.getName(),
                "Licensing authority workflow, biometric deduplication, and automated driving test records.",
                "API_PLATFORM", "PRODUCTION", "CONNECTED", "https://sarathi.parivahan.gov.in/api/v4", "PKI_X509"
        ));

        GovernmentPlatform bhoomi = platformRepository.save(new GovernmentPlatform(
                "Bhoomi Land Records Information System", "BHOOMI-LRS", revenue.getId(), revenue.getName(),
                "Spatial cadastral maps, RoR ownership database, and sub-registrar deed indexing.",
                "GOVERNMENT_DATABASE", "PRODUCTION", "CONNECTED", "https://bhoomi.revenue.gov.in/api/v3", "SAML2_GOV"
        ));

        GovernmentPlatform pmjay = platformRepository.save(new GovernmentPlatform(
                "Ayushman Bharat PM-JAY National Portal", "PMJAY-NAT", health.getId(), health.getName(),
                "Beneficiary Identification System (BIS) and Hospital Empanelment Management System.",
                "CITIZEN_PORTAL", "PRODUCTION", "CONNECTED", "https://pmjay.gov.in/api/v2", "OAUTH2_MGS"
        ));

        GovernmentPlatform digilocker = platformRepository.save(new GovernmentPlatform(
                "DigiLocker Government Document Exchange", "DIGILOCKER-GW", revenue.getId(), "Inter-Department Gateway",
                "Secure sovereign repository for digitally signed citizen credentials and certificates.",
                "API_PLATFORM", "PRODUCTION", "CONNECTED", "https://digilocker.gov.in/interop/v1", "OAUTH2_MGS"
        ));

        GovernmentPlatform scholarshipPfm = platformRepository.save(new GovernmentPlatform(
                "National Scholarship & PFMS Portal", "PFMS-NSP", education.getId(), education.getName(),
                "Central direct benefit transfer disbursement gateway for student scholarships.",
                "API_PLATFORM", "PRODUCTION", "CONNECTED", "https://scholarships.gov.in/api/v1", "PKI_X509"
        ));

        GovernmentPlatform socialWelfareReg = platformRepository.save(new GovernmentPlatform(
                "Social Welfare Beneficiary DB", "SW-BENEFICIARY", welfare.getId(), welfare.getName(),
                "State-wide registry of pension beneficiaries and disability welfare grants.",
                "GOVERNMENT_DATABASE", "PRODUCTION", "CONNECTED", "https://welfare.gov.in/api/v2", "SAML2_GOV"
        ));

        // 5. Create Integration Connections
        connectionRepository.saveAll(List.of(
                new IntegrationConnection("Municipal-to-Land Records Pipe", epalika.getId(), epalika.getName(),
                        bhoomi.getId(), bhoomi.getName(), "SECURE_GATEWAY", "Real-time Property Deed Verification",
                        "ACTIVE", "HTTPS/JSON (e-Gov Interop v2.1)", "Property Records, Cadastral Map ID", 142050L),
                new IntegrationConnection("VAHAN to DigiLocker Sync", vahan.getId(), vahan.getName(),
                        digilocker.getId(), digilocker.getName(), "REST_API", "Digital Vehicle RC Issuance",
                        "ACTIVE", "HTTPS/JSON (e-Gov Interop v2.1)", "Vehicle RC, PUC Certificate", 584200L),
                new IntegrationConnection("SARATHI Biometric Verification", sarathi.getId(), sarathi.getName(),
                        digilocker.getId(), digilocker.getName(), "REST_API", "Driving Licence Credential Verification",
                        "ACTIVE", "HTTPS/JSON (e-Gov Interop v2.1)", "Driving Licence, Biometric Hash", 398100L),
                new IntegrationConnection("Bhoomi Encumbrance Gateway", bhoomi.getId(), bhoomi.getName(),
                        digilocker.getId(), digilocker.getName(), "DATA_PIPELINE", "Land Title RoR Certificate Delivery",
                        "ACTIVE", "HTTPS/JSON (e-Gov Interop v2.1)", "Record of Rights, Mutation Order", 276900L),
                new IntegrationConnection("Ayushman BIS Direct Check", pmjay.getId(), pmjay.getName(),
                        digilocker.getId(), digilocker.getName(), "REST_API", "Golden Card Verification",
                        "ACTIVE", "HTTPS/JSON (e-Gov Interop v2.1)", "Health Card ID, SECC Ration Record", 189000L),
                new IntegrationConnection("PFMS Education Scholarship Pipe", scholarshipPfm.getId(), scholarshipPfm.getName(),
                        digilocker.getId(), digilocker.getName(), "REST_API", "Student Academic Marks Verification",
                        "APPROVED", "HTTPS/JSON (e-Gov Interop v2.1)", "Marks Card, College Bonafide", 74300L),
                new IntegrationConnection("Municipal Trade to Safety Gateway", epalika.getId(), epalika.getName(),
                        socialWelfareReg.getId(), socialWelfareReg.getName(), "SECURE_GATEWAY", "Commercial Safety Clearance",
                        "UNDER_REVIEW", "HTTPS/JSON (e-Gov Interop v2.1)", "Safety NOC, Operating Premise ID", 0L),
                new IntegrationConnection("Welfare Pension Direct Bank Transfer", socialWelfareReg.getId(), socialWelfareReg.getName(),
                        scholarshipPfm.getId(), scholarshipPfm.getName(), "DATA_PIPELINE", "Direct Benefit Transfer Routing",
                        "DRAFT", "HTTPS/JSON (e-Gov Interop v2.1)", "Aadhaar Payment Bridge, Bank Account", 0L)
        ));

        // 6. Create Data Requirements
        DataRequirement reqName = dataRequirementRepository.save(new DataRequirement(
                propTax.getId(), propTax.getName(), "Citizen Full Name", "Legal name of the property owner",
                municipal.getId(), municipal.getName(), epalika.getId(), epalika.getName(), true, "AVAILABLE", true, "Applicant Identification"));

        DataRequirement reqPropId = dataRequirementRepository.save(new DataRequirement(
                propTax.getId(), propTax.getName(), "Property Tax Assessment ID", "Municipal property assessment record identifier",
                municipal.getId(), municipal.getName(), epalika.getId(), epalika.getName(), true, "AVAILABLE", true, "Municipal Dues Lookup"));

        DataRequirement reqLandTitle = dataRequirementRepository.save(new DataRequirement(
                propTax.getId(), propTax.getName(), "Land Ownership & Cadastral Title", "Spatial title deed from Bhoomi land records",
                revenue.getId(), revenue.getName(), bhoomi.getId(), bhoomi.getName(), true, "AVAILABLE", true, "Title Verification"));

        DataRequirement reqSelfDecl = dataRequirementRepository.save(new DataRequirement(
                propTax.getId(), propTax.getName(), "Annual Self-Assessment Declaration", "Current occupant and construction status",
                municipal.getId(), municipal.getName(), epalika.getId(), epalika.getName(), false, "NEEDS_INPUT", false, "Assessment Calculation"));

        // Driving Licence Requirements
        dataRequirementRepository.saveAll(List.of(
                new DataRequirement(dlRenewal.getId(), dlRenewal.getName(), "Citizen Identity & Photo", "Official photo and biometric proof",
                        transport.getId(), transport.getName(), sarathi.getId(), sarathi.getName(), true, "AVAILABLE", true, "Identity Matching"),
                new DataRequirement(dlRenewal.getId(), dlRenewal.getName(), "Existing Driving Licence Number", "SARATHI database driving license record",
                        transport.getId(), transport.getName(), sarathi.getId(), sarathi.getName(), true, "AVAILABLE", true, "Licence Record Lookup"),
                new DataRequirement(dlRenewal.getId(), dlRenewal.getName(), "Medical Fitness Self-Declaration (Form 1A)", "Fitness declaration for drivers over 40",
                        health.getId(), health.getName(), pmjay.getId(), pmjay.getName(), false, "NEEDS_INPUT", false, "Medical Suitability")
        ));

        // 7. Create Demo Citizen Data Consents
        dataConsentRepository.saveAll(List.of(
                new DataConsent(demoCitizen.getId(), demoCitizen.getFullName(), propTax.getId(), propTax.getName(),
                        reqPropId.getId(), "Property Tax Assessment ID", municipal.getName(), epalika.getName(), "Municipal Dues Lookup"),
                new DataConsent(demoCitizen.getId(), demoCitizen.getFullName(), propTax.getId(), propTax.getName(),
                        reqLandTitle.getId(), "Land Ownership & Cadastral Title", revenue.getName(), bhoomi.getName(), "Title Verification"),
                new DataConsent(demoCitizen.getId(), demoCitizen.getFullName(), dlRenewal.getId(), dlRenewal.getName(),
                        5L, "Existing Driving Licence Record", transport.getName(), sarathi.getName(), "Licence Renewal")
        ));

        // 8. Create Service Workflows & Steps
        ServiceWorkflow propWorkflow = serviceWorkflowRepository.save(new ServiceWorkflow(
                propTax.getId(), propTax.getName(), "Municipal Property Tax End-to-End Workflow",
                "Automated land registry query, municipal dues computation, officer scrutiny, and digital receipt delivery.",
                5
        ));

        workflowStepRepository.saveAll(List.of(
                new WorkflowStep(propWorkflow.getId(), "Application Received & Queued", 1,
                        municipal.getId(), municipal.getName(), epalika.getId(), epalika.getName(),
                        "Your request is registered on the SAMAVAY network with an instant tracking identifier.", "COMPLETED"),
                new WorkflowStep(propWorkflow.getId(), "Land Records Interoperability Lookup", 2,
                        revenue.getId(), revenue.getName(), bhoomi.getId(), bhoomi.getName(),
                        "Title and survey plot records are being cross-verified with the Bhoomi Land Records registry.", "COMPLETED"),
                new WorkflowStep(propWorkflow.getId(), "Municipal Tax Officer Assessment", 3,
                        municipal.getId(), municipal.getName(), epalika.getId(), epalika.getName(),
                        "Municipal Revenue Inspector is reviewing the verified plot details and self-declared assessment.", "IN_PROGRESS"),
                new WorkflowStep(propWorkflow.getId(), "Digital Seal & Clearance", 4,
                        municipal.getId(), municipal.getName(), epalika.getId(), epalika.getName(),
                        "Digital certificate and tax receipt are queued for sovereign PKI digital signing.", "ACTIVE"),
                new WorkflowStep(propWorkflow.getId(), "Digital Delivery to Citizen & DigiLocker", 5,
                        revenue.getId(), "Inter-Department Gateway", digilocker.getId(), digilocker.getName(),
                        "Final digitally verifiable receipt is issued to your portal dashboard and synced with DigiLocker.", "ACTIVE")
        ));

        // 9. Initial Citizen Service Requests
        ServiceRequest req1 = new ServiceRequest(
                "SAM-2026-10234", demoCitizen.getId(), demoCitizen.getFullName(),
                demoCitizen.getEmail(), demoCitizen.getMobileNumber(), propTax.getId(),
                propTax.getName(), municipal.getName(), "MUNICIPAL",
                "{\"propertyId\":\"M-WARD-40982\",\"ownerName\":\"Aarav Sharma\",\"address\":\"Sector 4, Green Park\",\"assessmentYear\":\"2026-2027\"}",
                RequestStatus.PROCESSING, "Municipal Tax Officer Assessment & Verification"
        );
        req1.setRemarks("Land registry data matched automatically via Bhoomi Interop pipe. Final assessment in signing queue.");
        req1.setSubmittedAt(LocalDateTime.now().minusDays(2));

        ServiceRequest req2 = new ServiceRequest(
                "SAM-2026-09841", demoCitizen.getId(), demoCitizen.getFullName(),
                demoCitizen.getEmail(), demoCitizen.getMobileNumber(), dlRenewal.getId(),
                dlRenewal.getName(), transport.getName(), "TRANSPORT",
                "{\"currentDlNumber\":\"DL-1420110023412\",\"rtoZone\":\"North Zone RTO 01\",\"bloodGroup\":\"B+\"}",
                RequestStatus.COMPLETED, "Smart Card Dispatched & Digital RC Generated"
        );
        req2.setRemarks("Biometric matched successfully via Sarathi Interop Gateway. Digital certificate issued.");
        req2.setCertificateUrl("https://samavay.gov.in/certs/DL-SAM-2026-09841.pdf");
        req2.setSubmittedAt(LocalDateTime.now().minusDays(7));

        ServiceRequest req3 = new ServiceRequest(
                "SAM-2026-11490", demoCitizen.getId(), demoCitizen.getFullName(),
                demoCitizen.getEmail(), demoCitizen.getMobileNumber(), incomeCert.getId(),
                incomeCert.getName(), revenue.getName(), "REVENUE",
                "{\"annualIncome\":\"420000\",\"purpose\":\"Higher Education Scholarship\",\"taluk\":\"Central Taluk\"}",
                RequestStatus.UNDER_REVIEW, "Revenue Inspector Field Inquiry"
        );
        req3.setRemarks("Application assigned to Circle Inspector. Verification scheduled.");
        req3.setSubmittedAt(LocalDateTime.now().minusHours(18));

        serviceRequestRepository.saveAll(List.of(req1, req2, req3));

        // 10. PHASE 3 SEED: Data Source Mappings with Priority
        dataSourceMappingRepository.saveAll(List.of(
                new DataSourceMapping("Identity", "Citizen Full Name", municipal.getId(), municipal.getName(),
                        epalika.getId(), epalika.getName(), "PRIMARY", "AVAILABLE"),
                new DataSourceMapping("Property", "Land Ownership & Cadastral Title", revenue.getId(), revenue.getName(),
                        bhoomi.getId(), bhoomi.getName(), "PRIMARY", "AVAILABLE"),
                new DataSourceMapping("Property", "Property Tax Assessment ID", municipal.getId(), municipal.getName(),
                        epalika.getId(), epalika.getName(), "PRIMARY", "AVAILABLE"),
                new DataSourceMapping("Vehicle", "Existing Driving Licence Number", transport.getId(), transport.getName(),
                        sarathi.getId(), sarathi.getName(), "PRIMARY", "AVAILABLE"),
                new DataSourceMapping("Vehicle", "Vehicle RC Number", transport.getId(), transport.getName(),
                        vahan.getId(), vahan.getName(), "PRIMARY", "AVAILABLE"),
                new DataSourceMapping("Health", "Ayushman Beneficiary Record", health.getId(), health.getName(),
                        pmjay.getId(), pmjay.getName(), "PRIMARY", "AVAILABLE"),
                new DataSourceMapping("Documents", "Digital Certificate Hash", revenue.getId(), "Inter-Department Gateway",
                        digilocker.getId(), digilocker.getName(), "SECONDARY", "AVAILABLE")
        ));

        // 11. PHASE 3 SEED: Dynamic Form Configuration & Fields
        DynamicFormConfiguration propFormConfig = dynamicFormConfigurationRepository.save(new DynamicFormConfiguration(
                propTax.getId(), propTax.getName(), "Property Tax Assessment Form",
                "Provide missing property particulars to calculate dues."
        ));

        formFieldRepository.saveAll(List.of(
                new FormField(propFormConfig.getId(), "propertyId", "Property Assessment ID", "TEXT",
                        "e.g. M-WARD-40982", "Enter municipal property ID if not auto-detected", true, null, reqPropId.getId(), 1),
                new FormField(propFormConfig.getId(), "annualSelfAssessment", "Annual Self-Assessment Value", "NUMBER",
                        "e.g. 18500", "Estimated municipal annual rental value declaration", false, null, reqSelfDecl.getId(), 2),
                new FormField(propFormConfig.getId(), "occupancyType", "Occupancy Status", "DROPDOWN",
                        "Self Occupied / Tenant Occupied", "Select current building occupancy", false, null, null, 3)
        ));

        // 12. PHASE 3 SEED: Workflow Executions & Steps
        WorkflowExecution exec1 = workflowExecutionRepository.save(new WorkflowExecution(
                propWorkflow.getId(), propWorkflow.getName(), req1.getId(),
                req1.getApplicationNumber(), req1.getServiceName(), 5
        ));
        exec1.setCurrentStep(3);
        exec1.setStatus("IN_PROGRESS");
        exec1.setCurrentStageName("Municipal Tax Officer Assessment");
        exec1.setCitizenStatusMessage("Your application is currently under departmental review by the Municipal Revenue Inspector.");
        workflowExecutionRepository.save(exec1);

        workflowExecutionStepRepository.saveAll(List.of(
                new WorkflowExecutionStep(exec1.getId(), 1L, "Application Received & Queued", 1,
                        municipal.getName(), epalika.getName(), "COMPLETED",
                        "Application registered on the SAMAVAY interoperability mesh.", "Gateway dispatch: OK 200 (18ms)"),
                new WorkflowExecutionStep(exec1.getId(), 2L, "Land Records Cross-Verification", 2,
                        revenue.getName(), bhoomi.getName(), "COMPLETED",
                        "Required property records cross-verified via Bhoomi Land Records gateway.", "mTLS PKI_X509 Verified: RoR matched (38ms)"),
                new WorkflowExecutionStep(exec1.getId(), 3L, "Municipal Officer Scrutiny", 3,
                        municipal.getName(), epalika.getName(), "IN_PROGRESS",
                        "Municipal Revenue Inspector is reviewing the verified plot details and self-declared assessment.", "Queue Assigned: Circle Officer Ward 4"),
                new WorkflowExecutionStep(exec1.getId(), 4L, "Digital Seal & Clearance", 4,
                        municipal.getName(), epalika.getName(), "PENDING",
                        "Digital certificate and tax receipt will be queued for sovereign PKI signing.", "Pending scrutiny sign-off"),
                new WorkflowExecutionStep(exec1.getId(), 5L, "Delivery to Dashboard & DigiLocker", 5,
                        "Inter-Department Gateway", digilocker.getName(), "PENDING",
                        "Final digitally verifiable receipt will be synced with DigiLocker.", "DigiLocker Push queued")
        ));

        // 13. PHASE 3 SEED: Smart Citizen Actions
        serviceActionRepository.saveAll(List.of(
                new ServiceAction(req1.getId(), req1.getApplicationNumber(), demoCitizen.getId(),
                        "REVIEW_REQUIRED", "Permission Needed for Land Title Verification",
                        "Please review information access required for your Property Tax Assessment application.",
                        "/dashboard/permissions")
        ));

        // 14. PHASE 3 SEED: Interoperability Rules
        interoperabilityRuleRepository.saveAll(List.of(
                new InteroperabilityRule("Auto-Reuse Bhoomi Cadastral Title",
                        "When citizen applies for Property Certificate and Bhoomi is connected, auto-retrieve deed",
                        propTax.getId(), propTax.getName(), "PLATFORM_STATUS", "BHOOMI_CONNECTED",
                        "REUSE_DATA", "{\"source\":\"Bhoomi LRS\",\"field\":\"Land Ownership & Cadastral Title\"}"),
                new InteroperabilityRule("Enforce DPDP Consent on Identity Records",
                        "When identity details are queried across ministries, require explicit citizen authorization token",
                        propTax.getId(), propTax.getName(), "CONSENT_STATUS", "CONSENT_NOT_GRANTED",
                        "REQUEST_CONSENT", "{\"action\":\"CREATE_CONSENT_ACTION\",\"expiryDays\":90}"),
                new InteroperabilityRule("Omit Verified Fields in Dynamic Form Engine",
                        "When required data is pre-verified via interop pipe, dynamically hide form input",
                        propTax.getId(), propTax.getName(), "DATA_AVAILABILITY", "RECORD_AVAILABLE",
                        "ADD_FORM_FIELD", "{\"mode\":\"OMIT_PRE_VERIFIED\"}")
        ));

        // 15. PHASE 4 SEED: Access Policies
        accessPolicyRepository.saveAll(List.of(
                new AccessPolicy("Municipal to Bhoomi Property Policy", epalika.getId(), epalika.getName(),
                        bhoomi.getId(), bhoomi.getName(), "Property Information", true, true),
                new AccessPolicy("Transport to DigiLocker Identity Policy", sarathi.getId(), sarathi.getName(),
                        digilocker.getId(), digilocker.getName(), "Profile Verification", true, true),
                new AccessPolicy("VAHAN to DigiLocker RC Policy", vahan.getId(), vahan.getName(),
                        digilocker.getId(), digilocker.getName(), "Vehicle Records", true, false),
                new AccessPolicy("Health to Welfare Beneficiary Policy", pmjay.getId(), pmjay.getName(),
                        socialWelfareReg.getId(), socialWelfareReg.getName(), "Health & Welfare Records", true, true)
        ));

        // 16. PHASE 4 SEED: Gateway Request Logs (Metadata Only, Zero PII)
        gatewayRequestLogRepository.saveAll(List.of(
                new GatewayRequestLog("REQ-2026-00128", req1.getId(), req1.getApplicationNumber(),
                        epalika.getId(), epalika.getName(), bhoomi.getId(), bhoomi.getName(),
                        "PROPERTY_TITLE_LOOKUP", "Property Information", "SUCCESS", 240L, false,
                        "Title Deed RoR #42/1A matched and verified against cadastral map."),
                new GatewayRequestLog("REQ-2026-00129", req2.getId(), req2.getApplicationNumber(),
                        sarathi.getId(), sarathi.getName(), digilocker.getId(), digilocker.getName(),
                        "DL_CREDENTIAL_ISSUANCE", "Vehicle Records", "SUCCESS", 180L, false,
                        "Contactless biometric hash match confirmed. Digital DL pushed to DigiLocker."),
                new GatewayRequestLog("REQ-2026-00130", req1.getId(), req1.getApplicationNumber(),
                        epalika.getId(), epalika.getName(), bhoomi.getId(), bhoomi.getName(),
                        "CADASTRAL_BOUNDARY_SYNC", "Property Information", "SUCCESS", 42L, false,
                        "Spatial coordinates matched. No encumbrances reported.")
        ));

        // 17. PHASE 4 SEED: System Events
        systemEventRepository.saveAll(List.of(
                new SystemEvent("INTEGRATION_SUCCESS", "Interoperability Gateway", "GatewayRequestLog", 1L, "INFO",
                        "09:42 — Bhoomi Land Records System: Successful Information Verification (240 ms)"),
                new SystemEvent("SLOW_RESPONSE", "e-NagarPalika Municipal Core", "Platform", epalika.getId(), "WARNING",
                        "09:40 — Municipal Core Platform: Slow Response Detected (1.8 sec latency)"),
                new SystemEvent("FALLBACK_ACTIVATED", "SARATHI Transport System", "Platform", sarathi.getId(), "WARNING",
                        "09:35 — Primary Gateway Timeout: Fallback to DigiLocker Document Gateway activated"),
                new SystemEvent("CONSENT_GRANTED", "Citizen Consent Engine", "DataConsent", 1L, "INFO",
                        "09:30 — DPDP Token Issued: Aarav Sharma authorized Property Assessment data reuse")
        ));

        // 18. PHASE 4 SEED: System Alerts
        systemAlertRepository.saveAll(List.of(
                new SystemAlert("Municipal System Slow Response Detected",
                        "e-NagarPalika Municipal Core average response time elevated to 1.8s over last 15 mins.",
                        "MEDIUM", epalika.getId(), epalika.getName(), 2),
                new SystemAlert("Land Records System Dependency Warning",
                        "Bhoomi Land Records primary node health check latency fluctuating. Secondary replica standby ready.",
                        "LOW", bhoomi.getId(), bhoomi.getName(), 3),
                new SystemAlert("Transport System Fallback Engaged",
                        "SARATHI 4.0 temporary primary timeout resolved via DigiLocker sovereign proxy.",
                        "HIGH", sarathi.getId(), sarathi.getName(), 1)
        ));

        // 19. Initial Notifications
        notificationRepository.saveAll(List.of(
                new Notification(
                        demoCitizen.getId(),
                        "Driving Licence Renewed Successfully",
                        "Your Driving Licence renewal application #SAM-2026-09841 is completed. Digital certificate is available for download.",
                        "SUCCESS", "/applications"
                ),
                new Notification(
                        demoCitizen.getId(),
                        "Property Tax Assessment in Progress",
                        "Application #SAM-2026-10234: Land records verified via Bhoomi Interop pipeline. Assigned to municipal scrutiny officer.",
                        "INFO", "/applications"
                ),
                new Notification(
                        demoCitizen.getId(),
                        "Data Permission Active",
                        "Consent active for Property Tax Assessment to access Land Records and Municipal Dues.",
                        "UPDATE", "/dashboard/permissions"
                )
        ));

        // 20. Audit Logs
        auditLogRepository.saveAll(List.of(
                new AuditLog("SYSTEM_BOOTSTRAP", "SYSTEM", "Platform", 0L,
                        "SAMAVAY Phase 4 Secure Operational Layer & Gateway initialized with Connectors, Health Engine, and Access Policies.", "127.0.0.1"),
                new AuditLog("DATA_REQUEST_SUCCESS", "Aarav Sharma", "GatewayRequestLog", 1L,
                        "Cross-platform verification executed via Interoperability Gateway with mTLS PKI_X509 security.", "127.0.0.1"),
                new AuditLog("POLICY_CHANGED", "Rajesh Varma", "AccessPolicy", 1L,
                        "Access policy configured: Municipal Core allowed to query Bhoomi Land Records for Property Information.", "127.0.0.1")
        ));

        // 21. PHASE 5 SEED: Interoperability Insights
        interoperabilityInsightRepository.saveAll(List.of(
                new InteroperabilityInsight(
                        "OPPORTUNITY",
                        "Increase Information Reuse for Property Certificate",
                        "3 additional required property fields can be auto-verified by linking Bhoomi Cadastral RoR with Municipal Ward Registry.",
                        "3 Potential Fields",
                        "Property Certificate",
                        "INFO",
                        "/admin/data-requirements"
                ),
                new InteroperabilityInsight(
                        "ATTENTION_REQUIRED",
                        "Municipal System Experienced Increased Response Times",
                        "e-NagarPalika Municipal Core average latency reached 1.8s today. Health monitoring recommends checking gateway thread pools.",
                        "1.8s Latency",
                        "e-NagarPalika Municipal Core",
                        "WARNING",
                        "/admin/platform-status"
                ),
                new InteroperabilityInsight(
                        "POSITIVE_IMPACT",
                        "62% Information Reuse Sustained Across Active Workflows",
                        "620 out of 1,000 required citizen details were fulfilled automatically through connected sovereign databases with zero manual uploads.",
                        "62% Reused",
                        "Platform-Wide",
                        "SUCCESS",
                        "/admin/analytics"
                ),
                new InteroperabilityInsight(
                        "HIGH_DEPENDENCY",
                        "Property Certificate High Platform Dependency",
                        "Service depends on 3 separate platforms (Municipal Core, Bhoomi LRS, DigiLocker). Ensure secondary replicas remain active.",
                        "3 Platforms",
                        "Property Tax Assessment & Receipt",
                        "INFO",
                        "/admin/service-mapping"
                )
        ));
    }
}
