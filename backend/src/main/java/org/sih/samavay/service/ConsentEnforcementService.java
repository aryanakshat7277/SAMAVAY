package org.sih.samavay.service;

import org.sih.samavay.entity.DataConsent;
import org.sih.samavay.repository.DataConsentRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ConsentEnforcementService {

    private final DataConsentRepository consentRepository;

    public ConsentEnforcementService(DataConsentRepository consentRepository) {
        this.consentRepository = consentRepository;
    }

    public boolean validateConsent(Long userId, String dataCategory, String fieldName) {
        if (userId == null) return true; // System-level verified
        List<DataConsent> consents = consentRepository.findByUserIdAndStatus(userId, "ACTIVE");
        return consents.stream().anyMatch(c ->
                c.getFieldName().equalsIgnoreCase(fieldName) ||
                c.getFieldName().toLowerCase().contains(dataCategory.toLowerCase()) ||
                dataCategory.toLowerCase().contains("profile")
        );
    }
}
