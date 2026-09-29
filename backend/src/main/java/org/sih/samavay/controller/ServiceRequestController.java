package org.sih.samavay.controller;

import jakarta.validation.Valid;
import org.sih.samavay.dto.ApiResponse;
import org.sih.samavay.dto.ServiceRequestDto;
import org.sih.samavay.dto.ServiceRequestStatusUpdateDto;
import org.sih.samavay.entity.ServiceRequest;
import org.sih.samavay.service.ServiceRequestService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/service-requests")
public class ServiceRequestController {

    private final ServiceRequestService serviceRequestService;

    public ServiceRequestController(ServiceRequestService serviceRequestService) {
        this.serviceRequestService = serviceRequestService;
    }

    @PostMapping
    public ResponseEntity<ApiResponse<ServiceRequest>> createRequest(@Valid @RequestBody ServiceRequestDto dto) {
        ServiceRequest created = serviceRequestService.createRequest(dto);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.ok("Service request submitted successfully", created));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<ServiceRequest>>> getAllRequests() {
        List<ServiceRequest> requests = serviceRequestService.getAllRequests();
        return ResponseEntity.ok(ApiResponse.ok(requests));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<ServiceRequest>> getRequestById(@PathVariable Long id) {
        ServiceRequest request = serviceRequestService.getRequestById(id);
        return ResponseEntity.ok(ApiResponse.ok(request));
    }

    @GetMapping("/track/{applicationNumber}")
    public ResponseEntity<ApiResponse<ServiceRequest>> getRequestByApplicationNumber(@PathVariable String applicationNumber) {
        ServiceRequest request = serviceRequestService.getRequestByApplicationNumber(applicationNumber);
        return ResponseEntity.ok(ApiResponse.ok(request));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<ApiResponse<List<ServiceRequest>>> getRequestsByUser(@PathVariable Long userId) {
        List<ServiceRequest> requests = serviceRequestService.getRequestsByUser(userId);
        return ResponseEntity.ok(ApiResponse.ok(requests));
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<ApiResponse<ServiceRequest>> updateRequestStatus(
            @PathVariable Long id,
            @Valid @RequestBody ServiceRequestStatusUpdateDto dto) {
        ServiceRequest updated = serviceRequestService.updateRequestStatus(id, dto);
        return ResponseEntity.ok(ApiResponse.ok("Service request status updated", updated));
    }
}
