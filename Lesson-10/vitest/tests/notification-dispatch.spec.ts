import { describe, expect, it } from 'vitest';
import { expect as expectChai } from 'chai';
import { dispatchNotification, dispatchUrgentNotification } from '../src/notification-dispatch';
import { INotifiable } from '../src/i-notifiable';
import { IUrgentNotifiable } from '../src/i-urgent-notifiable';
import { EmailNotification } from '../src/email-notification';

describe('dispatchNotification', () => {
    it('should call send() on the given notifiable with the given message (vitest assertion)', () => {
        // Arrange
        let receivedMessage = '';
        const fakeNotifiable: INotifiable = {
            send: (message: string) => {
                receivedMessage = message;
            }
        };

        // Act
        dispatchNotification(fakeNotifiable, 'Hello from test');

        // Assert
        expect(receivedMessage).toBe('Hello from test');
    });

    it('should work with any object implementing INotifiable, not just one concrete class (chai assertion)', () => {
        // Arrange
        const calls: string[] = [];
        const anotherFakeNotifiable: INotifiable = {
            send: (message: string) => {
                calls.push(message);
            }
        };

        // Act
        dispatchNotification(anotherFakeNotifiable, 'first');
        dispatchNotification(anotherFakeNotifiable, 'second');

        // Assert
        expectChai(calls).to.have.lengthOf(2);
        expectChai(calls).to.deep.equal(['first', 'second']);
    });

    it('should drive a real EmailNotification instance the same way as a fake (chai assertion)', () => {
        // Arrange
        const email = new EmailNotification({ recipient: 'a@b.com', priority: 'low' }, 'Subject');

        // Act
        dispatchNotification(email, 'Real instance test');

        // Assert
        expectChai(email.sentCount).to.equal(1);
        expectChai(email.lastMessage).to.include('Real instance test');
    });
});

describe('dispatchUrgentNotification', () => {
    it('should call sendUrgent() (not send()) on the given notifiable (vitest assertion)', () => {
        // Arrange
        let urgentReceived = '';
        let normalReceived = '';
        const fakeUrgentNotifiable: IUrgentNotifiable & INotifiable = {
            sendUrgent: (message: string) => {
                urgentReceived = message;
            },
            send: (message: string) => {
                normalReceived = message;
            }
        };

        // Act
        dispatchUrgentNotification(fakeUrgentNotifiable, 'incident');

        // Assert
        expect(urgentReceived).toBe('incident');
        expect(normalReceived).toBe('');
    });
});
