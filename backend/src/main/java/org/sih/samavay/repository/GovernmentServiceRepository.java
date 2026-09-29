package org.sih.samavay.repository;

import org.sih.samavay.entity.GovernmentService;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface GovernmentServiceRepository extends JpaRepository<GovernmentService, Long> {
    List<GovernmentService> findByDepartmentId(Long departmentId);
    List<GovernmentService> findByCategoryIgnoreCase(String category);
    Optional<GovernmentService> findByCode(String code);

    @Query("SELECT s FROM GovernmentService s WHERE " +
           "LOWER(s.name) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(s.description) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(s.departmentName) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(s.category) LIKE LOWER(CONCAT('%', :query, '%'))")
    List<GovernmentService> searchServices(@Param("query") String query);
}
