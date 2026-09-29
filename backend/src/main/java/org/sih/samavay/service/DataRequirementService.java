package org.sih.samavay.service;

import org.sih.samavay.entity.DataRequirement;
import org.sih.samavay.exception.ResourceNotFoundException;
import org.sih.samavay.repository.DataRequirementRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DataRequirementService {

    private final DataRequirementRepository dataRequirementRepository;

    public DataRequirementService(DataRequirementRepository dataRequirementRepository) {
        this.dataRequirementRepository = dataRequirementRepository;
    }

    public List<DataRequirement> getAllRequirements() {
        return dataRequirementRepository.findAll();
    }

    public List<DataRequirement> getRequirementsByService(Long serviceId) {
        return dataRequirementRepository.findByServiceId(serviceId);
    }

    public DataRequirement getRequirementById(Long id) {
        return dataRequirementRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Data requirement not found with id: " + id));
    }

    public DataRequirement createRequirement(DataRequirement requirement) {
        return dataRequirementRepository.save(requirement);
    }

    public DataRequirement updateRequirement(Long id, DataRequirement updated) {
        DataRequirement existing = getRequirementById(id);
        existing.setFieldName(updated.getFieldName());
        existing.setDescription(updated.getDescription());
        existing.setRequired(updated.getRequired());
        existing.setAvailabilityStatus(updated.getAvailabilityStatus());
        existing.setConsentRequired(updated.getConsentRequired());
        existing.setPurpose(updated.getPurpose());
        return dataRequirementRepository.save(existing);
    }

    public void deleteRequirement(Long id) {
        dataRequirementRepository.deleteById(id);
    }
}
