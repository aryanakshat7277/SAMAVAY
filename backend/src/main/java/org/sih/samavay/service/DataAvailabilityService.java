package org.sih.samavay.service;

import org.sih.samavay.entity.DataConsent;
import org.sih.samavay.entity.DataRequirement;
import org.sih.samavay.repository.DataConsentRepository;
import org.sih.samavay.repository.DataRequirementRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DataAvailabilityService {

    private final DataRequirementRepository requirementRepository;
    private final DataConsentRepository consentRepository;

    public DataAvailabilityService(DataRequirementRepository requirementRepository,
                                   DataConsentRepository consentRepository) {
        this.requirementRepository = requirementRepository;
        this.consentRepository = consentRepository;
    }

    public static class FieldAvailability {
        private DataRequirement requirement;
        private String status; // AVAILABLE, CONSENT_REQUIRED, USER_INPUT_REQUIRED, SOURCE_UNAVAILABLE
        private Boolean consentGranted;

        public FieldAvailability(DataRequirement requirement, String status, Boolean consentGranted) {
            this.requirement = requirement;
            this.status = status;
            this.consentGranted = consentGranted;
        }

        public DataRequirement getRequirement() { return requirement; }
        public String getStatus() { return status; }
        public Boolean getConsentGranted() { return consentGranted; }
    }

    public List<FieldAvailability> evaluateAvailability(Long serviceId, Long userId) {
        List<DataRequirement> reqs = requirementRepository.findByServiceId(serviceId);
        List<DataConsent> activeConsents = consentRepository.findByUserIdAndStatus(userId, "ACTIVE");

        return reqs.stream().map(r -> {
            if ("NEEDS_INPUT".equalsIgnoreCase(r.getAvailabilityStatus())) {
                return new FieldAvailability(r, "USER_INPUT_REQUIRED", false);
            }

            boolean hasConsent = activeConsents.stream()
                    .anyMatch(c -> c.getServiceId().equals(serviceId) && c.getFieldName().equalsIgnoreCase(r.getFieldName()));

            if (r.getConsentRequired()) {
                if (hasConsent) {
                    return new FieldAvailability(r, "AVAILABLE", true);
                } else {
                    return new FieldAvailability(r, "CONSENT_REQUIRED", false);
                }
            } else {
                return new FieldAvailability(r, "AVAILABLE", true);
            }
        }).toList();
    }
}
