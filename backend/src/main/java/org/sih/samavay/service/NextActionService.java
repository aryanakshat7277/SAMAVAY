package org.sih.samavay.service;

import org.sih.samavay.entity.ServiceAction;
import org.sih.samavay.entity.ServiceRequest;
import org.sih.samavay.repository.ServiceActionRepository;
import org.sih.samavay.repository.ServiceRequestRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class NextActionService {

    private final ServiceActionRepository actionRepository;
    private final ServiceRequestRepository requestRepository;

    public NextActionService(ServiceActionRepository actionRepository,
                             ServiceRequestRepository requestRepository) {
        this.actionRepository = actionRepository;
        this.requestRepository = requestRepository;
    }

    public List<ServiceAction> getPendingActionsForUser(Long userId) {
        return actionRepository.findByUserIdAndStatus(userId != null ? userId : 1L, "PENDING");
    }

    public Optional<ServiceAction> getNextActionForRequest(Long requestId) {
        List<ServiceAction> actions = actionRepository.findByServiceRequestId(requestId);
        return actions.stream().filter(a -> "PENDING".equalsIgnoreCase(a.getStatus())).findFirst();
    }

    public ServiceAction createAction(ServiceAction action) {
        return actionRepository.save(action);
    }
}
