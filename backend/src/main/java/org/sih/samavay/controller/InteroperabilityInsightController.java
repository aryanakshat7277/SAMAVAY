package org.sih.samavay.controller;

import org.sih.samavay.dto.ApiResponse;
import org.sih.samavay.entity.InteroperabilityInsight;
import org.sih.samavay.service.InteroperabilityInsightService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/insights")
public class InteroperabilityInsightController {

    private final InteroperabilityInsightService insightService;

    public InteroperabilityInsightController(InteroperabilityInsightService insightService) {
        this.insightService = insightService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<InteroperabilityInsight>>> getAllInsights() {
        List<InteroperabilityInsight> insights = insightService.getAllInsights();
        return ResponseEntity.ok(ApiResponse.ok(insights));
    }

    @GetMapping("/category/{category}")
    public ResponseEntity<ApiResponse<List<InteroperabilityInsight>>> getByCategory(@PathVariable String category) {
        List<InteroperabilityInsight> insights = insightService.getInsightsByCategory(category);
        return ResponseEntity.ok(ApiResponse.ok(insights));
    }
}
