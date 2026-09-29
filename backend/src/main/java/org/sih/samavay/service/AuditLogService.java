package org.sih.samavay.service;

import org.sih.samavay.entity.AuditLog;
import org.sih.samavay.repository.AuditLogRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AuditLogService {

    private final AuditLogRepository auditLogRepository;

    public AuditLogService(AuditLogRepository auditLogRepository) {
        this.auditLogRepository = auditLogRepository;
    }

    public AuditLog log(String action, String performedBy, String entityType, Long entityId, String details, String ipAddress) {
        AuditLog auditLog = new AuditLog(action, performedBy, entityType, entityId, details, ipAddress);
        return auditLogRepository.save(auditLog);
    }

    public List<AuditLog> getRecentLogs() {
        return auditLogRepository.findTop50ByOrderByTimestampDesc();
    }
}
