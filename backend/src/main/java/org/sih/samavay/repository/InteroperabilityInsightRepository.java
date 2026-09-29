package org.sih.samavay.repository;

import org.sih.samavay.entity.InteroperabilityInsight;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface InteroperabilityInsightRepository extends JpaRepository<InteroperabilityInsight, Long> {
    List<InteroperabilityInsight> findAllByOrderByCreatedAtDesc();
    List<InteroperabilityInsight> findByCategory(String category);
}
