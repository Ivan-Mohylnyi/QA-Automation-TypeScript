import { APIResponse } from 'playwright';
import { IApiService } from '../services/i-api.service';
import { JokeDto, JokeErrorDto } from '../models';

export class JokesApi {
    public constructor(private readonly apiService: IApiService<APIResponse>) {}

    public async getRandomJokeAsync(): Promise<[APIResponse, JokeDto]> {
        const response = await this.apiService.getAsync('/random_joke');
        return [response, (await response.json()) as JokeDto];
    }

    public async getRandomTenAsync(): Promise<[APIResponse, JokeDto[]]> {
        const response = await this.apiService.getAsync('/random_ten');
        return [response, (await response.json()) as JokeDto[]];
    }

    public async getJokesByTypeRandomAsync(type: string): Promise<[APIResponse, JokeDto[]]> {
        const response = await this.apiService.getAsync(`/jokes/${type}/random`);
        return [response, (await response.json()) as JokeDto[]];
    }

    public async getJokeByIdAsync(id: number): Promise<[APIResponse, JokeDto | JokeErrorDto]> {
        const response = await this.apiService.getAsync(`/jokes/${id}`);
        return [response, (await response.json()) as JokeDto | JokeErrorDto];
    }
}
