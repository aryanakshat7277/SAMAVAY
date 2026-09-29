package org.sih.samavay.repository;

import org.sih.samavay.entity.AccessPolicy;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface AccessPolicyRepository extends JpaRepository<AccessPolicy, Long> {
    Optional<AccessPolicy> findBySourcePlatformIdAndDestinationPlatformIdAndDataCategory(
            Long sourcePlatformId, Long destinationPlatformId, String dataCategory);
    List<AccessPolicy> findByActiveTrue();
}
