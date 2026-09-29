package org.sih.samavay.connector;

import org.sih.samavay.dto.GatewayRequest;
import org.sih.samavay.dto.GatewayResponse;
import org.springframework.stereotype.Component;

@Component
public class MunicipalPlatformConnector implements GovernmentPlatformConnector {

    private String simulationMode = "NORMAL";

    @Override
    public String getPlatformCode() {
        return "EPALIKA-CORE";
    }

    @Override
    public String getPlatformName() {
        return "e-NagarPalika Municipal Core";
    }

    @Override
    public boolean checkAvailability() {
        return !"UNAVAILABLE".equalsIgnoreCase(simulationMode);
    }

    @Override
    public GatewayResponse requestData(GatewayRequest request) {
        long baseLatency = 45L;

        if ("UNAVAILABLE".equalsIgnoreCase(simulationMode)) {
            return new GatewayResponse(request.getRequestId(), "UNAVAILABLE",
                    "Municipal Revenue Service gateway unavailable.",
                    500L, false, null);
        }

        if ("FAILURE".equalsIgnoreCase(simulationMode)) {
            return new GatewayResponse(request.getRequestId(), "FAILED",
                    "Municipal Ledger assessment query failed.",
                    220L, false, null);
        }

        if ("SLOW".equalsIgnoreCase(simulationMode)) {
            baseLatency = 1600L;
        }

        return new GatewayResponse(
                request.getRequestId(),
                "SUCCESS",
                "Municipal Property Ledger M-WARD-40982 matched and assessed.",
                baseLatency,
                false,
                "{\"propertyId\":\"M-WARD-40982\",\"taxDue\":\"0.00\",\"status\":\"CLEARED\"}"
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
