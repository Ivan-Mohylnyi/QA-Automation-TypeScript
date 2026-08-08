import { expect as expectChai } from 'chai';
import { ConfigService } from '../src/services/config.service';
import { PlaywrightApiService } from '../src/services/playwright-api.service';
import { JokesApi } from '../src/apis/jokes.api';
import { JokeDto, JokeErrorDto } from '../src/models';

describe('Official Joke API tests', () => {
    const config = new ConfigService().getConfig();
    const apiService = new PlaywrightApiService(config.baseUrl);
    const jokesApi = new JokesApi(apiService);

    it('should return a single random joke with the expected shape', async () => {
        const [response, joke] = await jokesApi.getRandomJokeAsync();

        expect(response.status()).toBe(200);
        expectChai(joke).to.have.property('id').that.is.a('number');
        expectChai(joke).to.have.property('type').that.is.a('string');
        expectChai(joke).to.have.property('setup').that.is.a('string');
        expectChai(joke).to.have.property('punchline').that.is.a('string');
    });

    it('should return exactly 10 random jokes', async () => {
        const [response, jokes] = await jokesApi.getRandomTenAsync();

        expect(response.status()).toBe(200);
        expectChai(jokes).to.be.an('array').with.lengthOf(10);
    });

    it('should return jokes filtered by type as a one-item array matching that type', async () => {
        const [response, jokes] = await jokesApi.getJokesByTypeRandomAsync('programming');

        expect(response.status()).toBe(200);
        expectChai(jokes).to.be.an('array').with.lengthOf(1);
        expectChai(jokes[0].type).to.equal('programming');
    });

    it('should return the joke with id 1', async () => {
        const [response, joke] = await jokesApi.getJokeByIdAsync(1);

        expect(response.status()).toBe(200);
        expectChai((joke as JokeDto).id).to.equal(1);
    });

    it('should return 404 with an error body for a non-existent joke id', async () => {
        const [response, body] = await jokesApi.getJokeByIdAsync(999999);

        expect(response.status()).toBe(404);
        expectChai((body as JokeErrorDto).type).to.equal('error');
        expectChai((body as JokeErrorDto).message).to.equal('joke not found');
    });
});
