package org.sih.samavay.repository;

import org.sih.samavay.entity.FormField;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface FormFieldRepository extends JpaRepository<FormField, Long> {
    List<FormField> findByConfigurationIdOrderByDisplayOrderAsc(Long configurationId);
}
