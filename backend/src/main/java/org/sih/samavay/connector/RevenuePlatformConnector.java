package org.sih.samavay.connector;

import org.sih.samavay.dto.GatewayRequest;
import org.sih.samavay.dto.GatewayResponse;
import org.springframework.stereotype.Component;

@Component
public class RevenuePlatformConnector implements GovernmentPlatformConnector {

    private String simulationMode = "NORMAL";

    @Override
    public String getPlatformCode() {
        return "BHOOMI-LRS";
    }

    @Override
    public String getPlatformName() {
        return "Bhoomi Land Records Information System";
    }

    @Override
    public boolean checkAvailability() {
        return !"UNAVAILABLE".equalsIgnoreCase(simulationMode);
    }

    @Override
    public GatewayResponse requestData(GatewayRequest request) {
        long baseLatency = 40L;

        if ("UNAVAILABLE".equalsIgnoreCase(simulationMode)) {
            return new GatewayResponse(request.getRequestId(), "UNAVAILABLE",
                    "Primary Bhoomi Land Records Node unresponsive. Error 503 Service Unavailable.",
                    500L, false, null);
        }

        if ("FAILURE".equalsIgnoreCase(simulationMode)) {
            return new GatewayResponse(request.getRequestId(), "FAILED",
                    "Gateway mTLS Handshake Error on Revenue Platform.",
                    250L, false, null);
        }

        if ("SLOW".equalsIgnoreCase(simulationMode)) {
            baseLatency = 1850L;
        }

        return new GatewayResponse(
                request.getRequestId(),
                "SUCCESS",
                "Land ownership record RoR #42/1A successfully verified with cadastral registry.",
                baseLatency,
                false,
                "{\"titleDeed\":\"BHOOMI-DOC-98421\",\"surveyNo\":\"42/1A\",\"status\":\"MUTATION_CLEARED\"}"
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
