package org.sih.samavay.controller;

import org.sih.samavay.dto.ApiResponse;
import org.sih.samavay.dto.ApplicationJourneyDto;
import org.sih.samavay.dto.DynamicFormDto;
import org.sih.samavay.dto.ServiceReadinessResult;
import org.sih.samavay.entity.GovernmentService;
import org.sih.samavay.entity.ServiceAction;
import org.sih.samavay.entity.WorkflowExecution;
import org.sih.samavay.service.NextActionService;
import org.sih.samavay.service.ServiceOrchestrationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class ServiceOrchestrationController {

    private final ServiceOrchestrationService orchestrationService;
    private final NextActionService nextActionService;

    public ServiceOrchestrationController(ServiceOrchestrationService orchestrationService,
                                         NextActionService nextActionService) {
        this.orchestrationService = orchestrationService;
        this.nextActionService = nextActionService;
    }

    @GetMapping("/services/{id}/readiness")
    public ResponseEntity<ApiResponse<ServiceReadinessResult>> getServiceReadiness(
            @PathVariable Long id,
            @RequestParam(required = false, defaultValue = "1") Long userId) {
        ServiceReadinessResult result = orchestrationService.checkReadiness(id, userId);
        return ResponseEntity.ok(ApiResponse.ok(result));
    }

    @GetMapping("/services/{id}/dynamic-form")
    public ResponseEntity<ApiResponse<DynamicFormDto>> getDynamicForm(
            @PathVariable Long id,
            @RequestParam(required = false, defaultValue = "1") Long userId) {
        DynamicFormDto form = orchestrationService.getDynamicForm(id, userId);
        return ResponseEntity.ok(ApiResponse.ok(form));
    }

    @PostMapping("/service-requests/{id}/orchestrate")
    public ResponseEntity<ApiResponse<WorkflowExecution>> startOrchestration(@PathVariable Long id) {
        WorkflowExecution execution = orchestrationService.startOrchestration(id);
        return ResponseEntity.ok(ApiResponse.ok("Service workflow orchestration initialized", execution));
    }

    @GetMapping("/service-requests/{id}/journey")
    public ResponseEntity<ApiResponse<ApplicationJourneyDto>> getApplicationJourney(@PathVariable Long id) {
        ApplicationJourneyDto journey = orchestrationService.getApplicationJourney(id);
        return ResponseEntity.ok(ApiResponse.ok(journey));
    }

    @GetMapping("/service-requests/{id}/next-action")
    public ResponseEntity<ApiResponse<ServiceAction>> getNextAction(@PathVariable Long id) {
        return nextActionService.getNextActionForRequest(id)
                .map(action -> ResponseEntity.ok(ApiResponse.ok(action)))
                .orElseGet(() -> ResponseEntity.ok(ApiResponse.ok(null)));
    }

    @GetMapping("/citizen/actions")
    public ResponseEntity<ApiResponse<List<ServiceAction>>> getCitizenActions(
            @RequestParam(required = false, defaultValue = "1") Long userId) {
        List<ServiceAction> actions = nextActionService.getPendingActionsForUser(userId);
        return ResponseEntity.ok(ApiResponse.ok(actions));
    }

    @GetMapping("/services/{id}/recommendations")
    public ResponseEntity<ApiResponse<List<GovernmentService>>> getRecommendations(@PathVariable Long id) {
        List<GovernmentService> recommendations = orchestrationService.getRecommendations(id);
        return ResponseEntity.ok(ApiResponse.ok(recommendations));
    }
}
