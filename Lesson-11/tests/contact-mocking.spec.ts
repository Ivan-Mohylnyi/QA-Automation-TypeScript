import { expect } from 'chai';
import sinon from 'sinon';
import { UserSummary } from '../src/user-summary';
import { UserDto } from '../src/user.dto';
import { Contact, PersonContact } from '../src/abstraction';

describe('UserSummary (isolated with a mock user object, no real fetch involved)', () => {
    it('should derive fields from a mock UserDto without ever calling the network', () => {
        // Arrange: a hand-built mock object standing in for a real fetched UserDto
        const mockUser: UserDto = {
            id: 42,
            name: 'Mock User',
            username: 'mockuser',
            email: 'mock@example.com',
            address: {
                street: 'Fake st',
                suite: 'Ste 1',
                city: 'Faketown',
                zipcode: '11111',
                geo: { lat: '10', lng: '5' }
            },
            phone: '111-1111',
            website: 'mock.test',
            company: { name: 'MockCo', catchPhrase: 'Testing all day', bs: 'mock-bs' }
        };

        // Act
        const summary = new UserSummary(mockUser);

        // Assert
        expect(summary.shortBio).to.include('Mock User').and.to.include('mockuser');
        expect(summary.location).to.equal('Faketown, 11111');
        expect(summary.geoCoordinatesSum).to.equal(15);
        expect(summary.companyTagline).to.include('MockCo');
    });
});

describe('PersonContact (object mocking: spying and stubbing methods on a real instance)', () => {
    afterEach(() => {
        sinon.restore();
    });

    it('should call getContactCard exactly once when spied on', () => {
        // Arrange
        const person = new PersonContact('Jane Mock', 'jane@example.com', '555-0100');
        const cardSpy = sinon.spy(person, 'getContactCard');

        // Act
        const card = person.getContactCard();

        // Assert
        expect(cardSpy.calledOnce).to.be.true;
        expect(card).to.include('Jane Mock').and.to.include('555-0100');
    });

    it('should use a stubbed protected formatHeader() when building the contact card', () => {
        // Arrange
        const person = new PersonContact('Jane Mock', 'jane@example.com', '555-0100');
        const formatHeaderStub = sinon
            .stub(Contact.prototype as unknown as { formatHeader: () => string }, 'formatHeader')
            .returns('STUBBED HEADER');

        // Act
        const card = person.getContactCard();

        // Assert
        expect(formatHeaderStub.calledOnce).to.be.true;
        expect(card).to.equal('STUBBED HEADER\nPhone: 555-0100');
    });
});
