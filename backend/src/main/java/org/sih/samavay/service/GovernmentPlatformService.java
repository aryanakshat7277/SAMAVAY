package org.sih.samavay.service;

import org.sih.samavay.entity.GovernmentPlatform;
import org.sih.samavay.entity.IntegrationConnection;
import org.sih.samavay.exception.ResourceNotFoundException;
import org.sih.samavay.repository.GovernmentPlatformRepository;
import org.sih.samavay.repository.IntegrationConnectionRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class GovernmentPlatformService {

    private final GovernmentPlatformRepository platformRepository;
    private final IntegrationConnectionRepository connectionRepository;
    private final AuditLogService auditLogService;

    public GovernmentPlatformService(GovernmentPlatformRepository platformRepository,
                                     IntegrationConnectionRepository connectionRepository,
                                     AuditLogService auditLogService) {
        this.platformRepository = platformRepository;
        this.connectionRepository = connectionRepository;
        this.auditLogService = auditLogService;
    }

    public List<GovernmentPlatform> getAllPlatforms() {
        return platformRepository.findAll();
    }

    public GovernmentPlatform getPlatformById(Long id) {
        return platformRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Government platform not found with id: " + id));
    }

    public GovernmentPlatform createPlatform(GovernmentPlatform platform) {
        platform.setCreatedAt(LocalDateTime.now());
        platform.setUpdatedAt(LocalDateTime.now());
        GovernmentPlatform saved = platformRepository.save(platform);

        auditLogService.log("PLATFORM_REGISTERED", "OFFICER/ADMIN", "GovernmentPlatform", saved.getId(),
                "Registered new government platform: " + saved.getName() + " (" + saved.getCode() + ")", null);

        return saved;
    }

    public GovernmentPlatform updatePlatform(Long id, GovernmentPlatform updated) {
        GovernmentPlatform existing = getPlatformById(id);
        existing.setName(updated.getName());
        existing.setDescription(updated.getDescription());
        existing.setPlatformType(updated.getPlatformType());
        existing.setEnvironment(updated.getEnvironment());
        existing.setConnectionStatus(updated.getConnectionStatus());
        existing.setEndpointUrl(updated.getEndpointUrl());
        existing.setAuthProtocol(updated.getAuthProtocol());
        existing.setUpdatedAt(LocalDateTime.now());

        GovernmentPlatform saved = platformRepository.save(existing);
        auditLogService.log("PLATFORM_UPDATED", "OFFICER/ADMIN", "GovernmentPlatform", saved.getId(),
                "Updated government platform: " + saved.getName(), null);
        return saved;
    }

    public void deletePlatform(Long id) {
        GovernmentPlatform existing = getPlatformById(id);
        platformRepository.deleteById(id);
        auditLogService.log("PLATFORM_DELETED", "SUPER_ADMIN", "GovernmentPlatform", id,
                "Deleted government platform: " + existing.getName(), null);
    }

    public List<IntegrationConnection> getAllConnections() {
        return connectionRepository.findAll();
    }

    public IntegrationConnection getConnectionById(Long id) {
        return connectionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Integration connection not found with id: " + id));
    }

    public IntegrationConnection createConnection(IntegrationConnection connection) {
        connection.setCreatedAt(LocalDateTime.now());
        connection.setUpdatedAt(LocalDateTime.now());
        if (connection.getStatus() == null) {
            connection.setStatus("SUBMITTED");
        }
        IntegrationConnection saved = connectionRepository.save(connection);

        auditLogService.log("INTEGRATION_REQUEST_CREATED", "OFFICER/ADMIN", "IntegrationConnection", saved.getId(),
                "Created integration request: " + saved.getSourcePlatformName() + " ➔ " + saved.getDestinationPlatformName() + " (" + saved.getPurpose() + ")", null);

        return saved;
    }

    public IntegrationConnection updateConnection(Long id, IntegrationConnection updated) {
        IntegrationConnection existing = getConnectionById(id);
        existing.setName(updated.getName());
        existing.setPurpose(updated.getPurpose());
        existing.setConnectionType(updated.getConnectionType());
        existing.setDataExchangeProtocol(updated.getDataExchangeProtocol());
        existing.setDataCategories(updated.getDataCategories());
        existing.setStatus(updated.getStatus());
        existing.setUpdatedAt(LocalDateTime.now());

        IntegrationConnection saved = connectionRepository.save(existing);
        auditLogService.log("INTEGRATION_UPDATED", "OFFICER/ADMIN", "IntegrationConnection", saved.getId(),
                "Updated integration connection: " + saved.getName(), null);
        return saved;
    }

    public IntegrationConnection updateConnectionStatus(Long id, String status) {
        IntegrationConnection existing = getConnectionById(id);
        existing.setStatus(status.toUpperCase());
        existing.setUpdatedAt(LocalDateTime.now());

        IntegrationConnection saved = connectionRepository.save(existing);
        auditLogService.log("INTEGRATION_STATUS_CHANGED", "SUPER_ADMIN", "IntegrationConnection", saved.getId(),
                "Updated integration status to: " + saved.getStatus(), null);
        return saved;
    }

    public List<GovernmentPlatform> getPlatformsByDepartment(Long departmentId) {
        return platformRepository.findByDepartmentId(departmentId);
    }
}
