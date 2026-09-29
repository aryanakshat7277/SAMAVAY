package org.sih.samavay.controller;

import org.sih.samavay.dto.ApiResponse;
import org.sih.samavay.entity.Department;
import org.sih.samavay.entity.GovernmentService;
import org.sih.samavay.service.DepartmentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/departments")
public class DepartmentController {

    private final DepartmentService departmentService;

    public DepartmentController(DepartmentService departmentService) {
        this.departmentService = departmentService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<Department>>> getAllDepartments() {
        List<Department> departments = departmentService.getAllDepartments();
        return ResponseEntity.ok(ApiResponse.ok(departments));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Department>> getDepartmentById(@PathVariable Long id) {
        Department department = departmentService.getDepartmentById(id);
        return ResponseEntity.ok(ApiResponse.ok(department));
    }

    @GetMapping("/{id}/services")
    public ResponseEntity<ApiResponse<List<GovernmentService>>> getServicesByDepartment(@PathVariable Long id) {
        List<GovernmentService> services = departmentService.getServicesByDepartmentId(id);
        return ResponseEntity.ok(ApiResponse.ok(services));
    }
}
