package org.sih.samavay.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "service_requests", indexes = {
        @Index(name = "idx_req_app_num", columnList = "applicationNumber"),
        @Index(name = "idx_req_user_id", columnList = "userId")
})
public class ServiceRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String applicationNumber;

    @Column(nullable = false)
    private Long userId;

    private String applicantName;
    private String applicantEmail;
    private String applicantPhone;

    @Column(nullable = false)
    private Long serviceId;

    @Column(nullable = false)
    private String serviceName;

    @Column(nullable = false)
    private String departmentName;

    private String category;

    @Column(columnDefinition = "TEXT")
    private String formDataJson;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private RequestStatus status;

    private String currentStage; // e.g., "Initial Verification", "Department Document Scrutiny", "Digital Seal Issuance"

    @Column(columnDefinition = "TEXT")
    private String remarks;

    private String certificateUrl;

    @Column(nullable = false)
    private LocalDateTime submittedAt;

    private LocalDateTime updatedAt;

    public ServiceRequest() {
        this.submittedAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
        this.status = RequestStatus.SUBMITTED;
        this.currentStage = "Application Submitted & Queued";
    }

    public ServiceRequest(String applicationNumber, Long userId, String applicantName,
                          String applicantEmail, String applicantPhone, Long serviceId,
                          String serviceName, String departmentName, String category,
                          String formDataJson, RequestStatus status, String currentStage) {
        this.applicationNumber = applicationNumber;
        this.userId = userId;
        this.applicantName = applicantName;
        this.applicantEmail = applicantEmail;
        this.applicantPhone = applicantPhone;
        this.serviceId = serviceId;
        this.serviceName = serviceName;
        this.departmentName = departmentName;
        this.category = category;
        this.formDataJson = formDataJson;
        this.status = status != null ? status : RequestStatus.SUBMITTED;
        this.currentStage = currentStage != null ? currentStage : "Application Submitted & Queued";
        this.submittedAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getApplicationNumber() {
        return applicationNumber;
    }

    public void setApplicationNumber(String applicationNumber) {
        this.applicationNumber = applicationNumber;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getApplicantName() {
        return applicantName;
    }

    public void setApplicantName(String applicantName) {
        this.applicantName = applicantName;
    }

    public String getApplicantEmail() {
        return applicantEmail;
    }

    public void setApplicantEmail(String applicantEmail) {
        this.applicantEmail = applicantEmail;
    }

    public String getApplicantPhone() {
        return applicantPhone;
    }

    public void setApplicantPhone(String applicantPhone) {
        this.applicantPhone = applicantPhone;
    }

    public Long getServiceId() {
        return serviceId;
    }

    public void setServiceId(Long serviceId) {
        this.serviceId = serviceId;
    }

    public String getServiceName() {
        return serviceName;
    }

    public void setServiceName(String serviceName) {
        this.serviceName = serviceName;
    }

    public String getDepartmentName() {
        return departmentName;
    }

    public void setDepartmentName(String departmentName) {
        this.departmentName = departmentName;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getFormDataJson() {
        return formDataJson;
    }

    public void setFormDataJson(String formDataJson) {
        this.formDataJson = formDataJson;
    }

    public RequestStatus getStatus() {
        return status;
    }

    public void setStatus(RequestStatus status) {
        this.status = status;
    }

    public String getCurrentStage() {
        return currentStage;
    }

    public void setCurrentStage(String currentStage) {
        this.currentStage = currentStage;
    }

    public String getRemarks() {
        return remarks;
    }

    public void setRemarks(String remarks) {
        this.remarks = remarks;
    }

    public String getCertificateUrl() {
        return certificateUrl;
    }

    public void setCertificateUrl(String certificateUrl) {
        this.certificateUrl = certificateUrl;
    }

    public LocalDateTime getSubmittedAt() {
        return submittedAt;
    }

    public void setSubmittedAt(LocalDateTime submittedAt) {
        this.submittedAt = submittedAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}
