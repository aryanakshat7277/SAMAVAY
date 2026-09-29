package org.sih.samavay.controller;

import org.sih.samavay.dto.ApiResponse;
import org.sih.samavay.entity.DataRequirement;
import org.sih.samavay.service.DataRequirementService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class DataRequirementController {

    private final DataRequirementService requirementService;

    public DataRequirementController(DataRequirementService requirementService) {
        this.requirementService = requirementService;
    }

    @GetMapping("/services/{serviceId}/data-requirements")
    public ResponseEntity<ApiResponse<List<DataRequirement>>> getRequirementsForService(@PathVariable Long serviceId) {
        List<DataRequirement> requirements = requirementService.getRequirementsByService(serviceId);
        return ResponseEntity.ok(ApiResponse.ok(requirements));
    }

    @GetMapping("/admin/data-requirements")
    public ResponseEntity<ApiResponse<List<DataRequirement>>> getAllRequirements() {
        List<DataRequirement> requirements = requirementService.getAllRequirements();
        return ResponseEntity.ok(ApiResponse.ok(requirements));
    }

    @PostMapping("/admin/data-requirements")
    public ResponseEntity<ApiResponse<DataRequirement>> createRequirement(@RequestBody DataRequirement requirement) {
        DataRequirement created = requirementService.createRequirement(requirement);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.ok("Data requirement created", created));
    }

    @PutMapping("/admin/data-requirements/{id}")
    public ResponseEntity<ApiResponse<DataRequirement>> updateRequirement(@PathVariable Long id, @RequestBody DataRequirement requirement) {
        DataRequirement updated = requirementService.updateRequirement(id, requirement);
        return ResponseEntity.ok(ApiResponse.ok("Data requirement updated", updated));
    }

    @DeleteMapping("/admin/data-requirements/{id}")
    public ResponseEntity<ApiResponse<String>> deleteRequirement(@PathVariable Long id) {
        requirementService.deleteRequirement(id);
        return ResponseEntity.ok(ApiResponse.ok("Data requirement deleted", "DELETED"));
    }
}
