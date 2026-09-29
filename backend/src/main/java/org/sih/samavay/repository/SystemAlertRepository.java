package org.sih.samavay.repository;

import org.sih.samavay.entity.SystemAlert;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface SystemAlertRepository extends JpaRepository<SystemAlert, Long> {
    List<SystemAlert> findByStatus(String status);
    List<SystemAlert> findAllByOrderByCreatedAtDesc();
}
