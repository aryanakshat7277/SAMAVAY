package org.sih.samavay.dto;

import java.util.List;
import java.util.Map;

public class ServiceReadinessResult {

    private Long serviceId;
    private String serviceName;
    private String departmentName;
    private Boolean isReady;
    private String citizenStatusMessage;
    private String recommendedNextAction;

    // Categorized requirements
    private List<RequirementItem> availableRequirements;
    private List<RequirementItem> consentRequiredRequirements;
    private List<RequirementItem> missingRequirements;

    // Platform discovery
    private List<String> connectedPlatforms;
    private List<String> fallbackPlatformsUsed;

    public ServiceReadinessResult() {}

    public static class RequirementItem {
        private Long id;
        private String fieldName;
        private String description;
        private String sourceDepartment;
        private String sourcePlatform;
        private String availabilityStatus; // AVAILABLE, CONSENT_REQUIRED, USER_INPUT_REQUIRED
        private Boolean consentGranted;
        private String purpose;

        public RequirementItem() {}

        public RequirementItem(Long id, String fieldName, String description,
                               String sourceDepartment, String sourcePlatform,
                               String availabilityStatus, Boolean consentGranted, String purpose) {
            this.id = id;
            this.fieldName = fieldName;
            this.description = description;
            this.sourceDepartment = sourceDepartment;
            this.sourcePlatform = sourcePlatform;
            this.availabilityStatus = availabilityStatus;
            this.consentGranted = consentGranted;
            this.purpose = purpose;
        }

        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }

        public String getFieldName() { return fieldName; }
        public void setFieldName(String fieldName) { this.fieldName = fieldName; }

        public String getDescription() { return description; }
        public void setDescription(String description) { this.description = description; }

        public String getSourceDepartment() { return sourceDepartment; }
        public void setSourceDepartment(String sourceDepartment) { this.sourceDepartment = sourceDepartment; }

        public String getSourcePlatform() { return sourcePlatform; }
        public void setSourcePlatform(String sourcePlatform) { this.sourcePlatform = sourcePlatform; }

        public String getAvailabilityStatus() { return availabilityStatus; }
        public void setAvailabilityStatus(String availabilityStatus) { this.availabilityStatus = availabilityStatus; }

        public Boolean getConsentGranted() { return consentGranted; }
        public void setConsentGranted(Boolean consentGranted) { this.consentGranted = consentGranted; }

        public String getPurpose() { return purpose; }
        public void setPurpose(String purpose) { this.purpose = purpose; }
    }

    public Long getServiceId() { return serviceId; }
    public void setServiceId(Long serviceId) { this.serviceId = serviceId; }

    public String getServiceName() { return serviceName; }
    public void setServiceName(String serviceName) { this.serviceName = serviceName; }

    public String getDepartmentName() { return departmentName; }
    public void setDepartmentName(String departmentName) { this.departmentName = departmentName; }

    public Boolean getIsReady() { return isReady; }
    public void setIsReady(Boolean isReady) { this.isReady = isReady; }

    public String getCitizenStatusMessage() { return citizenStatusMessage; }
    public void setCitizenStatusMessage(String citizenStatusMessage) { this.citizenStatusMessage = citizenStatusMessage; }

    public String getRecommendedNextAction() { return recommendedNextAction; }
    public void setRecommendedNextAction(String recommendedNextAction) { this.recommendedNextAction = recommendedNextAction; }

    public List<RequirementItem> getAvailableRequirements() { return availableRequirements; }
    public void setAvailableRequirements(List<RequirementItem> availableRequirements) { this.availableRequirements = availableRequirements; }

    public List<RequirementItem> getConsentRequiredRequirements() { return consentRequiredRequirements; }
    public void setConsentRequiredRequirements(List<RequirementItem> consentRequiredRequirements) { this.consentRequiredRequirements = consentRequiredRequirements; }

    public List<RequirementItem> getMissingRequirements() { return missingRequirements; }
    public void setMissingRequirements(List<RequirementItem> missingRequirements) { this.missingRequirements = missingRequirements; }

    public List<String> getConnectedPlatforms() { return connectedPlatforms; }
    public void setConnectedPlatforms(List<String> connectedPlatforms) { this.connectedPlatforms = connectedPlatforms; }

    public List<String> getFallbackPlatformsUsed() { return fallbackPlatformsUsed; }
    public void setFallbackPlatformsUsed(List<String> fallbackPlatformsUsed) { this.fallbackPlatformsUsed = fallbackPlatformsUsed; }
}
