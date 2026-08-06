import { EmailNotification } from './email-notification';
import { SmsNotification } from './sms-notification';
import { UrgentEmailNotification } from './urgent-email-notification';
import { dispatchNotification, dispatchUrgentNotification } from './notification-dispatch';
import { INotifiable } from './i-notifiable';

const emailToTeam = new EmailNotification({ recipient: 'team@example.com', priority: 'normal' }, 'Weekly update');
const smsToOncall = new SmsNotification({ recipient: '+1-555-0100', priority: 'high' });
const urgentEmailToOwner = new UrgentEmailNotification({ recipient: 'owner@example.com' }, 'Production incident');

// LSP: EmailNotification, SmsNotification and UrgentEmailNotification are all substitutable
// wherever an INotifiable is expected, even though they are three different classes.
const notifiables: INotifiable[] = [emailToTeam, smsToOncall, urgentEmailToOwner];

for (const notifiable of notifiables) {
    dispatchNotification(notifiable, 'Nightly build finished successfully.');
}

dispatchUrgentNotification(urgentEmailToOwner, 'Payment service is down!');

console.log(`\nTotal messages sent to the team email: ${emailToTeam.sentCount}`);
console.log(`Total messages sent to the on-call phone: ${smsToOncall.sentCount}`);
console.log(`Total messages sent to the owner: ${urgentEmailToOwner.sentCount}`);
