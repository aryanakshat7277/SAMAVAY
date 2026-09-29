package org.sih.samavay.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "access_policies")
public class AccessPolicy {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private Long sourcePlatformId;

    @Column(nullable = false)
    private String sourcePlatformName;

    @Column(nullable = false)
    private Long destinationPlatformId;

    @Column(nullable = false)
    private String destinationPlatformName;

    @Column(nullable = false)
    private String dataCategory; // e.g. "Property Information", "Vehicle Records", "Profile Verification"

    @Column(nullable = false)
    private Boolean allowed = true;

    @Column(nullable = false)
    private Boolean requiresConsent = true;

    @Column(nullable = false)
    private Boolean active = true;

    private LocalDateTime createdAt;

    public AccessPolicy() {
        this.createdAt = LocalDateTime.now();
        this.allowed = true;
        this.requiresConsent = true;
        this.active = true;
    }

    public AccessPolicy(String name, Long sourcePlatformId, String sourcePlatformName,
                        Long destinationPlatformId, String destinationPlatformName,
                        String dataCategory, Boolean allowed, Boolean requiresConsent) {
        this.name = name;
        this.sourcePlatformId = sourcePlatformId;
        this.sourcePlatformName = sourcePlatformName;
        this.destinationPlatformId = destinationPlatformId;
        this.destinationPlatformName = destinationPlatformName;
        this.dataCategory = dataCategory;
        this.allowed = allowed != null ? allowed : true;
        this.requiresConsent = requiresConsent != null ? requiresConsent : true;
        this.active = true;
        this.createdAt = LocalDateTime.now();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public Long getSourcePlatformId() { return sourcePlatformId; }
    public void setSourcePlatformId(Long sourcePlatformId) { this.sourcePlatformId = sourcePlatformId; }

    public String getSourcePlatformName() { return sourcePlatformName; }
    public void setSourcePlatformName(String sourcePlatformName) { this.sourcePlatformName = sourcePlatformName; }

    public Long getDestinationPlatformId() { return destinationPlatformId; }
    public void setDestinationPlatformId(Long destinationPlatformId) { this.destinationPlatformId = destinationPlatformId; }

    public String getDestinationPlatformName() { return destinationPlatformName; }
    public void setDestinationPlatformName(String destinationPlatformName) { this.destinationPlatformName = destinationPlatformName; }

    public String getDataCategory() { return dataCategory; }
    public void setDataCategory(String dataCategory) { this.dataCategory = dataCategory; }

    public Boolean getAllowed() { return allowed; }
    public void setAllowed(Boolean allowed) { this.allowed = allowed; }

    public Boolean getRequiresConsent() { return requiresConsent; }
    public void setRequiresConsent(Boolean requiresConsent) { this.requiresConsent = requiresConsent; }

    public Boolean getActive() { return active; }
    public void setActive(Boolean active) { this.active = active; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
