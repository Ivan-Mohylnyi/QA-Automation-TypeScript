import { NotificationProps, NotificationPriority } from './notification-props';
import { INotifiable } from './i-notifiable';

// ISP, SRP: shared state and one narrow contract (send), nothing channel-specific leaks in here
export abstract class Notification implements INotifiable {
    public recipient: string;
    public priority: NotificationPriority;
    public channel: string;
    public sentCount = 0;
    public lastMessage = '';

    public constructor(props: NotificationProps) {
        this.recipient = props.recipient;
        this.priority = props.priority;
        this.channel = props.channel;
    }

    public abstract send(message: string): void;

    // lastMessage/sentCount are what make this observable/testable from the outside,
    // instead of unit tests having to inspect console.log output.
    protected logDelivery(message: string): void {
        this.sentCount++;
        this.lastMessage = message;
        console.log(`[${this.channel}] -> ${this.recipient}: ${message} (priority: ${this.priority})`);
    }
}
