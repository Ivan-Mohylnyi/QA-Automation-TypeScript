import { INotifiable } from './i-notifiable';
import { IUrgentNotifiable } from './i-urgent-notifiable';

// DIP, LSP: depends only on the interface, so it works with any current or future INotifiable implementation
export function dispatchNotification(notifiable: INotifiable, message: string): void {
    notifiable.send(message);
}

// DIP, ISP: a separate, narrow interface for the subset of notifications that also support urgent delivery
export function dispatchUrgentNotification(notifiable: IUrgentNotifiable, message: string): void {
    notifiable.sendUrgent(message);
}
