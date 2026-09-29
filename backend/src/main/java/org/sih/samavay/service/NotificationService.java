package org.sih.samavay.service;

import org.sih.samavay.entity.Notification;
import org.sih.samavay.exception.ResourceNotFoundException;
import org.sih.samavay.repository.NotificationRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NotificationService {

    private final NotificationRepository notificationRepository;

    public NotificationService(NotificationRepository notificationRepository) {
        this.notificationRepository = notificationRepository;
    }

    public List<Notification> getNotificationsForUser(Long userId) {
        return notificationRepository.findByUserIdOrderByCreatedAtDesc(userId);
    }

    public List<Notification> getUnreadNotificationsForUser(Long userId) {
        return notificationRepository.findByUserIdAndIsReadFalseOrderByCreatedAtDesc(userId);
    }

    public long getUnreadCount(Long userId) {
        return notificationRepository.countByUserIdAndIsReadFalse(userId);
    }

    public Notification markAsRead(Long id) {
        Notification notification = notificationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Notification not found with id: " + id));
        notification.setIsRead(true);
        return notificationRepository.save(notification);
    }

    public void markAllAsReadForUser(Long userId) {
        List<Notification> unreadList = notificationRepository.findByUserIdAndIsReadFalseOrderByCreatedAtDesc(userId);
        for (Notification notification : unreadList) {
            notification.setIsRead(true);
        }
        notificationRepository.saveAll(unreadList);
    }

    public Notification createNotification(Long userId, String title, String message, String type, String actionLink) {
        Notification notification = new Notification(userId, title, message, type, actionLink);
        return notificationRepository.save(notification);
    }
}
