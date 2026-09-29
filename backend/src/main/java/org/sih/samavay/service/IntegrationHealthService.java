package org.sih.samavay.service;

import org.sih.samavay.connector.GovernmentPlatformConnector;
import org.sih.samavay.dto.PlatformStatusDto;
import org.sih.samavay.entity.GovernmentPlatform;
import org.sih.samavay.entity.IntegrationConnection;
import org.sih.samavay.repository.GovernmentPlatformRepository;
import org.sih.samavay.repository.IntegrationConnectionRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class IntegrationHealthService {

    private final GovernmentPlatformRepository platformRepository;
    private final IntegrationConnectionRepository connectionRepository;
    private final List<GovernmentPlatformConnector> connectors;

    public IntegrationHealthService(GovernmentPlatformRepository platformRepository,
                                  IntegrationConnectionRepository connectionRepository,
                                  List<GovernmentPlatformConnector> connectors) {
        this.platformRepository = platformRepository;
        this.connectionRepository = connectionRepository;
        this.connectors = connectors;
    }

    public List<PlatformStatusDto> getAllPlatformStatuses() {
        List<GovernmentPlatform> platforms = platformRepository.findAll();
        List<IntegrationConnection> connections = connectionRepository.findAll();
        List<PlatformStatusDto> result = new ArrayList<>();

        for (GovernmentPlatform p : platforms) {
            int activeConns = (int) connections.stream()
                    .filter(c -> c.getSourcePlatformId().equals(p.getId()) || c.getDestinationPlatformId().equals(p.getId()))
                    .count();

            GovernmentPlatformConnector conn = connectors.stream()
                    .filter(c -> c.getPlatformCode().equalsIgnoreCase(p.getCode()))
                    .findFirst()
                    .orElse(null);

            String status = conn != null ? conn.getPlatformStatus() : "HEALTHY";
            String simMode = conn != null ? conn.getSimulationMode() : "NORMAL";
            long latency = "SLOW".equalsIgnoreCase(simMode) ? 1450L : 38L;
            double successRate = "FAILURE".equalsIgnoreCase(simMode) ? 68.5 : "UNAVAILABLE".equalsIgnoreCase(simMode) ? 0.0 : 98.6;

            result.add(new PlatformStatusDto(
                    p.getId(), p.getName(), p.getCode(), p.getDepartmentName(),
                    p.getEnvironment(), status, latency, successRate,
                    activeConns, simMode, "Active 2 mins ago"
            ));
        }

        return result;
    }

    public PlatformStatusDto getPlatformStatusById(Long platformId) {
        return getAllPlatformStatuses().stream()
                .filter(p -> p.getId().equals(platformId))
                .findFirst()
                .orElse(null);
    }
}
