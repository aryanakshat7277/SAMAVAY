package org.sih.samavay.repository;

import org.sih.samavay.entity.DataRequirement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface DataRequirementRepository extends JpaRepository<DataRequirement, Long> {
    List<DataRequirement> findByServiceId(Long serviceId);
    List<DataRequirement> findBySourceDepartmentId(Long departmentId);
    List<DataRequirement> findBySourcePlatformId(Long platformId);
}
