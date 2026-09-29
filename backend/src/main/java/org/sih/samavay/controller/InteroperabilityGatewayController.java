package org.sih.samavay.controller;

import org.sih.samavay.dto.ApiResponse;
import org.sih.samavay.dto.GatewayRequest;
import org.sih.samavay.dto.GatewayResponse;
import org.sih.samavay.service.InteroperabilityGatewayService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/gateway")
public class InteroperabilityGatewayController {

    private final InteroperabilityGatewayService gatewayService;

    public InteroperabilityGatewayController(InteroperabilityGatewayService gatewayService) {
        this.gatewayService = gatewayService;
    }

    @PostMapping("/request")
    public ResponseEntity<ApiResponse<GatewayResponse>> executeGatewayRequest(@RequestBody GatewayRequest request) {
        GatewayResponse response = gatewayService.processRequest(request);
        return ResponseEntity.ok(ApiResponse.ok("Gateway execution processed", response));
    }
}
