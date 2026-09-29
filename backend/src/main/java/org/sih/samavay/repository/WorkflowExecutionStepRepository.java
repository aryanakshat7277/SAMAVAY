package org.sih.samavay.repository;

import org.sih.samavay.entity.WorkflowExecutionStep;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface WorkflowExecutionStepRepository extends JpaRepository<WorkflowExecutionStep, Long> {
    List<WorkflowExecutionStep> findByExecutionIdOrderByStepOrderAsc(Long executionId);
}
