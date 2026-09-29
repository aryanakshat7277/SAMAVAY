package org.sih.samavay.repository;

import org.sih.samavay.entity.DataSourceMapping;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface DataSourceMappingRepository extends JpaRepository<DataSourceMapping, Long> {
    List<DataSourceMapping> findByDataCategory(String dataCategory);
    List<DataSourceMapping> findByDataField(String dataField);
    List<DataSourceMapping> findByActiveTrue();
    List<DataSourceMapping> findByPlatformId(Long platformId);
}
