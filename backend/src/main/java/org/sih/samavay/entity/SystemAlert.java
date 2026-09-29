package org.sih.samavay.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "system_alerts")
public class SystemAlert {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String message;

    @Column(nullable = false)
    private String priority; // LOW, MEDIUM, HIGH, CRITICAL

    @Column(nullable = false)
    private String status; // ACTIVE, REVIEWED, RESOLVED

    private Long relatedPlatformId;

    private String relatedPlatformName;

    private Integer impactedServicesCount = 0;

    private LocalDateTime createdAt;

    private LocalDateTime resolvedAt;

    public SystemAlert() {
        this.createdAt = LocalDateTime.now();
        this.status = "ACTIVE";
        this.priority = "MEDIUM";
        this.impactedServicesCount = 0;
    }

    public SystemAlert(String title, String message, String priority,
                       Long relatedPlatformId, String relatedPlatformName,
                       Integer impactedServicesCount) {
        this.title = title;
        this.message = message;
        this.priority = priority != null ? priority : "MEDIUM";
        this.relatedPlatformId = relatedPlatformId;
        this.relatedPlatformName = relatedPlatformName;
        this.impactedServicesCount = impactedServicesCount != null ? impactedServicesCount : 0;
        this.status = "ACTIVE";
        this.createdAt = LocalDateTime.now();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }

    public String getPriority() { return priority; }
    public void setPriority(String priority) { this.priority = priority; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public Long getRelatedPlatformId() { return relatedPlatformId; }
    public void setRelatedPlatformId(Long relatedPlatformId) { this.relatedPlatformId = relatedPlatformId; }

    public String getRelatedPlatformName() { return relatedPlatformName; }
    public void setRelatedPlatformName(String relatedPlatformName) { this.relatedPlatformName = relatedPlatformName; }

    public Integer getImpactedServicesCount() { return impactedServicesCount; }
    public void setImpactedServicesCount(Integer impactedServicesCount) { this.impactedServicesCount = impactedServicesCount; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getResolvedAt() { return resolvedAt; }
    public void setResolvedAt(LocalDateTime resolvedAt) { this.resolvedAt = resolvedAt; }
}
