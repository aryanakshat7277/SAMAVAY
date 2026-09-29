package org.sih.samavay.controller;

import org.sih.samavay.dto.ApiResponse;
import org.sih.samavay.dto.DemoScenarioResultDto;
import org.sih.samavay.dto.PlatformSimulationModeRequest;
import org.sih.samavay.service.DemoScenarioService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/demo")
public class DemoScenarioController {

    private final DemoScenarioService demoScenarioService;

    public DemoScenarioController(DemoScenarioService demoScenarioService) {
        this.demoScenarioService = demoScenarioService;
    }

    @PostMapping("/scenario/{scenarioId}")
    public ResponseEntity<ApiResponse<DemoScenarioResultDto>> executeScenario(@PathVariable int scenarioId) {
        DemoScenarioResultDto result = demoScenarioService.runScenario(scenarioId);
        return ResponseEntity.ok(ApiResponse.ok("Demo scenario executed", result));
    }

    @PutMapping("/platform-mode")
    public ResponseEntity<ApiResponse<Void>> setPlatformMode(@RequestBody PlatformSimulationModeRequest request) {
        demoScenarioService.setPlatformSimulationMode(request.getPlatformCode(), request.getSimulationMode());
        return ResponseEntity.ok(ApiResponse.ok("Platform simulation mode updated to " + request.getSimulationMode(), null));
    }
}
