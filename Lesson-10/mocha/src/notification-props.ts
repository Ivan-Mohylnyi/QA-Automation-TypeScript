export type NotificationPriority = 'low' | 'normal' | 'high';

export interface SpecificNotificationProps {
    recipient: string;
    priority: NotificationPriority;
}

export interface NotificationProps extends SpecificNotificationProps {
    channel: string;
}
