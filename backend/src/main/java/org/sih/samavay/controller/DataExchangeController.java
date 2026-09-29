package org.sih.samavay.controller;

import org.sih.samavay.dto.ApiResponse;
import org.sih.samavay.entity.GatewayRequestLog;
import org.sih.samavay.service.InteroperabilityGatewayService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class DataExchangeController {

    private final InteroperabilityGatewayService gatewayService;

    public DataExchangeController(InteroperabilityGatewayService gatewayService) {
        this.gatewayService = gatewayService;
    }

    @GetMapping("/data-exchange")
    public ResponseEntity<ApiResponse<List<GatewayRequestLog>>> getAllLogs() {
        List<GatewayRequestLog> logs = gatewayService.getAllLogs();
        return ResponseEntity.ok(ApiResponse.ok(logs));
    }

    @GetMapping("/data-exchange/{requestId}")
    public ResponseEntity<ApiResponse<GatewayRequestLog>> getLogByRequestId(@PathVariable String requestId) {
        GatewayRequestLog log = gatewayService.getLogByRequestId(requestId);
        if (log == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(ApiResponse.ok(log));
    }
}
