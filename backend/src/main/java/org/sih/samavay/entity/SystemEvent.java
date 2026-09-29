package org.sih.samavay.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "system_events", indexes = {
        @Index(name = "idx_event_time", columnList = "timestamp"),
        @Index(name = "idx_event_severity", columnList = "severity")
})
public class SystemEvent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String eventType; // PLATFORM_CONNECTED, PLATFORM_DISCONNECTED, INTEGRATION_SUCCESS, INTEGRATION_FAILED, SLOW_RESPONSE, FALLBACK_ACTIVATED, CONSENT_GRANTED, CONSENT_REVOKED, WORKFLOW_COMPLETED

    @Column(nullable = false)
    private String source; // e.g. "Bhoomi Land Records", "Interoperability Gateway", "Consent Engine"

    private String resourceType; // e.g. "Platform", "IntegrationConnection", "ServiceRequest"

    private Long resourceId;

    @Column(nullable = false)
    private String severity; // INFO, WARNING, ERROR

    @Column(nullable = false, columnDefinition = "TEXT")
    private String message;

    private LocalDateTime timestamp;

    public SystemEvent() {
        this.timestamp = LocalDateTime.now();
        this.severity = "INFO";
    }

    public SystemEvent(String eventType, String source, String resourceType, Long resourceId,
                       String severity, String message) {
        this.eventType = eventType;
        this.source = source;
        this.resourceType = resourceType;
        this.resourceId = resourceId;
        this.severity = severity != null ? severity : "INFO";
        this.message = message;
        this.timestamp = LocalDateTime.now();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getEventType() { return eventType; }
    public void setEventType(String eventType) { this.eventType = eventType; }

    public String getSource() { return source; }
    public void setSource(String source) { this.source = source; }

    public String getResourceType() { return resourceType; }
    public void setResourceType(String resourceType) { this.resourceType = resourceType; }

    public Long getResourceId() { return resourceId; }
    public void setResourceId(Long resourceId) { this.resourceId = resourceId; }

    public String getSeverity() { return severity; }
    public void setSeverity(String severity) { this.severity = severity; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }

    public LocalDateTime getTimestamp() { return timestamp; }
    public void setTimestamp(LocalDateTime timestamp) { this.timestamp = timestamp; }
}
