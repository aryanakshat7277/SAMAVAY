package org.sih.samavay.service;

import org.sih.samavay.entity.SystemEvent;
import org.sih.samavay.repository.SystemEventRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SystemEventService {

    private final SystemEventRepository eventRepository;

    public SystemEventService(SystemEventRepository eventRepository) {
        this.eventRepository = eventRepository;
    }

    public List<SystemEvent> getAllEvents() {
        return eventRepository.findAllByOrderByTimestampDesc();
    }

    public SystemEvent recordEvent(String eventType, String source, String resourceType,
                                   Long resourceId, String severity, String message) {
        SystemEvent event = new SystemEvent(eventType, source, resourceType, resourceId, severity, message);
        return eventRepository.save(event);
    }
}
