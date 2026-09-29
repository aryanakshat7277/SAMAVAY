package org.sih.samavay.repository;

import org.sih.samavay.entity.ServiceAction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ServiceActionRepository extends JpaRepository<ServiceAction, Long> {
    List<ServiceAction> findByUserIdAndStatus(Long userId, String status);
    List<ServiceAction> findByServiceRequestId(Long serviceRequestId);
}
