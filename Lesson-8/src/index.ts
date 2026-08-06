import { getUserById } from './user-api';
import { UserSummary } from './user-summary';
import { CompanyContact, Contact, PersonContact } from './abstraction';

const user = await getUserById(1);
console.log('=== Raw user (typed object from the API) ===');
console.log(user);

const summary = new UserSummary(user);
console.log('\n=== UserSummary (derived from the raw user in its constructor) ===');
console.log(summary.describe());

console.log('\n=== Abstraction & inheritance ===');
const personContact = new PersonContact(user.name, user.email, user.phone);
const companyContact = new CompanyContact(user.company.name, `contact@${user.website}`, user.company.catchPhrase);

const contacts: Contact[] = [personContact, companyContact];
for (const contact of contacts) {
    console.log(contact.getContactCard());
    console.log('---');
}

console.log(`Total Contact instances created: ${Contact.contactCount}`);
