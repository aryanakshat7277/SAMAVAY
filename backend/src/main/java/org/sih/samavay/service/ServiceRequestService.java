package org.sih.samavay.service;

import org.sih.samavay.dto.ServiceRequestDto;
import org.sih.samavay.dto.ServiceRequestStatusUpdateDto;
import org.sih.samavay.entity.GovernmentService;
import org.sih.samavay.entity.RequestStatus;
import org.sih.samavay.entity.ServiceRequest;
import org.sih.samavay.exception.ResourceNotFoundException;
import org.sih.samavay.repository.GovernmentServiceRepository;
import org.sih.samavay.repository.ServiceRequestRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Random;

@Service
public class ServiceRequestService {

    private final ServiceRequestRepository serviceRequestRepository;
    private final GovernmentServiceRepository serviceRepository;
    private final NotificationService notificationService;
    private final AuditLogService auditLogService;

    public ServiceRequestService(ServiceRequestRepository serviceRequestRepository,
                                 GovernmentServiceRepository serviceRepository,
                                 NotificationService notificationService,
                                 AuditLogService auditLogService) {
        this.serviceRequestRepository = serviceRequestRepository;
        this.serviceRepository = serviceRepository;
        this.notificationService = notificationService;
        this.auditLogService = auditLogService;
    }

    public List<ServiceRequest> getAllRequests() {
        return serviceRequestRepository.findAll();
    }

    public List<ServiceRequest> getRequestsByUser(Long userId) {
        return serviceRequestRepository.findByUserIdOrderBySubmittedAtDesc(userId);
    }

    public ServiceRequest getRequestById(Long id) {
        return serviceRequestRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Service request not found with id: " + id));
    }

    public ServiceRequest getRequestByApplicationNumber(String applicationNumber) {
        return serviceRequestRepository.findByApplicationNumber(applicationNumber)
                .orElseThrow(() -> new ResourceNotFoundException("Service request not found with application number: " + applicationNumber));
    }

    public ServiceRequest createRequest(ServiceRequestDto dto) {
        GovernmentService service = serviceRepository.findById(dto.getServiceId())
                .orElseThrow(() -> new ResourceNotFoundException("Service not found with id: " + dto.getServiceId()));

        String applicationNumber = generateApplicationNumber();
        Long userId = dto.getUserId() != null ? dto.getUserId() : 1L;

        ServiceRequest request = new ServiceRequest(
                applicationNumber,
                userId,
                dto.getApplicantName() != null ? dto.getApplicantName() : "Demo Citizen",
                dto.getApplicantEmail() != null ? dto.getApplicantEmail() : "citizen.demo@samavay.gov.in",
                dto.getApplicantPhone() != null ? dto.getApplicantPhone() : "9876543210",
                service.getId(),
                service.getName(),
                service.getDepartmentName(),
                service.getCategory(),
                dto.getFormDataJson(),
                RequestStatus.SUBMITTED,
                "Application Received & Document Verification Pending"
        );

        request.setRemarks(dto.getRemarks());
        ServiceRequest savedRequest = serviceRequestRepository.save(request);

        // Notify Citizen
        notificationService.createNotification(
                userId,
                "Application Submitted Successfully",
                "Your application #" + applicationNumber + " for " + service.getName() + " has been submitted to " + service.getDepartmentName() + ".",
                "SUCCESS",
                "/applications"
        );

        auditLogService.log("SUBMIT_SERVICE_REQUEST", request.getApplicantEmail(), "ServiceRequest", savedRequest.getId(),
                "Submitted service request #" + applicationNumber + " for " + service.getName(), null);

        return savedRequest;
    }

    public ServiceRequest updateRequestStatus(Long id, ServiceRequestStatusUpdateDto dto) {
        ServiceRequest request = getRequestById(id);
        request.setStatus(dto.getStatus());

        if (dto.getCurrentStage() != null && !dto.getCurrentStage().isEmpty()) {
            request.setCurrentStage(dto.getCurrentStage());
        }

        if (dto.getRemarks() != null) {
            request.setRemarks(dto.getRemarks());
        }

        if (dto.getCertificateUrl() != null) {
            request.setCertificateUrl(dto.getCertificateUrl());
        }

        request.setUpdatedAt(LocalDateTime.now());
        ServiceRequest updated = serviceRequestRepository.save(request);

        // Notification on status update
        String notifMsg = "Your application #" + request.getApplicationNumber() + " is now in status: " + request.getStatus().name() +
                (request.getCurrentStage() != null ? " (" + request.getCurrentStage() + ")" : "");
        notificationService.createNotification(
                request.getUserId(),
                "Application Status Update: " + request.getApplicationNumber(),
                notifMsg,
                request.getStatus() == RequestStatus.COMPLETED ? "SUCCESS" : "INFO",
                "/applications"
        );

        auditLogService.log("UPDATE_REQUEST_STATUS", "OFFICER/SYSTEM", "ServiceRequest", updated.getId(),
                "Updated status to " + request.getStatus().name() + " (" + request.getCurrentStage() + ")", null);

        return updated;
    }

    private synchronized String generateApplicationNumber() {
        int randomNum = 10000 + new Random().nextInt(90000);
        return "SAM-2026-" + randomNum;
    }
}
