package org.sih.samavay.controller;

import org.sih.samavay.dto.ApiResponse;
import org.sih.samavay.entity.GovernmentService;
import org.sih.samavay.service.GovernmentServiceService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/services")
public class GovernmentServiceController {

    private final GovernmentServiceService serviceService;

    public GovernmentServiceController(GovernmentServiceService serviceService) {
        this.serviceService = serviceService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<GovernmentService>>> getAllServices() {
        List<GovernmentService> services = serviceService.getAllServices();
        return ResponseEntity.ok(ApiResponse.ok(services));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<GovernmentService>> getServiceById(@PathVariable Long id) {
        GovernmentService service = serviceService.getServiceById(id);
        return ResponseEntity.ok(ApiResponse.ok(service));
    }

    @GetMapping("/search")
    public ResponseEntity<ApiResponse<List<GovernmentService>>> searchServices(@RequestParam(name = "q", defaultValue = "") String query) {
        List<GovernmentService> services = serviceService.searchServices(query);
        return ResponseEntity.ok(ApiResponse.ok(services));
    }

    @GetMapping("/category/{category}")
    public ResponseEntity<ApiResponse<List<GovernmentService>>> getServicesByCategory(@PathVariable String category) {
        List<GovernmentService> services = serviceService.getServicesByCategory(category);
        return ResponseEntity.ok(ApiResponse.ok(services));
    }
}
