package org.sih.samavay.service;

import org.sih.samavay.entity.AccessPolicy;
import org.sih.samavay.repository.AccessPolicyRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AccessPolicyService {

    private final AccessPolicyRepository accessPolicyRepository;

    public AccessPolicyService(AccessPolicyRepository accessPolicyRepository) {
        this.accessPolicyRepository = accessPolicyRepository;
    }

    public List<AccessPolicy> getAllPolicies() {
        return accessPolicyRepository.findAll();
    }

    public Optional<AccessPolicy> findPolicy(Long sourcePlatformId, Long destinationPlatformId, String dataCategory) {
        return accessPolicyRepository.findBySourcePlatformIdAndDestinationPlatformIdAndDataCategory(
                sourcePlatformId, destinationPlatformId, dataCategory);
    }

    public boolean isAllowed(Long sourcePlatformId, Long destinationPlatformId, String dataCategory) {
        Optional<AccessPolicy> policy = findPolicy(sourcePlatformId, destinationPlatformId, dataCategory);
        return policy.map(p -> p.getActive() && p.getAllowed()).orElse(true); // Default allow for demo interoperability if unconstrained
    }

    public AccessPolicy createPolicy(AccessPolicy policy) {
        return accessPolicyRepository.save(policy);
    }

    public AccessPolicy togglePolicy(Long id) {
        AccessPolicy policy = accessPolicyRepository.findById(id).orElseThrow();
        policy.setActive(!policy.getActive());
        return accessPolicyRepository.save(policy);
    }

    public void deletePolicy(Long id) {
        accessPolicyRepository.deleteById(id);
    }
}
