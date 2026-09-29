package org.sih.samavay.service;

import org.sih.samavay.entity.Department;
import org.sih.samavay.entity.GovernmentService;
import org.sih.samavay.exception.ResourceNotFoundException;
import org.sih.samavay.repository.DepartmentRepository;
import org.sih.samavay.repository.GovernmentServiceRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DepartmentService {

    private final DepartmentRepository departmentRepository;
    private final GovernmentServiceRepository serviceRepository;

    public DepartmentService(DepartmentRepository departmentRepository,
                             GovernmentServiceRepository serviceRepository) {
        this.departmentRepository = departmentRepository;
        this.serviceRepository = serviceRepository;
    }

    public List<Department> getAllDepartments() {
        return departmentRepository.findAll();
    }

    public Department getDepartmentById(Long id) {
        return departmentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Department not found with id: " + id));
    }

    public List<GovernmentService> getServicesByDepartmentId(Long departmentId) {
        // Validate department exists
        getDepartmentById(departmentId);
        return serviceRepository.findByDepartmentId(departmentId);
    }
}
