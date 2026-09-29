package org.sih.samavay.connector;

import org.sih.samavay.dto.GatewayRequest;
import org.sih.samavay.dto.GatewayResponse;
import org.springframework.stereotype.Component;

@Component
public class CitizenProfileConnector implements GovernmentPlatformConnector {

    private String simulationMode = "NORMAL";

    @Override
    public String getPlatformCode() {
        return "DIGILOCKER-GW";
    }

    @Override
    public String getPlatformName() {
        return "DigiLocker Government Document Exchange";
    }

    @Override
    public boolean checkAvailability() {
        return !"UNAVAILABLE".equalsIgnoreCase(simulationMode);
    }

    @Override
    public GatewayResponse requestData(GatewayRequest request) {
        long baseLatency = 28L;

        if ("UNAVAILABLE".equalsIgnoreCase(simulationMode)) {
            return new GatewayResponse(request.getRequestId(), "UNAVAILABLE",
                    "DigiLocker sovereign credential exchange unavailable.",
                    500L, false, null);
        }

        if ("SLOW".equalsIgnoreCase(simulationMode)) {
            baseLatency = 1200L;
        }

        return new GatewayResponse(
                request.getRequestId(),
                "SUCCESS",
                "Citizen verified identity credentials retrieved under DPDP consent token.",
                baseLatency,
                false,
                "{\"citizenName\":\"Aarav Sharma\",\"uidaiVerified\":true,\"token\":\"DPDP-AUTH-99201\"}"
        );
    }

    @Override
    public String getPlatformStatus() {
        if ("UNAVAILABLE".equalsIgnoreCase(simulationMode)) return "UNAVAILABLE";
        if ("SLOW".equalsIgnoreCase(simulationMode)) return "DEGRADED";
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
