package org.sih.samavay.dto;

import java.util.List;

public class DynamicFormDto {

    private Long serviceId;
    private String serviceName;
    private String formTitle;
    private String description;
    private List<FormFieldItem> requiredFields; // ONLY missing fields that require user input!
    private List<ReusedFieldSummary> preVerifiedFields; // Fields verified & reused via consent

    public DynamicFormDto() {}

    public static class FormFieldItem {
        private Long id;
        private String fieldName;
        private String label;
        private String fieldType;
        private String placeholder;
        private String helpText;
        private Boolean required;
        private String validationRules;
        private Integer displayOrder;

        public FormFieldItem() {}

        public FormFieldItem(Long id, String fieldName, String label, String fieldType,
                             String placeholder, String helpText, Boolean required,
                             String validationRules, Integer displayOrder) {
            this.id = id;
            this.fieldName = fieldName;
            this.label = label;
            this.fieldType = fieldType;
            this.placeholder = placeholder;
            this.helpText = helpText;
            this.required = required;
            this.validationRules = validationRules;
            this.displayOrder = displayOrder;
        }

        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }
        public String getFieldName() { return fieldName; }
        public void setFieldName(String fieldName) { this.fieldName = fieldName; }
        public String getLabel() { return label; }
        public void setLabel(String label) { this.label = label; }
        public String getFieldType() { return fieldType; }
        public void setFieldType(String fieldType) { this.fieldType = fieldType; }
        public String getPlaceholder() { return placeholder; }
        public void setPlaceholder(String placeholder) { this.placeholder = placeholder; }
        public String getHelpText() { return helpText; }
        public void setHelpText(String helpText) { this.helpText = helpText; }
        public Boolean getRequired() { return required; }
        public void setRequired(Boolean required) { this.required = required; }
        public String getValidationRules() { return validationRules; }
        public void setValidationRules(String validationRules) { this.validationRules = validationRules; }
        public Integer getDisplayOrder() { return displayOrder; }
        public void setDisplayOrder(Integer displayOrder) { this.displayOrder = displayOrder; }
    }

    public static class ReusedFieldSummary {
        private String fieldName;
        private String sourceDepartment;
        private String sourcePlatform;
        private String sampleMaskedValue;

        public ReusedFieldSummary() {}

        public ReusedFieldSummary(String fieldName, String sourceDepartment, String sourcePlatform, String sampleMaskedValue) {
            this.fieldName = fieldName;
            this.sourceDepartment = sourceDepartment;
            this.sourcePlatform = sourcePlatform;
            this.sampleMaskedValue = sampleMaskedValue;
        }

        public String getFieldName() { return fieldName; }
        public void setFieldName(String fieldName) { this.fieldName = fieldName; }
        public String getSourceDepartment() { return sourceDepartment; }
        public void setSourceDepartment(String sourceDepartment) { this.sourceDepartment = sourceDepartment; }
        public String getSourcePlatform() { return sourcePlatform; }
        public void setSourcePlatform(String sourcePlatform) { this.sourcePlatform = sourcePlatform; }
        public String getSampleMaskedValue() { return sampleMaskedValue; }
        public void setSampleMaskedValue(String sampleMaskedValue) { this.sampleMaskedValue = sampleMaskedValue; }
    }

    public Long getServiceId() { return serviceId; }
    public void setServiceId(Long serviceId) { this.serviceId = serviceId; }
    public String getServiceName() { return serviceName; }
    public void setServiceName(String serviceName) { this.serviceName = serviceName; }
    public String getFormTitle() { return formTitle; }
    public void setFormTitle(String formTitle) { this.formTitle = formTitle; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public List<FormFieldItem> getRequiredFields() { return requiredFields; }
    public void setRequiredFields(List<FormFieldItem> requiredFields) { this.requiredFields = requiredFields; }
    public List<ReusedFieldSummary> getPreVerifiedFields() { return preVerifiedFields; }
    public void setPreVerifiedFields(List<ReusedFieldSummary> preVerifiedFields) { this.preVerifiedFields = preVerifiedFields; }
}
