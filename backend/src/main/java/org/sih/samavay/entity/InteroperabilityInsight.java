package org.sih.samavay.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "interoperability_insights", indexes = {
        @Index(name = "idx_insight_category", columnList = "category"),
        @Index(name = "idx_insight_severity", columnList = "severity")
})
public class InteroperabilityInsight {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String category; // OPPORTUNITY, ATTENTION_REQUIRED, POSITIVE_IMPACT, HIGH_DEPENDENCY

    @Column(nullable = false)
    private String title;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String description;

    private String metricValue;

    private String relatedPlatformOrService;

    @Column(nullable = false)
    private String severity; // INFO, WARNING, SUCCESS, URGENT

    private String actionUrl;

    private LocalDateTime createdAt;

    public InteroperabilityInsight() {
        this.createdAt = LocalDateTime.now();
        this.severity = "INFO";
    }

    public InteroperabilityInsight(String category, String title, String description,
                                   String metricValue, String relatedPlatformOrService,
                                   String severity, String actionUrl) {
        this.category = category;
        this.title = title;
        this.description = description;
        this.metricValue = metricValue;
        this.relatedPlatformOrService = relatedPlatformOrService;
        this.severity = severity != null ? severity : "INFO";
        this.actionUrl = actionUrl;
        this.createdAt = LocalDateTime.now();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getMetricValue() { return metricValue; }
    public void setMetricValue(String metricValue) { this.metricValue = metricValue; }

    public String getRelatedPlatformOrService() { return relatedPlatformOrService; }
    public void setRelatedPlatformOrService(String relatedPlatformOrService) { this.relatedPlatformOrService = relatedPlatformOrService; }

    public String getSeverity() { return severity; }
    public void setSeverity(String severity) { this.severity = severity; }

    public String getActionUrl() { return actionUrl; }
    public void setActionUrl(String actionUrl) { this.actionUrl = actionUrl; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
