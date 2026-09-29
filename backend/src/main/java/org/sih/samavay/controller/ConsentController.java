package org.sih.samavay.controller;

import org.sih.samavay.dto.ApiResponse;
import org.sih.samavay.entity.DataConsent;
import org.sih.samavay.service.DataConsentService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/consents")
public class ConsentController {

    private final DataConsentService consentService;

    public ConsentController(DataConsentService consentService) {
        this.consentService = consentService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<DataConsent>>> getAllConsents() {
        List<DataConsent> consents = consentService.getAllConsents();
        return ResponseEntity.ok(ApiResponse.ok(consents));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<ApiResponse<List<DataConsent>>> getConsentsByUser(@PathVariable Long userId) {
        List<DataConsent> consents = consentService.getConsentsByUser(userId);
        return ResponseEntity.ok(ApiResponse.ok(consents));
    }

    @GetMapping("/user/{userId}/active")
    public ResponseEntity<ApiResponse<List<DataConsent>>> getActiveConsentsByUser(@PathVariable Long userId) {
        List<DataConsent> consents = consentService.getActiveConsentsByUser(userId);
        return ResponseEntity.ok(ApiResponse.ok(consents));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<DataConsent>> grantConsent(@RequestBody DataConsent consent) {
        DataConsent granted = consentService.grantConsent(consent);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.ok("Consent granted successfully", granted));
    }

    @PutMapping("/{id}/revoke")
    public ResponseEntity<ApiResponse<DataConsent>> revokeConsent(@PathVariable Long id) {
        DataConsent revoked = consentService.revokeConsent(id);
        return ResponseEntity.ok(ApiResponse.ok("Consent revoked successfully", revoked));
    }
}
