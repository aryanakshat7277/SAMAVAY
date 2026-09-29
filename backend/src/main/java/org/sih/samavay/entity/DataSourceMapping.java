package org.sih.samavay.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "data_source_mappings")
public class DataSourceMapping {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String dataCategory; // e.g. "Identity", "Property", "Vehicle", "Health", "Education"

    @Column(nullable = false)
    private String dataField; // e.g. "Citizen Full Name", "Land Title Deed", "Vehicle RC Number"

    @Column(nullable = false)
    private Long departmentId;

    @Column(nullable = false)
    private String departmentName;

    @Column(nullable = false)
    private Long platformId;

    @Column(nullable = false)
    private String platformName;

    @Column(nullable = false)
    private String priority; // PRIMARY, SECONDARY, FALLBACK

    @Column(nullable = false)
    private String availabilityStatus; // AVAILABLE, NEEDS_CONSENT, UNAVAILABLE

    private Boolean active = true;

    private LocalDateTime createdAt;

    public DataSourceMapping() {
        this.createdAt = LocalDateTime.now();
        this.active = true;
        this.priority = "PRIMARY";
        this.availabilityStatus = "AVAILABLE";
    }

    public DataSourceMapping(String dataCategory, String dataField, Long departmentId,
                             String departmentName, Long platformId, String platformName,
                             String priority, String availabilityStatus) {
        this.dataCategory = dataCategory;
        this.dataField = dataField;
        this.departmentId = departmentId;
        this.departmentName = departmentName;
        this.platformId = platformId;
        this.platformName = platformName;
        this.priority = priority != null ? priority : "PRIMARY";
        this.availabilityStatus = availabilityStatus != null ? availabilityStatus : "AVAILABLE";
        this.active = true;
        this.createdAt = LocalDateTime.now();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDataCategory() {
        return dataCategory;
    }

    public void setDataCategory(String dataCategory) {
        this.dataCategory = dataCategory;
    }

    public String getDataField() {
        return dataField;
    }

    public void setDataField(String dataField) {
        this.dataField = dataField;
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

    public Long getPlatformId() {
        return platformId;
    }

    public void setPlatformId(Long platformId) {
        this.platformId = platformId;
    }

    public String getPlatformName() {
        return platformName;
    }

    public void setPlatformName(String platformName) {
        this.platformName = platformName;
    }

    public String getPriority() {
        return priority;
    }

    public void setPriority(String priority) {
        this.priority = priority;
    }

    public String getAvailabilityStatus() {
        return availabilityStatus;
    }

    public void setAvailabilityStatus(String availabilityStatus) {
        this.availabilityStatus = availabilityStatus;
    }

    public Boolean getActive() {
        return active;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
