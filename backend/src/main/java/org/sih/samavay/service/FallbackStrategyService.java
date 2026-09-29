package org.sih.samavay.service;

import org.sih.samavay.dto.GatewayRequest;
import org.sih.samavay.dto.GatewayResponse;
import org.springframework.stereotype.Service;

@Service
public class FallbackStrategyService {

    private static final int MAX_RETRIES = 2;

    public GatewayResponse executeWithFallback(GatewayRequest request,
                                               java.util.function.Supplier<GatewayResponse> primarySupplier,
                                               java.util.function.Supplier<GatewayResponse> fallbackSupplier) {
        int attempts = 0;
        GatewayResponse response = null;

        while (attempts < MAX_RETRIES) {
            attempts++;
            response = primarySupplier.get();
            if ("SUCCESS".equalsIgnoreCase(response.getStatus())) {
                return response;
            }
        }

        // Primary failed after retries -> trigger fallback if provided
        if (fallbackSupplier != null) {
            GatewayResponse fallbackResponse = fallbackSupplier.get();
            fallbackResponse.setFallbackUsed(true);
            fallbackResponse.setFallbackPlatformName("DigiLocker Secondary Gateway");
            fallbackResponse.setMessage("Retrieved via secondary fallback provider following primary timeout.");
            return fallbackResponse;
        }

        return response;
    }
}
