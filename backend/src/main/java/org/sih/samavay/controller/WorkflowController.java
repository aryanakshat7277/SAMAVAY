package org.sih.samavay.controller;

import org.sih.samavay.dto.ApiResponse;
import org.sih.samavay.entity.ServiceWorkflow;
import org.sih.samavay.entity.WorkflowStep;
import org.sih.samavay.service.ServiceWorkflowService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/workflows")
public class WorkflowController {

    private final ServiceWorkflowService workflowService;

    public WorkflowController(ServiceWorkflowService workflowService) {
        this.workflowService = workflowService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<ServiceWorkflow>>> getAllWorkflows() {
        List<ServiceWorkflow> workflows = workflowService.getAllWorkflows();
        return ResponseEntity.ok(ApiResponse.ok(workflows));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<ServiceWorkflow>> getWorkflowById(@PathVariable Long id) {
        ServiceWorkflow workflow = workflowService.getWorkflowById(id);
        return ResponseEntity.ok(ApiResponse.ok(workflow));
    }

    @GetMapping("/service/{serviceId}")
    public ResponseEntity<ApiResponse<ServiceWorkflow>> getWorkflowByServiceId(@PathVariable Long serviceId) {
        ServiceWorkflow workflow = workflowService.getWorkflowByServiceId(serviceId);
        return ResponseEntity.ok(ApiResponse.ok(workflow));
    }

    @GetMapping("/{id}/steps")
    public ResponseEntity<ApiResponse<List<WorkflowStep>>> getStepsByWorkflowId(@PathVariable Long id) {
        List<WorkflowStep> steps = workflowService.getStepsByWorkflowId(id);
        return ResponseEntity.ok(ApiResponse.ok(steps));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<ServiceWorkflow>> createWorkflow(@RequestBody ServiceWorkflow workflow) {
        ServiceWorkflow created = workflowService.createWorkflow(workflow);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.ok("Service workflow created", created));
    }

    @PostMapping("/{id}/steps")
    public ResponseEntity<ApiResponse<WorkflowStep>> addStep(@PathVariable Long id, @RequestBody WorkflowStep step) {
        step.setWorkflowId(id);
        WorkflowStep created = workflowService.addStep(step);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.ok("Workflow step added", created));
    }
}
