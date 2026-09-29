package org.sih.samavay.repository;

import org.sih.samavay.entity.DataConsent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface DataConsentRepository extends JpaRepository<DataConsent, Long> {
    List<DataConsent> findByUserIdOrderByGrantedAtDesc(Long userId);
    List<DataConsent> findByUserIdAndStatus(Long userId, String status);
    List<DataConsent> findByServiceId(Long serviceId);
}
