package org.sih.samavay.service;

import org.sih.samavay.entity.InteroperabilityInsight;
import org.sih.samavay.repository.InteroperabilityInsightRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InteroperabilityInsightService {

    private final InteroperabilityInsightRepository insightRepository;

    public InteroperabilityInsightService(InteroperabilityInsightRepository insightRepository) {
        this.insightRepository = insightRepository;
    }

    public List<InteroperabilityInsight> getAllInsights() {
        return insightRepository.findAllByOrderByCreatedAtDesc();
    }

    public List<InteroperabilityInsight> getInsightsByCategory(String category) {
        return insightRepository.findByCategory(category);
    }

    public InteroperabilityInsight saveInsight(InteroperabilityInsight insight) {
        return insightRepository.save(insight);
    }
}
