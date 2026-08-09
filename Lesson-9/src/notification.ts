import { NotificationProps, NotificationPriority } from './notification-props';
import { INotifiable } from './i-notifiable';

// ISP, SRP: shared state and one narrow contract (send), nothing channel-specific leaks in here
export abstract class Notification implements INotifiable {
    public recipient: string;
    public priority: NotificationPriority;
    public channel: string;
    public sentCount = 0;

    public constructor(props: NotificationProps) {
        this.recipient = props.recipient;
        this.priority = props.priority;
        this.channel = props.channel;
    }

    public abstract send(message: string): void;

    protected logDelivery(message: string): void {
        this.sentCount++;
        console.log(`[${this.channel}] -> ${this.recipient}: ${message} (priority: ${this.priority})`);
    }
}
