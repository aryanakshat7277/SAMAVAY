package org.sih.samavay.dto;

import java.time.LocalDateTime;

public class GatewayResponse {

    private String requestId;
    private String status; // SUCCESS, CONSENT_REQUIRED, UNAVAILABLE, TIMEOUT, FAILED, ACCESS_DENIED
    private String message;
    private Long responseTimeMs;
    private Boolean fallbackUsed;
    private String fallbackPlatformName;
    private String responsePayload; // Sanitized metadata response
    private LocalDateTime timestamp;

    public GatewayResponse() {
        this.timestamp = LocalDateTime.now();
        this.fallbackUsed = false;
    }

    public GatewayResponse(String requestId, String status, String message, Long responseTimeMs,
                           Boolean fallbackUsed, String responsePayload) {
        this.requestId = requestId;
        this.status = status;
        this.message = message;
        this.responseTimeMs = responseTimeMs;
        this.fallbackUsed = fallbackUsed != null ? fallbackUsed : false;
        this.responsePayload = responsePayload;
        this.timestamp = LocalDateTime.now();
    }

    public String getRequestId() { return requestId; }
    public void setRequestId(String requestId) { this.requestId = requestId; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }

    public Long getResponseTimeMs() { return responseTimeMs; }
    public void setResponseTimeMs(Long responseTimeMs) { this.responseTimeMs = responseTimeMs; }

    public Boolean getFallbackUsed() { return fallbackUsed; }
    public void setFallbackUsed(Boolean fallbackUsed) { this.fallbackUsed = fallbackUsed; }

    public String getFallbackPlatformName() { return fallbackPlatformName; }
    public void setFallbackPlatformName(String fallbackPlatformName) { this.fallbackPlatformName = fallbackPlatformName; }

    public String getResponsePayload() { return responsePayload; }
    public void setResponsePayload(String responsePayload) { this.responsePayload = responsePayload; }

    public LocalDateTime getTimestamp() { return timestamp; }
    public void setTimestamp(LocalDateTime timestamp) { this.timestamp = timestamp; }
}
