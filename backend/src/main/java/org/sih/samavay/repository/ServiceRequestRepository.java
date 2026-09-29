package org.sih.samavay.repository;

import org.sih.samavay.entity.RequestStatus;
import org.sih.samavay.entity.ServiceRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface ServiceRequestRepository extends JpaRepository<ServiceRequest, Long> {
    List<ServiceRequest> findByUserIdOrderBySubmittedAtDesc(Long userId);
    List<ServiceRequest> findByStatus(RequestStatus status);
    Optional<ServiceRequest> findByApplicationNumber(String applicationNumber);
}
