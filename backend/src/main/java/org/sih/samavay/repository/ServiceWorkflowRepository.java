package org.sih.samavay.repository;

import org.sih.samavay.entity.ServiceWorkflow;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;
import java.util.List;

@Repository
public interface ServiceWorkflowRepository extends JpaRepository<ServiceWorkflow, Long> {
    Optional<ServiceWorkflow> findByServiceId(Long serviceId);
    List<ServiceWorkflow> findByStatus(String status);
}
