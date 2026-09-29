package org.sih.samavay.service;

import org.sih.samavay.entity.GovernmentService;
import org.sih.samavay.repository.GovernmentServiceRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ServiceRecommendationService {

    private final GovernmentServiceRepository serviceRepository;

    public ServiceRecommendationService(GovernmentServiceRepository serviceRepository) {
        this.serviceRepository = serviceRepository;
    }

    public List<GovernmentService> getRecommendations(Long serviceId) {
        GovernmentService current = serviceRepository.findById(serviceId).orElse(null);
        if (current == null) {
            return serviceRepository.findAll().stream().limit(3).toList();
        }

        // Return services in same or complementary category
        return serviceRepository.findByCategoryIgnoreCase(current.getCategory()).stream()
                .filter(s -> !s.getId().equals(serviceId))
                .limit(3)
                .toList();
    }
}
