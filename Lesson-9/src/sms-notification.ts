import { Notification } from './notification';
import { SpecificNotificationProps } from './notification-props';

const SMS_CHARACTER_LIMIT = 160;

export class SmsNotification extends Notification {
    public constructor(props: SpecificNotificationProps) {
        super({ ...props, channel: 'SMS' });
    }

    public send(message: string): void {
        const truncated = message.length > SMS_CHARACTER_LIMIT ? `${message.slice(0, SMS_CHARACTER_LIMIT - 3)}...` : message;
        this.logDelivery(truncated);
    }
}
