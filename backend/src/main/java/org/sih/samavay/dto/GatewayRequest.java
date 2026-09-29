package org.sih.samavay.dto;

import java.time.LocalDateTime;

public class GatewayRequest {

    private String requestId;
    private Long serviceRequestId;
    private String applicationNumber;
    private Long sourcePlatformId;
    private String sourcePlatformName;
    private Long destinationPlatformId;
    private String destinationPlatformName;
    private String operationType;
    private String dataCategory;
    private Long citizenUserId;
    private LocalDateTime timestamp;

    public GatewayRequest() {
        this.timestamp = LocalDateTime.now();
    }

    public GatewayRequest(String requestId, Long serviceRequestId, String applicationNumber,
                          Long sourcePlatformId, String sourcePlatformName,
                          Long destinationPlatformId, String destinationPlatformName,
                          String operationType, String dataCategory, Long citizenUserId) {
        this.requestId = requestId;
        this.serviceRequestId = serviceRequestId;
        this.applicationNumber = applicationNumber;
        this.sourcePlatformId = sourcePlatformId;
        this.sourcePlatformName = sourcePlatformName;
        this.destinationPlatformId = destinationPlatformId;
        this.destinationPlatformName = destinationPlatformName;
        this.operationType = operationType;
        this.dataCategory = dataCategory;
        this.citizenUserId = citizenUserId;
        this.timestamp = LocalDateTime.now();
    }

    public String getRequestId() { return requestId; }
    public void setRequestId(String requestId) { this.requestId = requestId; }

    public Long getServiceRequestId() { return serviceRequestId; }
    public void setServiceRequestId(Long serviceRequestId) { this.serviceRequestId = serviceRequestId; }

    public String getApplicationNumber() { return applicationNumber; }
    public void setApplicationNumber(String applicationNumber) { this.applicationNumber = applicationNumber; }

    public Long getSourcePlatformId() { return sourcePlatformId; }
    public void setSourcePlatformId(Long sourcePlatformId) { this.sourcePlatformId = sourcePlatformId; }

    public String getSourcePlatformName() { return sourcePlatformName; }
    public void setSourcePlatformName(String sourcePlatformName) { this.sourcePlatformName = sourcePlatformName; }

    public Long getDestinationPlatformId() { return destinationPlatformId; }
    public void setDestinationPlatformId(Long destinationPlatformId) { this.destinationPlatformId = destinationPlatformId; }

    public String getDestinationPlatformName() { return destinationPlatformName; }
    public void setDestinationPlatformName(String destinationPlatformName) { this.destinationPlatformName = destinationPlatformName; }

    public String getOperationType() { return operationType; }
    public void setOperationType(String operationType) { this.operationType = operationType; }

    public String getDataCategory() { return dataCategory; }
    public void setDataCategory(String dataCategory) { this.dataCategory = dataCategory; }

    public Long getCitizenUserId() { return citizenUserId; }
    public void setCitizenUserId(Long citizenUserId) { this.citizenUserId = citizenUserId; }

    public LocalDateTime getTimestamp() { return timestamp; }
    public void setTimestamp(LocalDateTime timestamp) { this.timestamp = timestamp; }
}
