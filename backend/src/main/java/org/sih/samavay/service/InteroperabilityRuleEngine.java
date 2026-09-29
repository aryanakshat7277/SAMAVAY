package org.sih.samavay.service;

import org.sih.samavay.entity.InteroperabilityRule;
import org.sih.samavay.repository.InteroperabilityRuleRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InteroperabilityRuleEngine {

    private final InteroperabilityRuleRepository ruleRepository;

    public InteroperabilityRuleEngine(InteroperabilityRuleRepository ruleRepository) {
        this.ruleRepository = ruleRepository;
    }

    public List<InteroperabilityRule> getAllRules() {
        return ruleRepository.findAll();
    }

    public List<InteroperabilityRule> getActiveRulesForService(Long serviceId) {
        return ruleRepository.findByServiceIdAndActiveTrue(serviceId);
    }

    public InteroperabilityRule createRule(InteroperabilityRule rule) {
        return ruleRepository.save(rule);
    }

    public InteroperabilityRule toggleRule(Long ruleId) {
        InteroperabilityRule rule = ruleRepository.findById(ruleId).orElseThrow();
        rule.setActive(!rule.getActive());
        return ruleRepository.save(rule);
    }
}
