import { Notification } from './notification';
import { SpecificNotificationProps } from './notification-props';

export class EmailNotification extends Notification {
    public constructor(props: SpecificNotificationProps, protected readonly subject: string) {
        super({ ...props, channel: 'Email' });
    }

    public send(message: string): void {
        this.logDelivery(`Subject: "${this.subject}" - ${message}`);
    }
}
