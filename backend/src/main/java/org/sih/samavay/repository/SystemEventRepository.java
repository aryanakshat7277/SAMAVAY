package org.sih.samavay.repository;

import org.sih.samavay.entity.SystemEvent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface SystemEventRepository extends JpaRepository<SystemEvent, Long> {
    List<SystemEvent> findAllByOrderByTimestampDesc();
    List<SystemEvent> findBySeverity(String severity);
}
