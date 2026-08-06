import { expect } from 'chai';
import sinon from 'sinon';
import { getUserById } from '../src/user-api';
import { UserDto } from '../src/user.dto';

describe('getUserById (function mocking: fetch is stubbed, so no real network call happens)', () => {
    let fetchStub: sinon.SinonStub;

    const fakeUser: UserDto = {
        id: 1,
        name: 'Jane Mock',
        username: 'jmock',
        email: 'jane@example.com',
        address: {
            street: 'Mock street',
            suite: 'Suite 1',
            city: 'Mockville',
            zipcode: '00000',
            geo: { lat: '10', lng: '20' }
        },
        phone: '000-000',
        website: 'mock.test',
        company: { name: 'MockCo', catchPhrase: 'We mock things', bs: 'mock-driven testing' }
    };

    beforeEach(() => {
        // Arrange (shared): replace the real global fetch with a mock for every test in this suite
        fetchStub = sinon.stub(globalThis, 'fetch');
    });

    afterEach(() => {
        sinon.restore();
    });

    it('should return the parsed user when fetch resolves with an ok response', async () => {
        // Arrange
        fetchStub.resolves({ ok: true, json: (): Promise<UserDto> => Promise.resolve(fakeUser) } as unknown as Response);

        // Act
        const user = await getUserById(1);

        // Assert
        expect(user).to.deep.equal(fakeUser);
    });

    it('should call fetch exactly once with the correct URL', async () => {
        // Arrange
        fetchStub.resolves({ ok: true, json: (): Promise<UserDto> => Promise.resolve(fakeUser) } as unknown as Response);

        // Act
        await getUserById(1);

        // Assert
        expect(fetchStub.calledOnce).to.be.true;
        expect(fetchStub.firstCall.args[0]).to.equal('https://jsonplaceholder.typicode.com/users/1');
    });

    it('should throw a descriptive error when the response is not ok', async () => {
        // Arrange
        fetchStub.resolves({ ok: false, status: 404, statusText: 'Not Found' } as unknown as Response);

        // Act & Assert
        try {
            await getUserById(999);
            expect.fail('getUserById should have thrown for a non-ok response');
        } catch (error) {
            expect((error as Error).message).to.include('404').and.to.include('Not Found');
        }
    });
});
