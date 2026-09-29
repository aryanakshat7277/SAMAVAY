package org.sih.samavay.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "departments")
public class Department {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String name;

    @Column(nullable = false, unique = true)
    private String code;

    @Column(columnDefinition = "TEXT")
    private String description;

    private String iconName;

    @Column(nullable = false)
    private String status; // ACTIVE, INACTIVE

    private Integer servicesCount = 0;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    public Department() {
        this.createdAt = LocalDateTime.now();
        this.status = "ACTIVE";
    }

    public Department(String name, String code, String description, String iconName, Integer servicesCount) {
        this.name = name;
        this.code = code;
        this.description = description;
        this.iconName = iconName;
        this.servicesCount = servicesCount != null ? servicesCount : 0;
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

    public String getIconName() {
        return iconName;
    }

    public void setIconName(String iconName) {
        this.iconName = iconName;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Integer getServicesCount() {
        return servicesCount;
    }

    public void setServicesCount(Integer servicesCount) {
        this.servicesCount = servicesCount;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
