package org.sih.samavay.controller;

import org.sih.samavay.dto.ApiResponse;
import org.sih.samavay.dto.OrchestrationSummaryDto;
import org.sih.samavay.entity.DataSourceMapping;
import org.sih.samavay.entity.InteroperabilityRule;
import org.sih.samavay.entity.WorkflowExecution;
import org.sih.samavay.entity.WorkflowExecutionStep;
import org.sih.samavay.service.GovernmentServiceDiscoveryService;
import org.sih.samavay.service.InteroperabilityRuleEngine;
import org.sih.samavay.service.WorkflowExecutionService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class AdminOrchestrationController {

    private final WorkflowExecutionService workflowExecutionService;
    private final InteroperabilityRuleEngine ruleEngine;
    private final GovernmentServiceDiscoveryService discoveryService;

    public AdminOrchestrationController(WorkflowExecutionService workflowExecutionService,
                                       InteroperabilityRuleEngine ruleEngine,
                                       GovernmentServiceDiscoveryService discoveryService) {
        this.workflowExecutionService = workflowExecutionService;
        this.ruleEngine = ruleEngine;
        this.discoveryService = discoveryService;
    }

    @GetMapping("/orchestration/summary")
    public ResponseEntity<ApiResponse<OrchestrationSummaryDto>> getSummary() {
        OrchestrationSummaryDto summary = workflowExecutionService.getOrchestrationSummary();
        return ResponseEntity.ok(ApiResponse.ok(summary));
    }

    @GetMapping("/orchestration/executions")
    public ResponseEntity<ApiResponse<List<WorkflowExecution>>> getAllExecutions() {
        List<WorkflowExecution> executions = workflowExecutionService.getAllExecutions();
        return ResponseEntity.ok(ApiResponse.ok(executions));
    }

    @GetMapping("/orchestration/executions/{id}")
    public ResponseEntity<ApiResponse<WorkflowExecution>> getExecutionById(@PathVariable Long id) {
        WorkflowExecution execution = workflowExecutionService.getExecutionById(id);
        return ResponseEntity.ok(ApiResponse.ok(execution));
    }

    @GetMapping("/orchestration/executions/{id}/steps")
    public ResponseEntity<ApiResponse<List<WorkflowExecutionStep>>> getExecutionSteps(@PathVariable Long id) {
        List<WorkflowExecutionStep> steps = workflowExecutionService.getExecutionSteps(id);
        return ResponseEntity.ok(ApiResponse.ok(steps));
    }

    @GetMapping("/rules")
    public ResponseEntity<ApiResponse<List<InteroperabilityRule>>> getAllRules() {
        List<InteroperabilityRule> rules = ruleEngine.getAllRules();
        return ResponseEntity.ok(ApiResponse.ok(rules));
    }

    @PostMapping("/rules")
    public ResponseEntity<ApiResponse<InteroperabilityRule>> createRule(@RequestBody InteroperabilityRule rule) {
        InteroperabilityRule created = ruleEngine.createRule(rule);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.ok("Interoperability rule created", created));
    }

    @PutMapping("/rules/{id}/toggle")
    public ResponseEntity<ApiResponse<InteroperabilityRule>> toggleRule(@PathVariable Long id) {
        InteroperabilityRule toggled = ruleEngine.toggleRule(id);
        return ResponseEntity.ok(ApiResponse.ok("Rule state updated", toggled));
    }

    @GetMapping("/data-sources")
    public ResponseEntity<ApiResponse<List<DataSourceMapping>>> getDataSources() {
        List<DataSourceMapping> mappings = discoveryService.getAllMappings();
        return ResponseEntity.ok(ApiResponse.ok(mappings));
    }
}
