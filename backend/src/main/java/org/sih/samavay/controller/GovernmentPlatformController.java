package org.sih.samavay.controller;

import org.sih.samavay.dto.ApiResponse;
import org.sih.samavay.entity.GovernmentPlatform;
import org.sih.samavay.entity.IntegrationConnection;
import org.sih.samavay.service.GovernmentPlatformService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/platforms")
public class GovernmentPlatformController {

    private final GovernmentPlatformService platformService;

    public GovernmentPlatformController(GovernmentPlatformService platformService) {
        this.platformService = platformService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<GovernmentPlatform>>> getAllPlatforms() {
        List<GovernmentPlatform> platforms = platformService.getAllPlatforms();
        return ResponseEntity.ok(ApiResponse.ok(platforms));
    }

    @GetMapping("/connections")
    public ResponseEntity<ApiResponse<List<IntegrationConnection>>> getAllConnections() {
        List<IntegrationConnection> connections = platformService.getAllConnections();
        return ResponseEntity.ok(ApiResponse.ok(connections));
    }

    @GetMapping("/department/{deptId}")
    public ResponseEntity<ApiResponse<List<GovernmentPlatform>>> getPlatformsByDepartment(@PathVariable Long deptId) {
        List<GovernmentPlatform> platforms = platformService.getPlatformsByDepartment(deptId);
        return ResponseEntity.ok(ApiResponse.ok(platforms));
    }
}
