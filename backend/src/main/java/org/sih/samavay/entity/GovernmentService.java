package org.sih.samavay.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "government_services")
public class GovernmentService {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, unique = true)
    private String code;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String description;

    @Column(nullable = false)
    private Long departmentId;

    @Column(nullable = false)
    private String departmentName;

    @Column(nullable = false)
    private String category; // MUNICIPAL, TRANSPORT, REVENUE, HEALTH, EDUCATION, WELFARE

    @Column(columnDefinition = "TEXT")
    private String eligibility;

    @Column(columnDefinition = "TEXT")
    private String requiredDocuments;

    private Integer estimatedProcessingDays;

    private String fee;

    @Column(nullable = false)
    private String status; // ACTIVE, MAINTENANCE

    private Boolean isPopular = false;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    public GovernmentService() {
        this.createdAt = LocalDateTime.now();
        this.status = "ACTIVE";
    }

    public GovernmentService(String name, String code, String description, Long departmentId,
                             String departmentName, String category, String eligibility,
                             String requiredDocuments, Integer estimatedProcessingDays,
                             String fee, Boolean isPopular) {
        this.name = name;
        this.code = code;
        this.description = description;
        this.departmentId = departmentId;
        this.departmentName = departmentName;
        this.category = category;
        this.eligibility = eligibility;
        this.requiredDocuments = requiredDocuments;
        this.estimatedProcessingDays = estimatedProcessingDays;
        this.fee = fee;
        this.isPopular = isPopular != null ? isPopular : false;
        this.status = "ACTIVE";
        this.createdAt = LocalDateTime.now();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Long getDepartmentId() {
        return departmentId;
    }

    public void setDepartmentId(Long departmentId) {
        this.departmentId = departmentId;
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

    public String getEligibility() {
        return eligibility;
    }

    public void setEligibility(String eligibility) {
        this.eligibility = eligibility;
    }

    public String getRequiredDocuments() {
        return requiredDocuments;
    }

    public void setRequiredDocuments(String requiredDocuments) {
        this.requiredDocuments = requiredDocuments;
    }

    public Integer getEstimatedProcessingDays() {
        return estimatedProcessingDays;
    }

    public void setEstimatedProcessingDays(Integer estimatedProcessingDays) {
        this.estimatedProcessingDays = estimatedProcessingDays;
    }

    public String getFee() {
        return fee;
    }

    public void setFee(String fee) {
        this.fee = fee;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Boolean getIsPopular() {
        return isPopular;
    }

    public void setIsPopular(Boolean isPopular) {
        this.isPopular = isPopular;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
