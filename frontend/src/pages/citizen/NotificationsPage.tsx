import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNotifications } from '../../context/NotificationContext';
import { PageHeader } from '../../components/common/PageHeader';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { EmptyState } from '../../components/common/EmptyState';
import { Bell, CheckCircle2, Clock, Info, AlertTriangle, ArrowRight, CheckCheck, Inbox } from 'lucide-react';

export const NotificationsPage: React.FC = () => {
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications();
  const [filterUnreadOnly, setFilterUnreadOnly] = useState(false);

  const filtered = filterUnreadOnly
    ? notifications.filter((n) => !n.isRead)
    : notifications;

  const getNotifIcon = (type: string) => {
    switch (type.toUpperCase()) {
      case 'SUCCESS':
        return <CheckCircle2 className="w-5 h-5 text-emerald-600" />;
      case 'WARNING':
        return <AlertTriangle className="w-5 h-5 text-saffron-600" />;
      case 'UPDATE':
        return <Clock className="w-5 h-5 text-gov-700" />;
      default:
        return <Info className="w-5 h-5 text-gov-700" />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* 1. PAGE HEADER */}
      <PageHeader
        category="CITIZEN ALERTS & SERVICE NOTIFICATIONS"
        categoryIcon={Bell}
        title="Notifications Center"
        description="Real-time updates regarding your applications, document verifications, and cross-department DPDP consent requests."
        actions={
          unreadCount > 0 ? (
            <Button
              variant="outline"
              size="sm"
              onClick={() => markAllAsRead()}
              icon={CheckCheck}
            >
              Mark All as Read ({unreadCount})
            </Button>
          ) : undefined
        }
      />

      {/* 2. FILTER TABS */}
      <div className="flex items-center space-x-2 border-b border-stone-200 pb-2 text-xs font-semibold">
        <button
          onClick={() => setFilterUnreadOnly(false)}
          className={`px-3.5 py-1.5 rounded-xl transition cursor-pointer ${
            !filterUnreadOnly
              ? 'bg-gov-700 text-white shadow-xs font-bold'
              : 'text-stone-600 hover:bg-stone-100'
          }`}
        >
          All Notifications ({notifications.length})
        </button>
        <button
          onClick={() => setFilterUnreadOnly(true)}
          className={`px-3.5 py-1.5 rounded-xl transition cursor-pointer ${
            filterUnreadOnly
              ? 'bg-gov-700 text-white shadow-xs font-bold'
              : 'text-stone-600 hover:bg-stone-100'
          }`}
        >
          Unread Only ({unreadCount})
        </button>
      </div>

      {/* 3. NOTIFICATIONS LIST */}
      <div className="space-y-3">
        {filtered.length > 0 ? (
          filtered.map((notif) => (
            <Card
              key={notif.id}
              padding="md"
              onClick={() => markAsRead(notif.id)}
              className={`transition-all duration-150 flex items-start space-x-3.5 cursor-pointer ${
                notif.isRead
                  ? 'bg-white border-stone-200'
                  : 'bg-gov-50/70 border-gov-300 ring-2 ring-gov-100 shadow-xs'
              }`}
            >
              <div className="mt-0.5 flex-shrink-0">
                {getNotifIcon(notif.type)}
              </div>

              <div className="flex-1 space-y-1.5 text-xs">
                <div className="flex items-center justify-between">
                  <h4 className={`font-bold ${notif.isRead ? 'text-stone-900 text-sm' : 'text-gov-950 font-serif text-sm'}`}>
                    {notif.title}
                  </h4>
                  <span className="text-xs text-stone-600 font-mono font-medium">
                    {new Date(notif.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • {new Date(notif.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <p className="text-stone-700 leading-relaxed text-xs font-normal">{notif.message}</p>

                {notif.actionLink && (
                  <div className="pt-2">
                    <Link
                      to={notif.actionLink}
                      className="text-gov-800 font-bold hover:text-gov-950 hover:underline inline-flex items-center gap-1.5 text-xs"
                    >
                      <span>Take Action</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                )}
              </div>
            </Card>
          ))
        ) : (
          <EmptyState
            title="All Caught Up"
            description="You have no notifications pending review. Updates will appear here as your applications progress."
            actionIcon={Inbox}
          />
        )}
      </div>
    </div>
  );
};
