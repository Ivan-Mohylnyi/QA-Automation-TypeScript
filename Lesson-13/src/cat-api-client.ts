import {
    CreateFavouriteRequestDto,
    CreateFavouriteResponseDto,
    CreateVoteRequestDto,
    CreateVoteResponseDto,
    FavouriteDto,
    ImageDto,
    VoteDto
} from './models';

const BASE_URL = 'https://api.thecatapi.com/v1';

export class CatApiClient {
    public constructor(private readonly apiKey: string) {}

    // The shared DEMO-API-KEY is rate-limited and can respond with a plain-text message
    // (e.g. "You have hit the rate limit...") instead of JSON. Parsing that with response.json()
    // directly throws an opaque "Unexpected token" SyntaxError, so this surfaces a clear error instead.
    private async parseJson<T>(response: Response, context: string): Promise<T> {
        const text = await response.text();
        try {
            return JSON.parse(text) as T;
        } catch {
            throw new Error(`${context}: expected JSON but got (status ${response.status}): ${text}`);
        }
    }

    public async searchImages(limit = 10): Promise<ImageDto[]> {
        const response = await fetch(`${BASE_URL}/images/search?limit=${limit}`);
        return this.parseJson<ImageDto[]>(response, 'searchImages');
    }

    public async getImageById(imageId: string): Promise<Response> {
        return fetch(`${BASE_URL}/images/${imageId}`);
    }

    public async createVote(request: CreateVoteRequestDto): Promise<CreateVoteResponseDto> {
        const response = await fetch(`${BASE_URL}/votes`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'x-api-key': this.apiKey },
            body: JSON.stringify(request)
        });
        return this.parseJson<CreateVoteResponseDto>(response, 'createVote');
    }

    public async createVoteRaw(request: Partial<CreateVoteRequestDto>): Promise<Response> {
        return fetch(`${BASE_URL}/votes`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'x-api-key': this.apiKey },
            body: JSON.stringify(request)
        });
    }

    public async getVotesBySubId(subId: string): Promise<VoteDto[]> {
        const response = await fetch(`${BASE_URL}/votes?sub_id=${subId}`, {
            headers: { 'x-api-key': this.apiKey }
        });
        return this.parseJson<VoteDto[]>(response, 'getVotesBySubId');
    }

    public async deleteVote(voteId: number): Promise<Response> {
        return fetch(`${BASE_URL}/votes/${voteId}`, {
            method: 'DELETE',
            headers: { 'x-api-key': this.apiKey }
        });
    }

    public async createFavourite(request: CreateFavouriteRequestDto): Promise<CreateFavouriteResponseDto> {
        const response = await fetch(`${BASE_URL}/favourites`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'x-api-key': this.apiKey },
            body: JSON.stringify(request)
        });
        return this.parseJson<CreateFavouriteResponseDto>(response, 'createFavourite');
    }

    public async createFavouriteRaw(request: Partial<CreateFavouriteRequestDto>, withAuth = true): Promise<Response> {
        const headers: HeadersInit = { 'Content-Type': 'application/json' };
        if (withAuth) {
            headers['x-api-key'] = this.apiKey;
        }
        return fetch(`${BASE_URL}/favourites`, {
            method: 'POST',
            headers,
            body: JSON.stringify(request)
        });
    }

    public async getFavouritesBySubId(subId: string): Promise<FavouriteDto[]> {
        const response = await fetch(`${BASE_URL}/favourites?sub_id=${subId}`, {
            headers: { 'x-api-key': this.apiKey }
        });
        return this.parseJson<FavouriteDto[]>(response, 'getFavouritesBySubId');
    }

    public async deleteFavourite(favouriteId: number): Promise<Response> {
        return fetch(`${BASE_URL}/favourites/${favouriteId}`, {
            method: 'DELETE',
            headers: { 'x-api-key': this.apiKey }
        });
    }
}
