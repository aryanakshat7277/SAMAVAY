package org.sih.samavay.controller;

import org.sih.samavay.dto.ApiResponse;
import org.sih.samavay.entity.SystemAlert;
import org.sih.samavay.service.SystemAlertService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/alerts")
public class AdminAlertController {

    private final SystemAlertService alertService;

    public AdminAlertController(SystemAlertService alertService) {
        this.alertService = alertService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<SystemAlert>>> getAllAlerts() {
        List<SystemAlert> alerts = alertService.getAllAlerts();
        return ResponseEntity.ok(ApiResponse.ok(alerts));
    }

    @PutMapping("/{id}/review")
    public ResponseEntity<ApiResponse<SystemAlert>> reviewAlert(@PathVariable Long id) {
        SystemAlert alert = alertService.reviewAlert(id);
        return ResponseEntity.ok(ApiResponse.ok("Alert marked as reviewed", alert));
    }

    @PutMapping("/{id}/resolve")
    public ResponseEntity<ApiResponse<SystemAlert>> resolveAlert(@PathVariable Long id) {
        SystemAlert alert = alertService.resolveAlert(id);
        return ResponseEntity.ok(ApiResponse.ok("Alert marked as resolved", alert));
    }
}
