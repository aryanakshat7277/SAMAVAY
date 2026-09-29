package org.sih.samavay.repository;

import org.sih.samavay.entity.WorkflowExecution;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;
import java.util.List;

@Repository
public interface WorkflowExecutionRepository extends JpaRepository<WorkflowExecution, Long> {
    Optional<WorkflowExecution> findByServiceRequestId(Long serviceRequestId);
    Optional<WorkflowExecution> findByApplicationNumber(String applicationNumber);
    List<WorkflowExecution> findByStatus(String status);
    List<WorkflowExecution> findAllByOrderByStartedAtDesc();
}
