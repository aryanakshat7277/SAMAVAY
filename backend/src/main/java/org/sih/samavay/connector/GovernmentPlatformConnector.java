package org.sih.samavay.connector;

import org.sih.samavay.dto.GatewayRequest;
import org.sih.samavay.dto.GatewayResponse;

public interface GovernmentPlatformConnector {

    String getPlatformCode();

    String getPlatformName();

    boolean checkAvailability();

    GatewayResponse requestData(GatewayRequest request);

    String getPlatformStatus();

    void setSimulationMode(String mode); // NORMAL, SLOW, UNAVAILABLE, CONSENT_REQUIRED, FAILURE

    String getSimulationMode();
}
