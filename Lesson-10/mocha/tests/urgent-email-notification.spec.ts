import { expect } from 'chai';
import { UrgentEmailNotification } from '../src/urgent-email-notification';

describe('UrgentEmailNotification', () => {
    let urgentEmailNotification: UrgentEmailNotification;

    beforeEach(() => {
        // Arrange
        urgentEmailNotification = new UrgentEmailNotification({ recipient: 'owner@example.com' }, 'Production incident');
    });

    it('should always have priority "high", regardless of what the caller passes in', () => {
        // Assert
        expect(urgentEmailNotification.priority).to.equal('high');
    });

    it('should prefix the message with "URGENT: " when sendUrgent() is called', () => {
        // Act
        urgentEmailNotification.sendUrgent('Payment service is down!');

        // Assert
        expect(urgentEmailNotification.lastMessage).to.include('URGENT: Payment service is down!');
    });

    it('should reuse the inherited send() behaviour (LSP): sendUrgent() also increases sentCount', () => {
        // Act
        urgentEmailNotification.sendUrgent('Payment service is down!');

        // Assert
        expect(urgentEmailNotification.sentCount).to.equal(1);
    });

    it('should still behave like a plain EmailNotification through send()', () => {
        // Act
        urgentEmailNotification.send('Non-urgent follow-up');

        // Assert
        expect(urgentEmailNotification.lastMessage).to.include('Production incident').and.to.include('Non-urgent follow-up');
    });
});
