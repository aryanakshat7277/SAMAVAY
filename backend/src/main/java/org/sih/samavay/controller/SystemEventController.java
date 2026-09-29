package org.sih.samavay.controller;

import org.sih.samavay.dto.ApiResponse;
import org.sih.samavay.entity.SystemEvent;
import org.sih.samavay.service.SystemEventService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/admin/events")
public class SystemEventController {

    private final SystemEventService eventService;

    public SystemEventController(SystemEventService eventService) {
        this.eventService = eventService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<SystemEvent>>> getAllEvents() {
        List<SystemEvent> events = eventService.getAllEvents();
        return ResponseEntity.ok(ApiResponse.ok(events));
    }
}
