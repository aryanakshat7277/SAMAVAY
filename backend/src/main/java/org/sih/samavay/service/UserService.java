package org.sih.samavay.service;

import org.sih.samavay.config.JwtService;
import org.sih.samavay.dto.AuthRequest;
import org.sih.samavay.dto.AuthResponse;
import org.sih.samavay.dto.RegisterRequest;
import org.sih.samavay.entity.Role;
import org.sih.samavay.entity.User;
import org.sih.samavay.exception.BadRequestException;
import org.sih.samavay.exception.ResourceNotFoundException;
import org.sih.samavay.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuditLogService auditLogService;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder,
                       JwtService jwtService, AuditLogService auditLogService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.auditLogService = auditLogService;
    }

    public AuthResponse login(AuthRequest request) {
        Optional<User> userOpt = userRepository.findByEmail(request.getIdentifier());
        if (userOpt.isEmpty()) {
            userOpt = userRepository.findByMobileNumber(request.getIdentifier());
        }

        if (userOpt.isEmpty()) {
            throw new BadRequestException("Invalid email/mobile number or password");
        }

        User user = userOpt.get();
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new BadRequestException("Invalid email/mobile number or password");
        }

        String token = jwtService.generateToken(user);
        auditLogService.log("USER_LOGIN", user.getEmail(), "User", user.getId(), "User logged in successfully", null);

        return new AuthResponse(token, user.getId(), user.getFullName(), user.getEmail(), user.getMobileNumber(), user.getRole());
    }

    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new BadRequestException("An account with this email already exists");
        }
        if (userRepository.existsByMobileNumber(request.getMobileNumber())) {
            throw new BadRequestException("An account with this mobile number already exists");
        }

        User user = new User(
                request.getFullName(),
                request.getEmail(),
                request.getMobileNumber(),
                passwordEncoder.encode(request.getPassword()),
                Role.CITIZEN
        );

        User savedUser = userRepository.save(user);
        String token = jwtService.generateToken(savedUser);

        auditLogService.log("USER_REGISTRATION", savedUser.getEmail(), "User", savedUser.getId(), "Citizen registered an account", null);

        return new AuthResponse(token, savedUser.getId(), savedUser.getFullName(), savedUser.getEmail(), savedUser.getMobileNumber(), savedUser.getRole());
    }

    public AuthResponse loginAsDemoCitizen() {
        Optional<User> demoUserOpt = userRepository.findByEmail("citizen.demo@samavay.gov.in");
        User user;
        if (demoUserOpt.isPresent()) {
            user = demoUserOpt.get();
        } else {
            user = new User("Aarav Sharma", "citizen.demo@samavay.gov.in", "9876543210",
                    passwordEncoder.encode("DemoPass@2026"), Role.CITIZEN);
            user = userRepository.save(user);
        }

        String token = jwtService.generateToken(user);
        auditLogService.log("DEMO_LOGIN", user.getEmail(), "User", user.getId(), "Logged in as Demo Citizen", null);

        return new AuthResponse(token, user.getId(), user.getFullName(), user.getEmail(), user.getMobileNumber(), user.getRole());
    }

    public User getUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));
    }

    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + email));
    }
}
