package org.sih.samavay.service;

import org.sih.samavay.dto.DynamicFormDto;
import org.sih.samavay.entity.DynamicFormConfiguration;
import org.sih.samavay.entity.FormField;
import org.sih.samavay.entity.GovernmentService;
import org.sih.samavay.exception.ResourceNotFoundException;
import org.sih.samavay.repository.DynamicFormConfigurationRepository;
import org.sih.samavay.repository.FormFieldRepository;
import org.sih.samavay.repository.GovernmentServiceRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class DynamicFormService {

    private final DynamicFormConfigurationRepository configRepository;
    private final FormFieldRepository fieldRepository;
    private final GovernmentServiceRepository serviceRepository;
    private final DataAvailabilityService dataAvailabilityService;

    public DynamicFormService(DynamicFormConfigurationRepository configRepository,
                              FormFieldRepository fieldRepository,
                              GovernmentServiceRepository serviceRepository,
                              DataAvailabilityService dataAvailabilityService) {
        this.configRepository = configRepository;
        this.fieldRepository = fieldRepository;
        this.serviceRepository = serviceRepository;
        this.dataAvailabilityService = dataAvailabilityService;
    }

    public DynamicFormDto getDynamicFormForService(Long serviceId, Long userId) {
        GovernmentService service = serviceRepository.findById(serviceId)
                .orElseThrow(() -> new ResourceNotFoundException("Service not found: " + serviceId));

        DynamicFormConfiguration config = configRepository.findByServiceId(serviceId)
                .orElseGet(() -> new DynamicFormConfiguration(serviceId, service.getName(),
                        service.getName() + " Application Form",
                        "Please fill the required information to complete your application."));

        List<FormField> allFields = fieldRepository.findByConfigurationIdOrderByDisplayOrderAsc(config.getId());

        // Check availability to filter out pre-available fields
        List<DataAvailabilityService.FieldAvailability> availabilities =
                dataAvailabilityService.evaluateAvailability(serviceId, userId != null ? userId : 1L);

        List<DynamicFormDto.FormFieldItem> requiredFields = new ArrayList<>();
        List<DynamicFormDto.ReusedFieldSummary> reusedSummaries = new ArrayList<>();

        // Add pre-verified summaries
        for (DataAvailabilityService.FieldAvailability fa : availabilities) {
            if ("AVAILABLE".equals(fa.getStatus())) {
                reusedSummaries.add(new DynamicFormDto.ReusedFieldSummary(
                        fa.getRequirement().getFieldName(),
                        fa.getRequirement().getSourceDepartmentName(),
                        fa.getRequirement().getSourcePlatformName(),
                        "✓ Verified Record"
                ));
            }
        }

        // If no dynamic fields are configured yet, create default missing field
        if (allFields.isEmpty()) {
            requiredFields.add(new DynamicFormDto.FormFieldItem(
                    1L, "propertyIdOrReference", "Departmental Reference / Plot Identifier",
                    "TEXT", "e.g. M-WARD-40982", "Enter official reference if applicable",
                    true, null, 1
            ));
            requiredFields.add(new DynamicFormDto.FormFieldItem(
                    2L, "remarks", "Applicant Declaration / Notes",
                    "TEXT", "Any additional notes for the scrutiny officer", "Optional",
                    false, null, 2
            ));
        } else {
            for (FormField f : allFields) {
                // If this field is linked to a DataRequirement that is already AVAILABLE, skip user input!
                boolean alreadyAvailable = availabilities.stream().anyMatch(a ->
                        a.getRequirement().getId().equals(f.getDataRequirementId()) && "AVAILABLE".equals(a.getStatus()));

                if (!alreadyAvailable) {
                    requiredFields.add(new DynamicFormDto.FormFieldItem(
                            f.getId(), f.getFieldName(), f.getLabel(), f.getFieldType(),
                            f.getPlaceholder(), f.getHelpText(), f.getRequired(),
                            f.getValidationRules(), f.getDisplayOrder()
                    ));
                }
            }
        }

        DynamicFormDto dto = new DynamicFormDto();
        dto.setServiceId(service.getId());
        dto.setServiceName(service.getName());
        dto.setFormTitle(config.getTitle());
        dto.setDescription(config.getDescription());
        dto.setRequiredFields(requiredFields);
        dto.setPreVerifiedFields(reusedSummaries);

        return dto;
    }
}
