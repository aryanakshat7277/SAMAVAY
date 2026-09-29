package org.sih.samavay.service;

import org.sih.samavay.entity.GovernmentService;
import org.sih.samavay.exception.ResourceNotFoundException;
import org.sih.samavay.repository.GovernmentServiceRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GovernmentServiceService {

    private final GovernmentServiceRepository serviceRepository;

    public GovernmentServiceService(GovernmentServiceRepository serviceRepository) {
        this.serviceRepository = serviceRepository;
    }

    public List<GovernmentService> getAllServices() {
        return serviceRepository.findAll();
    }

    public GovernmentService getServiceById(Long id) {
        return serviceRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Government service not found with id: " + id));
    }

    public List<GovernmentService> searchServices(String query) {
        if (query == null || query.trim().isEmpty()) {
            return serviceRepository.findAll();
        }
        return serviceRepository.searchServices(query.trim());
    }

    public List<GovernmentService> getServicesByCategory(String category) {
        return serviceRepository.findByCategoryIgnoreCase(category);
    }
}
