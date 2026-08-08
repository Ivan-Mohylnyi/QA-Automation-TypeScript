import { expect } from 'chai';
import { SmsNotification } from '../src/sms-notification';

describe('SmsNotification', () => {
    let smsNotification: SmsNotification;

    beforeEach(() => {
        // Arrange
        smsNotification = new SmsNotification({ recipient: '+1-555-0100', priority: 'high' });
    });

    it('should set channel to SMS', () => {
        // Assert
        expect(smsNotification.channel).to.equal('SMS');
    });

    it('should not truncate messages under the character limit', () => {
        // Arrange
        const shortMessage = 'Nightly build finished successfully.';

        // Act
        smsNotification.send(shortMessage);

        // Assert
        expect(smsNotification.lastMessage).to.equal(shortMessage);
    });

    it('should truncate messages over 160 characters and append "..."', () => {
        // Arrange
        const longMessage = 'a'.repeat(200);

        // Act
        smsNotification.send(longMessage);

        // Assert
        expect(smsNotification.lastMessage).to.have.lengthOf(160);
        expect(smsNotification.lastMessage.endsWith('...')).to.be.true;
    });

    it('should still increase sentCount when the message is truncated', () => {
        // Act
        smsNotification.send('a'.repeat(200));

        // Assert
        expect(smsNotification.sentCount).to.equal(1);
    });
});
