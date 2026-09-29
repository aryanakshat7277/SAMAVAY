package org.sih.samavay.controller;

import org.sih.samavay.dto.ApiResponse;
import org.sih.samavay.entity.GovernmentPlatform;
import org.sih.samavay.service.GovernmentPlatformService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/platforms")
public class AdminPlatformController {

    private final GovernmentPlatformService platformService;

    public AdminPlatformController(GovernmentPlatformService platformService) {
        this.platformService = platformService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<GovernmentPlatform>>> getAllPlatforms() {
        List<GovernmentPlatform> platforms = platformService.getAllPlatforms();
        return ResponseEntity.ok(ApiResponse.ok(platforms));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<GovernmentPlatform>> getPlatformById(@PathVariable Long id) {
        GovernmentPlatform platform = platformService.getPlatformById(id);
        return ResponseEntity.ok(ApiResponse.ok(platform));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<GovernmentPlatform>> createPlatform(@RequestBody GovernmentPlatform platform) {
        GovernmentPlatform created = platformService.createPlatform(platform);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.ok("Government platform registered successfully", created));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<GovernmentPlatform>> updatePlatform(@PathVariable Long id, @RequestBody GovernmentPlatform platform) {
        GovernmentPlatform updated = platformService.updatePlatform(id, platform);
        return ResponseEntity.ok(ApiResponse.ok("Platform updated successfully", updated));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<String>> deletePlatform(@PathVariable Long id) {
        platformService.deletePlatform(id);
        return ResponseEntity.ok(ApiResponse.ok("Platform deleted successfully", "DELETED"));
    }
}
