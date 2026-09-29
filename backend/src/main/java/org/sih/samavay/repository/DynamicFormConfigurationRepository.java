package org.sih.samavay.repository;

import org.sih.samavay.entity.DynamicFormConfiguration;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface DynamicFormConfigurationRepository extends JpaRepository<DynamicFormConfiguration, Long> {
    Optional<DynamicFormConfiguration> findByServiceId(Long serviceId);
}
