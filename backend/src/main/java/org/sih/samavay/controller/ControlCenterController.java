package org.sih.samavay.controller;

import org.sih.samavay.dto.ApiResponse;
import org.sih.samavay.dto.ControlCenterSummaryDto;
import org.sih.samavay.service.ControlCenterService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin/control-center")
public class ControlCenterController {

    private final ControlCenterService controlCenterService;

    public ControlCenterController(ControlCenterService controlCenterService) {
        this.controlCenterService = controlCenterService;
    }

    @GetMapping("/summary")
    public ResponseEntity<ApiResponse<ControlCenterSummaryDto>> getControlCenterSummary() {
        ControlCenterSummaryDto summary = controlCenterService.getSummary();
        return ResponseEntity.ok(ApiResponse.ok(summary));
    }
}
