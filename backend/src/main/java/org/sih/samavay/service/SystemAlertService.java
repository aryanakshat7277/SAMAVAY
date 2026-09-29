package org.sih.samavay.service;

import org.sih.samavay.entity.SystemAlert;
import org.sih.samavay.repository.SystemAlertRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class SystemAlertService {

    private final SystemAlertRepository alertRepository;

    public SystemAlertService(SystemAlertRepository alertRepository) {
        this.alertRepository = alertRepository;
    }

    public List<SystemAlert> getAllAlerts() {
        return alertRepository.findAllByOrderByCreatedAtDesc();
    }

    public SystemAlert createAlert(SystemAlert alert) {
        return alertRepository.save(alert);
    }

    public SystemAlert reviewAlert(Long alertId) {
        SystemAlert alert = alertRepository.findById(alertId).orElseThrow();
        alert.setStatus("REVIEWED");
        return alertRepository.save(alert);
    }

    public SystemAlert resolveAlert(Long alertId) {
        SystemAlert alert = alertRepository.findById(alertId).orElseThrow();
        alert.setStatus("RESOLVED");
        alert.setResolvedAt(LocalDateTime.now());
        return alertRepository.save(alert);
    }
}
