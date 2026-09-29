package org.sih.samavay.service;

import org.sih.samavay.connector.*;
import org.sih.samavay.dto.GatewayRequest;
import org.sih.samavay.dto.GatewayResponse;
import org.sih.samavay.entity.GatewayRequestLog;
import org.sih.samavay.repository.GatewayRequestLogRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class InteroperabilityGatewayService {

    private final List<GovernmentPlatformConnector> connectors;
    private final AccessPolicyService accessPolicyService;
    private final ConsentEnforcementService consentEnforcementService;
    private final FallbackStrategyService fallbackStrategyService;
    private final SystemEventService systemEventService;
    private final GatewayRequestLogRepository requestLogRepository;

    public InteroperabilityGatewayService(List<GovernmentPlatformConnector> connectors,
                                         AccessPolicyService accessPolicyService,
                                         ConsentEnforcementService consentEnforcementService,
                                         FallbackStrategyService fallbackStrategyService,
                                         SystemEventService systemEventService,
                                         GatewayRequestLogRepository requestLogRepository) {
        this.connectors = connectors;
        this.accessPolicyService = accessPolicyService;
        this.consentEnforcementService = consentEnforcementService;
        this.fallbackStrategyService = fallbackStrategyService;
        this.systemEventService = systemEventService;
        this.requestLogRepository = requestLogRepository;
    }

    public GatewayResponse processRequest(GatewayRequest request) {
        if (request.getRequestId() == null || request.getRequestId().isBlank()) {
            request.setRequestId("REQ-2026-" + String.format("%05d", (int)(Math.random() * 90000 + 10000)));
        }

        // 1. Access Policy Check
        boolean isPolicyAllowed = accessPolicyService.isAllowed(
                request.getSourcePlatformId(), request.getDestinationPlatformId(), request.getDataCategory());
        if (!isPolicyAllowed) {
            GatewayResponse res = new GatewayResponse(
                    request.getRequestId(), "ACCESS_DENIED",
                    "Interoperability Access Policy denied communication between requested platforms.",
                    12L, false, null);
            logAndEvent(request, res);
            return res;
        }

        // 2. Consent Verification Check
        boolean hasConsent = consentEnforcementService.validateConsent(
                request.getCitizenUserId(), request.getDataCategory(), request.getDataCategory());
        if (!hasConsent) {
            GatewayResponse res = new GatewayResponse(
                    request.getRequestId(), "CONSENT_REQUIRED",
                    "Sovereign DPDP consent authorization token required from citizen before data access.",
                    15L, false, null);
            logAndEvent(request, res);
            return res;
        }

        // 3. Resolve Connector
        GovernmentPlatformConnector primaryConnector = findConnector(request.getDestinationPlatformName());
        GovernmentPlatformConnector fallbackConnector = findConnector("DigiLocker Government Document Exchange");

        // 4. Execute with Fallback
        GatewayResponse response = fallbackStrategyService.executeWithFallback(
                request,
                () -> primaryConnector.requestData(request),
                fallbackConnector != null ? () -> fallbackConnector.requestData(request) : null
        );

        // 5. Log Request & Emit Event
        logAndEvent(request, response);

        return response;
    }

    public List<GatewayRequestLog> getAllLogs() {
        return requestLogRepository.findAllByOrderByTimestampDesc();
    }

    public GatewayRequestLog getLogByRequestId(String requestId) {
        return requestLogRepository.findByRequestId(requestId).orElse(null);
    }

    private GovernmentPlatformConnector findConnector(String platformName) {
        if (platformName == null) return connectors.get(0);
        return connectors.stream()
                .filter(c -> platformName.toLowerCase().contains(c.getPlatformCode().toLowerCase()) ||
                             platformName.toLowerCase().contains("land") ||
                             platformName.toLowerCase().contains("bhoomi") ||
                             c.getPlatformName().toLowerCase().contains(platformName.toLowerCase()))
                .findFirst()
                .orElse(connectors.get(0));
    }

    private void logAndEvent(GatewayRequest req, GatewayResponse res) {
        GatewayRequestLog log = new GatewayRequestLog(
                req.getRequestId(), req.getServiceRequestId(), req.getApplicationNumber(),
                req.getSourcePlatformId() != null ? req.getSourcePlatformId() : 1L,
                req.getSourcePlatformName() != null ? req.getSourcePlatformName() : "SAMAVAY Core",
                req.getDestinationPlatformId() != null ? req.getDestinationPlatformId() : 4L,
                req.getDestinationPlatformName() != null ? req.getDestinationPlatformName() : "Authoritative Gateway",
                req.getOperationType() != null ? req.getOperationType() : "RECORD_VERIFICATION",
                req.getDataCategory() != null ? req.getDataCategory() : "Information Exchange",
                res.getStatus(), res.getResponseTimeMs(), res.getFallbackUsed(), res.getMessage()
        );
        requestLogRepository.save(log);

        String severity = "SUCCESS".equalsIgnoreCase(res.getStatus()) ? "INFO" :
                          "CONSENT_REQUIRED".equalsIgnoreCase(res.getStatus()) ? "WARNING" : "ERROR";
        systemEventService.recordEvent(
                "SUCCESS".equalsIgnoreCase(res.getStatus()) ? "INTEGRATION_SUCCESS" : "INTEGRATION_FAILED",
                req.getSourcePlatformName() != null ? req.getSourcePlatformName() : "Interoperability Gateway",
                "GatewayRequestLog", log.getId(), severity,
                "Exchange " + req.getRequestId() + ": " + res.getMessage()
        );
    }
}
