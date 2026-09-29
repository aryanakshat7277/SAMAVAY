package org.sih.samavay.service;

import org.sih.samavay.entity.GovernmentPlatform;
import org.sih.samavay.repository.GovernmentPlatformRepository;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class GovernmentPlatformSimulator {

    private final GovernmentPlatformRepository platformRepository;

    public GovernmentPlatformSimulator(GovernmentPlatformRepository platformRepository) {
        this.platformRepository = platformRepository;
    }

    public static class SimulationResult {
        private boolean success;
        private boolean consentRequired;
        private boolean fallbackUsed;
        private String sourcePlatform;
        private String responseData;
        private long latencyMs;

        public SimulationResult(boolean success, boolean consentRequired, boolean fallbackUsed,
                                String sourcePlatform, String responseData, long latencyMs) {
            this.success = success;
            this.consentRequired = consentRequired;
            this.fallbackUsed = fallbackUsed;
            this.sourcePlatform = sourcePlatform;
            this.responseData = responseData;
            this.latencyMs = latencyMs;
        }

        public boolean isSuccess() { return success; }
        public boolean isConsentRequired() { return consentRequired; }
        public boolean isFallbackUsed() { return fallbackUsed; }
        public String getSourcePlatform() { return sourcePlatform; }
        public String getResponseData() { return responseData; }
        public long getLatencyMs() { return latencyMs; }
    }

    public SimulationResult queryPlatform(String dataField, String primaryPlatformCode, String fallbackPlatformCode) {
        long latency = 35 + (long)(Math.random() * 20);

        if ("Citizen Full Name".equalsIgnoreCase(dataField) || "Applicant Identification".equalsIgnoreCase(dataField)) {
            return new SimulationResult(true, false, false, "Citizen Profile Service", "{\"verifiedName\":\"Aarav Sharma\",\"uidStatus\":\"MATCH\"}", latency);
        }

        if ("Land Ownership & Cadastral Title".equalsIgnoreCase(dataField) || "Land Mutation".equalsIgnoreCase(dataField)) {
            return new SimulationResult(true, true, false, "Bhoomi Land Records Information System", "{\"titleDeed\":\"BHOOMI-DOC-98421\",\"surveyNo\":\"42/1A\",\"owner\":\"Aarav Sharma\"}", latency + 12);
        }

        if ("Existing Driving Licence Number".equalsIgnoreCase(dataField) || "Citizen Identity & Photo".equalsIgnoreCase(dataField)) {
            return new SimulationResult(true, true, false, "SARATHI 4.0 Driving License System", "{\"dlNumber\":\"DL-1420110023412\",\"validTill\":\"2026-11-30\",\"bloodGroup\":\"B+\"}", latency + 8);
        }

        if ("Aadhaar Health Beneficiary Match".equalsIgnoreCase(dataField)) {
            return new SimulationResult(true, true, false, "Ayushman Bharat PM-JAY National Portal", "{\"pmjayCardId\":\"PMJAY-908123-01\",\"eligibility\":\"SECC_BPL\"}", latency + 5);
        }

        // Generic available result
        return new SimulationResult(true, true, false, "Authoritative Government Registry", "{\"status\":\"VERIFIED\",\"hash\":\"sha256:e3b0c442...\"}", latency);
    }
}
