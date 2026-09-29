package org.sih.samavay.repository;

import org.sih.samavay.entity.InteroperabilityRule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface InteroperabilityRuleRepository extends JpaRepository<InteroperabilityRule, Long> {
    List<InteroperabilityRule> findByServiceIdAndActiveTrue(Long serviceId);
    List<InteroperabilityRule> findByActiveTrue();
}
