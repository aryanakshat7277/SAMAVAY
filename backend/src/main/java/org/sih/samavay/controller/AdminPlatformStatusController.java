package org.sih.samavay.controller;

import org.sih.samavay.dto.ApiResponse;
import org.sih.samavay.dto.PlatformStatusDto;
import org.sih.samavay.dto.ServiceImpactDto;
import org.sih.samavay.service.IntegrationHealthService;
import org.sih.samavay.service.ServiceImpactAnalysisService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class AdminPlatformStatusController {

    private final IntegrationHealthService healthService;
    private final ServiceImpactAnalysisService impactService;

    public AdminPlatformStatusController(IntegrationHealthService healthService,
                                        ServiceImpactAnalysisService impactService) {
        this.healthService = healthService;
        this.impactService = impactService;
    }

    @GetMapping("/platform-status")
    public ResponseEntity<ApiResponse<List<PlatformStatusDto>>> getAllPlatformStatuses() {
        List<PlatformStatusDto> statuses = healthService.getAllPlatformStatuses();
        return ResponseEntity.ok(ApiResponse.ok(statuses));
    }

    @GetMapping("/platform-status/{id}")
    public ResponseEntity<ApiResponse<PlatformStatusDto>> getPlatformStatusById(@PathVariable Long id) {
        PlatformStatusDto status = healthService.getPlatformStatusById(id);
        return ResponseEntity.ok(ApiResponse.ok(status));
    }

    @GetMapping("/platforms/{id}/impact")
    public ResponseEntity<ApiResponse<ServiceImpactDto>> getPlatformImpact(@PathVariable Long id) {
        ServiceImpactDto impact = impactService.analyzePlatformImpact(id);
        return ResponseEntity.ok(ApiResponse.ok(impact));
    }
}
