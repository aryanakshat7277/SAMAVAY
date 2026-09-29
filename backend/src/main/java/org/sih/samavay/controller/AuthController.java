package org.sih.samavay.controller;

import jakarta.validation.Valid;
import org.sih.samavay.dto.ApiResponse;
import org.sih.samavay.dto.AuthRequest;
import org.sih.samavay.dto.AuthResponse;
import org.sih.samavay.dto.RegisterRequest;
import org.sih.samavay.entity.User;
import org.sih.samavay.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<AuthResponse>> login(@Valid @RequestBody AuthRequest request) {
        AuthResponse response = userService.login(request);
        return ResponseEntity.ok(ApiResponse.ok("Login successful", response));
    }

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<AuthResponse>> register(@Valid @RequestBody RegisterRequest request) {
        AuthResponse response = userService.register(request);
        return ResponseEntity.ok(ApiResponse.ok("Registration successful", response));
    }

    @PostMapping("/demo-login")
    public ResponseEntity<ApiResponse<AuthResponse>> demoLogin() {
        AuthResponse response = userService.loginAsDemoCitizen();
        return ResponseEntity.ok(ApiResponse.ok("Demo login successful", response));
    }

    @GetMapping("/me")
    public ResponseEntity<ApiResponse<Object>> getCurrentUser(@AuthenticationPrincipal User user) {
        if (user == null) {
            // Fallback for demo citizen info
            User demo = userService.getUserByEmail("citizen.demo@samavay.gov.in");
            return ResponseEntity.ok(ApiResponse.ok(demo));
        }
        return ResponseEntity.ok(ApiResponse.ok(user));
    }
}
