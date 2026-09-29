package org.sih.samavay.repository;

import org.sih.samavay.entity.GatewayRequestLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface GatewayRequestLogRepository extends JpaRepository<GatewayRequestLog, Long> {
    Optional<GatewayRequestLog> findByRequestId(String requestId);
    List<GatewayRequestLog> findByServiceRequestId(Long serviceRequestId);
    List<GatewayRequestLog> findAllByOrderByTimestampDesc();
}
