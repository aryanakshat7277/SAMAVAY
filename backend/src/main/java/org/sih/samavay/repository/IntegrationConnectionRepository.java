package org.sih.samavay.repository;

import org.sih.samavay.entity.IntegrationConnection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface IntegrationConnectionRepository extends JpaRepository<IntegrationConnection, Long> {
    List<IntegrationConnection> findBySourcePlatformId(Long sourcePlatformId);
    List<IntegrationConnection> findByDestinationPlatformId(Long destinationPlatformId);
}
