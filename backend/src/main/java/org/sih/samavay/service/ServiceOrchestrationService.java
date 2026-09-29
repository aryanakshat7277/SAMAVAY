package org.sih.samavay.service;

import org.sih.samavay.dto.ApplicationJourneyDto;
import org.sih.samavay.dto.DynamicFormDto;
import org.sih.samavay.dto.ServiceReadinessResult;
import org.sih.samavay.entity.GovernmentService;
import org.sih.samavay.entity.WorkflowExecution;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ServiceOrchestrationService {

    private final ServiceReadinessService readinessService;
    private final DynamicFormService dynamicFormService;
    private final WorkflowExecutionService workflowExecutionService;
    private final NextActionService nextActionService;
    private final ServiceRecommendationService recommendationService;

    public ServiceOrchestrationService(ServiceReadinessService readinessService,
                                      DynamicFormService dynamicFormService,
                                      WorkflowExecutionService workflowExecutionService,
                                      NextActionService nextActionService,
                                      ServiceRecommendationService recommendationService) {
        this.readinessService = readinessService;
        this.dynamicFormService = dynamicFormService;
        this.workflowExecutionService = workflowExecutionService;
        this.nextActionService = nextActionService;
        this.recommendationService = recommendationService;
    }

    public ServiceReadinessResult checkReadiness(Long serviceId, Long userId) {
        return readinessService.checkReadiness(serviceId, userId);
    }

    public DynamicFormDto getDynamicForm(Long serviceId, Long userId) {
        return dynamicFormService.getDynamicFormForService(serviceId, userId);
    }

    public WorkflowExecution startOrchestration(Long serviceRequestId) {
        return workflowExecutionService.startOrchestration(serviceRequestId);
    }

    public ApplicationJourneyDto getApplicationJourney(Long serviceRequestId) {
        return workflowExecutionService.getApplicationJourney(serviceRequestId);
    }

    public List<GovernmentService> getRecommendations(Long serviceId) {
        return recommendationService.getRecommendations(serviceId);
    }
}
