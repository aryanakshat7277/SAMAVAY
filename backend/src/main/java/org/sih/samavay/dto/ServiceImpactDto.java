package org.sih.samavay.dto;

import java.util.List;

public class ServiceImpactDto {

    private Long platformId;
    private String platformName;
    private String departmentName;
    private String platformStatus; // HEALTHY, DEGRADED, UNAVAILABLE
    private Integer impactedServicesCount;
    private List<ImpactedServiceItem> impactedServices;

    public ServiceImpactDto() {}

    public static class ImpactedServiceItem {
        private Long serviceId;
        private String serviceName;
        private String departmentName;
        private String requiredDataField;
        private String fallbackAvailability; // FALLBACK_AVAILABLE, MANUAL_INPUT_REQUIRED, NO_FALLBACK
        private String secondaryPlatformName;

        public ImpactedServiceItem() {}

        public ImpactedServiceItem(Long serviceId, String serviceName, String departmentName,
                                   String requiredDataField, String fallbackAvailability,
                                   String secondaryPlatformName) {
            this.serviceId = serviceId;
            this.serviceName = serviceName;
            this.departmentName = departmentName;
            this.requiredDataField = requiredDataField;
            this.fallbackAvailability = fallbackAvailability;
            this.secondaryPlatformName = secondaryPlatformName;
        }

        public Long getServiceId() { return serviceId; }
        public void setServiceId(Long serviceId) { this.serviceId = serviceId; }
        public String getServiceName() { return serviceName; }
        public void setServiceName(String serviceName) { this.serviceName = serviceName; }
        public String getDepartmentName() { return departmentName; }
        public void setDepartmentName(String departmentName) { this.departmentName = departmentName; }
        public String getRequiredDataField() { return requiredDataField; }
        public void setRequiredDataField(String requiredDataField) { this.requiredDataField = requiredDataField; }
        public String getFallbackAvailability() { return fallbackAvailability; }
        public void setFallbackAvailability(String fallbackAvailability) { this.fallbackAvailability = fallbackAvailability; }
        public String getSecondaryPlatformName() { return secondaryPlatformName; }
        public void setSecondaryPlatformName(String secondaryPlatformName) { this.secondaryPlatformName = secondaryPlatformName; }
    }

    public Long getPlatformId() { return platformId; }
    public void setPlatformId(Long platformId) { this.platformId = platformId; }
    public String getPlatformName() { return platformName; }
    public void setPlatformName(String platformName) { this.platformName = platformName; }
    public String getDepartmentName() { return departmentName; }
    public void setDepartmentName(String departmentName) { this.departmentName = departmentName; }
    public String getPlatformStatus() { return platformStatus; }
    public void setPlatformStatus(String platformStatus) { this.platformStatus = platformStatus; }
    public Integer getImpactedServicesCount() { return impactedServicesCount; }
    public void setImpactedServicesCount(Integer impactedServicesCount) { this.impactedServicesCount = impactedServicesCount; }
    public List<ImpactedServiceItem> getImpactedServices() { return impactedServices; }
    public void setImpactedServices(List<ImpactedServiceItem> impactedServices) { this.impactedServices = impactedServices; }
}
