package org.sih.samavay.controller;

import org.sih.samavay.dto.ApiResponse;
import org.sih.samavay.entity.IntegrationConnection;
import org.sih.samavay.service.GovernmentPlatformService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin/integrations")
public class AdminIntegrationController {

    private final GovernmentPlatformService platformService;

    public AdminIntegrationController(GovernmentPlatformService platformService) {
        this.platformService = platformService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<IntegrationConnection>>> getAllIntegrations() {
        List<IntegrationConnection> connections = platformService.getAllConnections();
        return ResponseEntity.ok(ApiResponse.ok(connections));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<IntegrationConnection>> getIntegrationById(@PathVariable Long id) {
        IntegrationConnection connection = platformService.getConnectionById(id);
        return ResponseEntity.ok(ApiResponse.ok(connection));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<IntegrationConnection>> createIntegration(@RequestBody IntegrationConnection connection) {
        IntegrationConnection created = platformService.createConnection(connection);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.ok("Integration connection request created", created));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<IntegrationConnection>> updateIntegration(@PathVariable Long id, @RequestBody IntegrationConnection connection) {
        IntegrationConnection updated = platformService.updateConnection(id, connection);
        return ResponseEntity.ok(ApiResponse.ok("Integration updated successfully", updated));
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<ApiResponse<IntegrationConnection>> updateIntegrationStatus(@PathVariable Long id, @RequestBody Map<String, String> statusBody) {
        String status = statusBody.get("status");
        IntegrationConnection updated = platformService.updateConnectionStatus(id, status);
        return ResponseEntity.ok(ApiResponse.ok("Integration status updated", updated));
    }
}
