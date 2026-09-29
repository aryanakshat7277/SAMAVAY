package org.sih.samavay.service;

import org.sih.samavay.entity.DataSourceMapping;
import org.sih.samavay.repository.DataSourceMappingRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class GovernmentServiceDiscoveryService {

    private final DataSourceMappingRepository dataSourceMappingRepository;

    public GovernmentServiceDiscoveryService(DataSourceMappingRepository dataSourceMappingRepository) {
        this.dataSourceMappingRepository = dataSourceMappingRepository;
    }

    public List<DataSourceMapping> getAllMappings() {
        return dataSourceMappingRepository.findAll();
    }

    public Optional<DataSourceMapping> discoverSource(String dataField) {
        List<DataSourceMapping> matches = dataSourceMappingRepository.findByDataField(dataField);
        if (matches.isEmpty()) {
            return Optional.empty();
        }
        // Return PRIMARY source first
        return matches.stream()
                .filter(m -> "PRIMARY".equalsIgnoreCase(m.getPriority()))
                .findFirst()
                .or(() -> Optional.of(matches.get(0)));
    }

    public DataSourceMapping createOrUpdateMapping(DataSourceMapping mapping) {
        return dataSourceMappingRepository.save(mapping);
    }
}
