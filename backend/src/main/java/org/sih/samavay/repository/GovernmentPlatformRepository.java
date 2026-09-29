package org.sih.samavay.repository;

import org.sih.samavay.entity.GovernmentPlatform;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface GovernmentPlatformRepository extends JpaRepository<GovernmentPlatform, Long> {
    List<GovernmentPlatform> findByDepartmentId(Long departmentId);
    Optional<GovernmentPlatform> findByCode(String code);
}
