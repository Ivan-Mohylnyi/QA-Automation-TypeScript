import { expect } from 'chai';
import { CatApiClient } from '../src/cat-api-client';

// TheCatAPI publishes 'DEMO-API-KEY' in its own docs as a shared, no-signup key for exactly
// this kind of testing/evaluation. It is rate-limited and shared with every other demo user in
// the world, which is why every test below tags its own data with a unique sub_id and filters
// by it - that is what keeps the assertions deterministic on a key nobody here owns.
// A personal key (free, https://thecatapi.com/) can be used instead via CAT_API_KEY.
const API_KEY = process.env.CAT_API_KEY || 'DEMO-API-KEY';
const SUB_ID = `qa-lesson13-${Date.now()}`;

describe('TheCatAPI: relationships between images, votes and favourites', () => {
    const client = new CatApiClient(API_KEY);
    let createdVoteIds: number[] = [];
    let createdFavouriteIds: number[] = [];

    afterEach(async () => {
        await Promise.all(createdVoteIds.map((id) => client.deleteVote(id)));
        await Promise.all(createdFavouriteIds.map((id) => client.deleteFavourite(id)));
        createdVoteIds = [];
        createdFavouriteIds = [];
    });

    it('voting on a real fetched image is reflected in GET /votes filtered by sub_id', async () => {
        // Arrange
        const [image] = await client.searchImages(1);

        // Act
        const vote = await client.createVote({ image_id: image.id, value: 1, sub_id: SUB_ID });
        createdVoteIds.push(vote.id);
        const votes = await client.getVotesBySubId(SUB_ID);

        // Assert
        const matchingVote = votes.find((v) => v.id === vote.id);
        expect(matchingVote).to.exist;
        expect(matchingVote?.image_id).to.equal(image.id);
        expect(matchingVote?.value).to.equal(1);
    });

    it('favouriting a real fetched image is reflected in GET /favourites, with the correct embedded image', async () => {
        // Arrange
        const [image] = await client.searchImages(1);

        // Act
        const favourite = await client.createFavourite({ image_id: image.id, sub_id: SUB_ID });
        createdFavouriteIds.push(favourite.id);
        const favourites = await client.getFavouritesBySubId(SUB_ID);

        // Assert
        const matchingFavourite = favourites.find((f) => f.id === favourite.id);
        expect(matchingFavourite).to.exist;
        expect(matchingFavourite?.image_id).to.equal(image.id);
        expect(matchingFavourite?.image?.url).to.equal(image.url);
    });

    it('the same image can be both voted and favourited under the same sub_id', async () => {
        // Arrange
        const [image] = await client.searchImages(1);

        // Act
        const vote = await client.createVote({ image_id: image.id, value: 1, sub_id: SUB_ID });
        const favourite = await client.createFavourite({ image_id: image.id, sub_id: SUB_ID });
        createdVoteIds.push(vote.id);
        createdFavouriteIds.push(favourite.id);

        const [votes, favourites] = await Promise.all([client.getVotesBySubId(SUB_ID), client.getFavouritesBySubId(SUB_ID)]);

        // Assert
        expect(votes.some((v) => v.id === vote.id && v.image_id === image.id)).to.be.true;
        expect(favourites.some((f) => f.id === favourite.id && f.image_id === image.id)).to.be.true;
    });

    it('deleting a favourite removes it from the favourites list without affecting the vote for the same image', async () => {
        // Arrange
        const [image] = await client.searchImages(1);
        const vote = await client.createVote({ image_id: image.id, value: 1, sub_id: SUB_ID });
        const favourite = await client.createFavourite({ image_id: image.id, sub_id: SUB_ID });
        createdVoteIds.push(vote.id);

        // Act
        await client.deleteFavourite(favourite.id);
        const [votes, favourites] = await Promise.all([client.getVotesBySubId(SUB_ID), client.getFavouritesBySubId(SUB_ID)]);

        // Assert
        expect(favourites.some((f) => f.id === favourite.id)).to.be.false;
        expect(votes.some((v) => v.id === vote.id)).to.be.true;
    });

    it('deleting a vote removes it from the votes list', async () => {
        // Arrange
        const [image] = await client.searchImages(1);
        const vote = await client.createVote({ image_id: image.id, value: 1, sub_id: SUB_ID });

        // Act
        await client.deleteVote(vote.id);
        const votes = await client.getVotesBySubId(SUB_ID);

        // Assert
        expect(votes.some((v) => v.id === vote.id)).to.be.false;
    });

    it('voting on several different images under one sub_id aggregates correctly', async () => {
        // Arrange
        const images = await client.searchImages(3);

        // Act
        const votes = await Promise.all(images.map((image) => client.createVote({ image_id: image.id, value: 1, sub_id: SUB_ID })));
        createdVoteIds.push(...votes.map((v) => v.id));
        const storedVotes = await client.getVotesBySubId(SUB_ID);

        // Assert
        for (const image of images) {
            expect(storedVotes.some((v) => v.image_id === image.id)).to.be.true;
        }
    });

    it('the votes module accepts a vote for an image_id that does not exist (integration gap with the images module)', async () => {
        // Arrange
        const bogusImageId = 'this-image-does-not-exist-xyz';

        // Act
        const vote = await client.createVote({ image_id: bogusImageId, value: 1, sub_id: SUB_ID });
        createdVoteIds.push(vote.id);
        const imageResponse = await client.getImageById(bogusImageId);

        // Assert: the vote was accepted even though the image itself does not exist
        expect(vote.message).to.equal('SUCCESS');
        expect(imageResponse.status).to.equal(400);
    });

    it('the favourites module has the same integration gap: it also accepts a non-existent image_id', async () => {
        // Arrange
        const bogusImageId = 'this-image-also-does-not-exist-xyz';

        // Act
        const favourite = await client.createFavourite({ image_id: bogusImageId, sub_id: SUB_ID });
        createdFavouriteIds.push(favourite.id);
        const imageResponse = await client.getImageById(bogusImageId);

        // Assert
        expect(favourite.message).to.equal('SUCCESS');
        expect(imageResponse.status).to.equal(400);
    });

    it('voting without an image_id is rejected with 400 by the votes module itself', async () => {
        // Act
        const response = await client.createVoteRaw({ value: 1, sub_id: SUB_ID });

        // Assert
        expect(response.status).to.equal(400);
    });

    it('voting without an api key is rejected with 401, keeping per-user history properly isolated', async () => {
        // Act
        const response = await client.createFavouriteRaw({ image_id: 'apn', sub_id: SUB_ID }, false);

        // Assert
        expect(response.status).to.equal(401);
    });
});
