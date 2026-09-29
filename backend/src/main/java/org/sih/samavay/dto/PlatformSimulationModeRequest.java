package org.sih.samavay.dto;

public class PlatformSimulationModeRequest {

    private String platformCode;
    private String simulationMode; // NORMAL, SLOW, UNAVAILABLE, CONSENT_REQUIRED, FAILURE

    public PlatformSimulationModeRequest() {}

    public PlatformSimulationModeRequest(String platformCode, String simulationMode) {
        this.platformCode = platformCode;
        this.simulationMode = simulationMode;
    }

    public String getPlatformCode() { return platformCode; }
    public void setPlatformCode(String platformCode) { this.platformCode = platformCode; }

    public String getSimulationMode() { return simulationMode; }
    public void setSimulationMode(String simulationMode) { this.simulationMode = simulationMode; }
}
