import { expect } from 'chai';
import { EmailNotification } from '../src/email-notification';

describe('EmailNotification', () => {
    let emailNotification: EmailNotification;

    beforeEach(() => {
        // Arrange
        emailNotification = new EmailNotification({ recipient: 'qa@example.com', priority: 'normal' }, 'Weekly update');
    });

    it('should start with sentCount of 0 and no lastMessage', () => {
        // Assert
        expect(emailNotification.sentCount).to.equal(0);
        expect(emailNotification.lastMessage).to.equal('');
    });

    it('should set channel to Email', () => {
        // Assert
        expect(emailNotification.channel).to.equal('Email');
    });

    it('should increase sentCount by 1 after send()', () => {
        // Act
        emailNotification.send('Hello team');

        // Assert
        expect(emailNotification.sentCount).to.equal(1);
    });

    it('should prefix the message with the subject', () => {
        // Act
        emailNotification.send('Hello team');

        // Assert
        expect(emailNotification.lastMessage).to.be.a('string').and.to.include('Weekly update').and.to.include('Hello team');
    });

    it('should increase sentCount for every call to send()', () => {
        // Act
        emailNotification.send('First');
        emailNotification.send('Second');
        emailNotification.send('Third');

        // Assert
        expect(emailNotification.sentCount).to.equal(3);
    });
});
