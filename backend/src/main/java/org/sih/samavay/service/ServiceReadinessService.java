package org.sih.samavay.service;

import org.sih.samavay.dto.ServiceReadinessResult;
import org.sih.samavay.entity.GovernmentService;
import org.sih.samavay.exception.ResourceNotFoundException;
import org.sih.samavay.repository.GovernmentServiceRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ServiceReadinessService {

    private final GovernmentServiceRepository serviceRepository;
    private final DataAvailabilityService availabilityService;

    public ServiceReadinessService(GovernmentServiceRepository serviceRepository,
                                  DataAvailabilityService availabilityService) {
        this.serviceRepository = serviceRepository;
        this.availabilityService = availabilityService;
    }

    public ServiceReadinessResult checkReadiness(Long serviceId, Long userId) {
        GovernmentService service = serviceRepository.findById(serviceId)
                .orElseThrow(() -> new ResourceNotFoundException("Service not found: " + serviceId));

        List<DataAvailabilityService.FieldAvailability> evaluations = availabilityService.evaluateAvailability(serviceId, userId != null ? userId : 1L);

        ServiceReadinessResult result = new ServiceReadinessResult();
        result.setServiceId(service.getId());
        result.setServiceName(service.getName());
        result.setDepartmentName(service.getDepartmentName());
        result.setIsReady(true);

        List<ServiceReadinessResult.RequirementItem> available = new ArrayList<>();
        List<ServiceReadinessResult.RequirementItem> consentNeeded = new ArrayList<>();
        List<ServiceReadinessResult.RequirementItem> missing = new ArrayList<>();
        List<String> connectedPlats = new ArrayList<>();

        for (DataAvailabilityService.FieldAvailability fa : evaluations) {
            ServiceReadinessResult.RequirementItem item = new ServiceReadinessResult.RequirementItem(
                    fa.getRequirement().getId(),
                    fa.getRequirement().getFieldName(),
                    fa.getRequirement().getDescription(),
                    fa.getRequirement().getSourceDepartmentName(),
                    fa.getRequirement().getSourcePlatformName(),
                    fa.getStatus(),
                    fa.getConsentGranted(),
                    fa.getRequirement().getPurpose()
            );

            if (fa.getRequirement().getSourcePlatformName() != null && !connectedPlats.contains(fa.getRequirement().getSourcePlatformName())) {
                connectedPlats.add(fa.getRequirement().getSourcePlatformName());
            }

            if ("AVAILABLE".equals(fa.getStatus())) {
                available.add(item);
            } else if ("CONSENT_REQUIRED".equals(fa.getStatus())) {
                consentNeeded.add(item);
            } else {
                missing.add(item);
            }
        }

        result.setAvailableRequirements(available);
        result.setConsentRequiredRequirements(consentNeeded);
        result.setMissingRequirements(missing);
        result.setConnectedPlatforms(connectedPlats);
        result.setFallbackPlatformsUsed(List.of());

        if (!consentNeeded.isEmpty()) {
            result.setCitizenStatusMessage("Review and authorize access to available government records.");
            result.setRecommendedNextAction("REVIEW_CONSENT");
        } else if (!missing.isEmpty()) {
            result.setCitizenStatusMessage("Your verified government profile is linked. Complete remaining form fields.");
            result.setRecommendedNextAction("FILL_FORM");
        } else {
            result.setCitizenStatusMessage("All required information is verified through connected systems. Ready to submit.");
            result.setRecommendedNextAction("SUBMIT");
        }

        return result;
    }
}
