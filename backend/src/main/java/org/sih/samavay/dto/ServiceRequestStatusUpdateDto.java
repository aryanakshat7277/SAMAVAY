package org.sih.samavay.dto;

import jakarta.validation.constraints.NotNull;
import org.sih.samavay.entity.RequestStatus;

public class ServiceRequestStatusUpdateDto {

    @NotNull(message = "Status is required")
    private RequestStatus status;

    private String currentStage;

    private String remarks;

    private String certificateUrl;

    public ServiceRequestStatusUpdateDto() {}

    public RequestStatus getStatus() {
        return status;
    }

    public void setStatus(RequestStatus status) {
        this.status = status;
    }

    public String getCurrentStage() {
        return currentStage;
    }

    public void setCurrentStage(String currentStage) {
        this.currentStage = currentStage;
    }

    public String getRemarks() {
        return remarks;
    }

    public void setRemarks(String remarks) {
        this.remarks = remarks;
    }

    public String getCertificateUrl() {
        return certificateUrl;
    }

    public void setCertificateUrl(String certificateUrl) {
        this.certificateUrl = certificateUrl;
    }
}
