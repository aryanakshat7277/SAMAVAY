package org.sih.samavay.connector;

import org.sih.samavay.dto.GatewayRequest;
import org.sih.samavay.dto.GatewayResponse;
import org.springframework.stereotype.Component;

@Component
public class TransportPlatformConnector implements GovernmentPlatformConnector {

    private String simulationMode = "NORMAL";

    @Override
    public String getPlatformCode() {
        return "SARATHI-DL-4";
    }

    @Override
    public String getPlatformName() {
        return "SARATHI 4.0 Driving License System";
    }

    @Override
    public boolean checkAvailability() {
        return !"UNAVAILABLE".equalsIgnoreCase(simulationMode);
    }

    @Override
    public GatewayResponse requestData(GatewayRequest request) {
        long baseLatency = 35L;

        if ("UNAVAILABLE".equalsIgnoreCase(simulationMode)) {
            return new GatewayResponse(request.getRequestId(), "UNAVAILABLE",
                    "SARATHI Core RTO API Connection Timeout.",
                    600L, false, null);
        }

        if ("FAILURE".equalsIgnoreCase(simulationMode)) {
            return new GatewayResponse(request.getRequestId(), "FAILED",
                    "SARATHI Biometric Hash Verification Rejected.",
                    180L, false, null);
        }

        if ("SLOW".equalsIgnoreCase(simulationMode)) {
            baseLatency = 1420L;
        }

        return new GatewayResponse(
                request.getRequestId(),
                "SUCCESS",
                "Driving Licence DL-1420110023412 verified with national transport registry.",
                baseLatency,
                false,
                "{\"dlNumber\":\"DL-1420110023412\",\"validTill\":\"2026-11-30\",\"bloodGroup\":\"B+\"}"
        );
    }

    @Override
    public String getPlatformStatus() {
        if ("UNAVAILABLE".equalsIgnoreCase(simulationMode)) return "UNAVAILABLE";
        if ("SLOW".equalsIgnoreCase(simulationMode) || "FAILURE".equalsIgnoreCase(simulationMode)) return "DEGRADED";
        return "HEALTHY";
    }

    @Override
    public void setSimulationMode(String mode) {
        this.simulationMode = mode != null ? mode : "NORMAL";
    }

    @Override
    public String getSimulationMode() {
        return simulationMode;
    }
}
