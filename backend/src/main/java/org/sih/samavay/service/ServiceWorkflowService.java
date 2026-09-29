package org.sih.samavay.service;

import org.sih.samavay.entity.ServiceWorkflow;
import org.sih.samavay.entity.WorkflowStep;
import org.sih.samavay.exception.ResourceNotFoundException;
import org.sih.samavay.repository.ServiceWorkflowRepository;
import org.sih.samavay.repository.WorkflowStepRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ServiceWorkflowService {

    private final ServiceWorkflowRepository workflowRepository;
    private final WorkflowStepRepository stepRepository;

    public ServiceWorkflowService(ServiceWorkflowRepository workflowRepository,
                                  WorkflowStepRepository stepRepository) {
        this.workflowRepository = workflowRepository;
        this.stepRepository = stepRepository;
    }

    public List<ServiceWorkflow> getAllWorkflows() {
        return workflowRepository.findAll();
    }

    public ServiceWorkflow getWorkflowById(Long id) {
        return workflowRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Service workflow not found with id: " + id));
    }

    public ServiceWorkflow getWorkflowByServiceId(Long serviceId) {
        return workflowRepository.findByServiceId(serviceId)
                .orElse(null);
    }

    public List<WorkflowStep> getStepsByWorkflowId(Long workflowId) {
        return stepRepository.findByWorkflowIdOrderByStepOrderAsc(workflowId);
    }

    public ServiceWorkflow createWorkflow(ServiceWorkflow workflow) {
        return workflowRepository.save(workflow);
    }

    public WorkflowStep addStep(WorkflowStep step) {
        return stepRepository.save(step);
    }
}
