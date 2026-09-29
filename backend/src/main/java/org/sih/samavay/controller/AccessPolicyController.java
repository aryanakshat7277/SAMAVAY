package org.sih.samavay.controller;

import org.sih.samavay.dto.ApiResponse;
import org.sih.samavay.entity.AccessPolicy;
import org.sih.samavay.service.AccessPolicyService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class AccessPolicyController {

    private final AccessPolicyService policyService;

    public AccessPolicyController(AccessPolicyService policyService) {
        this.policyService = policyService;
    }

    @GetMapping("/access-policies")
    public ResponseEntity<ApiResponse<List<AccessPolicy>>> getAllPolicies() {
        List<AccessPolicy> policies = policyService.getAllPolicies();
        return ResponseEntity.ok(ApiResponse.ok(policies));
    }

    @PostMapping("/access-policies")
    public ResponseEntity<ApiResponse<AccessPolicy>> createPolicy(@RequestBody AccessPolicy policy) {
        AccessPolicy created = policyService.createPolicy(policy);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.ok("Access policy configured", created));
    }

    @PutMapping("/access-policies/{id}")
    public ResponseEntity<ApiResponse<AccessPolicy>> togglePolicy(@PathVariable Long id) {
        AccessPolicy toggled = policyService.togglePolicy(id);
        return ResponseEntity.ok(ApiResponse.ok("Policy status updated", toggled));
    }

    @DeleteMapping("/access-policies/{id}")
    public ResponseEntity<ApiResponse<Void>> deletePolicy(@PathVariable Long id) {
        policyService.deletePolicy(id);
        return ResponseEntity.ok(ApiResponse.ok("Access policy deleted", null));
    }
}
