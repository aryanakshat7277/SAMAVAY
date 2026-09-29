package org.sih.samavay.service;

import org.sih.samavay.entity.DataConsent;
import org.sih.samavay.exception.ResourceNotFoundException;
import org.sih.samavay.repository.DataConsentRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class DataConsentService {

    private final DataConsentRepository dataConsentRepository;
    private final AuditLogService auditLogService;

    public DataConsentService(DataConsentRepository dataConsentRepository, AuditLogService auditLogService) {
        this.dataConsentRepository = dataConsentRepository;
        this.auditLogService = auditLogService;
    }

    public List<DataConsent> getAllConsents() {
        return dataConsentRepository.findAll();
    }

    public List<DataConsent> getConsentsByUser(Long userId) {
        return dataConsentRepository.findByUserIdOrderByGrantedAtDesc(userId);
    }

    public List<DataConsent> getActiveConsentsByUser(Long userId) {
        return dataConsentRepository.findByUserIdAndStatus(userId, "ACTIVE");
    }

    public DataConsent grantConsent(DataConsent consent) {
        consent.setStatus("ACTIVE");
        consent.setGrantedAt(LocalDateTime.now());
        DataConsent saved = dataConsentRepository.save(consent);

        auditLogService.log("CONSENT_GRANTED", consent.getUserName() != null ? consent.getUserName() : "CITIZEN",
                "DataConsent", saved.getId(), "Citizen granted access to " + consent.getFieldName() + " for " + consent.getServiceName(), null);

        return saved;
    }

    public DataConsent revokeConsent(Long id) {
        DataConsent consent = dataConsentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Consent record not found with id: " + id));

        consent.setStatus("REVOKED");
        consent.setRevokedAt(LocalDateTime.now());
        DataConsent updated = dataConsentRepository.save(consent);

        auditLogService.log("CONSENT_REVOKED", consent.getUserName() != null ? consent.getUserName() : "CITIZEN",
                "DataConsent", updated.getId(), "Citizen revoked access to " + consent.getFieldName() + " for " + consent.getServiceName(), null);

        return updated;
    }
}
