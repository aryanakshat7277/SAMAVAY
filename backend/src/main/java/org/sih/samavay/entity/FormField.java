package org.sih.samavay.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "dynamic_form_fields")
public class FormField {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long configurationId;

    @Column(nullable = false)
    private String fieldName; // e.g. "propertyId", "applicantRemarks"

    @Column(nullable = false)
    private String label; // e.g. "Property Assessment / ID Number"

    @Column(nullable = false)
    private String fieldType; // TEXT, NUMBER, DATE, DROPDOWN, CHECKBOX, RADIO, FILE_UPLOAD

    private String placeholder;

    private String helpText;

    @Column(nullable = false)
    private Boolean required = true;

    private String validationRules; // e.g. "regex:^[A-Z0-9-]{6,15}$"

    private Long dataRequirementId; // Links to DataRequirement to check if data is already available

    private Integer displayOrder = 1;

    public FormField() {
        this.required = true;
        this.fieldType = "TEXT";
        this.displayOrder = 1;
    }

    public FormField(Long configurationId, String fieldName, String label, String fieldType,
                     String placeholder, String helpText, Boolean required,
                     String validationRules, Long dataRequirementId, Integer displayOrder) {
        this.configurationId = configurationId;
        this.fieldName = fieldName;
        this.label = label;
        this.fieldType = fieldType != null ? fieldType : "TEXT";
        this.placeholder = placeholder;
        this.helpText = helpText;
        this.required = required != null ? required : true;
        this.validationRules = validationRules;
        this.dataRequirementId = dataRequirementId;
        this.displayOrder = displayOrder != null ? displayOrder : 1;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getConfigurationId() {
        return configurationId;
    }

    public void setConfigurationId(Long configurationId) {
        this.configurationId = configurationId;
    }

    public String getFieldName() {
        return fieldName;
    }

    public void setFieldName(String fieldName) {
        this.fieldName = fieldName;
    }

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public String getFieldType() {
        return fieldType;
    }

    public void setFieldType(String fieldType) {
        this.fieldType = fieldType;
    }

    public String getPlaceholder() {
        return placeholder;
    }

    public void setPlaceholder(String placeholder) {
        this.placeholder = placeholder;
    }

    public String getHelpText() {
        return helpText;
    }

    public void setHelpText(String helpText) {
        this.helpText = helpText;
    }

    public Boolean getRequired() {
        return required;
    }

    public void setRequired(Boolean required) {
        this.required = required;
    }

    public String getValidationRules() {
        return validationRules;
    }

    public void setValidationRules(String validationRules) {
        this.validationRules = validationRules;
    }

    public Long getDataRequirementId() {
        return dataRequirementId;
    }

    public void setDataRequirementId(Long dataRequirementId) {
        this.dataRequirementId = dataRequirementId;
    }

    public Integer getDisplayOrder() {
        return displayOrder;
    }

    public void setDisplayOrder(Integer displayOrder) {
        this.displayOrder = displayOrder;
    }
}
