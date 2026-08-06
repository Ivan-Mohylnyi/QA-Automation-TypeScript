import { EmailNotification } from './email-notification';
import { IUrgentNotifiable } from './i-urgent-notifiable';
import { SpecificNotificationProps } from './notification-props';

// SRP, OCP, ISP: adds urgent-delivery behaviour on top of EmailNotification without
// touching EmailNotification/Notification, and without forcing every notification to have it
export class UrgentEmailNotification extends EmailNotification implements IUrgentNotifiable {
    public constructor(props: Omit<SpecificNotificationProps, 'priority'>, subject: string) {
        super({ ...props, priority: 'high' }, subject);
    }

    public sendUrgent(message: string): void {
        this.send(`URGENT: ${message}`);
    }
}
